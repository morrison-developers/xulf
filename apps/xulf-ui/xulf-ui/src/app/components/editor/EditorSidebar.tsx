'use client';

import { componentRegistry } from '@xulf/modules';
import { DraggableModule } from './ui/DraggableModule';

export function EditorSidebar() {
  return (
    <aside className="w-64 border-r bg-white p-4 overflow-y-auto">
      <h2 className="text-sm font-semibold mb-4">Modules</h2>
      <div className="space-y-2">
        {Object.keys(componentRegistry).map((type) => (
          <DraggableModule key={type} type={type} />
        ))}
      </div>
    </aside>
  );
}
