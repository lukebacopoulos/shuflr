import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrackList from "./TracksList";
interface Track {
  id: string;
  name: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
  album: {
    images: {
      url: string;
    }[];
  };
  artists: {
    id: string;
    name: string;
    external_urls: {
      spotify: string;
    };
  }[];
}

interface TrackTabsProps {
  tracks_short: Track[];
  tracks_medium: Track[];
  tracks_long: Track[];
}

export default function TrackTabs({
  tracks_short,
  tracks_medium,
  tracks_long,
}: TrackTabsProps) {
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
          <TrackList tracks={tracks_short} />
        </TabsContent>
        <TabsContent value="medium_term" className="w-full">
          <TrackList tracks={tracks_medium} />
        </TabsContent>
        <TabsContent value="long_term" className="w-full">
          <TrackList tracks={tracks_long} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
