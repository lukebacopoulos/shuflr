export default function shuffleTracks(tracks: any[]): any[] {
  // Clone the tracks array to avoid mutating the original array
  const shuffledTracks = [...tracks];

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledTracks.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    // Swap the current element with the random element
    [shuffledTracks[i], shuffledTracks[randomIndex]] = [
      shuffledTracks[randomIndex],
      shuffledTracks[i],
    ];
  }

  return shuffledTracks;
}
