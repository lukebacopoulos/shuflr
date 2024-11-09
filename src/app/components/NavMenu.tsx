"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div className="flex items-center">
          <button
            onClick={() => signOut()}
            className="p-2 m-4 text-sm hover:underline"
          >
            Sign Out
          </button>
          {/* Hello, {session?.user?.name}. */}
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="User Profile Image"
              width={40}
              height={40}
              className="rounded-full mr-4"
              unoptimized
            />
          )}
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center m-4 p-2 ">
      {" "}
      <button
        onClick={() => signIn("spotify")}
        className=" mx-4 text-sm hover:underline"
      >
        Sign In
      </button>
      <FaSpotify size={30} />
    </div>
  );
}

export default function NavMenu() {
  return (
    <div className="border-b flex justify-end">
      <AuthButton />
    </div>
  );
}
