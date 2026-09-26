"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import Loader from "@/components/Loader";
import { getWorkouts } from "@/lib/api";
import { Workout } from "@/lib/types";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    getWorkouts()
      .then((data) => {
        if (active) setWorkouts(data);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return workouts;
    return workouts.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.muscleGroups.some((g) => g.toLowerCase().includes(q))
    );
  }, [workouts, query]);

  return (
    <div className="flex flex-col gap-12">
      <Hero />

      <section id="library" className="scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl tracking-wide text-text sm:text-3xl">
              THE LIBRARY
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {!loading && !error && (
            <div className="relative w-full sm:w-64">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or tag"
                className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          )}
        </div>

        <div className="mt-6">
          {loading && <Loader label="Loading workouts…" />}

          {!loading && error && (
            <p className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-text-muted">
              Couldn&apos;t load the library right now. Please refresh the page.
            </p>
          )}

          {!loading && !error && filtered.length === 0 && (
            <p className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-text-muted">
              No lifts match &quot;{query}&quot;.
            </p>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
