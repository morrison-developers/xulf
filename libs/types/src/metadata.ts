import {  ModuleProps } from './modules';
import { ModuleType } from './site';

export interface ModuleMetadata {
  type: ModuleType;
  name: string;
  icon?: string;
  description?: string;
  defaultProps: ModuleProps;
}
