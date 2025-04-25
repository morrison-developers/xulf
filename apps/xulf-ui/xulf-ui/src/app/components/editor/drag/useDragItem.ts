import { useDraggable } from '@dnd-kit/core';

export function useDragItem({ id, type }: { id: string; type: string }) {
  const draggable = useDraggable({ id, data: { id, type } });

  return {
    dragRef: draggable.setNodeRef,
    listeners: draggable.listeners,
    attributes: draggable.attributes,
  };
}
