import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="font-display text-6xl tracking-wide text-accent">404</p>
      <h1 className="font-display text-2xl tracking-wide text-text">
        THIS LIFT DOESN&apos;T EXIST
      </h1>
      <p className="max-w-sm text-sm text-text-muted">
        The page you&apos;re looking for isn&apos;t in the library. Head back
        and pick something to log.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-bg transition-opacity hover:opacity-90"
      >
        Back to workouts
      </Link>
    </div>
  );
}
