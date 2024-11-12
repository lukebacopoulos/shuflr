"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import shufflePlaylist from "../../../../lib/shufflePlaylist";
import { Shuffle } from "lucide-react";

type Track = {
  trackId: string;
  trackName: string;
  artistName: string;
  imageUrl: string;
};

type PlaylistProps = {
  playlist: {
    tracks: Track[];
    trackCount: number;
  } | null;
};

export default function PlaylistTracks({ playlist }: PlaylistProps) {
  const [shuffledTracks, setShuffledTracks] = useState<Track[]>([]);
  const [refreshKey, setRefreshKey] = useState<number>(0); // Key for forcing re-render

  // Shuffle the tracks when playlist is available
  useEffect(() => {
    if (playlist && playlist.tracks.length > 0) {
      const shuffled = shufflePlaylist(playlist.tracks); // Initial shuffle
      setShuffledTracks(shuffled); // Set the shuffled tracks in state
    }
  }, [playlist]);

  // Function to reshuffle the tracks and force a re-render
  const reshuffleTracks = () => {
    if (playlist && playlist.tracks.length > 0) {
      const shuffled = shufflePlaylist(playlist.tracks); // Shuffle again
      setShuffledTracks(shuffled); // Update state with reshuffled tracks

      // Force re-mount by updating the refresh key
      setRefreshKey((prevKey) => prevKey + 1); // Increment the key to trigger re-mount
    }
  };

  if (!playlist || !playlist.tracks || playlist.tracks.length === 0) {
    return <p>No tracks available in this playlist.</p>;
  }

  return (
    <div key={refreshKey}>
      <button
        onClick={reshuffleTracks}
        className="my-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        <Shuffle />
      </button>
      <ScrollArea className="h-3/4 w-3/4 rounded-lg bg-zinc-900 text-white p-4">
        <h2>Tracks in Playlist: ({playlist.trackCount})</h2>
        <ul>
          {shuffledTracks.map((track) => (
            <li key={track.trackId} className="flex items-center mb-4">
              <Image
                src={track.imageUrl}
                alt={track.trackName}
                width={50}
                height={50}
                className="mr-4 rounded-lg"
              />
              <div>
                <p className="font-bold">{track.trackName}</p>
                <p className="text-sm text-gray-400">{track.artistName}</p>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
