'use client';

import { useDropZone } from './useDropZone';

interface DropZoneProps {
  targetId: string | null;
  position: 'inside' | 'above' | 'below';
  onDrop: (draggedId: string, type: string) => void;
}

export function DropZone({ targetId, position, onDrop }: DropZoneProps) {
  const { dropRef, isOver } = useDropZone(targetId, position);

  return (
    <div
      ref={dropRef}
      className={`w-full h-12 transition-all border ${
        isOver ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
      }`}
      style={{ position: 'relative', zIndex: 50 }}
      onClick={() =>
        isOver && targetId && onDrop(targetId, 'module')
      }
    />
  );
}
