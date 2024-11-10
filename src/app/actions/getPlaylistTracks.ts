// this server action is necessary because this call contains data which is selected from a client components.
// getTopItem() and getUserPlaylists() do not require any parameters from a client component, 
// so they are fine as regular server side functions.
"use server";

export async function getPlaylistTracks(token: string, playlistId: string) {
    const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();
    console.log("Spotify Playlist Tracks Response:", data);
    if (!data || !data.items) {
        return {tracks: [], trackCount: 0};
    }

    const tracks = data.items.map((item) => ({
        trackId: item.track.id,
        trackName: item.track.name,
        artistName: item.track.artists[0].name,
    }));
    const trackCount = data.total || tracks.length;

    return { tracks, trackCount }
}

