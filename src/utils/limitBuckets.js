import { FUTURE_BUCKETS, PAST_BUCKETS } from './dateBuckets';

const MAX_FUTURE_EVENTS = 20;
const MAX_PAST_EVENTS = 20;

/**
 * Apply display limits to future event buckets
 * @param {Object} buckets - All event buckets
 * @returns {Object} Limited future buckets
 */
export function limitFutureBuckets(buckets) {
  let remaining = MAX_FUTURE_EVENTS;
  const limited = {};

  for (const key of FUTURE_BUCKETS) {
    const available = buckets[key].length;
    const take = Math.min(available, remaining);
    limited[key] = buckets[key].slice(0, take);
    remaining -= take;
  }

  return limited;
}

/**
 * Apply display limits to past event buckets
 * @param {Object} buckets - All event buckets
 * @returns {Object} Limited past buckets
 */
export function limitPastBuckets(buckets) {
  let remaining = MAX_PAST_EVENTS;
  const limited = {};

  for (const key of PAST_BUCKETS) {
    const available = buckets[key].length;
    const take = Math.min(available, remaining);
    limited[key] = buckets[key].slice(0, take);
    remaining -= take;
  }

  return limited;
}

/**
 * Count total events in buckets
 * @param {Object} limitedBuckets - Limited buckets
 * @param {Object} allBuckets - All buckets (unlimited)
 * @param {string[]} bucketKeys - Keys to count
 * @returns {{ shown: number, available: number }}
 */
export function countBucketTotals(limitedBuckets, allBuckets, bucketKeys) {
  const shown = bucketKeys.reduce(
    (sum, key) => sum + limitedBuckets[key].length,
    0
  );
  const available = bucketKeys.reduce(
    (sum, key) => sum + allBuckets[key].length,
    0
  );
  return { shown, available };
}
