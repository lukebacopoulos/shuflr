import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mt-20 flex flex-grow flex-col items-center">
        <div className="flex w-1/2 flex-col items-center justify-center rounded-lg">
          <h1 className="my-8 text-center text-2xl md:text-5xl">
            Welcome to Shuflr.
          </h1>
          <SignedOut>
            <h2 className="mb-8 text-lg md:text-2xl">
              Sign in to get started.
            </h2>
            <h3 className="mb-8 md:text-xl">
              Speak with Luke regarding access.
            </h3>
          </SignedOut>
          <Image
            src={"/badge.svg"}
            alt={"shuflr logo"}
            width={300}
            height={300}
          />
        </div>
      </main>
    </div>
  );
}
