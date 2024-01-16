export interface Trak {
  trak: {
    artist: string;
    title: string;
    thumbnail: string;
    apple_music: {
      id?: string;
    };
    genius: {
      id?: string;
    };
    soundcloud: {
      url?: string;
    };
    spotify: {
      id?: string;
    };
  };
  meta: {
    genius_url: string;
    release_date: string;
    description: any;
    custom_performances: {
      label: string;
      artists: {
        api_path: string;
        header_image_url: string;
        id: number;
        image_url: string;
        is_meme_verified: boolean;
        is_verified: boolean;
        name: string;
        url: string;
      }[];
    }[];
    recording_location?: string;
    writer_artists: {
      api_path: string;
      header_image_url: string;
      id: number;
      image_url: string;
      is_meme_verified: boolean;
      is_verified: boolean;
      name: string;
      url: string;
    }[];
    featured_artists: {
      api_path: string;
      header_image_url: string;
      id: number;
      image_url: string;
      is_meme_verified: boolean;
      is_verified: boolean;
      name: string;
      url: string;
    }[];
    producer_artists: {
      api_path: string;
      header_image_url: string;
      id: number;
      image_url: string;
      is_meme_verified: boolean;
      is_verified: boolean;
      name: string;
      url: string;
    }[];
    song_relationships: {
      relationship_type: string;
      type: string;
      songs: string[];
    }[];
  };
  missingProviders: (
    | 'spotify'
    | 'genius'
    | 'apple_music'
    | 'youtube'
    | 'soundcloud'
  )[];
  comments: any[];
  likes: any[];
  isrc?: string;
}
