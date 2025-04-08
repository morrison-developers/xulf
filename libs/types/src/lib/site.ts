import { ModuleInstance } from './modules';
import { LogicConnection } from './events';


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
