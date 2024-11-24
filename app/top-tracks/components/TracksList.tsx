"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListEndIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pushToQueue } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

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

interface TrackListProps {
  tracks: Track[];
}

export default function TrackList({ tracks }: TrackListProps) {
  const { toast } = useToast();

  const handleQueue = async (trackUri: string) => {
    try {
      await pushToQueue(trackUri);
      toast({
        title: "Track Added!",
        description:
          "The track has been successfully added to the Spotify queue.",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to add track to queue:", error);
      toast({
        title: "Failed to Add Track",
        description:
          "Could not add the track to the Spotify queue. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <ScrollArea className="h-[500px] w-full md:h-[700px]">
        <Table className="">
          <TableBody>
            {tracks.map((track, index) => (
              <TableRow key={track.id}>
                {/* Rank Number */}
                <TableCell className="font-large text-center md:text-lg">
                  {index + 1}.
                </TableCell>
                <TableCell className="w-1/6 md:w-1/4 xl:w-1/3 xl:px-12 2xl:w-1/5">
                  {track.album.images.length > 0 ? (
                    <Link
                      href={track.external_urls.spotify}
                      target="_blank"
                      className="hover:opacity-80"
                    >
                      <img
                        src={track.album.images[0].url}
                        alt={`${track.name} album cover`}
                        className="h-8 w-8 rounded-md md:h-20 md:w-20"
                      />
                    </Link>
                  ) : (
                    "No image available"
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <Link
                      href={track.external_urls.spotify}
                      className="text-md font-semibold hover:text-blue-500 hover:underline md:text-xl"
                      target="_blank"
                    >
                      {track.name}
                    </Link>
                    <div className="md:text-md mt-1 text-sm text-gray-600">
                      {track.artists.map((artist, artistIndex) => (
                        <Link
                          key={artist.id}
                          href={artist.external_urls.spotify}
                          className="hover:text-blue-500 hover:underline"
                          target="_blank"
                        >
                          {artist.name}
                          {artistIndex < track.artists.length - 1 ? ", " : ""}
                        </Link>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleQueue(track.uri)}
                    className="w-10 bg-zinc-300 text-black hover:bg-zinc-700 hover:text-white dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-500"
                  >
                    <ListEndIcon size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
