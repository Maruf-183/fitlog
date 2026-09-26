import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="rounded-3xl border border-border bg-surface p-6 sm:p-10">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Workout Library
          </p>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-wide text-text sm:text-5xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>
          <p className="mt-4 max-w-md text-sm text-text-muted sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-bg transition-opacity hover:opacity-90"
          >
            Browse workouts
            <ArrowRight size={16} />
          </a>
        </div>
        <div className="relative mx-auto h-48 w-48 sm:h-64 sm:w-64">
          <Image
            src="/assets/banner.png"
            alt="FitLog"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
