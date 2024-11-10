import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-4xl">Welcome to Shuflr.</h1>
      <h2 className="text-2xl">A true shuffling tool and stat dashboard.</h2>
      <br />
      {session ? null : <p>Sign in to get started.</p>}
    </div>
  );
}
