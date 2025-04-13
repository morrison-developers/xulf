// DragAndDropHandler.tsx
import { DragEndEvent } from '@dnd-kit/core';
import { v4 as uuid } from 'uuid';
import { propMetaRegistry } from '@xulf/modules';
import { SiteJSON } from '@xulf/types';

export function DragAndDropHandler(event: DragEndEvent, setEditorState: any, setIsDirty: any) {
  const type = event.active.data?.current?.type;

  if (type) {
    const defaultProps = propMetaRegistry[type]?.find((prop) => prop.name === 'defaultProps')?.name ?? {};

    const newModule = {
      id: uuid(),
      type,
      props: defaultProps,
    };

    setEditorState((prev: SiteJSON) => ({
      ...prev,
      layout: {
        ...prev.layout,
        modules: {
          ...prev.layout.modules,
          [newModule.id]: newModule,
        },
        rootModuleIds: [...prev.layout.rootModuleIds, newModule.id],
      },
    }));
    setIsDirty(true);
    
  }
}
