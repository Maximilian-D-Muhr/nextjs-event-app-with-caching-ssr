import { BucketDivider } from '@/components/BucketDivider';
import { BucketGrid } from '@/components/BucketGrid';
import RefreshEventsButton from '@/components/RefreshEventsButton';
import {
  groupEventsByBucket,
  FUTURE_BUCKETS,
  PAST_BUCKETS,
  BUCKET_LABELS,
} from '@/utils/dateBuckets';
import {
  limitFutureBuckets,
  limitPastBuckets,
  countBucketTotals,
} from '@/utils/limitBuckets';

export const revalidate = 86400;

/**
 * Server Component - fetches events directly on the server
 */
export default async function Home() {
  const res = await fetch('http://localhost:3001/api/events?limit=100', {
    next: { revalidate: 86400 }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch events');
  }

  const data = await res.json();
  const events = Array.isArray(data) ? data : (data.results || []);
  const buckets = groupEventsByBucket(events);

  const limitedFutureBuckets = limitFutureBuckets(buckets);
  const limitedPastBuckets = limitPastBuckets(buckets);

  const hasFutureEvents =
    buckets.TODAY.length > 0 ||
    FUTURE_BUCKETS.some((key) => limitedFutureBuckets[key].length > 0);

  const hasPastEvents = PAST_BUCKETS.some(
    (key) => limitedPastBuckets[key].length > 0
  );

  const futureTotals = countBucketTotals(limitedFutureBuckets, buckets, FUTURE_BUCKETS);
  const pastTotals = countBucketTotals(limitedPastBuckets, buckets, PAST_BUCKETS);

  console.log(`[Server] Rendered ${events.length} events at ${new Date().toISOString()}`);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Event Timeline</h1>
        <p className="text-sm opacity-60 mt-1">
          Server-rendered at {new Date().toLocaleString()} - Next refresh in 24h
        </p>
      </header>

      <section className="space-y-2">
        {events.length === 0 && (
          <div className="text-center py-12 space-y-4">
            <p className="text-lg opacity-70">No events found.</p>
          </div>
        )}

        {events.length > 0 && (
          <>
            {futureTotals.shown < futureTotals.available && (
              <p className="text-center text-xs opacity-50 py-2">
                Showing {futureTotals.shown} of {futureTotals.available} upcoming events
              </p>
            )}

            {[...FUTURE_BUCKETS].reverse().map((bucketKey) => {
              if (limitedFutureBuckets[bucketKey].length === 0) return null;
              const size = bucketKey === "FUTURE" ? "small" : "normal";
              return (
                <div key={bucketKey}>
                  <BucketDivider label={BUCKET_LABELS[bucketKey]} />
                  <BucketGrid events={limitedFutureBuckets[bucketKey]} size={size} />
                </div>
              );
            })}

            <div className="flex justify-center py-4">
              <RefreshEventsButton />
            </div>

            <BucketDivider label="TODAY" isToday />
            {buckets.TODAY.length > 0 && (
              <BucketGrid events={buckets.TODAY} size="large" />
            )}
            {buckets.TODAY.length === 0 && hasFutureEvents && (
              <p className="text-center text-sm opacity-60 py-2">
                No events today
              </p>
            )}

            {hasPastEvents && (
              <>
                <BucketDivider label="Past Events" isPastHeader />

                {PAST_BUCKETS.map((bucketKey) => {
                  if (limitedPastBuckets[bucketKey].length === 0) return null;
                  const size = bucketKey === "OLDER" ? "small" : "normal";
                  return (
                    <div key={bucketKey}>
                      <BucketDivider label={BUCKET_LABELS[bucketKey]} />
                      <BucketGrid events={limitedPastBuckets[bucketKey]} size={size} />
                    </div>
                  );
                })}

                {pastTotals.shown < pastTotals.available && (
                  <p className="text-center text-xs opacity-50 py-2">
                    Showing {pastTotals.shown} of {pastTotals.available} past events
                  </p>
                )}
              </>
            )}
          </>
        )}
      </section>

      <footer className="mt-12 pt-6 border-t border-base-300 text-center text-sm opacity-70">
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
    </main>
  );
}
