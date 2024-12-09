import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mt-20 flex flex-grow flex-col items-center">
        <div className="flex w-1/2 flex-col items-center justify-center rounded-lg">
          <h1 className="my-8 text-center text-2xl text-litebackground md:text-5xl">
            Welcome to
          </h1>
          <Image
            src={"/SHUFLR_WLB-02-cropped.svg"}
            alt={"shuflr logo"}
            width={500}
            height={300}
          />
          <SignedOut>
            <h2 className="my-8 text-2xl md:text-4xl">
              Sign in to get started.
            </h2>
            <h3 className="mb-8 text-sm md:text-xl">
              Speak with Luke regarding access.
            </h3>
          </SignedOut>
        </div>
      </main>
    </div>
  );
}
