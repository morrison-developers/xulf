import { useDroppable } from '@dnd-kit/core';
import { CanvasRenderer } from './CanvasRenderer';

export default function DroppableCanvas({
  layout,
  selectedId,
  onSelect,
}: {
  layout: any[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const { setNodeRef } = useDroppable({ id: 'canvas-dropzone' });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white"
    >
      {layout.length === 0 ? (
        <div className="text-gray-400 text-center py-12">Drop modules here</div>
      ) : (
        <CanvasRenderer layout={layout} selectedId={selectedId} onSelect={onSelect} />
      )}
    </div>
  );
}
