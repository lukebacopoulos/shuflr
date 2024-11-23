"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Track {
  id: string;
  name: string;
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
  return (
    <div className="flex justify-center items-center">
      <ScrollArea className="h-[500px] w-full">
        <Table className="">
          <TableBody>
            {tracks.map((track, index) => (
              <TableRow key={track.id}>
                {/* Rank Number */}
                <TableCell className="text-center font-large md:text-lg">
                  {index + 1}.
                </TableCell>

                {/* Track Name and Artists */}
                <TableCell>
                  <div className="flex flex-col">
                    {/* Track Name */}
                    <Link
                      href={track.external_urls.spotify}
                      className="hover:text-blue-500 hover:underline text-md md:text-xl font-semibold"
                      target="_blank"
                    >
                      {track.name}
                    </Link>
                    {/* Artist Names */}
                    <div className="text-sm md:text-md text-gray-600 mt-1">
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

                {/* Album Image */}
                <TableCell className="h-auto flex justify-end">
                  {track.album.images.length > 0 ? (
                    <Link
                      href={track.external_urls.spotify}
                      target="_blank"
                      className="hover:opacity-80"
                    >
                      <img
                        src={track.album.images[0].url}
                        alt={`${track.name} album cover`}
                        className="w-8 h-8 md:w-16 md:h-16 rounded-full"
                      />
                    </Link>
                  ) : (
                    "No image available"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
