import Link from "next/link";
import { ModeToggle } from "./theme-toggle";
import {
  UserButton,
  SignInButton,
  SignedOut,
  SignOutButton,
  SignedIn,
} from "@clerk/nextjs";

import { Button } from "./ui/button";
import Image from "next/image";
import { FileQuestion } from "lucide-react";
export default function Header() {
  return (
    <header className="sticky bg-background">
      <div className="container mx-auto mt-8 grid h-[80px] grid-rows-2 gap-4 md:mt-0 md:grid-cols-3">
        {/* Logo (takes 2 columns) */}
        <Link
          href="/"
          className="col-span-1 mt-5 hidden items-center justify-start md:block"
        >
          <Image
            src="/full-logo-cropped.svg"
            alt="shuflr logo"
            width={200}
            height={50}
            className="hidden md:block"
          />
        </Link>

        {/* Navigation Items (each takes 1 column, total 3 columns) */}
        <div className="rows-span-1 text-md mx-10 flex items-center justify-between md:col-span-1 md:mt-16 md:space-x-6 md:text-lg">
          <Link href="/">
            <Image
              src="/badge.svg"
              alt="shuflr logo"
              width={70}
              height={50}
              className="md:hidden"
            />
          </Link>
          <Link
            href="/shuffle"
            className="whitespace-nowrap transition-all ease-in-out hover:text-xl hover:underline"
          >
            Shuffle
          </Link>
          <Link
            href="/top-tracks"
            className="whitespace-nowrap transition-all ease-in-out hover:text-xl hover:underline"
          >
            Top Tracks
          </Link>
          <Link
            href="/top-artists"
            className="whitespace-nowrap transition-all ease-in-out hover:text-xl hover:underline"
          >
            Top Artists
          </Link>
        </div>

        <div className="mx-4 flex items-center justify-end space-x-8 md:col-span-1 md:ml-40 md:mt-12 md:h-full md:justify-between">
          <div className="mr-4 flex items-center space-x-4">
            <UserButton />
            <SignedOut>
              <SignInButton>
                <Button
                  variant="outline"
                  className="border-muted-foreground bg-secondary hover:bg-slate-500"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <ModeToggle />
            <Button
              variant="outline"
              size="icon"
              className="ml-4 border-muted-foreground hover:bg-slate-500 dark:bg-secondary"
            >
              <FileQuestion className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
