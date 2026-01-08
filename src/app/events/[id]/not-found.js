import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="text-center py-12 space-y-4">
        <h1 className="text-2xl font-bold">Event Not Found</h1>
        <p className="text-lg opacity-70">The event you are looking for does not exist.</p>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
