'use client';

import { useDnd } from '../drag/DndProvider';

interface DropTargetOverlayProps {
  id: string;
}

export function DropTargetOverlay({ id }: DropTargetOverlayProps) {
  const { dnd } = useDnd();

  const isActive =
    dnd.dropTargetId === id &&
    (dnd.dropPosition === 'inside' || dnd.dropPosition === 'above' || dnd.dropPosition === 'below');

  if (!isActive) return null;

  const borderClass =
    dnd.dropPosition === 'inside'
      ? 'ring-2 ring-blue-400'
      : dnd.dropPosition === 'above'
      ? 'border-t-4 border-blue-400'
      : 'border-b-4 border-blue-400';

  return (
    <div
      className={`absolute inset-0 pointer-events-none transition-all duration-150 ${borderClass}`}
    />
  );
}
