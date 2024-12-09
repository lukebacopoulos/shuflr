import { getUserPlaylists } from "@/lib/get-user-playlists";
import type { Metadata } from "next";
import PlaylistList from "./components/PlaylistList";
export const metadata: Metadata = {
  title: "Shuflr | True Shuffle.",
  description: "Shuffle with randomness.",
};

export default async function ShufflePage() {
  let playlists;
  try {
    const data = await getUserPlaylists();
    playlists = data.items || [];
  } catch (error) {
    console.error("Error fetching playlists:", error);
    playlists = [];
  }

  return (
    <>
      <div className="mb-20 mt-20 flex h-screen flex-col items-center">
        <h1 className="pb-10 text-4xl">Choose a playlist.</h1>
        <PlaylistList playlists={playlists} />
      </div>
    </>
  );
}
