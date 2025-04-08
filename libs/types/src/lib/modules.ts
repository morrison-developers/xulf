import { EventBinding } from './events';

export type ModuleType =
  | 'Box'
  | 'ButtonOverlay'
  | 'Image'
  | 'Modal'
  | 'Embed'
  | 'RichText';

export type ModuleProps = Record<string, any>; // You can specialize later

export interface ModuleInstance {
  id: string;
  type: ModuleType;
  props: ModuleProps;
  customStyles?: string;
  bindings?: EventBinding[];
}
