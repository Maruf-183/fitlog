import Link from "next/link";

export default function EmptyState({
  title,
  message,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  message: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface py-20 text-center">
      <h3 className="font-display text-xl tracking-wide text-text">{title}</h3>
      <p className="max-w-xs text-sm text-text-muted">{message}</p>
      <Link
        href={ctaHref}
        className="rounded-full bg-accent px-5 py-2 text-sm font-bold text-bg transition-opacity hover:opacity-90"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
