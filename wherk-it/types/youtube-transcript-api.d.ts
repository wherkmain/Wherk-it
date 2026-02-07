declare module 'youtube-transcript-api' {
  export interface TranscriptSegment {
    text: string;
    duration: number;
    offset: number;
  }

  export class YoutubeTranscriptApi {
    static fetchTranscript(videoId: string): Promise<TranscriptSegment[]>;
  }
}
