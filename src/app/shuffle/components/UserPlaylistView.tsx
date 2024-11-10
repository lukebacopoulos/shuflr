"use client";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPlaylistTracks } from "@/app/actions/getPlaylistTracks";
import Image from "next/image";

type Track = {
  trackId: string;
  trackName: string;
  artistName: string;
};

type SelectedPlaylist = {
  tracks: Track[];
  trackCount: number;
};

export default function UserPlaylistView({ items, token }) {
  const [selectedPlaylist, setSelectedPlaylist] =
    useState<SelectedPlaylist | null>(null);
  const handlePlaylistClick = async (playlistId) => {
    const { tracks, trackCount } = await getPlaylistTracks(token, playlistId);
    setSelectedPlaylist({ tracks, trackCount });
  };

  if (!Array.isArray(items) || items.length === 0) {
    return <p>No playlists found.</p>;
  }

  return (
    <>
      {selectedPlaylist ? (
        <div>
          <h2>Tracks in Playlist: ({selectedPlaylist.trackCount})</h2>
        </div>
      ) : (
        <ScrollArea className="h-3/4 w-1/4 rounded-lg bg-zinc-900 text-white">
          <ul>
            {items.map((playlistInfo, index) => (
              <li
                key={playlistInfo[1]} // Use playlist ID as the key
                className="bg-zinc-800 hover:bg-zinc-700 flex items-center justify-between px-2 cursor-pointer"
                onClick={() => handlePlaylistClick(playlistInfo[1])}
              >
                <span className="mx-10 flex items-center">
                  {playlistInfo[0]}
                </span>
                <Image
                  src={playlistInfo[2] || "/default-artist-image.png"}
                  alt={playlistInfo[0]}
                  width={100}
                  height={100}
                  className="m-2 rounded-lg"
                />
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </>
  );
}
