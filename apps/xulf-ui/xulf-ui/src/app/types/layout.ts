import { ComponentProps } from 'react';
import { componentRegistry } from '@xulf/editor-ui';

export type ModuleType = keyof typeof componentRegistry;

export interface LayoutModule {
  id: string;
  type: ModuleType;
  props: ComponentProps<(typeof componentRegistry)[ModuleType]>;
}

export interface SiteJson {
  modules: LayoutModule[];
}
