'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
    <div className="flex min-h-screen bg-gray-50">
      {/* Optional Sidebar */}
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="font-bold text-lg">Sidebar</h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li><a href="/orgs">Organizations</a></li>
          {/* Add more sidebar links here */}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
