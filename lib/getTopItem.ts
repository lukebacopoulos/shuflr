export default async function getTopItems(
    token: string,
    item: string,
    timeRange: "short_term" | "medium_term" | "long_term" = "medium_term"
  ) {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/${item}?time_range=${timeRange}&limit=50&offset=0`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    const data = await response.json();
    if (!data || !data.items) {
      return [];
    }
  
    // Extract artist info with images (if available) from the initial response
    const artistInfoWithImages = data.items.map((artist) => {
      let imageUrl = "";
  
      // Check if artist images are available directly in data.items
      if (artist.images && artist.images.length > 0) {
        imageUrl = artist.images[0].url; // Use the first image
      } else if (artist.album && artist.album.images && artist.album.images.length > 0) {
        imageUrl = artist.album.images[0].url; // Use album image if available
      }
  
      return [artist.name, imageUrl]; // Return an array with artist name and image URL
    });
  
    return artistInfoWithImages;
  }
  