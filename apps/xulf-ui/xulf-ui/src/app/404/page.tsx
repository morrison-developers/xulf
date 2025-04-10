// src/app/404.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page after component mounts
    router.push('/');
  }, [router]);

  return null; // Optionally, you can return a loading spinner or message here
}
