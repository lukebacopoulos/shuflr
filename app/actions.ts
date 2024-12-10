"use server";
import { getAccessToken } from "@/lib/get-token";

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
      throw new Error(
        JSON.stringify({
          type: "TOKEN_ERROR",
          status: tokenResponse.status,
        }),
      );
    }

    const { accessToken } = await tokenResponse.json();
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/queue?uri=${trackUri}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Spotify API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });

      // Parse the Spotify error response
      let spotifyError;
      try {
        spotifyError = JSON.parse(errorText);
      } catch {
        spotifyError = { error: { reason: "UNKNOWN_ERROR" } };
      }

      // Create a structured error that will survive the server/client boundary
      throw new Error(
        JSON.stringify({
          type: "SPOTIFY_API_ERROR",
          status: response.status,
          reason: spotifyError.error?.reason || "UNKNOWN_ERROR",
        }),
      );
    }

    console.log(`Track added to queue successfully: ${trackUri}`);
  } catch (error) {
    console.error("Error in pushToQueue:", error);
    // If it's already our structured error, rethrow it
    if (error instanceof Error && error.message.startsWith("{")) {
      throw error;
    }
    // Otherwise, wrap it in our structure
    throw new Error(
      JSON.stringify({
        type: "UNKNOWN_ERROR",
        status: 500,
        reason: "UNKNOWN_ERROR",
      }),
    );
  }
}
