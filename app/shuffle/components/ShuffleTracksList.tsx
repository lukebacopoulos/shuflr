"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListEndIcon, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { pushToQueue } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import shuffleTracks from "@/lib/shuffle-tracks";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shuffle, ArrowBigRight } from "lucide-react";
import { SpotifyTrack } from "@/types/spotify";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
interface TrackListProps {
  tracks: SpotifyTrack[];
}

interface ToasterToast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}

export default function ShuffleTrackList({
  tracks: initialTracks,
}: TrackListProps) {
  const { toast } = useToast();
  const [tracks, setTracks] = useState<SpotifyTrack[]>(
    initialTracks.filter(Boolean),
  );
  //const [selectedTracks, setSelectedTracks] = useState<Set<string>>(new Set()); // start with empty selection
  const [selectedTracks, setSelectedTracks] = useState<Set<string>>( //start with select all
    new Set(initialTracks.filter(Boolean).map((track) => track.id)),
  );

  const [isQueueing, setIsQueueing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const handleQueueConfirm = async () => {
    await handleQueueSelected(tracks, selectedTracks, { toast }, setIsQueueing);
    setIsDialogOpen(false);
  };

  const handleSelectTrack = (trackId: string) => {
    setSelectedTracks((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(trackId)) {
        newSelected.delete(trackId);
      } else {
        newSelected.add(trackId);
      }
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectedTracks.size === tracks.length) {
      setSelectedTracks(new Set());
    } else {
      setSelectedTracks(new Set(tracks.map((track) => track.id)));
    }
  };

  const handleQueueSelected = async (
    tracks: SpotifyTrack[],
    selectedTracks: Set<string>,
    {
      toast,
    }: {
      toast: (props: {
        title?: string;
        description?: string;
        variant?: "default" | "destructive";
        duration?: number;
      }) => {
        id: string;
        dismiss: () => void;
        update: (props: ToasterToast) => void;
      };
    },
    setIsQueueing: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    try {
      setIsQueueing(true);
      const tracksToQueue = tracks.filter((track) =>
        selectedTracks.has(track.id),
      );

      for (const track of tracksToQueue) {
        try {
          await pushToQueue(track.uri);
        } catch (error) {
          // Convert error to string and check for specific error messages
          const errorMessage =
            error instanceof Error ? error.message : String(error);

          if (errorMessage.includes("NO_ACTIVE_DEVICE")) {
            toast({
              title: "No Active Device",
              description:
                "Please open Spotify and start playing something first.",
              variant: "destructive",
              duration: 5000,
            });
            return;
          }

          if (errorMessage.includes("403")) {
            toast({
              title: "Premium Required",
              description:
                "Queueing tracks requires a Spotify Premium subscription.",
              variant: "destructive",
              duration: 5000,
            });
            return;
          }

          // Generic error handling
          toast({
            title: "Queue Failed",
            description: "Could not add tracks to queue. Please try again.",
            variant: "destructive",
            duration: 5000,
          });
          return;
        }
      }

      toast({
        title: "Selected Tracks Queued!",
        description: `Added ${tracksToQueue.length} tracks to the Spotify queue.`,
        variant: "default",
        duration: 2000,
      });
    } catch (error) {
      console.error("Failed to add tracks to queue:", error);
    } finally {
      setIsQueueing(false);
      setIsDialogOpen(false);
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
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (errorMessage.includes("NO_ACTIVE_DEVICE")) {
        toast({
          title: "No Active Device",
          description: "Please open Spotify and start playing something first.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      if (errorMessage.includes("403")) {
        toast({
          title: "Premium Required",
          description:
            "Queueing tracks requires a Spotify Premium subscription.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      toast({
        title: "Failed to Add Track",
        description: "Could not add the track to queue. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleRemoveSelected = () => {
    const remainingTracks = tracks.filter(
      (track) => !selectedTracks.has(track.id),
    );
    setTracks(remainingTracks);
    setSelectedTracks(new Set()); // Clear selections after removal

    toast({
      title: "Tracks Removed",
      description: `Removed ${tracks.length - remainingTracks.length} tracks from the list.`,
      variant: "default",
      duration: 1000,
    });
  };

  const handleShuffle = () => {
    // Filter out any null tracks before shuffling
    const validTracks = initialTracks.filter(Boolean);
    const shuffled = shuffleTracks(validTracks);
    setTracks(shuffled);
  };

  const navigateBack = () => {
    router.push("/shuffle");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="mb-8 flex w-4/5 justify-evenly rounded-lg bg-secondary p-4 px-8">
        <TooltipProvider delayDuration={25}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={navigateBack} className="bg-foreground">
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="mb-2">
              <p className="">Back to Playlist Select</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={handleShuffle} className="bg-foreground">
                <Shuffle />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="mb-2">
              <p className="">Re-shuffle playlist</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleRemoveSelected}
                className="bg-foreground"
                disabled={selectedTracks.size === 0}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="mb-2">
              <p className="">Remove selected tracks</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <Button
                    className="bg-foreground"
                    disabled={selectedTracks.size === 0 || isQueueing}
                  >
                    {isQueueing ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <ArrowBigRight />
                    )}
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <AlertDialogContent className="w-4/5 rounded-lg border-foreground">
                <AlertDialogHeader>
                  <AlertDialogTitle>Queue Selected Tracks</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to queue {selectedTracks.size}{" "}
                    track(s)?{" "}
                    <p>Queuing a large amount of tracks may take some time.</p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-slate-800 hover:bg-foreground hover:text-black md:mr-4">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleQueueConfirm}
                    className="bg-foreground"
                  >
                    {isQueueing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    Queue Tracks
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <TooltipContent className="mb-2">
              <p className="">Add selected tracks to queue</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative h-[500px] w-4/5 overflow-hidden rounded-lg md:h-[700px]">
        <div className="sticky top-0 z-10 w-full bg-secondary">
          <Table className="rounded-t-lg border-0 bg-opacity-50">
            <TableHeader className="rounded-t-lg [&_tr]:border-b-0">
              <TableRow className="border-0">
                <TableCell className="w-12 pl-4">
                  <Checkbox
                    checked={selectedTracks.size === tracks.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell
                  colSpan={4}
                  className="h-[3rem] min-h-[3rem] border-0 font-semibold md:h-[4rem] md:min-h-[4rem] md:text-lg"
                >
                  {selectedTracks.size > 0
                    ? `${selectedTracks.size} Selected`
                    : "Select All"}
                </TableCell>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
        <ScrollArea className="h-[calc(100%-4rem)] w-full">
          <Table className="border-0 bg-secondary">
            <TableBody>
              {tracks.filter(Boolean).map((track, index) => (
                <TableRow key={track.id} className="border-0">
                  <TableCell className="w-12 pl-4">
                    <Checkbox
                      checked={selectedTracks.has(track.id)}
                      onCheckedChange={() => handleSelectTrack(track.id)}
                    />
                  </TableCell>
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
                    <TooltipProvider delayDuration={30}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            onClick={() => track && handleQueue(track.uri)}
                            className="mr-4 w-10 bg-foreground"
                          >
                            <ListEndIcon size={20} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="mb-2">
                          <p>Add single item to queue</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
