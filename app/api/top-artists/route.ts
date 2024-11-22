import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(request: Request) {
  try {
    // Forward the authorization headers
    const headersList = headers();
    
    // Fetch the access token from the /api/spotify route
    const tokenResponse = await fetch('http://localhost:3000/api/spotify', {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': headersList.get('cookie') || '', // Forward the auth cookie
      }
    });

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

    // Rest of your code remains the same
    const spotifyResponse = await fetch(
      'https://api.spotify.com/v1/me/top/artists?limit=20&time_range=medium_term',
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
    return NextResponse.json(data);
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