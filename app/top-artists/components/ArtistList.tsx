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
      <ScrollArea className="h-[700px] w-full">
        <Table className="">
          <TableBody>
            {artists.map((artist, index) => (
              <TableRow key={artist.id}>
                <TableCell className="text-center font-large md:text-lg ">
                  {index + 1}.
                </TableCell>
                <TableCell>
                  <Link
                    href={artist.external_urls.spotify}
                    className="hover:text-blue-500 hover:underline text-lg pl-10 md:text-xl"
                    target="_blank"
                  >
                    {artist.name}
                  </Link>
                </TableCell>
                <TableCell className="h-auto flex justify-end">
                  {artist.images.length > 0 ? (
                    <Link
                      href={artist.external_urls.spotify}
                      className="hover:text-blue-500 hover:underline text-lg pl-10 md:text-xl"
                      target="_blank"
                    >
                      <img
                        src={artist.images[0].url} // Use the first image URL
                        alt={`${artist.name}'s image`}
                        className="w-12 h-12 md:w-20 md:h-20 object-cover rounded-full mr-4"
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
