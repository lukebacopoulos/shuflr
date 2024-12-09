"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListEndIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pushToQueue } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import shuffleTracks from "@/lib/shuffle-tracks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Shuffle } from "lucide-react";
import { ArrowBigRight } from "lucide-react";

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

export default function ShuffleTrackList({
  tracks: initialTracks,
}: TrackListProps) {
  const { toast } = useToast();
  const [tracks, setTracks] = useState(initialTracks);
  const router = useRouter();

  const handleShuffle = () => {
    const shuffled = shuffleTracks(initialTracks);
    setTracks(shuffled);
  };

  const handleBulkQueue = async () => {
    try {
      // Queue tracks sequentially to maintain order
      for (const track of tracks) {
        await pushToQueue(track.uri);
      }

      toast({
        title: "Playlist Queued!",
        description: `Added ${tracks.length} tracks to the Spotify queue.`,
        variant: "default",
        duration: 2000,
      });
    } catch (error) {
      console.error("Failed to add tracks to queue:", error);
      toast({
        title: "Queue Failed",
        description:
          "Could not add all tracks to the Spotify queue. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleQueue = async (trackUri: string) => {
    try {
      await pushToQueue(trackUri);
      toast({
        title: "Track Added!",
        description:
          "The track has been successfully added to the Spotify queue.",
        variant: "default",
        duration: 1000,
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

  const navigateBack = () => {
    router.push("/shuffle"); // Navigate to /shuffle
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="mb-8 flex w-full justify-evenly rounded-lg bg-secondary p-4 px-8">
        <Button onClick={navigateBack} className="bg-slate-400">
          <ArrowLeft />
        </Button>
        <Button onClick={handleShuffle} className="bg-slate-400">
          <Shuffle />
        </Button>
        <Button onClick={handleBulkQueue} className="bg-slate-400">
          <ArrowBigRight />
        </Button>
      </div>
      <ScrollArea className="h-[500px] w-full rounded-lg md:h-[700px]">
        <Table className="bg-secondary">
          <TableBody>
            {tracks.map((track, index) => (
              <TableRow key={track.id} className="border-0">
                <TableCell className="font-large pl-4 text-center md:text-lg">
                  {index + 1}.
                </TableCell>
                <TableCell className="w-1/6 md:w-1/4 xl:w-1/3 xl:px-12 2xl:w-1/5">
                  {track?.album.images.length > 0 ? (
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
                    className="mr-4 w-10 bg-slate-400"
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
