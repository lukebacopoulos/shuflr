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
    <div className="w-4/5 md:w-1/2">
      {" "}
      <Tabs defaultValue="short_term" className="">
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
          <ArtistList artists={artists_short} />
        </TabsContent>
        <TabsContent value="medium_term" className="w-full">
          <ArtistList artists={artists_medium} />
        </TabsContent>
        <TabsContent value="long_term" className="w-full">
          <ArtistList artists={artists_long} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
