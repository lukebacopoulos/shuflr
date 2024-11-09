"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div className="">
          {session?.user?.name}
          <button onClick={() => signOut()} className="p-2 border-2 rounded-md">
            Sign Out
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      Not Signed in <br />
      <button onClick={() => signIn("spotify")}>Sign In</button>
    </>
  );
}

export default function NavMenu() {
  return (
    <div>
      <AuthButton />
    </div>
  );
}
