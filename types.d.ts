type SpotifyArtist = {
    id: string;
    name: string;
    images?: { url: string }[];
  };
  
  type SpotifyTrack = {
    id: string;
    name: string;
    album: {
      images: { url: string }[];
    };
    artists: { name: string; id: string }[];
  };
  
  type SpotifyTopItem = SpotifyArtist | SpotifyTrack;
  