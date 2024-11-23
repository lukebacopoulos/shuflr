import TopArtistSkeleton from "./components/TopArtistSkeleton";

export default function Loading() {
  return (
    <div className="flex flex-col mt-10 items-center h-screen">
      <h1 className="text-4xl pb-4">Your Top Artitsts.</h1>
      <TopArtistSkeleton />
    </div>
  );
}
