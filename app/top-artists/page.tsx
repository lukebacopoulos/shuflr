import { getTopItems } from "@/lib/get-top-items";
import ArtistTabs from "./components/ArtistTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shuflr | Your Top Artists.",
  description: "Your top artists.",
};

export default async function TopArtistsPage() {
  let artists_long, artists_medium, artists_short;

  try {
    const data_long = await getTopItems("artists", "long_term");
    artists_long = data_long.items || [];

    const data_medium = await getTopItems("artists", "medium_term");
    artists_medium = data_medium.items || [];

    const data_short = await getTopItems("artists", "short_term");
    artists_short = data_short.items || [];
  } catch (error) {
    console.error("Error fetching artists:", error);
    // Optionally, handle error UI or logging here
  }

  return (
    <div className="mb-20 mt-20 flex h-screen flex-col items-center">
      <h1 className="pb-4 text-4xl">Your Top Artists.</h1>
      <ArtistTabs
        artists_short={artists_short}
        artists_medium={artists_medium}
        artists_long={artists_long}
      ></ArtistTabs>
    </div>
  );
}
