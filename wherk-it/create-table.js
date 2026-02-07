const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://qykcgnrriabfpawoeyif.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5a2NnbnJyaWFiZnBhd29leWlmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjkxMTQ1MywiZXhwIjoyMDc4NDg3NDUzfQ.39-ChR_Fb58kDQso9fPiV7tlb364jmq_Pxo5De1UQpQ'
);

const createTableSQL = `
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

CREATE INDEX IF NOT EXISTS idx_wherkit_video_id ON wherkit_youtube_videos(video_id);
CREATE INDEX IF NOT EXISTS idx_wherkit_processed_at ON wherkit_youtube_videos(processed_at);
CREATE INDEX IF NOT EXISTS idx_wherkit_author ON wherkit_youtube_videos(author);
`;

async function createTable() {
  const { error } = await supabase.rpc('exec_sql', { sql: createTableSQL });
  
  if (error) {
    console.error('Error creating table:', error);
    // Try direct SQL execution
    const { error: sqlError } = await supabase.from('wherkit_youtube_videos').select('id').limit(1);
    if (sqlError && sqlError.code === '42P01') {
      console.log('Table does not exist, creating...');
      // We'll need to use the SQL editor in Supabase dashboard
      console.log('Please run the SQL from supabase/schema.sql in the Supabase SQL editor');
    } else {
      console.log('Table already exists or other error');
    }
  } else {
    console.log('Table created successfully!');
  }
}

createTable();
