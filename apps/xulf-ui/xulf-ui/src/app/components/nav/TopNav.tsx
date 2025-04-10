'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useMemo } from 'react';

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const pathArray = segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      return { label: segment, href };
    });

    // Map known slugs to labels
    return pathArray.map((item) => {
      const labelMap: Record<string, string> = {
        orgs: 'Organizations',
        sites: 'Sites',
        editor: 'Editor',
      };

      return {
        ...item,
        label: labelMap[item.label] ?? item.label,
      };
    });
  }, [pathname]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-500 space-x-2">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.href}>
              {index > 0 && <span>/</span>}
              <Link href={crumb.href} className="hover:underline capitalize">
                {crumb.label}
              </Link>
            </span>
          ))}
        </div>
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-600 hover:text-black"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
