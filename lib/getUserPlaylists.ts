export default async function getUserPlaylists(token: string) {
    const response = await fetch(
        `https://api.spotify.com/v1/me/playlists?limit=50`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();
    if (!data || !data.items) {
        return [];
    }

    const playlistsWithImages = data.items.filter((playlist) => playlist.name !== 'Local File')
    .map((playlist) => {
        let imageUrl = "";

        if (playlist.images && playlist.images.length > 0) {
            imageUrl = playlist.images[0].url;
        }
        return [playlist.name, playlist.id, imageUrl]
    })
    return playlistsWithImages
}