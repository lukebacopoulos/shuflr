import TopArtistView from "./components/TopArtistView";
import getTopItems from "../../../lib/getTopItem";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Top() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <h1>You need to be signed in to view this page</h1>;
  }

  const { accessToken } = session;
  const topItems = await getTopItems(accessToken, "artists");
  return (
    <div className="h-[90vh] flex justify-center items-center">
      <TopArtistView items={topItems} />
    </div>
  );
}
