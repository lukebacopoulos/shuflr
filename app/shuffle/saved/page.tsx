import shuffleTracks from "@/lib/shuffle-tracks";
import ShuffleTrackList from "../components/ShuffleTracksList";
import type { Metadata } from "next";
import { getLikedTracks } from "@/lib/get-liked-tracks";

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

interface LikedTracksData {
  items: {
    track: Track;
  }[];
}

export default async function Page() {
  try {
    const data: LikedTracksData = await getLikedTracks();
    const tracks = data.items.map((item) => item.track);
    const shuffledTracks = shuffleTracks(tracks);

    return (
      <>
        <div className="mb-20 mt-20 flex w-full flex-col items-center justify-center rounded-lg">
          <strong className="mb-2 px-4">
            Note: Currently, adding items to queue will not work unless you are
            actively playing music on Spotify.
          </strong>
          <strong className="mb-2 px-4">
            A Spotify premium membership is required for queue functionality.
          </strong>
          <p>
            Right now, only the latest 100 liked songs are accessible. Accessing
            full saved playlist in progress
          </p>
          <p className="mb-6 px-4">
            Error handling for these issues in progress.
          </p>

          <ShuffleTrackList tracks={shuffledTracks} />
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching liked tracks:", error);
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-lg">
          Failed to load liked tracks. Please try again later.
        </p>
      </div>
    );
  }
}
