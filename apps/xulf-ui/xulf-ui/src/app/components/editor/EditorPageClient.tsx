'use client';

import { useState } from 'react';
import Link from 'next/link';
import EditorShell from './EditorShell';
import { FunctionShell } from '../functions/FunctionShell';
import type { SiteJson } from '../../types/layout';

interface Props {
  site: { id: string; name: string };
  siteJson: SiteJson;
  orgId: string;
}

export default function EditorPageClient({ site, siteJson, orgId }: Props) {
  const [tab, setTab] = useState<'layout' | 'functions'>('layout');
  const [selected, setSelected] = useState<string | null>(null);

  const handleConnection = (fromId: string, toId: string) => {
    console.log('Connect', fromId, '→', toId);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex space-x-4 border-b mb-4">
        {['layout', 'functions'].map((t) => (
          <button
            key={t}
            className={`px-4 py-2 text-sm font-medium ${
              tab === t ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setTab(t as 'layout' | 'functions')}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Editor – {site.name}</h1>
        <Link
          href={`/orgs/${orgId}/${site.id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Site Dashboard
        </Link>
      </div>

      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        {tab === 'layout' ? (
          <EditorShell siteId={site.id} siteJson={siteJson} selected={selected} />
        ) : (
          <FunctionShell
            modules={siteJson.modules}
            selected={selected}
            onConnect={handleConnection}
          />
        )}
      </main>
    </div>
  );
}
