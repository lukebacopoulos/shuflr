"use server"
import { getAccessToken } from "@/lib/get-token"

export async function pushToQueue(trackUri: string) {
    try {
      const tokenResponse = await getAccessToken();
  
      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error("Access Token Fetch Error:", {
          status: tokenResponse.status,
          statusText: tokenResponse.statusText,
          error: errorText,
        });
        throw new Error(`Access token fetch error: ${tokenResponse.status} ${errorText}`);
      }
  
      const { accessToken } = await tokenResponse.json();
  
      const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${trackUri}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Spotify API Error:", {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
        });
        throw new Error(`Spotify API error: ${response.status} ${errorText}`);
      }
  
      console.log(`Track added to queue successfully: ${trackUri}`);
    } catch (error) {
      console.error("Error in pushToQueue:", error);
      throw error;
    }
  }