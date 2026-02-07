-- Add description column to existing table
ALTER TABLE wherkit_youtube_videos ADD COLUMN IF NOT EXISTS description TEXT;

-- Add view_count and like_count columns for metadata
ALTER TABLE wherkit_youtube_videos ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE wherkit_youtube_videos ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0;
