import {  ModuleProps, ModuleType } from '@xulf/module-props';

export interface ModuleMetadata {
  type: ModuleType;
  name: string;
  icon?: string;
  description?: string;
  defaultProps: ModuleProps;
}
