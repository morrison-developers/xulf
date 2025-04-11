import { ComponentProps } from 'react';
import { componentRegistry } from '@xulf/editor-ui';
import { Node, Edge } from 'react-flow-renderer';

export type ModuleType = keyof typeof componentRegistry;

export interface LayoutModule {
  id: string;
  type: ModuleType;
  props: ComponentProps<(typeof componentRegistry)[ModuleType]>;
}

export interface SiteJson {
  modules: LayoutModule[];
  functionGraph: {
    nodes: Node[];
    edges: Edge[];
  };
}
