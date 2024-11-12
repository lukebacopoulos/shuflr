"use server";

export async function getPlaylistTracks(token: string, playlistId: string) {
    if (!playlistId || typeof playlistId !== "string") {
        console.error("Invalid playlistId:", playlistId);
        return { tracks: [], trackCount: 0 };
    }

    const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (data.error) {
        console.error("Spotify API Error:", data.error);
        return { tracks: [], trackCount: 0 };
    }

    if (!data.items) {
        return { tracks: [], trackCount: 0 };
    }

    const tracks = data.items.map((item) => ({
        trackId: item.track.id,
        trackName: item.track.name,
        artistName: item.track.artists[0].name,
        // Extract album artwork (image) URL from the album images
        imageUrl: item.track.album.images[0]?.url || "/default-artist-image.png", // Fallback to a default image if none exists
    }));

    const trackCount = data.total || tracks.length;

    return { tracks, trackCount };
}
