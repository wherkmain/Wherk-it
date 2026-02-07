-- Add description column as top-level field (not just in metadata)
ALTER TABLE wherkit_youtube_videos ADD COLUMN IF NOT EXISTS description TEXT;

-- Add thumbnail URL column
ALTER TABLE wherkit_youtube_videos ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
