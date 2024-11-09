import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="flex justify-evenly">
        <Link href="/">Home</Link>
        <Link href="/">Top Artists</Link>
        <Link href="https://github.com/lukebacopoulos/shuflr" target="_blank">
          GitHub
        </Link>
        <p>Copyright Shuflr™ 2024</p>
      </footer>
    </>
  );
}
