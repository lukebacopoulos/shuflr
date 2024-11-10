import TopArtistView from "../components/TopArtistView";
import getTopItems from "../../../../lib/getTopItem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

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
    <div className="h-screen w-full flex bg-black text-white">
      <h1 className="text-4xl p-4">Your Top Tracks.</h1>

      <div className="flex flex-col items-center justify-center w-full">
        {" "}
        <h1 className="text-2xl">Last Month</h1>
        <br />
        <TopArtistView items={topArtistShort} />
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        {" "}
        <h1 className="text-2xl">Last 6 Months</h1>
        <br />
        <TopArtistView items={topArtistMed} />
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        {" "}
        <h1 className="text-2xl">Last Year</h1>
        <br />
        <TopArtistView items={topArtistLong} />
      </div>
    </div>
  );
}
