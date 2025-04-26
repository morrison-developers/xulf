import type { ModulePropsMap, EventBinding } from '@xulf/module-props';

export const MODULE_TYPES = ['box', 'box2', 'box3'] as const;
export type ModuleType = typeof MODULE_TYPES[number];

export type ModuleProps = ModulePropsMap[ModuleType];

export interface ModuleInstance {
  id: string;
  type: ModuleType;
  props: ModuleProps;
  bindings?: EventBinding[];
  children?: string[];
}

export type ResolvedModuleInstance = {
  id: string;
  type: ModuleType;
  props: ModuleProps & {
    children?: ResolvedModuleInstance[];
  };
};
