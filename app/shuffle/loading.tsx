import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="mt-20 flex h-screen flex-col items-center">
      <h1 className="pb-4 text-4xl">Choose a playlist.</h1>
      <div className="flex flex-col gap-4">
        {/* Add Skeleton Items */}
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="h-10 w-full rounded-lg md:h-28" />
        ))}
      </div>
    </div>
  );
}
