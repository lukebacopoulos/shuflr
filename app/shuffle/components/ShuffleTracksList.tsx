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
import { ArrowLeft, Shuffle, ArrowBigRight } from "lucide-react";
import { SpotifyTrack } from "@/types/spotify";

interface TrackListProps {
  tracks: SpotifyTrack[];
}

export default function ShuffleTrackList({
  tracks: initialTracks,
}: TrackListProps) {
  const { toast } = useToast();
  const [tracks, setTracks] = useState<SpotifyTrack[]>(
    initialTracks.filter(Boolean),
  );
  const router = useRouter();

  // Helper functions with null checks
  const getSpotifyUrl = (track: SpotifyTrack | null) => {
    if (!track) return "#";
    return (
      track.external_urls?.spotify ||
      `https://open.spotify.com/track/${track.id}`
    );
  };

  const getAlbumImageUrl = (track: SpotifyTrack | null) => {
    if (!track) return "/api/placeholder/80/80";
    return track.album?.images?.[0]?.url || "/api/placeholder/80/80";
  };

  const handleShuffle = () => {
    // Filter out any null tracks before shuffling
    const validTracks = initialTracks.filter(Boolean);
    const shuffled = shuffleTracks(validTracks);
    setTracks(shuffled);
  };

  const handleBulkQueue = async () => {
    try {
      // Filter out any null tracks before queueing
      const validTracks = tracks.filter(Boolean);
      for (const track of validTracks) {
        await pushToQueue(track.uri);
      }

      toast({
        title: "Playlist Queued!",
        description: `Added ${validTracks.length} tracks to the Spotify queue.`,
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
    router.push("/shuffle");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="mb-8 flex w-full justify-evenly rounded-lg bg-secondary p-4 px-8">
        <Button onClick={navigateBack} className="bg-foreground">
          <ArrowLeft />
        </Button>
        <Button onClick={handleShuffle} className="bg-foreground">
          <Shuffle />
        </Button>
        <Button onClick={handleBulkQueue} className="bg-foreground">
          <ArrowBigRight />
        </Button>
      </div>
      <ScrollArea className="h-[500px] w-full rounded-lg md:h-[700px]">
        <Table className="bg-secondary">
          <TableBody>
            {tracks.filter(Boolean).map((track, index) => (
              <TableRow key={track.id} className="border-0">
                <TableCell className="font-large pl-4 text-center md:text-lg">
                  {index + 1}.
                </TableCell>
                <TableCell className="w-1/6 md:w-1/4 xl:w-1/3 xl:px-12 2xl:w-1/5">
                  <Link
                    href={getSpotifyUrl(track)}
                    target="_blank"
                    className="hover:opacity-80"
                  >
                    <img
                      src={getAlbumImageUrl(track)}
                      alt={`${track.name} album cover`}
                      className="h-8 w-8 rounded-md md:h-20 md:w-20"
                    />
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <Link
                      href={getSpotifyUrl(track)}
                      className="text-md font-semibold hover:text-blue-500 hover:underline md:text-xl"
                      target="_blank"
                    >
                      {track?.name || "Unknown Track"}
                    </Link>
                    <div className="md:text-md mt-1 text-sm text-gray-600">
                      {track?.artists?.map((artist, artistIndex) => (
                        <Link
                          key={artist.id}
                          href={
                            artist.external_urls?.spotify ||
                            `https://open.spotify.com/artist/${artist.id}`
                          }
                          className="hover:text-blue-500 hover:underline"
                          target="_blank"
                        >
                          {artist.name}
                          {artistIndex < (track?.artists?.length || 0) - 1
                            ? ", "
                            : ""}
                        </Link>
                      )) || "Unknown Artist"}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => track && handleQueue(track.uri)}
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
