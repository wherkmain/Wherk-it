#!/bin/bash
#
# YouTube Transcriber - Download audio, transcribe, and fetch comments
# Usage: ./youtube-transcribe.sh <youtube-url> [--comments-only] [--transcript-only]
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="/Users/openclaw/.openclaw/workspace"
TRANSCRIBE_SCRIPT="/Users/openclaw/openclaw/skills/openai-whisper-api/scripts/transcribe.sh"
YTDLP="/Users/openclaw/Library/Python/3.9/bin/yt-dlp"

URL="$1"
if [ -z "$URL" ]; then
    echo "Usage: $0 <youtube-url> [--comments-only] [--transcript-only]"
    exit 1
fi

COMMENTS_ONLY=false
TRANSCRIPT_ONLY=false

for arg in "$@"; do
    case $arg in
        --comments-only) COMMENTS_ONLY=true ;;
        --transcript-only) TRANSCRIPT_ONLY=true ;;
    esac
done

# Create temp directory
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

echo "🔍 Processing: $URL"

# Get video info
echo "📺 Fetching video info..."
VIDEO_INFO=$($YTDLP --print "%(id)s|%(title)s" --no-warnings "$URL" 2>/dev/null) || {
    echo "❌ Failed to fetch video info. Check the URL."
    exit 1
}

VIDEO_ID=$(echo "$VIDEO_INFO" | cut -d'|' -f1)
VIDEO_TITLE=$(echo "$VIDEO_INFO" | cut -d'|' -f2- | tr -cd '[:alnum:] [:space:]_.-' | sed 's/  */ /g' | head -c 100)

echo "✅ Video: $VIDEO_TITLE"
echo "🆔 ID: $VIDEO_ID"
echo ""

OUTPUT_DIR="$WORKSPACE_DIR/transcripts/$(date +%Y-%m-%d)"
mkdir -p "$OUTPUT_DIR"
SAFE_TITLE=$(echo "$VIDEO_TITLE" | sed 's/[^a-zA-Z0-9._-]/_/g' | head -c 80)
BASE_NAME="${SAFE_TITLE}_${VIDEO_ID}"

# Fetch comments if not transcript-only
if [ "$TRANSCRIPT_ONLY" = false ]; then
    echo "💬 Fetching comments..."
    COMMENTS_FILE="$OUTPUT_DIR/${BASE_NAME}_comments.json"
    COMMENTS_TXT="$OUTPUT_DIR/${BASE_NAME}_comments.txt"
    
    $YTDLP --dump-comments --no-download "$URL" > "$COMMENTS_FILE" 2>/dev/null || {
        echo "⚠️ Could not fetch comments (may be disabled)"
        touch "$COMMENTS_FILE"
    }
    
    if [ -f "$COMMENTS_FILE" ] && [ -s "$COMMENTS_FILE" ]; then
        echo "Top comments for: $VIDEO_TITLE" > "$COMMENTS_TXT"
        echo "URL: $URL" >> "$COMMENTS_TXT"
        echo "================================" >> "$COMMENTS_TXT"
        echo "" >> "$COMMENTS_TXT"
        
        python3 << 'PYTHON' "$COMMENTS_FILE" "$COMMENTS_TXT" 2>/dev/null || echo "⚠️ Comment parsing failed"
import json
import sys
import re

comments_file = sys.argv[1]
output_file = sys.argv[2]

comments = []
try:
    with open(comments_file, 'r') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                data = json.loads(line)
                if 'data' in data and 'commentRenderer' in data.get('data', {}):
                    cr = data['data']['commentRenderer']
                    author = cr.get('authorText', {}).get('simpleText', 'Unknown')
                    text_parts = cr.get('contentText', {}).get('runs', [])
                    text = ''.join([p.get('text', '') for p in text_parts])
                    likes = cr.get('voteCount', {}).get('simpleText', '0')
                    if text:
                        likes_clean = re.sub(r'[^\d]', '', likes) or '0'
                        comments.append({'author': author, 'text': text, 'likes': int(likes_clean)})
            except:
                pass
    
    comments.sort(key=lambda x: x['likes'], reverse=True)
    
    with open(output_file, 'a') as f:
        for c in comments[:50]:
            f.write(f"@{c['author']} (👍 {c['likes']}):\n")
            f.write(f"{c['text']}\n")
            f.write("-" * 40 + "\n\n")
except Exception as e:
    print(f"Error parsing: {e}")
PYTHON
        
        COMMENT_COUNT=$(grep -c "^@" "$COMMENTS_TXT" 2>/dev/null || echo "0")
        echo "✅ Comments saved: $COMMENTS_TXT ($COMMENT_COUNT comments)"
    else
        echo "⚠️ No comments found"
    fi
    echo ""
fi

# Download and transcribe if not comments-only
if [ "$COMMENTS_ONLY" = false ]; then
    echo "🎵 Downloading audio..."
    AUDIO_FILE="$TEMP_DIR/audio.mp3"
    
    # Download video+audio then extract audio with ffmpeg (more reliable)
    $YTDLP \
        -f 'best[height<=720]/best' \
        -o "$TEMP_DIR/video.%(ext)s" \
        --no-playlist \
        --no-warnings \
        "$URL" 2>&1 | tail -10
    
    VIDEO_DOWNLOADED=$(ls -1 "$TEMP_DIR/video."* 2>/dev/null | head -1 || echo "")
    
    if [ -z "$VIDEO_DOWNLOADED" ] || [ ! -f "$VIDEO_DOWNLOADED" ]; then
        echo "❌ Failed to download video"
        exit 1
    fi
    
    echo "✅ Downloaded video, extracting audio..."
    
    # Extract audio using ffmpeg
    ffmpeg -i "$VIDEO_DOWNLOADED" -vn -ar 16000 -ac 1 -c:a libmp3lame -q:a 2 "$AUDIO_FILE" -y 2>/dev/null || {
        echo "❌ Failed to extract audio"
        exit 1
    }
    
    echo "✅ Audio extracted: $(basename "$AUDIO_FILE")"
    echo ""
    echo "📝 Transcribing with Whisper..."
    
    TRANSCRIPT_FILE="$OUTPUT_DIR/${BASE_NAME}_transcript.txt"
    
    # Run transcription
    "$TRANSCRIBE_SCRIPT" "$AUDIO_FILE" --out "$TRANSCRIPT_FILE" 2>&1 | tail -5
    
    # Add header to transcript
    if [ -f "$TRANSCRIPT_FILE" ]; then
        TEMP_TRANSCRIPT=$(mktemp)
        echo "Transcript: $VIDEO_TITLE" > "$TEMP_TRANSCRIPT"
        echo "URL: $URL" >> "$TEMP_TRANSCRIPT"
        echo "================================" >> "$TEMP_TRANSCRIPT"
        echo "" >> "$TEMP_TRANSCRIPT"
        cat "$TRANSCRIPT_FILE" >> "$TEMP_TRANSCRIPT"
        mv "$TEMP_TRANSCRIPT" "$TRANSCRIPT_FILE"
        
        echo ""
        echo "✅ Transcript saved: $TRANSCRIPT_FILE"
    fi
fi

echo ""
echo "📁 Output directory: $OUTPUT_DIR"
echo ""

ls -lh "$OUTPUT_DIR/${BASE_NAME}"* 2>/dev/null || echo "No files found"
