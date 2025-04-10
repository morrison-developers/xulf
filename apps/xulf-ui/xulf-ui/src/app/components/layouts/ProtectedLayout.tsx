'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import TopNav from '../nav/TopNav';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status, router]);

  if (status === 'loading') return null;

  return (
    <>
      <TopNav />
      <div className="flex min-h-screen bg-gray-50">
        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </>
  );
}
