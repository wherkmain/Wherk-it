// Test script to verify youtube-transcript works
const { YoutubeTranscript } = require('youtube-transcript');

async function test(videoId, name) {
  try {
    console.log(`\nTesting: ${name} (${videoId})`);
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    console.log('✅ SUCCESS! Got', transcript.length, 'segments');
    if (transcript.length > 0) {
      const fullText = transcript.map(t => t.text).join(' ');
      console.log('Total length:', fullText.length, 'chars');
      console.log('Sample:', fullText.slice(0, 150) + '...');
    } else {
      console.log('⚠️ No transcript available (empty)');
    }
  } catch (err) {
    console.log('❌ FAILED:', err.message);
  }
}

// Test various videos
(async () => {
  await test('M3r2XDceM6A', 'Amazing Space'); // NASA, should have captions
  await test('9bZkp7q19f0', 'Gangnam Style'); // Very popular
  await test('QH2-TGUlwu4', 'Nyan Cat'); // Popular meme
})();
