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
      className={`h-6 w-full transition-all border-2 rounded 
        ${isOver ? 'border-blue-500 bg-blue-100' : 'border-transparent'}`}
      style={{ position: 'relative', zIndex: 50 }}
    />
  );
}
