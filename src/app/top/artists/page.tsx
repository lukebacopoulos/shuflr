import TopArtistView from "../components/TopArtistView";
import getTopItems from "../../../../lib/getTopItem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function TopArtists() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="bg-black h-screen text-white">
        <h1>You need to be signed in to view this page</h1>
      </div>
    );
  }

  const { accessToken } = session;
  const [topArtistLong, topArtistMed, topArtistShort] = await Promise.all([
    getTopItems(accessToken, "artists", "long_term"),
    getTopItems(accessToken, "artists", "medium_term"),
    getTopItems(accessToken, "artists", "short_term"),
  ]);

  return (
    <div className="h-screen w-full flex bg-black text-white">
      <div className="flex flex-col items-center w-full">
        {" "}
        <h1>Last Month:</h1>
        <TopArtistView items={topArtistShort} />
      </div>
      <div className="flex flex-col items-center w-full">
        {" "}
        <h1>Last 6 Months:</h1>
        <TopArtistView items={topArtistMed} />
      </div>
      <div className="flex flex-col items-center w-full">
        {" "}
        <h1>Last Year:</h1>
        <TopArtistView items={topArtistLong} />
      </div>
    </div>
  );
}
