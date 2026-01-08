import CreateEventForm from '@/components/CreateEventForm';

export const metadata = {
  title: 'Create Event | Event Timeline',
  description: 'Create a new event',
};

export default function CreateEventPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <CreateEventForm />
    </main>
  );
}
