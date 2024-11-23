import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtistList from "./ArtistList";

interface Artist {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
  images: {
    url: string;
    height: number;
    width: number;
  }[];
}

interface ArtistTabsProps {
  artists_short: Artist[];
  artists_medium: Artist[];
  artists_long: Artist[];
}

export default function ArtistTabs({
  artists_short,
  artists_medium,
  artists_long,
}: ArtistTabsProps) {
  return (
    <Tabs defaultValue="short_term" className="">
      <TabsList>
        <TabsTrigger value="short_term">1 Month</TabsTrigger>
        <TabsTrigger value="medium_term">6 Months</TabsTrigger>
        <TabsTrigger value="long_term">12 Months</TabsTrigger>
      </TabsList>
      <TabsContent value="short_term" className="w-full">
        <ArtistList artists={artists_short} />
      </TabsContent>
      <TabsContent value="medium_term" className="w-full">
        <ArtistList artists={artists_medium} />
      </TabsContent>
      <TabsContent value="long_term" className="w-full">
        <ArtistList artists={artists_long} />
      </TabsContent>
    </Tabs>
  );
}
