"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
export default function TopArtistView({ items }) {
  // Check if items is an array and has at least one element
  if (!Array.isArray(items) || items.length === 0) {
    return <p>No top artists found.</p>;
  }

  return (
    <>
      <ScrollArea className="h-3/4 w-4/5 rounded-lg bg-zinc-900 text-white">
        <ol className="list-decimal">
          {" "}
          {/* Add pl-4 for left padding */}
          {items.map((artistInfo, index) => (
            <li
              key={artistInfo[0]}
              className="bg-zinc-800 hover:bg-zinc-700 flex items-center justify-between px-2"
            >
              <span className="order-first">{index + 1}. </span>{" "}
              {/* Add numbering */}
              <span>{artistInfo[0]}</span>
              <Image
                src={artistInfo[1] || "/default-artist-image.png"}
                alt={artistInfo[0]}
                width={30}
                height={30}
                className="rounded-full m-2"
              />
            </li>
          ))}
        </ol>
      </ScrollArea>
    </>
  );
}
