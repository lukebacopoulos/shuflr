import getTopItems from "../../../../lib/getTopItem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import TopItemTabs from "../components/TopArtistTabs";

export default async function TopTracks() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="bg-black h-screen text-white flex justify-center items-center">
        <h1>You need to be signed in to view this page</h1>
      </div>
    );
  }

  const { accessToken } = session;
  const [topArtistLong, topArtistMed, topArtistShort] = await Promise.all([
    getTopItems(accessToken, "tracks", "long_term"),
    getTopItems(accessToken, "tracks", "medium_term"),
    getTopItems(accessToken, "tracks", "short_term"),
  ]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-4xl p-4">Your Top Tracks.</h1>
      <TopItemTabs
        topArtistShort={topArtistShort}
        topArtistMed={topArtistMed}
        topArtistLong={topArtistLong}
      />
    </div>
  );
}
