"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

export default function TopTracksView({ items }) {
  // Check if items is an array and has at least one element
  if (!Array.isArray(items) || items.length === 0) {
    return <p>No top tracks found.</p>;
  }

  return (
    <div className="h-1/2">
      <ScrollArea className="h-full rounded-lg bg-zinc-900 text-white p-4">
        <ol className="list-decimal space-y-4">
          {items.map((trackInfo, index) => (
            <li
              key={trackInfo.id}
              className="bg-zinc-800 hover:bg-zinc-700 flex items-center justify-between px-4 py-2 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <span>{index + 1}. </span>
                <div>
                  <p className="font-semibold">{trackInfo.title}</p>
                  <p className="text-sm text-gray-300">
                    {trackInfo.artists.join(", ")}
                  </p>
                </div>
              </div>
              <Image
                src={trackInfo.image || "/default-artist-image.png"}
                alt={trackInfo.title}
                width={50}
                height={50}
                className="rounded-lg"
              />
            </li>
          ))}
        </ol>
      </ScrollArea>
    </div>
  );
}
