"use client";
export default function TopArtistView({ items }) {
  // Check if items is an array and has at least one element
  if (!Array.isArray(items) || items.length === 0) {
    return <p>No top artists found.</p>;
  }

  return (
    <>
      <h1>Top Artists:</h1>
      <ol>
        {items.map((artistInfo) => (
          <li key={artistInfo[0]}>
            {" "}
            <img
              src={artistInfo[1] || "/default-artist-image.png"}
              alt={artistInfo[0]}
              width={30}
              height={30}
              className="rounded-full"
            />
            <span>{artistInfo[0]}</span>
          </li>
        ))}
      </ol>
    </>
  );
}
