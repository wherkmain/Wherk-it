const { YoutubeTranscript } = require('youtube-transcript-plus');

async function test(videoId) {
  try {
    console.log(`Testing: ${videoId}`);
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    console.log('✅ SUCCESS! Got', transcript.length, 'segments');
    if (transcript.length > 0) {
      const fullText = transcript.map(t => t.text).join(' ');
      console.log('Total length:', fullText.length, 'chars');
      console.log('Sample:', fullText.slice(0, 200) + '...');
    }
  } catch (err) {
    console.log('❌ FAILED:', err.message);
  }
}

test('JNF8YskAx1E'); // The video Lee mentioned earlier
