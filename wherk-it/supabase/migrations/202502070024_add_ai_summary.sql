ALTER TABLE wherkit_youtube_videos ADD COLUMN IF NOT EXISTS ai_summary JSONB DEFAULT '{}'::jsonb;
