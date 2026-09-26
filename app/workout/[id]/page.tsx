import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import CategoryPill from "@/components/CategoryPill";
import WorkoutActions from "./WorkoutActions";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating },
  ];

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-border sm:h-full sm:min-h-[420px]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 768px) 45vw, 90vw"
          className="object-cover"
          priority
        />
      </div>

      <div>
        <h1 className="font-display text-3xl tracking-wide text-text sm:text-4xl">
          {workout.name.toUpperCase()}
        </h1>
        <p className="mt-3 text-sm text-text-muted sm:text-base">
          {workout.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((group) => (
            <CategoryPill key={group} label={group} />
          ))}
        </div>

        <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex items-center justify-between px-4 py-3 text-sm"
            >
              <dt className="uppercase tracking-wide text-text-muted">
                {spec.label}
              </dt>
              <dd className="font-semibold text-text">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <h2 className="font-display text-lg tracking-wide text-text">
            INSTRUCTIONS
          </h2>
          <ol className="mt-3 flex flex-col gap-3">
            {workout.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-text-muted">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-bg">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <WorkoutActions workout={workout} />
      </div>
    </div>
  );
}
