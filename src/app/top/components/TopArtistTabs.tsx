"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopArtistView from "./TopArtistView";

export default function TopItemTabs({
  topArtistShort,
  topArtistMed,
  topArtistLong,
}) {
  return (
    <div className="flex justify-center w-4/5 h-full ">
      <Tabs defaultValue="1 Month" className="h-1/2 w-1/2 ">
        <TabsList className="w-full bg-zinc-900 text-white">
          <TabsTrigger className="w-full" value="1 Month">
            1 Month
          </TabsTrigger>
          <TabsTrigger className="w-full" value="6 Months">
            6 Months
          </TabsTrigger>
          <TabsTrigger className="w-full" value="12 Months">
            12 Months
          </TabsTrigger>
        </TabsList>

        <TabsContent className="" value="1 Month">
          <TopArtistView items={topArtistShort} />
        </TabsContent>
        <TabsContent value="6 Months">
          <TopArtistView items={topArtistMed} />
        </TabsContent>
        <TabsContent value="12 Months">
          <TopArtistView items={topArtistLong} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
