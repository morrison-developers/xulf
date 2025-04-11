// components/renderers/ClientModuleRenderer.tsx
'use client';

import { componentRegistry } from '@xulf/modules';
import { LayoutModule } from '../../types/layout';

interface Props {
  modules: LayoutModule[];
}

export default function ClientModuleRenderer({ modules }: Props) {
  return (
    <>
      {modules.map((mod) => {
        const Component = componentRegistry[mod.type];

        if (!Component) {
          console.warn(`Missing component for type: ${mod.type}`);
          return null;
        }

        return (
          <Component
            key={mod.id}
            {...mod.props}
            className={mod.props?.customStyles}
          />
        );
      })}
    </>
  );
}
