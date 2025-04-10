export const dynamic = 'force-dynamic';

import LoginShell from './LoginShell';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginShell />
    </Suspense>
  );
}
