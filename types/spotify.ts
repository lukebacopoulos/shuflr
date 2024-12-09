export interface SpotifyTrack {
  id: string;
  name: string;
  uri: string;
  external_urls?: {
    spotify?: string;
  };
  album?: {
    images?: {
      url?: string;
    }[];
  };
  artists: {
    id: string;
    name: string;
    external_urls?: {
      spotify?: string;
    };
  }[];
}
