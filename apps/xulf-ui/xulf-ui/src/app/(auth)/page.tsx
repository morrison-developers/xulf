'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Box, ButtonOverlay } from '@xulf/essentials';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending'>('idle');

  // ✅ If already authenticated, redirect to /app/orgs
  useEffect(() => {
    if (session.status === 'authenticated') {
      router.replace('/app/orgs');
    }
  }, [session.status]);

  // ✅ Show magic link feedback from query params
  const error = searchParams.get('error');
  const success = searchParams.get('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await signIn('email', { email, callbackUrl: '/app/orgs' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Box customStyles="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Login to Xulf</h1>

        {error && <p className="text-red-600 text-sm text-center">Something went wrong. Please try again.</p>}
        {success && <p className="text-green-600 text-sm text-center">Check your email for a magic link!</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <ButtonOverlay
            customStyles="w-full"
          >
            {status === 'sending' ? 'Sending...' : 'Send Magic Link'}
          </ButtonOverlay>
        </form>

        <p className="text-xs text-center text-gray-400">Invite-only access</p>
      </Box>
    </div>
  );
}
