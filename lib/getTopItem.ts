export default async function getTopItems(token: string, item: string, timeRange: "short_term" | "medium_term" | "long_term" = "medium_term") {
    const response = await fetch(`https://api.spotify.com/v1/me/top/${item}?time_range=${timeRange}&limit=50&offset=0`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  
    const data = await response.json();
    if (!data || !data.items) {
      return [];
    }
  
    // Promise.all for parallel artist image fetching
    const artistPromises = data.items.map(async (artist) => {
      const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artist.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const artistData = await artistResponse.json();
  
      // Check for images in various places within the artist data
      let imageUrl = "";
      if (artistData.images && artistData.images.length > 0) {
        imageUrl = artistData.images[0].url; // Use the first image
      } else if (artistData.album && artistData.album.images && artistData.album.images.length > 0) {
        imageUrl = artistData.album.images[0].url; // Use first album image if available
      }
  
      return [artist.name, imageUrl]; // Return an array with artist name and image URL
    });
  
    // Wait for all artist image fetches to complete
    const artistInfoWithImages = await Promise.all(artistPromises);
  
    return artistInfoWithImages;
  }