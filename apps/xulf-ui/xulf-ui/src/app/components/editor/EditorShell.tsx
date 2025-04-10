'use client';

import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { v4 as uuid } from 'uuid';
import DroppableCanvas from './DroppableCanvas';
import { type LayoutModule } from '../../types/layout'; // Optional: define later

interface EditorShellProps {
  siteJson: {
    layout: LayoutModule[];
  };
}

function DraggableModule({ type }: { type: string }) {
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

export default function EditorShell({ siteJson }: EditorShellProps) {
  const [layout, setLayout] = useState(siteJson.layout);

  const handleDrop = (event: any) => {
    const { over, active } = event;
    const type = active.data?.current?.type;

    if (over?.id === 'canvas-dropzone' && type) {
      setLayout((prev) => [
        ...prev,
        {
          id: uuid(),
          type,
          props: {
            customStyles: 'p-4 bg-blue-50',
            children: `${type} module`,
          },
        },
      ]);
    }
  };

  return (
    <DndContext onDragEnd={handleDrop}>
      <div className="h-screen w-full overflow-hidden flex">
        {/* Left Panel */}
        <aside className="w-64 border-r bg-white p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold mb-4">Modules</h2>
          <div className="space-y-2">
            <DraggableModule type="box" />
            <DraggableModule type="buttonOverlay" />
            <DraggableModule type="image" />
            <DraggableModule type="modal" />
          </div>
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <h2 className="text-sm font-semibold mb-4">Canvas</h2>
          <DroppableCanvas layout={layout} />
        </main>

        {/* Right Panel */}
        <aside className="w-80 border-l bg-white p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold mb-4">Edit Props</h2>
          <p className="text-sm text-gray-500">Select a module to edit props.</p>
        </aside>
      </div>
    </DndContext>
  );
}
