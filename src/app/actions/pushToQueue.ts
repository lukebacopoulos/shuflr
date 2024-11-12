"use server";

export default async function pushToQueue(token: string, trackId: string) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=spotify:track:${trackId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        })
      
      

    if (!response.ok) {
      // If the response is not OK (status outside the 200-299 range)
      throw new Error(`Error adding track to queue: ${response.statusText}`);
    }

    console.log("Track added to queue successfully.");
  } catch (error) {
    console.error("Error in pushToQueue:", error);
  }
}