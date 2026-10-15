import Image from "next/image";

export function SignatureArtwork() {
  return (
    <div
      className="pointer-events-none absolute right-[-22%] top-[4%] -z-0 w-[78%] max-w-[720px] opacity-75 sm:right-[-7%] sm:w-[58%] sm:opacity-90"
      aria-hidden="true"
    >
      <Image
        src="/artwork/artwork-04.svg"
        alt=""
        width={1080}
        height={1080}
        className="h-auto w-full"
      />
    </div>
  );
}
