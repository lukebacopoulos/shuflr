"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface ArtistListProps {
  artists: Artist[];
}

export default function ArtistList({ artists }: ArtistListProps) {
  return (
    <div className="flex justify-center items-center">
      <ScrollArea className="h-[500px]">
        <Table className="">
          <TableBody>
            {artists.map((artist, index) => (
              <TableRow key={artist.id}>
                <TableCell className="w-8 text-center font-medium">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <Link
                    href={artist.external_urls.spotify}
                    className="hover:text-blue-500 hover:underline"
                    target="_blank"
                  >
                    {artist.name}
                  </Link>
                </TableCell>
                <TableCell className="h-auto">
                  {artist.images.length > 0 ? (
                    <img
                      src={artist.images[0].url} // Use the first image URL
                      alt={`${artist.name}'s image`}
                      className="w-12 h-12 object-cover rounded-full"
                    />
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
