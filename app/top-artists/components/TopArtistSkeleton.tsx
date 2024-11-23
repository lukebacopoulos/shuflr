import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export function ListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Add Skeleton Items */}
      {[...Array(4)].map((_, index) => (
        <Skeleton key={index} className="h-10 md:h-28 w-full rounded-lg" />
      ))}
    </div>
  );
}

export default function TopArtistSkeleton() {
  return (
    <div className="w-4/5 md:w-1/2 xl:w-1/3">
      <Tabs defaultValue="short_term">
        <TabsList className="w-full">
          <TabsTrigger value="short_term" className="w-1/3">
            1 Month
          </TabsTrigger>
          <TabsTrigger value="medium_term" className="w-1/3">
            6 Months
          </TabsTrigger>
          <TabsTrigger value="long_term" className="w-1/3">
            12 Months
          </TabsTrigger>
        </TabsList>
        <TabsContent value="short_term" className="w-full">
          <ListSkeleton />
        </TabsContent>
        <TabsContent value="medium_term" className="w-full">
          <ListSkeleton />
        </TabsContent>
        <TabsContent value="long_term" className="w-full">
          <ListSkeleton />
        </TabsContent>
      </Tabs>
    </div>
  );
}
