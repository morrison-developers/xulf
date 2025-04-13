// useDraggableModule.tsx
import { useDraggable } from '@dnd-kit/core';
import type { LayoutModule } from '@xulf/types';

export function useDraggableModule(mod: LayoutModule) {
  return useDraggable({
    id: mod.id,
    data: { type: mod.type, id: mod.id },
  });
}
