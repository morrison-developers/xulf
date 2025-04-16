'use client';

import { DndContext, useDraggable, useDroppable, rectIntersection } from '@dnd-kit/core';
import { DndProvider } from '../components/editor/drag/DndProvider';
import { useDropZone } from '../components/editor/drag/useDropZone';
import { useDragItem } from '../components/editor/drag/useDragItem';

function NativeDraggableBox() {
  const { setNodeRef, listeners, attributes } = useDraggable({ id: 'native-box' });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-4 bg-red-500 text-white cursor-move"
    >
      Native: Drag me
    </div>
  );
}

function NativeDroppableZone() {
  const { setNodeRef, isOver } = useDroppable({ id: 'native-zone' });

  return (
    <div
      ref={setNodeRef}
      className={`w-full h-24 border-4 ${
        isOver ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
      }`}
    >
      Native: Drop here
    </div>
  );
}

function CustomDraggableBox() {
  const { dragRef, listeners, attributes } = useDragItem({
    id: 'custom-box',
    type: 'box',
  });

  return (
    <div
      ref={dragRef}
      {...listeners}
      {...attributes}
      className="p-4 text-white bg-green-500 cursor-move"
    >
      Custom: Drag me
    </div>
  );
}

function CustomDroppableZone() {
  const targetId = 'custom-zone';
  const position = 'inside';

  const { dropRef, isOver } = useDropZone(targetId, position);

  return (
    <div
      ref={dropRef}
      className={`w-full h-24 border-4 ${
        isOver ? 'border-purple-500 bg-purple-100' : 'border-gray-300'
      }`}
    >
      Custom: Drop here
    </div>
  );
}

export default function DndTestPage() {
  return (
    <div className="grid grid-cols-2 gap-8 p-8">
      {/* Native dnd-kit test */}
      <div className="space-y-4 border p-4 rounded shadow">
        <h2 className="font-bold text-lg">Native DnDKit</h2>
        <DndContext collisionDetection={rectIntersection}>
          <NativeDraggableBox />
          <NativeDroppableZone />
        </DndContext>
      </div>

      {/* Custom DnD context test */}
      <div className="space-y-4 border p-4 rounded shadow">
        <h2 className="font-bold text-lg">Custom useDrag + Provider</h2>
        <DndProvider>
          <CustomDraggableBox />
          <CustomDroppableZone />
        </DndProvider>
      </div>
    </div>
  );
}
