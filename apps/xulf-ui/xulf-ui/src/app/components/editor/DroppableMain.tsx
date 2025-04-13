'use client';

import { useDroppable } from '@dnd-kit/core';
import React from 'react';

interface DroppableMainProps {
  children: React.ReactNode;
}

export function DroppableMain({ children }: DroppableMainProps) {
  const { setNodeRef } = useDroppable({ id: 'canvas-dropzone' });

  return (
    <main ref={setNodeRef} className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      {children}
    </main>
  );
}
