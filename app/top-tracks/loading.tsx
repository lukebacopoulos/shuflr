import TopArtistSkeleton from "../top-artists/components/TopArtistSkeleton";

export default function Loading() {
  return (
    <div className="mt-20 flex h-screen flex-col items-center">
      <h1 className="pb-4 text-4xl">Your Top Tracks.</h1>
      <TopArtistSkeleton />
    </div>
  );
}
