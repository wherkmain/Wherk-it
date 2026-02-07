-- Create table for Wherk It YouTube videos
-- Uses naming convention: {project}_{tablename}
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

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_wherkit_video_id ON wherkit_youtube_videos(video_id);
CREATE INDEX IF NOT EXISTS idx_wherkit_processed_at ON wherkit_youtube_videos(processed_at);
CREATE INDEX IF NOT EXISTS idx_wherkit_author ON wherkit_youtube_videos(author);

-- Add comment for table
COMMENT ON TABLE wherkit_youtube_videos IS 'Stores processed YouTube video data including transcripts and metadata for Wherk It project';
