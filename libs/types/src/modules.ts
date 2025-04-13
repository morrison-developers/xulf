import { EventBinding } from './events';
import type { ModulePropsMap } from '@xulf/modules';

export type ModuleProps<T extends keyof ModulePropsMap = keyof ModulePropsMap> = ModulePropsMap[T];

export interface ModuleInstance<T extends keyof ModulePropsMap = keyof ModulePropsMap> {
  id: string;
  type: T;
  props: ModuleProps<T>;
  bindings?: EventBinding[];
}
