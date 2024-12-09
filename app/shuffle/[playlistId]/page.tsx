import { getPlaylistTracks } from "@/lib/get-playlist-tracks";
import shuffleTracks from "@/lib/shuffle-tracks";
import ShuffleTrackList from "../components/ShuffleTracksList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shuflr | True Shuffle.",
  description: "Shuffle with randomness.",
};

interface Artist {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
}

interface Album {
  images: { url: string }[];
}

interface Track {
  id: string;
  name: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
  album: Album;
  artists: Artist[];
}

interface PlaylistTrackData {
  items: {
    track: Track;
  }[];
}

export default async function Page({
  params,
}: {
  params: { playlistId: string };
}) {
  const { playlistId } = params;

  // Ensure playlistId is a string and not undefined
  if (!playlistId || Array.isArray(playlistId)) {
    return null;
  }

  const data: PlaylistTrackData = await getPlaylistTracks(playlistId);
  const tracks = data.items.map((item) => item.track);
  const shuffledTracks = shuffleTracks(tracks);

  return (
    <>
      <div className="mb-20 mt-20 flex w-full flex-col items-center justify-center rounded-lg">
        <strong className="mb-6 px-4">
          Note: Currently, adding items to queue will not work unless you are
          actively playing music on Spotify.
        </strong>
        <ShuffleTrackList tracks={shuffledTracks} />
      </div>
    </>
  );
}
