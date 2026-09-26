import { Clock, Flame, Star } from "lucide-react";

export default function StatsRow({
  duration,
  calories,
  rating,
}: {
  duration: number;
  calories: number;
  rating: number;
}) {
  return (
    <div className="flex items-center gap-3 text-xs text-text-muted">
      <span className="flex items-center gap-1">
        <Clock size={14} className="text-accent" />
        {duration} min
      </span>
      <span className="flex items-center gap-1">
        <Flame size={14} className="text-orange-400" />
        {calories} kcal
      </span>
      <span className="flex items-center gap-1">
        <Star size={14} className="text-yellow-400" />
        {rating}
      </span>
    </div>
  );
}
