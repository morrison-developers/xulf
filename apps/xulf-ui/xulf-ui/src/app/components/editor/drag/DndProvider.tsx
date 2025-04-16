'use client';
import { createContext, useContext, useState } from 'react';
import { DndContext as KitDndContext, rectIntersection } from '@dnd-kit/core'; // 👈 rename dnd-kit context

type DropPosition = 'inside' | 'above' | 'below';

interface DndState {
  draggingId: string | null;
  draggingType: string | null;
  dropTargetId: string | null;
  dropPosition: DropPosition | null;
  isDragging: boolean;
}

type DropPayload = {
  draggedId: string;
  type: string;
  targetId: string | null;
  position: DropPosition;
};

export const CustomDndContext = createContext<{
  dnd: DndState;
  setDragging: (id: string | null, type: string | null) => void;
  setDropTarget: (id: string | null, position: DropPosition | null) => void;
  onDropHandler: (payload: DropPayload) => void;
  setOnDropHandler: (fn: (payload: DropPayload) => void) => void;
}>({
  dnd: {
    draggingId: null,
    draggingType: null,
    dropTargetId: null,
    dropPosition: null,
    isDragging: false,
  },
  setDragging: () => {},
  setDropTarget: () => {},
  onDropHandler: () => {},
  setOnDropHandler: () => {},

});

export const DndProvider = ({ children }: { children: React.ReactNode }) => {
  const [onDropHandler, _setOnDropHandler] = useState<((payload: DropPayload) => void) | null>(null);
  const [dnd, setDnd] = useState<DndState>({
    draggingId: null,
    draggingType: null,
    dropTargetId: null,
    dropPosition: null,
    isDragging: false,
  });

  const setDragging = (id: string | null, type: string | null) => {
    setDnd((s) => {
      const updated = {
        ...s,
        draggingId: id,
        draggingType: type,
        isDragging: id !== null && type !== null,
      };
      return updated;
    });
  };

  const setDropTarget = (id: string | null, position: DropPosition | null) => {
    setDnd((s) => {
      const updated = {
        ...s,
        dropTargetId: id,
        dropPosition: position,
      };
      return updated;
    });
  };

  const setOnDropHandler = (fn: (payload: DropPayload) => void) => {
    _setOnDropHandler(() => fn);
  };

  return (
    <KitDndContext
      collisionDetection={rectIntersection}
      onDragEnd={(event) => {
        const { id: draggedId, type } = event.active.data.current ?? {};
        const dropData = event.over?.data.current;
      
        if (
          onDropHandler &&
          draggedId &&
          type &&
          dropData?.position &&
          typeof dropData.targetId !== 'undefined'
        ) {
          onDropHandler({
            draggedId,
            type,
            targetId: dropData.targetId ?? null,
            position: dropData.position,
          });
        } else {
          console.warn('❌ onDropHandler skipped — invalid drop payload or handler not set:', {
            draggedId,
            type,
            dropData,
            onDropHandler,
          });
        }
      
        setDragging(null, null);
      }}
    >
      <CustomDndContext.Provider
        value={{
          dnd,
          setDragging,
          setDropTarget,
          onDropHandler: onDropHandler ?? (() => {}),
          setOnDropHandler,
        }}
      >
        {children}
      </CustomDndContext.Provider>
    </KitDndContext>
  );  
};

export const useDnd = () => useContext(CustomDndContext);
