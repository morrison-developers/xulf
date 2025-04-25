import { useDroppable } from '@dnd-kit/core';
import { makeDroppableId } from './utils/makeDroppableId';

export function useDropZone(targetId: string | null, position: 'inside' | 'above' | 'below') {
  const droppableId = makeDroppableId(targetId, position);
  const droppable = useDroppable({
    id: droppableId,
    data: { targetId, position },
  });

  return {
    dropRef: droppable.setNodeRef,
    isOver: droppable.isOver,
  };
}
