// shuffle array of tracks using Fisher-Yates algorithm

export default function shufflePlaylist(playlist) {
    for (let i = playlist.length -1; i> 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [playlist[i], playlist[j]] = [playlist[j], playlist[i]]
    }
    return playlist;
}