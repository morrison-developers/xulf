import { ModuleType, ModuleProps } from './modules';

export interface ModuleMetadata {
  type: ModuleType;
  name: string;
  icon?: string;
  description?: string;
  defaultProps: ModuleProps;
}
