'use client';

import FunctionEditor from './FunctionEditor';
import { LayoutModule } from '../../types/layout';

interface FunctionShellProps {
  modules: LayoutModule[];
  selected?: string | null;
  onConnect?: (fromId: string, toId: string) => void;
}

export function FunctionShell({ modules }: FunctionShellProps) {
  return (
    // Outer container needs a full height for react-flow to work
    <div className="flex-1 min-h-[600px] h-[calc(100vh-100px)]">
      <FunctionEditor />
    </div>
  );
}
