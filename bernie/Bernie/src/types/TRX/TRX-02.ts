export interface TRX_02 {
  id: string;
  title: string;
  artists: {
    artist: string;
    featuring: string[];
  };
  audioUrl: string;
  coverArtUrl: string;
  description?: string;
  lyrics?: string;
  playlistIds?: string[];
}
