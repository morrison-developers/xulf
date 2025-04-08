'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // TODO: Check login state before redirecting
    router.replace('/orgs');
  }, []);

  return null;
}
