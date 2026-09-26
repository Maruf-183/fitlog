import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/lib/types";
import CategoryPill from "./CategoryPill";
import StatsRow from "./StatsRow";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/50"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((group) => (
            <CategoryPill key={group} label={group} />
          ))}
        </div>
        <h3 className="font-display text-base tracking-wide text-text">
          {workout.name.toUpperCase()}
        </h3>
        <p className="text-xs text-text-muted">{workout.equipment}</p>
        <div className="mt-auto pt-1">
          <StatsRow
            duration={workout.duration}
            calories={workout.caloriesBurned}
            rating={workout.rating}
          />
        </div>
      </div>
    </Link>
  );
}
