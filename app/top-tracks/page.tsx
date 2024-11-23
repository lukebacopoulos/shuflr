import { getTopItems } from "@/lib/get-top-items";
import TrackTabs from "./components/TracksTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shuflr | Your Top Tracks.",
  description: "Your top Tracks.",
};

export default async function TopTracksPage() {
  let tracks_long, track_medium, track_short;

  try {
    const data_long = await getTopItems("tracks", "long_term");
    tracks_long = data_long.items || [];

    const data_medium = await getTopItems("tracks", "medium_term");
    track_medium = data_medium.items || [];

    const data_short = await getTopItems("tracks", "short_term");
    track_short = data_short.items || [];
  } catch (error) {
    console.error("Error fetching artists:", error);
    // Optionally, handle error UI or logging here
  }

  return (
    <div className="flex flex-col mt-10 items-center h-screen">
      <h1 className="text-4xl pb-4">Your Top Tracks.</h1>
      <TrackTabs
        tracks_short={track_short}
        tracks_medium={track_medium}
        tracks_long={tracks_long}
      />
    </div>
  );
}
