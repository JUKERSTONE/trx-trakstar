export interface RegistrationState {
  username: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export interface SpotifyAuthState {
  access_token: string | null;
  access_token_expiry: string | null;
  refresh_token: any;
  spotifyID: string;
  spotifyEmail: string;
  product: string;
  playlists?: any;
  top_tracks?: any;
  top_artists?: any;
  recently_played?: any;
}
