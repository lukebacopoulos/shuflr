import { getTopItems } from "@/lib/get-top-items";
import TracksList from "./components/TracksList";

export default async function TopTracksPage() {
  let artists;

  try {
    const data = await getTopItems("tracks", "medium_term");
    artists = data.items || [];
  } catch (error) {
    console.error("Error fetching artists:", error);
    // Optionally, handle error UI or logging here
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Your Top Tracks</h1>
      <TracksList artists={artists} />
    </div>
  );
}
