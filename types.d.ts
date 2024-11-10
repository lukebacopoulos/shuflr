import NextAuth from "next-auth";
import { Session as NextAuthSession } from 'next-auth'

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
  
declare module 'next-auth' {
  interface Session extends NextAuthSession {
    accessToken?: string;
  }
  interface JWT {
    accessToken?: string;
  }
}
