'use client';

interface Props {
  type: string;
}

export function DraggableFunctionNode({ type }: Props) {
  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('application/x-function-node', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="p-2 border rounded bg-white shadow text-sm cursor-move hover:bg-gray-50"
    >
      {type}
    </div>
  );
}
