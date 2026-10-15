import Image from "next/image";

export function SignatureArtwork() {
  return (
    <div
      className="pointer-events-none absolute right-[-10%] top-[1%] -z-0 w-[58%] max-w-[720px] opacity-50 sm:right-[-10%] sm:top-0 sm:w-[42%] sm:opacity-40 lg:right-[-15%] lg:top-0 lg:w-[45%] lg:opacity-50 xl:right-[-7%] xl:top-[4%] xl:w-[58%] xl:opacity-90"
      aria-hidden="true"
    >
      <Image
        src="/artwork/artwork-04.svg"
        alt=""
        priority
        width={1080}
        height={1080}
        className="h-auto w-full"
      />
    </div>
  );
}
