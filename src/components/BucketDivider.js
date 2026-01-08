/**
 * Section divider with centered label for timeline buckets
 */
export function BucketDivider({ label, isToday = false, isPastHeader = false }) {
  if (isToday) {
    return (
      <div className="relative flex items-center py-6">
        <div className="flex-grow border-t-2 border-primary"></div>
        <span className="flex-shrink mx-4 px-4 py-1 bg-primary text-primary-content font-bold text-lg rounded-full">
          {label}
        </span>
        <div className="flex-grow border-t-2 border-primary"></div>
      </div>
    );
  }

  if (isPastHeader) {
    return (
      <div className="relative flex items-center py-4 mt-2">
        <div className="flex-grow border-t border-base-300"></div>
        <span className="flex-shrink mx-4 px-3 py-1 bg-base-300 text-base-content font-semibold text-sm rounded-full">
          {label}
        </span>
        <div className="flex-grow border-t border-base-300"></div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center py-4">
      <div className="flex-grow border-t border-base-300"></div>
      <span className="flex-shrink mx-4 px-3 py-1 bg-base-200 text-base-content/80 font-medium text-sm rounded-full">
        {label}
      </span>
      <div className="flex-grow border-t border-base-300"></div>
    </div>
  );
}
