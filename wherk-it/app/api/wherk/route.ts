import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

let supabase: ReturnType<typeof createClient> | null = null;

function getSupabase() {
  if (!supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseKey) throw new Error("Supabase not configured");
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Extract URLs from text
function extractUrls(text: string): string[] {
  const urlRegex = /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;
  return text.match(urlRegex) || [];
}

// Fetch URL content (basic fetch)
async function fetchUrlContent(url: string): Promise<string> {
  try {
    const response = await fetch(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Bot/1.0)' },
      timeout: 5000
    } as any);
    if (!response.ok) return `[Failed to fetch: ${response.status}]`;
    const html = await response.text();
    // Extract title and first paragraph
    const title = html.match(/<title[^>]*>(.*?)<\/title>/i)?.[1] || '';
    const desc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)/i)?.[1] || '';
    return `Title: ${title}\nDescription: ${desc}`.slice(0, 1000);
  } catch (e: any) {
    return `[Error: ${e.message}]`;
  }
}

// Generate AI summary using OpenAI
async function generateAISummary(
  transcript: string,
  description: string,
  title: string,
  author: string,
  extractedUrls: string[],
  urlContents: Record<string, string>
) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.log("No OPENAI_API_KEY configured");
      return null;
    }

    const urlContext = Object.entries(urlContents)
      .map(([url, content]) => `\nURL: ${url}\nContent: ${content}`)
      .join('\n');

    const prompt = `Analyze this YouTube video content and provide structured insights.

IMPORTANT: Pay special attention to configuration details, setup requirements, and non-obvious steps that are mentioned in passing but are CRITICAL for success.

Title: ${title}
Author: ${author}

Description:
${description}

${extractedUrls.length > 0 ? `\nExtracted URLs from description:\n${extractedUrls.join('\n')}\n\nURL Contents:\n${urlContext}` : ''}

Transcript (first 15000 chars):
${transcript.slice(0, 15000)}

Provide JSON response with these fields:
1. training_summary: Key learning points, insights, what's new (2-3 paragraphs)
2. tooling_summary: Actionable items, commands to run, tools mentioned, setup instructions (bullet points)
3. full_summary: Complete condensed summary (4-5 paragraphs)
4. key_insights: Array of 5-10 key takeaways
5. action_items: Array of specific actions to take
6. tools_mentioned: Array of tools, products, or services mentioned
7. critical_configuration: Array of CRITICAL configuration changes required (settings to enable/disable, permissions to grant, non-default options that must be changed). Focus on things that would cause frustration if missed.
8. setup_checklist: Step-by-step checklist for initial setup, including the exact steps shown in the video with any prerequisites or dependencies
9. common_pitfalls: Array of mistakes users commonly make when following these instructions and how to avoid them

Format as valid JSON.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert at analyzing video content and extracting actionable insights. Always respond with valid JSON.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI error:', error);
      return null;
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    if (content) {
      return JSON.parse(content);
    }
    return null;
  } catch (error: any) {
    console.error('AI summary error:', error.message);
    return null;
  }
}

// Fetch video metadata + description from YouTube Data API
async function getVideoDetails(videoId: string) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      console.log("No YOUTUBE_API_KEY configured");
      return null;
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`
    );

    if (!response.ok) {
      console.error("YouTube API error:", await response.text());
      return null;
    }

    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const item = data.items[0];
      return {
        title: item.snippet.title,
        author: item.snippet.channelTitle,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        viewCount: item.statistics?.viewCount || 0,
        likeCount: item.statistics?.likeCount || 0,
        thumbnail: item.snippet.thumbnails?.maxres?.url || 
                   item.snippet.thumbnails?.standard?.url ||
                   item.snippet.thumbnails?.high?.url ||
                   item.snippet.thumbnails?.medium?.url,
      };
    }
    return null;
  } catch (error: any) {
    console.error("Video details error:", error.message);
    return null;
  }
}

// Fetch transcript from TranscriptAPI
async function getTranscript(videoId: string) {
  try {
    const apiKey = process.env.TRANSCRIPT_API_KEY;
    if (!apiKey) {
      console.log("No TRANSCRIPT_API_KEY configured");
      return null;
    }

    const response = await fetch(
      `https://transcriptapi.com/api/v2/youtube/transcript?video_url=${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("TranscriptAPI error:", error);
      return null;
    }

    const data = await response.json();
    if (data.transcript && data.transcript.length > 0) {
      const fullText = data.transcript.map((t: any) => t.text).join(" ");
      return {
        text: fullText,
        segments: data.transcript.map((t: any) => ({
          text: t.text,
          offset: Math.round(t.start * 1000),
          duration: Math.round(t.duration * 1000),
        })),
        length: fullText.length,
      };
    }
    return null;
  } catch (error: any) {
    console.error("Transcript error:", error.message);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    getSupabase();
    const { urls } = await request.json();

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "No URLs provided" }, { status: 400 });
    }

    const results = [];
    let processed = 0;

    for (const url of urls) {
      const videoId = extractVideoId(url);
      if (!videoId) {
        results.push({ url, status: "error", error: "Invalid URL" });
        continue;
      }

      try {
        // Get video details from YouTube API (includes description)
        const videoDetails = await getVideoDetails(videoId);
        if (!videoDetails) {
          results.push({ url, videoId, status: "error", error: "Video not found" });
          continue;
        }

        // Get transcript from TranscriptAPI
        const transcriptData = await getTranscript(videoId);

        // Extract URLs from description
        const extractedUrls = extractUrls(videoDetails.description);
        
        // Fetch content from extracted URLs
        const urlContents: Record<string, string> = {};
        for (const url of extractedUrls.slice(0, 5)) { // Limit to 5 URLs
          urlContents[url] = await fetchUrlContent(url);
        }

        // Generate AI summary
        let aiSummary = null;
        if (transcriptData?.text) {
          aiSummary = await generateAISummary(
            transcriptData.text,
            videoDetails.description,
            videoDetails.title,
            videoDetails.author,
            extractedUrls,
            urlContents
          );
        }

        const { error: dbError } = await getSupabase()
          .from("wherkit_youtube_videos")
          .upsert(
            {
              video_id: videoId,
              url: `https://youtube.com/watch?v=${videoId}`,
              title: videoDetails.title,
              author: videoDetails.author,
              description: videoDetails.description,
              thumbnail_url: videoDetails.thumbnail,
              transcript: transcriptData?.text || "",
              transcript_segments: transcriptData?.segments || [],
              transcript_length: transcriptData?.length || 0,
              ai_summary: aiSummary || {},
              processed_at: new Date().toISOString(),
              metadata: {
                publishedAt: videoDetails.publishedAt,
                viewCount: videoDetails.viewCount,
                likeCount: videoDetails.likeCount,
                extractedUrls: extractedUrls,
              },
            } as any,
            { onConflict: "video_id" }
          );

        if (dbError) {
          results.push({ url, videoId, status: "error", error: dbError.message });
          continue;
        }

        results.push({
          url,
          videoId,
          status: "success",
          data: {
            title: videoDetails.title,
            author: videoDetails.author,
            descriptionLength: videoDetails.description.length,
            transcriptLength: transcriptData?.length || 0,
            hasTranscript: !!transcriptData,
            hasAISummary: !!aiSummary,
            extractedUrls: extractedUrls.length,
          },
        });
        processed++;
      } catch (error: any) {
        results.push({ url, videoId, status: "error", error: error.message });
      }

      if (urls.indexOf(url) < urls.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return NextResponse.json({ processed, total: urls.length, results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
