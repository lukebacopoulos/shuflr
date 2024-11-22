import { getTopArtists } from "@/lib/get-top-artists";
import ArtistList from "./components/ArtistList";

export default async function TopArtistsPage() {
  let artists;

  try {
    const data = await getTopArtists();
    artists = data.items || [];
  } catch (error) {
    console.error("Error fetching artists:", error);
    // Optionally, handle error UI or logging here
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Your Top Spotify Artists</h1>
      <ArtistList artists={artists} />
    </div>
  );
}
