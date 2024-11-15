"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div className="flex items-center p-2 mx-8">
          {/* Hello, {session?.user?.name}. */}
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="User Profile Image"
              width={30}
              height={30}
              className="rounded-full"
              unoptimized
            />
          )}
          <button
            onClick={() => signOut()}
            className="p-2 m-4 text-sm hover:underline"
          >
            Sign Out
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center p-2 mx-8">
      <button
        onClick={() => signIn("spotify")}
        className=" m-4 ml-6 text-sm hover:underline"
      >
        Sign In
      </button>
    </div>
  );
}

export default function NavMenu() {
  return (
    <div className="flex h-20 justify-between items-center bg-black text-white text-xl">
      <Link href="/" className="pl-10 hover:underline">
        Home
      </Link>
      <Link href="/shuffle" className="hover:underline">
        Shuffle
      </Link>
      <Link href="/top/artists" className="hover:underline">
        Top Artists
      </Link>
      <Link href="/top/tracks" className="hover:underline">
        Top Tracks
      </Link>
      <AuthButton />
    </div>
  );
}
