export default function CategoryPill({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-bg">
      {label}
    </span>
  );
}
