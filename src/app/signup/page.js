import SignUpForm from '@/components/SignUpForm';

export const metadata = {
  title: 'Sign Up | Event Timeline',
  description: 'Create a new account',
};

export default function SignUpPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <SignUpForm />
    </main>
  );
}
