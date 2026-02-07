const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:FFFKyRhD3Sul1jug@db.qykcgnrriabfpawoeyif.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

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

COMMENT ON TABLE wherkit_youtube_videos IS 'Stores processed YouTube video data including transcripts and metadata for Wherk It project';
`;

async function migrate() {
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected! Running migration...');
    
    await client.query(createTableSQL);
    console.log('✅ Migration complete! Table wherkit_youtube_videos created.');
    
    // Verify table exists
    const result = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'wherkit_youtube_videos'
      ORDER BY ordinal_position;
    `);
    console.log('\nTable structure:');
    result.rows.forEach(row => {
      console.log(`  - ${row.column_name}: ${row.data_type}`);
    });
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
