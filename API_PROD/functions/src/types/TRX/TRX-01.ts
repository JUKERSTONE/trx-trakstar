export interface TRX_01 {
  id: string;
  title: string;
  bots: {
    artist: string;
    featuring: string[];
  };
  audioUrl: string;
  coverArtUrl: string;
  description?: string;
  lyrics?: string;
  playlistIds?: string[];
}
