"use client";

interface Artist {
  name: string;
}

interface ArtistListProps {
  artists: Artist[];
}

export default function ArtistList({ artists }: ArtistListProps) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Top Artists</h1>
      <ol className="list-decimal pl-5">
        {artists.map((artist, index) => (
          <li key={index}>{artist.name}</li>
        ))}
      </ol>
    </div>
  );
}
