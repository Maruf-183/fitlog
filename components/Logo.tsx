import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <Image src="/assets/logo.png" alt="FitLog" width={22} height={22} />
      <span className="font-display text-lg tracking-wide text-text">
        FITLOG
      </span>
    </Link>
  );
}