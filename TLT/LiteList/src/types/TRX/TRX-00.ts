export interface TRX_00 {
  artist: string;
  title: string;
  serialized_trak?: string;
  serializedTrak?: string;
  isrc: string;
  audioFeatures: {
    acousticness: number;
    danceability: number;
    energy: number;
    instrumentalness: number;
    liveness: number;
    loudness: number;
    mode: number;
    speechiness: number;
    tempo: number;
    time_signature: number;
    valence: number;
  };
  genres: string[];
}
