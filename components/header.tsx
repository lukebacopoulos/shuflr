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
    <div className="p-8 flex justify-between items-center">
      <Link href="/">Shuflr</Link>
      <Link href="/top-artists">Top Artists</Link>
      <Link href="/top-tracks">Top Tracks</Link>
      <div className="flex w-1/6 justify-between">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SignOutButton />
        </SignedIn>
        <UserButton />
      </div>
      <ModeToggle />
    </div>
  );
}
