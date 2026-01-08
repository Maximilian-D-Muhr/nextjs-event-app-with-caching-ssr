'use client';

import Link from 'next/link';
import { formatDate } from '@/utils/formatDate';
import { EVENT_CARD_SIZES } from '@/styles/eventCardStyles';

/**
 * @typedef {Object} Event
 * @property {number} id
 * @property {string} title
 * @property {string} date - ISO date string
 * @property {string} [location]
 * @property {string} [description]
 */

/**
 * Event card with size variants
 * @param {Object} props
 * @param {Event} props.event
 * @param {"small" | "normal" | "large"} props.size
 */
export function EventCard({ event, size = "normal" }) {
  const styles = EVENT_CARD_SIZES[size] || EVENT_CARD_SIZES.normal;

  return (
    <li
      className={`card bg-base-100 shadow-sm border hover:shadow-md transition-shadow ${styles.card}`}
    >
      <Link href={`/events/${event.id}`} className={`card-body ${styles.body}`}>
        <h3 className={`card-title ${styles.title} break-words`}>
          {event.title}
        </h3>
        <p className={`${styles.meta} opacity-70 truncate`}>
          {formatDate(event.date)}
          {event.location && ` - ${event.location}`}
        </p>
      </Link>
    </li>
  );
}
