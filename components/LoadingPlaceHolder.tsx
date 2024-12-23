"use client";
import Image from "next/image";

export default function LoadingPlaceHolder() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="my-6 lg:my-16 lg:text-4xl">
          Getting things ready for you...
        </h1>
        <Image
          src="/SHUFLR_WLB-02-cropped.svg"
          alt="shuflr logo"
          width={300}
          height={100}
          className="hidden lg:block"
        />
        <Image
          src="/SHUFLR_WLB-02-cropped.svg"
          alt="shuflr logo"
          width={150}
          height={50}
          className="block lg:hidden"
        />
      </div>
    </>
  );
}
