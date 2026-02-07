const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://qykcgnrriabfpawoeyif.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5a2NnbnJyaWFiZnBhd29leWlmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjkxMTQ1MywiZXhwIjoyMDc4NDg3NDUzfQ.39-ChR_Fb58kDQso9fPiV7tlb364jmq_Pxo5De1UQpQ'
);

async function checkTable() {
  const { data, error } = await supabase
    .from('wherkit_youtube_videos')
    .select('id')
    .limit(1);
  
  if (error && error.code === '42P01') {
    console.log('Table does not exist. Please create it using the SQL below:');
    console.log('\n--- SQL TO RUN IN SUPABASE SQL EDITOR ---\n');
    console.log(`CREATE TABLE IF NOT EXISTS wherkit_youtube_videos (
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

CREATE INDEX IF NOT EXISTS idx_wherkit_video_id ON wherkit_youtube_videos(video_id);
CREATE INDEX IF NOT EXISTS idx_wherkit_processed_at ON wherkit_youtube_videos(processed_at);
CREATE INDEX IF NOT EXISTS idx_wherkit_author ON wherkit_youtube_videos(author);`);
    console.log('\n--- END SQL ---\n');
  } else if (error) {
    console.error('Error:', error);
  } else {
    console.log('Table wherkit_youtube_videos exists!');
  }
}

checkTable();
