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
    <div className="flex items-center justify-center">
      <ScrollArea className="h-[500px] w-full md:h-[700px]">
        <Table className="">
          <TableBody>
            {artists.map((artist, index) => (
              <TableRow key={artist.id}>
                <TableCell className="font-large text-center md:text-lg">
                  {index + 1}.
                </TableCell>
                <TableCell className="w-1/6 md:w-1/4 lg:w-1/5 xl:w-1/6">
                  {artist.images.length > 0 ? (
                    <Link
                      href={artist.external_urls.spotify}
                      className="text-lg hover:text-blue-500 hover:underline md:text-xl"
                      target="_blank"
                    >
                      <img
                        src={artist.images[0].url} // Use the first image URL
                        alt={`${artist.name}'s image`}
                        className="h-8 w-8 rounded-md md:h-20 md:w-20"
                      />
                    </Link>
                  ) : null}
                </TableCell>
                <TableCell>
                  <Link
                    href={artist.external_urls.spotify}
                    className="text-md hover:text-blue-500 hover:underline md:text-xl"
                    target="_blank"
                  >
                    {artist.name}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
