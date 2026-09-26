"use client";

import { Plus, Bookmark } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/lib/types";

export default function WorkoutActions({ workout }: { workout: Workout }) {
  const { addToPlan, addToSaved, isInPlan, isSaved, isPlanFull } = usePlan();
  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const disablePlanBtn = inPlan || (isPlanFull && !inPlan);

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button
        onClick={() => addToPlan(workout)}
        disabled={disablePlanBtn}
        className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Plus size={16} />
        {inPlan
          ? "Already in plan"
          : isPlanFull
          ? "Plan is full"
          : "Add to today's plan"}
      </button>
      <button
        onClick={() => addToSaved(workout)}
        disabled={saved}
        className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent/50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Bookmark size={16} />
        {saved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
