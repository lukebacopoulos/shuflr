import { getAccessToken } from "./get-token";

export async function getTopItems(
    type: "artists" | "tracks",
    time_range: "short_term" | "medium_term" | "long_term"
) {
try {
    const tokenResponse = await getAccessToken();
    
    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Access Token Fetch Error:', {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        error: errorText,
      });
      throw new Error(`Access token fetch error: ${tokenResponse.status} ${errorText}`);
    }

    const { accessToken } = await tokenResponse.json();

    const spotifyResponse = await fetch(
       `https://api.spotify.com/v1/me/top/${type}?limit=50&time_range=${time_range}`, 
       {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!spotifyResponse.ok) {
        const errorText = await spotifyResponse.text();
        console.error('Spotify API Error:', {
          status: spotifyResponse.status,
          statusText: spotifyResponse.statusText,
          error: errorText,
        });
        throw new Error(`Spotify API error: ${spotifyResponse.status} ${errorText}`);
      }
  
      const data = await spotifyResponse.json();
      return data;
      
    } catch (error) {
      console.error('Detailed Error:', error);
      return new Response(
        JSON.stringify({
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  }