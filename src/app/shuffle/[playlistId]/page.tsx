import { getPlaylistTracks } from "@/app/actions/getPlaylistTracks";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PlaylistTracks from "../components/PlaylistTracks";
import getLikedTracks from "../../../../lib/getLikedTracks";

export default async function shufflePlaylistPage({ params }) {
  const { playlistId } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="bg-black h-screen text-white flex items-center justify-center">
        <h1>You need to be signed in to view this page</h1>
      </div>
    );
  }
  const { accessToken } = session;
  let tracks;

  if (playlistId === "liked") {
    tracks = await getLikedTracks(accessToken);
  } else {
    tracks = await getPlaylistTracks(accessToken, playlistId);
  }
  return (
    <>
      {" "}
      <div className="h-screen w-full bg-black text-white flex justify-center pt-20">
        <PlaylistTracks playlist={tracks} token={accessToken}></PlaylistTracks>
      </div>
    </>
  );
}
