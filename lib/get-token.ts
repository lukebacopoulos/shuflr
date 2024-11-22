import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function getAccessToken() {

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "User not found" }, { status: 401 });
  }

  try {
    const provider = "oauth_spotify"; 

    const clerkResponse = await (await clerkClient()).users.getUserOauthAccessToken(
      userId,
      provider
    );

    const accessToken = clerkResponse.data[0]?.token; // Use .data as shown in the logs

    if (!accessToken) {
      return NextResponse.json(
        { message: "Access token is undefined" },
        { status: 500 }
      );
    }

    return NextResponse.json({ accessToken });
  } catch (error) {

    console.error("Error fetching Spotify data:", error);
    return NextResponse.json(
      { message: "Internal Server Error"},
      { status: 500 }
    );
  }
}