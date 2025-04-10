'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    console.log('page status: ', session.status)
    if (session.status === 'authenticated') {
      router.replace('/orgs');
    }
  }, [session.status]);

  // Avoid redirecting too early
  if (session.status === 'loading') return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Xulf</h1>
      <p className="mt-2">Please <a href="/login" className="text-blue-600 underline">log in</a> to continue.</p>
    </div>
  );
}
