import { useDroppable } from '@dnd-kit/core';
import { componentRegistry } from '@xulf/editor-ui';

export default function DroppableCanvas({ layout }: { layout: any[] }) {
  const { setNodeRef } = useDroppable({ id: 'canvas-dropzone' });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[300px] border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-4"
    >
      {layout.length === 0 ? (
        <div className="text-gray-400 text-center py-12">Drop modules here</div>
      ) : (
        layout.map((mod) => {
          const Component = componentRegistry[mod.type];
          if (!Component) return null;
          return <Component key={mod.id} {...mod.props} />;
        })
      )}
    </div>
  );
}
