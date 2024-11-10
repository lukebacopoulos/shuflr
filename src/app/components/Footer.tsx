import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="flex flex-col w-full justify-center items-center bg-black text-white">
        <div className="flex w-4/5 justify-between p-4">
          <Link href="/">Home</Link>
          <Link href="/faq">FAQ</Link>
          <Link href={"/contact"}>Contact</Link>
          <Link href="https://github.com/lukebacopoulos/shuflr" target="_blank">
            GitHub
          </Link>
        </div>
        <p className="text-xs">&copy; 2024 Luke Bacopouos</p>
        <a
          className="text-sm"
          href="http://www.apache.org/licenses/LICENSE-2.0"
          target="_blank"
        >
          Licensed under the Apache License 2.0
        </a>
      </footer>
    </>
  );
}
