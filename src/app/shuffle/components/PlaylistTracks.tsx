"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import shufflePlaylist from "../../../../lib/shufflePlaylist";
import { Shuffle } from "lucide-react";
import pushToQueue from "@/app/actions/pushToQueue";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import { ArrowBigRightDash } from "lucide-react";
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
  token: string; // Accept the token as a prop
};

export default function PlaylistTracks({ playlist, token }: PlaylistProps) {
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

  const handlePushQueue = async () => {
    try {
      // Push each track to the queue using the provided token
      for (const track of shuffledTracks) {
        await pushToQueue(token, track.trackId); // Push each track to the queue
      }
      console.log("Tracks successfully added to the queue.");
    } catch (error) {
      console.error("Error adding tracks to the queue:", error);
    }
  };

  if (!playlist || !playlist.tracks || playlist.tracks.length === 0) {
    return <p>No tracks available in this playlist.</p>;
  }

  return (
    <div key={refreshKey}>
      <div className="flex items-center w-3/4 justify-between">
        <Link href="/shuffle" className="text-white px-4">
          <Undo2 />
        </Link>
        <button
          onClick={reshuffleTracks}
          className="m-4 p-4 text-white rounded-lg"
        >
          <Shuffle />
        </button>
        <button
          className="m-4 p-4 bg-green-600 hover:bg-green-500 text-white rounded-lg"
          onClick={handlePushQueue}
        >
          <ArrowBigRightDash />{" "}
        </button>
      </div>
      <ScrollArea className="h-3/4 w-3/4 rounded-lg bg-zinc-900 text-white p-4">
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
