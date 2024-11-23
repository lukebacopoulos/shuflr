import { Waitlist } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col flex-grow justify-center items-center mt-20">
        <h1 className="text-4xl my-6">Welcome to Shuflr.</h1>
        <h2 className="p-4 text-2xl">
          A true shuffling and stats tool for Spotify.
        </h2>
        <p className="px-4 py-10 text-xl">
          At the moment, Spotify requires this app to add users to an allowlist.
        </p>
        <p className="p-4 text-xl">
          Please enter the email linked to your Spotify account.
        </p>
        <Waitlist />
      </main>

      <footer className="mt-4 flex gap-6 flex-wrap items-center justify-center">
        <Link href="https://github.com/lukebacopoulos/shuflr">GitHub</Link>
        <Link href="/">License</Link>
      </footer>
    </div>
  );
}
