"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { PlanItem } from "@/lib/types";
import StatsRow from "./StatsRow";
import { cn } from "@/lib/utils";

export default function PlanCard({
  item,
  variant,
  onToggleDone,
  onRemove,
}: {
  item: PlanItem;
  variant: "plan" | "saved";
  onToggleDone?: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  const done = variant === "plan" && item.done;

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl border border-border bg-surface p-3",
        done && "opacity-60"
      )}
    >
      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={cn(
            "truncate font-display text-sm tracking-wide text-text",
            done && "line-through"
          )}
        >
          {item.name.toUpperCase()}
        </h3>
        <p className="truncate text-xs text-text-muted">{item.equipment}</p>
        <div className="mt-1">
          <StatsRow
            duration={item.duration}
            calories={item.caloriesBurned}
            rating={item.rating}
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/workout/${item.id}`}
          className="hidden rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-text transition-colors hover:border-accent/50 sm:inline-block"
        >
          View Details
        </Link>
        {variant === "plan" && onToggleDone && (
          <button
            onClick={() => onToggleDone(item.id)}
            className={cn(
              "flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
              done
                ? "border border-border text-text-muted"
                : "bg-accent text-bg hover:opacity-90"
            )}
          >
            <Check size={13} />
            <span className="hidden sm:inline">
              {done ? "Done" : "Mark as Done"}
            </span>
          </button>
        )}
        <button
          onClick={() => onRemove(item.id)}
          aria-label="Remove"
          className="text-text-muted transition-colors hover:text-red-400"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
