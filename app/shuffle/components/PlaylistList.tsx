"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

// Extremely defensive type definition
interface Playlist {
  id?: string;
  name?: string;
  external_urls?: {
    spotify?: string;
  };
  images?: Array<{
    url?: string;
    height?: number | null;
    width?: number | null;
  }>;
}

interface PlaylistListProps {
  playlists: Playlist[];
}

export default function PlaylistList({ playlists }: PlaylistListProps) {
  // Log the playlists to see their exact structure
  console.log("Playlists received:", JSON.stringify(playlists, null, 2));

  return (
    <div className="flex items-center justify-center">
      <ScrollArea className="h-[500px] w-full rounded-lg bg-secondary md:h-[700px]">
        <Table>
          <TableBody>
            {playlists
              .filter((playlist) => playlist && playlist.name)
              .map((playlist, index) => {
                // Extremely defensive property access
                const safeId = playlist?.id || `playlist-${index}`;
                const safeName = playlist?.name || "Unnamed Playlist";
                const safeSpotifyUrl = playlist?.external_urls?.spotify || "#";
                const safeImageUrl = playlist?.images?.[0]?.url;

                return (
                  <TableRow key={safeId} className="border-0">
                    <TableCell className="font-large text-center md:text-lg">
                      {index + 1}.
                    </TableCell>
                    <TableCell className="w-1/6 md:w-1/4 lg:w-1/5 xl:w-1/6">
                      {safeImageUrl ? (
                        <Link
                          href={safeSpotifyUrl}
                          className="text-lg hover:text-blue-500 hover:underline md:text-xl"
                          target="_blank"
                        >
                          <img
                            src={safeImageUrl}
                            alt={`${safeName}'s image`}
                            className="h-8 w-8 rounded-md object-cover md:h-20 md:w-20"
                          />
                        </Link>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-200 text-xs md:h-20 md:w-20">
                          No Image
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/shuffle/${playlist.id}`}
                        className="text-md hover:text-blue-500 hover:underline md:text-xl"
                      >
                        {safeName}
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
