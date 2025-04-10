// components/entity-list.tsx
'use client';

import Link from 'next/link';

interface EntityListProps {
  items: { id: string; name: string; href: string }[];
  emptyMessage?: string;
}

export default function EntityList({ items, emptyMessage }: EntityListProps) {
  if (items.length === 0) {
    return <p className="text-gray-500">{emptyMessage || 'No items found.'}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <Link key={item.id} href={item.href}>
          <div className="p-4 border rounded hover:shadow transition">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-500">{item.id}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
