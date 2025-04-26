import { ComponentProps } from 'react';
import { ModuleInstance, ModuleType, LogicConnection } from '@xulf/module-props';
import { componentRegistry } from '@xulf/modules';


export interface SiteJSON {
  id: string;
  name: string;
  layout: {
    rootModuleIds: string[]; // Ordered layout
    modules: Record<string, ModuleInstance>; // id → module
  };
  functions: LogicConnection[];
  createdAt: string;
  updatedAt: string;
}

export interface LayoutModule {
  id: string;
  type: ModuleType;
  props: ComponentProps<typeof componentRegistry[ModuleType]>;
  children?: LayoutModule[];  // To support nested modules
}

export interface FunctionConnection {
  from: string; // node id
  to: string;   // node id
  type: 'event' | 'action'; // optional: use to differentiate
}
