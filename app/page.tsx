"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import Loader from "@/components/Loader";
import { getWorkouts } from "@/lib/api";
import { Workout } from "@/lib/types";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  return (
    <div className="flex flex-col gap-12">
      <Hero />

      <section id="library" className="scroll-mt-24">
        <h2 className="font-display text-2xl tracking-wide text-text sm:text-3xl">
          THE LIBRARY
        </h2>
        <p className="mt-1 text-sm text-text-muted">
          Twelve lifts covering every major muscle group.
        </p>

        <div className="mt-6">
          {loading && <Loader label="Loading workouts…" />}

          {!loading && error && (
            <p className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-text-muted">
              Couldn&apos;t load the library right now. Please refresh the page.
            </p>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
