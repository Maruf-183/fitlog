"use client";

import { useMemo, useState } from "react";
import { usePlan } from "@/context/PlanContext";
import PlanCard from "@/components/PlanCard";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/Loader";
import SortDropdown from "@/components/SortDropdown";
import { SortKey } from "@/lib/types";
import { cn } from "@/lib/utils";

type Tab = "plan" | "saved";

export default function MyPlanPage() {
  const { plan, saved, totals, toggleDone, removeFromPlan, removeFromSaved, hydrated } =
    usePlan();
  const [tab, setTab] = useState<Tab>("plan");
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  const activeList = tab === "plan" ? plan : saved;

  const sorted = useMemo(
    () => [...activeList].sort((a, b) => b[sortKey] - a[sortKey]),
    [activeList, sortKey]
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl tracking-wide text-text sm:text-4xl">
          MY PLAN
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="grid grid-cols-3 divide-x divide-border overflow-hidden rounded-2xl border border-border bg-surface">
        {[
          { label: "Exercises", value: totals.exercises },
          { label: "Minutes", value: totals.minutes },
          { label: "Calories", value: totals.calories },
        ].map((stat) => (
          <div key={stat.label} className="px-4 py-4 text-center sm:text-left">
            <p className="text-xs uppercase tracking-wide text-text-muted">
              {stat.label}
            </p>
            <p
              className={cn(
                "mt-1 font-display text-2xl sm:text-3xl",
                stat.label === "Exercises" ? "text-accent" : "text-text"
              )}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-full border border-border bg-surface p-1">
          {(["plan", "saved"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                tab === t ? "bg-accent text-bg" : "text-text-muted hover:text-text"
              )}
            >
              {t === "plan" ? "Today's Plan" : "Saved"}
            </button>
          ))}
        </div>
        <SortDropdown value={sortKey} onChange={setSortKey} />
      </div>

      {!hydrated && <Loader label="Loading workouts…" />}

      {hydrated && sorted.length === 0 && (
        <EmptyState
          title="NOTHING HERE YET"
          message="Browse the library and add a lift to get today moving."
          ctaLabel="Go to workouts"
          ctaHref="/"
        />
      )}

      {hydrated && sorted.length > 0 && (
        <div className="flex flex-col gap-3">
          {sorted.map((item) => (
            <PlanCard
              key={item.id}
              item={item}
              variant={tab}
              onToggleDone={tab === "plan" ? toggleDone : undefined}
              onRemove={tab === "plan" ? removeFromPlan : removeFromSaved}
            />
          ))}
        </div>
      )}
    </div>
  );
}
