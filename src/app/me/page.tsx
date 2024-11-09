import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <h1>You need to be signed in to view this page</h1>;
  }

  const { accessToken } = session;
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const myData = await response.json();

  return (
    <div>
      <h1>{myData.display_name}</h1>
      <p>ID: {myData.id}</p>
      {myData.images?.length > 0 && (
        <img
          src={myData.images[0].url}
          alt="Profile Photo"
          width="150"
          height="150"
        />
      )}
    </div>
  );
}
