'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function ClientPortal() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { client } = useParams();

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'authenticated' && client) {
      router.push(`/${client}/dashboard`);
    } else if (status === 'unauthenticated' && client) {
      router.push(`/login`);
    }
  }, [status, client, router]);

  return null;
}
