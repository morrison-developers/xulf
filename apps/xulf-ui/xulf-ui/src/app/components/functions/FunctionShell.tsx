'use client';

import FunctionEditor from './FunctionEditor';
import { LayoutModule } from '@xulf/types';

interface FunctionShellProps {
  modules: LayoutModule[];
  selected?: string | null;
  siteId: string;  // Pass siteId here
  onConnect?: (fromId: string, toId: string) => void;
}

export function FunctionShell({ modules, siteId, onConnect }: FunctionShellProps) {
  return (
    // Outer container needs a full height for react-flow to work
    <div className="flex-1 min-h-[600px] h-[calc(100vh-100px)]">
      <FunctionEditor siteId={siteId} onConnect={onConnect} />  {/* Pass siteId to FunctionEditor */}
    </div>
  );
}
