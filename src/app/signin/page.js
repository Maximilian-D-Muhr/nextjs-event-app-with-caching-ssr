import { Suspense } from 'react';
import SignInForm from '@/components/SignInForm';

export const metadata = {
  title: 'Sign In | Event Timeline',
  description: 'Sign in to your account',
};

export default function SignInPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <SignInForm />
      </Suspense>
    </main>
  );
}
