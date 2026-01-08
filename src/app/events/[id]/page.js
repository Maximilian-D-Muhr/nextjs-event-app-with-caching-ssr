import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatDate } from '@/utils/formatDate';

// Revalidate every 24 hours
export const revalidate = 86400;

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`http://localhost:3001/api/events/${id}`, {
      next: { revalidate: 86400 }
    });

    if (!res.ok) {
      return { title: 'Event Not Found' };
    }

    const event = await res.json();

    return {
      title: `${event.title} | Event Timeline`,
      description: event.description?.slice(0, 160) || `Event on ${formatDate(event.date)}`,
    };
  } catch {
    return { title: 'Event Not Found' };
  }
}

/**
 * Server Component - Event Details Page
 * Fetches event data on the server for SEO-friendly rendering
 */
export default async function EventDetails({ params }) {
  const { id } = await params;

  // Fetch event on the server
  const res = await fetch(`http://localhost:3001/api/events/${id}`, {
    next: { revalidate: 86400 }
  });

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  const event = data?.result ?? data;

  if (!event) {
    notFound();
  }

  console.log(`[Server] Rendered event ${id}: ${event.title}`);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold">Event Details</h1>
          <Link href="/" className="btn btn-ghost btn-sm">Back</Link>
        </div>

        <div className="card bg-base-100 shadow-sm border">
          <div className="card-body space-y-4">
            <div>
              <h2 className="card-title text-lg sm:text-xl break-words">
                {event.title}
              </h2>
              <p className="text-sm opacity-70">
                {event.date && formatDate(event.date)}
              </p>
            </div>

            {event.description && (
              <p className="leading-relaxed whitespace-pre-line break-words">
                {event.description}
              </p>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-3 bg-base-200 rounded-lg">
                <span className="text-sm font-semibold block mb-1">Location</span>
                <span className="break-words">{event.location || "-"}</span>
              </div>
              <div className="p-3 bg-base-200 rounded-lg">
                <span className="text-sm font-semibold block mb-1">Coordinates</span>
                <span>{event.latitude ?? "-"}, {event.longitude ?? "-"}</span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 text-sm opacity-70">
              <div>
                <span className="font-semibold">Event ID:</span> {event.id}
              </div>
              {event.organizerId != null && (
                <div>
                  <span className="font-semibold">Organizer ID:</span> {event.organizerId}
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="pt-6 border-t border-base-300 text-center text-sm opacity-70">
          <p>
            Created by{' '}
            <a
              href="https://www.linkedin.com/in/maximilianmuhr/"
              className="link link-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Maximilian D. Muhr
            </a>
            {' '}as part of WBS Coding School
          </p>
        </footer>
      </section>
    </main>
  );
}
