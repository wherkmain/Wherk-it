#!/bin/bash
#
# YouTube Transcriber - Local version
# Downloads YouTube audio, transcribes with Whisper, saves to Supabase
#

set -e

VIDEO_URL="$1"
if [ -z "$VIDEO_URL" ]; then
    echo "Usage: $0 <youtube-url>"
    exit 1
fi

# Config
SUPABASE_URL="https://qykcgnrriabfpawoeyif.supabase.co"
SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5a2NnbnJyaWFiZnBhd29leWlmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjkxMTQ1MywiZXhwIjoyMDc4NDg3NDUzfQ.39-ChR_Fb58kDQso9fPiV7tlb364jmq_Pxo5De1UQpQ"
WORKSPACE="/Users/openclaw/.openclaw/workspace/transcripts/$(date +%Y-%m-%d)"
TEMP_DIR=$(mktemp -d)

# Cleanup on exit
trap "rm -rf $TEMP_DIR" EXIT

mkdir -p "$WORKSPACE"

echo "🔍 Processing: $VIDEO_URL"

# Extract video ID
VIDEO_ID=$(echo "$VIDEO_URL" | grep -oE '(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/)([a-zA-Z0-9_-]{11})' | head -1 | sed 's/.*[=\/]//')

if [ -z "$VIDEO_ID" ]; then
    echo "❌ Could not extract video ID"
    exit 1
fi

echo "🆔 Video ID: $VIDEO_ID"

# Get metadata
echo "📺 Fetching metadata..."
METADATA=$(curl -s "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${VIDEO_ID}&format=json")
TITLE=$(echo "$METADATA" | python3 -c "import sys,json; print(json.load(sys.stdin).get('title','Unknown'))" 2>/dev/null || echo "Unknown")
AUTHOR=$(echo "$METADATA" | python3 -c "import sys,json; print(json.load(sys.stdin).get('author_name','Unknown'))" 2>/dev/null || echo "Unknown")

echo "📹 Title: $TITLE"
echo "👤 Author: $AUTHOR"

# Download audio using yt-dlp
echo "🎵 Downloading audio..."
if ! command -v yt-dlp &> /dev/null; then
    echo "Installing yt-dlp..."
    pip3 install -U yt-dlp
fi

yt-dlp -f 'bestaudio' --extract-audio --audio-format mp3 --audio-quality 128K \
    -o "$TEMP_DIR/audio.%(ext)s" --no-playlist "$VIDEO_URL" 2>&1 | tail -5

AUDIO_FILE=$(ls -1 "$TEMP_DIR/audio."* 2>/dev/null | head -1)

if [ -z "$AUDIO_FILE" ] || [ ! -f "$AUDIO_FILE" ]; then
    echo "❌ Failed to download audio"
    exit 1
fi

echo "✅ Audio downloaded"

# Transcribe with Whisper
echo "📝 Transcribing with Whisper..."
TRANSCRIPT=$(curl -s -X POST https://api.openai.com/v1/audio/transcriptions \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -H "Content-Type: multipart/form-data" \
    -F file="@$AUDIO_FILE" \
    -F model="whisper-1" \
    -F response_format="verbose_json" 2>&1)

if [ -z "$TRANSCRIPT" ] || echo "$TRANSCRIPT" | grep -q "error"; then
    echo "❌ Transcription failed: $TRANSCRIPT"
    exit 1
fi

# Extract text
echo "$TRANSCRIPT" | python3 -c "
import sys, json
data = json.load(sys.stdin)
text = data.get('text', '')
segments = data.get('segments', [])
print(f'Transcript length: {len(text)} characters')
print(f'Segments: {len(segments)}')
print('\nFirst 500 chars:')
print(text[:500])
" 

# Save to Supabase
echo "💾 Saving to Supabase..."

python3 << PYTHON
import requests
import json
from datetime import datetime

supabase_url = "$SUPABASE_URL"
supabase_key = "$SUPABASE_KEY"
video_id = "$VIDEO_ID"
url = "$VIDEO_URL"
title = "$TITLE"
author = "$AUTHOR"

transcript_data = json.loads('''$TRANSCRIPT''')
text = transcript_data.get('text', '')
segments = transcript_data.get('segments', [])

# Insert to Supabase
headers = {
    'apikey': supabase_key,
    'Authorization': f'Bearer {supabase_key}',
    'Content-Type': 'application/json',
    'Prefer': 'resolution=merge-duplicates'
}

data = {
    'video_id': video_id,
    'url': url,
    'title': title,
    'author': author,
    'transcript': text,
    'transcript_segments': segments,
    'transcript_length': len(text),
    'comment_count': 0,
    'comments': [],
    'processed_at': datetime.now().isoformat(),
    'metadata': {'method': 'whisper-api', 'segments_count': len(segments)}
}

response = requests.post(
    f'{supabase_url}/rest/v1/wherkit_youtube_videos',
    headers=headers,
    json=data
)

if response.status_code in [200, 201]:
    print(f'✅ Saved to Supabase: {len(text)} characters')
else:
    print(f'❌ Supabase error: {response.status_code}')
    print(response.text)
PYTHON

echo ""
echo "📁 Transcript saved to Supabase"
echo "✅ Done!"
