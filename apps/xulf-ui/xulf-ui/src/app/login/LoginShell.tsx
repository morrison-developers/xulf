'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

export default function LoginShell() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // If user is already authenticated, send them to /app/orgs
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/app/orgs');
    }
  }, [status, router]);

  // Show nothing while session status is loading
  if (status === 'loading') return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await signIn('email', {
        email,
        callbackUrl: '/orgs',
      });
      // If signIn doesn't throw, the link was sent
      setSuccessMessage('Check your email for a magic link.');
    } catch (err) {
      setErrorMessage('Login failed. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Login to Xulf</h1>

        {errorMessage && (
          <p className="text-red-600 text-sm text-center">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-600 text-sm text-center">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />

          <button
            type="submit"
            disabled={isSending}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          >
            {isSending ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>

        <p className="text-xs text-center text-gray-400">Invite-only access</p>
      </div>
    </div>
  );
}
