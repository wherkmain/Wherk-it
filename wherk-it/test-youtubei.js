// Test youtubei.js for transcripts
const { Innertube } = require('youtubei.js');

async function test(videoId, name) {
  try {
    console.log(`\nTesting: ${name} (${videoId})`);
    const yt = await Innertube.create();
    
    const info = await yt.getInfo(videoId);
    console.log('Video title:', info.basic_info.title);
    
    // Try to get transcript
    const transcript = await info.getTranscript();
    if (transcript && transcript.transcript && transcript.transcript.content) {
      const segments = transcript.transcript.content.body.initial_segments;
      console.log('✅ SUCCESS! Got', segments.length, 'segments');
      const fullText = segments.map(s => s.snippet.text).join(' ');
      console.log('Total length:', fullText.length, 'chars');
      console.log('Sample:', fullText.slice(0, 150) + '...');
    } else {
      console.log('⚠️ No transcript available');
    }
  } catch (err) {
    console.log('❌ FAILED:', err.message);
    console.log(err.stack?.split('\n').slice(0, 3).join('\n'));
  }
}

(async () => {
  await test('dQw4w9WgXcQ', 'Rick Astley');
  await test('M3r2XDceM6A', 'Amazing Space');
})();
