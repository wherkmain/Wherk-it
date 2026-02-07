-- Add description and thumbnail columns to wherkit_youtube_videos table
ALTER TABLE wherkit_youtube_videos ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE wherkit_youtube_videos ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
