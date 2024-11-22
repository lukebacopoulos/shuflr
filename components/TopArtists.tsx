"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Artist {
  id: string;
  name: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  genres: string[];
  popularity: number;
}

interface TopArtistsProps {
  artists: Artist[];
}

export default function TopArtists({ artists }: TopArtistsProps) {
  if (!artists || artists.length === 0) {
    return (
      <div className="text-gray-500 text-center p-4">No artists available.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {artists.map((artist) => (
        <Card
          key={artist.id}
          className="overflow-hidden hover:shadow-lg transition-shadow"
        >
          <CardHeader>
            <div className="w-full aspect-square overflow-hidden rounded-t-lg">
              <img
                src={artist.images[0]?.url || "/api/placeholder/300/300"}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardTitle className="mt-4">{artist.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">
              {artist.genres.slice(0, 3).join(", ")}
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${artist.popularity}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Popularity: {artist.popularity}%
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
