import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import {
  UserButton,
  SignInButton,
  SignedOut,
  SignOutButton,
  SignedIn,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="p-8 flex flex-col md:flex-row justify-between items-center">
      <div className="flex justify-evenly w-full md:pr-8">
        <Link href="/">Shuflr</Link>
        <Link href="/top-artists">Top Artists</Link>
        <Link href="/top-tracks">Top Tracks</Link>
      </div>
      <div className="flex w-auto mt-2">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SignOutButton />
        </SignedIn>
        <UserButton />
        <ModeToggle />
      </div>
    </div>
  );
}
