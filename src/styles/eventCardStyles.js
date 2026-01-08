/**
 * @typedef {Object} EventCardStyles
 * @property {string} card - Card container classes
 * @property {string} body - Card body padding classes
 * @property {string} title - Title text size classes
 * @property {string} meta - Meta text size classes
 */

/**
 * Size variants for EventCard component
 * - small: for older/future events (less prominent)
 * - normal: default size for most events
 * - large: for today's events (highlighted)
 * @type {Object.<string, EventCardStyles>}
 */
export const EVENT_CARD_SIZES = {
  small: {
    card: "opacity-60",
    body: "p-3",
    title: "text-xs",
    meta: "text-xs",
  },
  normal: {
    card: "",
    body: "p-4",
    title: "text-base",
    meta: "text-sm",
  },
  large: {
    card: "ring-2 ring-primary shadow-lg",
    body: "p-6",
    title: "text-xl sm:text-2xl",
    meta: "text-base",
  },
};
