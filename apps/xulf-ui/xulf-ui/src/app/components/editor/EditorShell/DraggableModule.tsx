'use client';

import { useDraggable } from '@dnd-kit/core';

interface DraggableModuleProps {
  type: string;
}

export function DraggableModule({ type }: DraggableModuleProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `draggable-${type}`,
    data: { type },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-2 border rounded bg-white shadow text-sm cursor-pointer hover:bg-gray-50"
    >
      {type}
    </div>
  );
}
