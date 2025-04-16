'use client';

import { useDragItem } from './useDragItem';

interface DraggableModuleProps {
  type: string;
}

export function DraggableModule({ type }: DraggableModuleProps) {
  const { dragRef, listeners, attributes } = useDragItem({
    id: type,
    type,
  });

  return (
    <div
      ref={dragRef}
      {...listeners}
      {...attributes}
      className="p-2 border rounded bg-white shadow text-sm cursor-pointer hover:bg-gray-50"
    >
      {type}
    </div>
  );
}
