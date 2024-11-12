import getUserPlaylists from "../../../lib/getUserPlaylists";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UserPlaylistView from "./components/UserPlaylistView";

export default async function ShufflePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="bg-black h-screen text-white flex items-center justify-center">
        <h1>You need to be signed in to view this page</h1>
      </div>
    );
  }

  const { accessToken } = session;
  const userPlaylists = await getUserPlaylists(accessToken);

  return (
    <div className="h-screen flex justify-center items-center bg-black text-white">
      <UserPlaylistView items={userPlaylists} />
    </div>
  );
}
