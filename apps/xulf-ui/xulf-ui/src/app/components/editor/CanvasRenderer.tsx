// CanvasRenderer.tsx
import { componentRegistry } from '@xulf/modules';
import clsx from 'clsx';

interface CanvasRendererProps {
  layout: any[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CanvasRenderer({ layout, selectedId, onSelect }: CanvasRendererProps) {
  return (
    <div className="space-y-4">
      {layout.map((mod) => {
        const Component = componentRegistry[mod.type];
        if (!Component) {
          return (
            <div key={mod.id} className="border p-4 text-red-500">
              Unknown module type: {mod.type}
            </div>
          );
        }

        return (
          <div
            key={mod.id}
            onClick={() => onSelect(mod.id)}
            className={clsx(
              'group relative border rounded p-3 transition cursor-pointer',
              selectedId === mod.id
                ? 'border-blue-500 ring-2 ring-blue-300'
                : 'border-gray-300 hover:border-gray-400'
            )}
          >
            <Component {...mod.props} />

            <span className="absolute top-1 right-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition">
              {mod.type}
            </span>
          </div>
        );
      })}
    </div>
  );
}
