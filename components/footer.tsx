import Link from "next/link";
export default function Footer() {
  return (
    <footer className="my-4 flex flex-nowrap items-center justify-center gap-4 text-sm sm:gap-20">
      <Link href="https://github.com/lukebacopoulos/shuflr" target="_blank">
        GitHub
      </Link>
      <p>© Shuflr 2024</p>
      <Link href="/">License</Link>
      {/* <Link href="/">License</Link> */}
      <Link href="/FAQ">FAQ</Link>
    </footer>
  );
}
