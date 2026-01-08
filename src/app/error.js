'use client';

export default function Error({ error, reset }) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold text-error mb-2">Something went wrong!</h2>
        <p className="text-error/80 mb-4">Error: {error.message}</p>
        <button
          className="btn btn-primary"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
