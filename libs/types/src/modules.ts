import { EventBinding } from './events';
import { ModuleType } from './site';

export type ModuleProps = Record<string, any>; // You can specialize later

export interface ModuleInstance {
  id: string;
  type: ModuleType;
  props: ModuleProps;
  customStyles?: string;
  bindings?: EventBinding[];
}
