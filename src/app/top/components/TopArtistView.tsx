"use client"; // Added for client-side rendering
import { useState, useEffect } from "react";

export default function TopArtistView({ items }) {
  const [artistList, setArtistList] = useState([]); // State for artist names

  useEffect(() => {
    setArtistList(items); // Update state with received items
  }, [items]); // Dependency array includes items

  // Check if artistList is empty (assuming initial state is empty)
  if (artistList.length === 0) {
    return <p>No top artists found.</p>;
  }

  return (
    <>
      <h1>Top Artists:</h1>
      <ol className="text-white">
        {artistList.map((artist, index) => (
          <li key={index}>
            {index}. {artist}
          </li>
        ))}
      </ol>
    </>
  );
}
