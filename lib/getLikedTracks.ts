export default async function getLikedTracks(token: string) {
    const response = await fetch(
        `https://api.spotify.com/v1/me/tracks?limit=50`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!data || !data.items) {
        return { tracks: [], trackCount: 0 };
    }

    const tracks = data.items.map((item) => ({
        trackId: item.track.id,
        trackName: item.track.name,
        artistName: item.track.artists[0].name,
        imageUrl: item.track.album.images[0]?.url || "/default-artist-image.png", // fallback to default image if none
    }));

    const trackCount = data.total || tracks.length;

    return { tracks, trackCount };
}
