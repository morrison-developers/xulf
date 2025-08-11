// apps/shavon-lloyd/shavon-lloyd-app/src/app/providers.tsx
'use client';

import { ReactNode, useMemo } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

export default function Providers({ children }: { children: ReactNode }) {
  const cache = useMemo(() => createCache({ key: 'css', prepend: true }), []);
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
