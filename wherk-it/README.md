# Wherk It - YouTube Video Processor

Extract transcripts and metadata from YouTube videos and store in Supabase.

## Setup

### 1. Clone and Install

```bash
git clone <repo-url>
cd wherk-it
npm install
```

### 2. Supabase Setup (Shared Database)

This project uses the **shared `wherk-buys-apps` Supabase database** for all small projects.

**Naming convention:** `{project}_{tablename}`

For this project: `wherkit_youtube_videos`

1. Go to https://supabase.com and sign in to the `wherk-buys-apps` project
2. Go to the SQL Editor and run:

```sql
-- Create table for Wherk It YouTube videos
CREATE TABLE IF NOT EXISTS wherkit_youtube_videos (
  id SERIAL PRIMARY KEY,
  video_id TEXT UNIQUE NOT NULL,
  url TEXT NOT NULL,
  title TEXT,
  author TEXT,
  transcript TEXT,
  transcript_segments JSONB DEFAULT '[]'::jsonb,
  transcript_length INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  comments JSONB DEFAULT '[]'::jsonb,
  processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_wherkit_video_id ON wherkit_youtube_videos(video_id);
CREATE INDEX idx_wherkit_processed_at ON wherkit_youtube_videos(processed_at);
```

3. Environment variables (already configured for shared database):
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://qykcgnrriabfpawoeyif.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = [get from project settings]

### 3. Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**IMPORTANT:** Never commit `.env.local` to git!

### 4. Run Locally

```bash
npm run dev
```

Open http://localhost:3000

### 5. Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Then add environment variables in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

## Usage

1. Paste YouTube URLs in the text box (comma or line break separated)
2. Click "Wherk It"
3. Wait for processing (1 second delay between videos to avoid rate limits)
4. Results are saved to your Supabase database

## Features

- ✅ Extract transcripts (even auto-generated ones)
- ✅ Extract video metadata (title, author)
- ✅ Batch processing (up to 50 videos)
- ✅ Rate limiting (1 second between requests)
- ✅ Database storage with Supabase
- ✅ Duplicate handling (upserts by video ID)
- ✅ Progress tracking

## Database Schema

**Table:** `wherkit_youtube_videos`

| Column | Type | Description |
|--------|------|-------------|
| video_id | TEXT | YouTube video ID (unique) |
| url | TEXT | Full YouTube URL |
| title | TEXT | Video title |
| author | TEXT | Channel name |
| transcript | TEXT | Full transcript text |
| transcript_segments | JSONB | Array with timestamps |
| transcript_length | INTEGER | Character count |
| comment_count | INTEGER | Number of comments |
| comments | JSONB | Array of comments (future) |
| processed_at | TIMESTAMP | When processed |
| metadata | JSONB | Additional metadata |

**Shared Database Pattern:**
- Database: `wherk-buys-apps`
- This project: `wherkit_youtube_videos`
- Other projects: `{projectname}_{tablename}`

## Future Enhancements

- [ ] YouTube Comments API integration
- [ ] Export to CSV/JSON
- [ ] Video search within database
- [ ] AI summarization
- [ ] Batch import from playlist
- [ ] Progress bar for large batches

## Rate Limits

- Processing: 1 video per second (to avoid YouTube blocks)
- Maximum: 50 videos per request
- Daily limit: Depends on Supabase free tier (usually sufficient)

## Cost

- **Supabase:** Free tier (500MB database, 2GB bandwidth)
- **Vercel:** Free tier (100GB bandwidth, 10s serverless functions)
- **YouTube API:** Free (using unofficial transcript API)

Total monthly cost: **$0** for up to ~1,500 videos/month
# Trigger rebuild Sat Feb  7 15:45:53 EST 2026

