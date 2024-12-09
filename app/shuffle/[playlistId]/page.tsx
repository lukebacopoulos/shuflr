import { getPlaylistTracks } from "@/lib/get-playlist-tracks";
import shuffleTracks from "@/lib/shuffle-tracks";
import ShuffleTrackList from "../components/ShuffleTracksList";

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

  const data = await getPlaylistTracks(playlistId);
  const tracks = data.items.map((item: any) => item.track);
  let shuffledTracks = shuffleTracks(tracks);

  return (
    <>
      <div className="mb-20 mt-20 flex w-full justify-center rounded-lg">
        <ShuffleTrackList tracks={shuffledTracks} />
      </div>
    </>
  );
}
