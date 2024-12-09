export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <strong className="mb-4 text-2xl">
        Does shuflr have access to my Spotify credentials?
      </strong>
      <p>
        No. shuflr communicates with Spotify via OAuth to get user specific
        data.
      </p>
      <strong className="mb-4 mt-16 text-2xl">
        Is Spotify&apos;s shufling algorithm not random?
      </strong>
      <p>
        No it is not. Spotify utilizes reccomendation engines in their shuffling
        algorithms to queue songs that it THINKS you want to hear.
      </p>
      <strong className="mb-4 mt-16 text-2xl">
        How does shuflr&apos;s algorithm work?
      </strong>
      <p>
        shuflr employs a simple Fisher-Yates shuffling algorithm. Simplicity is
        key.
      </p>
    </div>
  );
}
