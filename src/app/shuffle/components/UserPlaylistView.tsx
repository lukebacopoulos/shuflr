"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserPlaylistView({ items }) {
  const router = useRouter();

  const handlePlaylistClick = (playlistId) => {
    router.push(`/shuffle/${playlistId}`);
  };

  if (!Array.isArray(items) || items.length === 0) {
    return <p>No playlists found.</p>;
  }

  return (
    <>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl pb-10">Choose Playlist to Shuffle.</h1>
        <ScrollArea className="h-1/2 w-1/4 rounded-lg bg-zinc-900 text-white">
          <ul>
            {/* Add "Liked Tracks" as the first item */}
            <li
              className="bg-zinc-800 hover:bg-zinc-700 flex items-center justify-between px-2 cursor-pointer"
              onClick={() => handlePlaylistClick("liked")}
            >
              <span className="mx-10 flex items-center my-10">
                Liked Tracks
              </span>
            </li>

            {/* Map through the rest of the playlists */}
            {items.map((playlistInfo) => (
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
      </div>
    </>
  );
}
