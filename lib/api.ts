import { Workout } from "./types";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

/**
 * Fetches the full workout library.
 */
export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to load workouts (${res.status})`);
  }
  return res.json();
}

/**
 * Fetches a single workout by id for the detail page.
 * The library only has 12 entries, so pulling the full list and
 * filtering client-side is simpler and more reliable than trusting
 * the shape of the /:id endpoint on every environment.
 */
export async function getWorkoutById(id: string): Promise<Workout | null> {
  try {
    const all = await getWorkouts();
    const match = all.find((w) => String(w.id) === String(id));
    return match ?? null;
  } catch {
    return null;
  }
}
