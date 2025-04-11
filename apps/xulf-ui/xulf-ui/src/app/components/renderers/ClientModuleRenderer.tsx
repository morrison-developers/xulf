'use client';

import { componentRegistry } from '@xulf/editor-ui';
import { LayoutModule } from '../../types/layout';

interface Props {
  modules: LayoutModule[];
}

export default function ClientModuleRenderer({ modules }: Props) {
  return (
    <>
      {modules.map((mod) => {
        const Component = componentRegistry[mod.type];
        if (!Component) return null;

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
