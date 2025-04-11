'use client';

import { componentRegistry } from '@xulf/modules';
import { getFunctionProps } from '@xulf/utils';

import type { LayoutModule } from '../../../types/layout';

interface CanvasModuleProps {
  mod: LayoutModule;
  isSelected: boolean;
  onSelect: (id: string) => void;
  connections: { input: string; event: string }[];
}

export function CanvasModule({ mod, isSelected, onSelect, connections }: CanvasModuleProps) {
  const Component = componentRegistry[mod.type];
  if (!Component) {
    return (
      <div className="border p-4 text-red-500">
        Unknown module type: {mod.type}
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelect(mod.id)}
      className={`group relative border rounded p-3 transition cursor-pointer ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <Component {...mod.props} {...getFunctionProps(mod.id, connections)} />
      <span className="absolute top-1 right-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition">
        {mod.type}
      </span>
    </div>
  );
}
