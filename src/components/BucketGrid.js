import { EventCard } from './EventCard';

/**
 * Grid of event cards for a bucket
 */
export function BucketGrid({ events, size = "normal" }) {
  if (events.length === 0) return null;

  const gridClass =
    size === "large"
      ? "grid gap-6 sm:grid-cols-1 lg:grid-cols-2"
      : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <ul className={gridClass}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} size={size} />
      ))}
    </ul>
  );
}
