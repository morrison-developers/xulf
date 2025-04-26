// MODULE IMPORTS
import { BoxDef } from './Box';
// AUTO-IMPORT MODULES HERE

import type { ModulePropsMap } from '@xulf/module-props';
import type { ModuleDef } from '@xulf/types';

export const allModules: ModuleDef[] = [
  BoxDef,
// AUTO-REGISTER MODULES HERE
];

export const componentRegistry = Object.fromEntries(
  allModules.map((m) => [m.type, m.component])
);


export const editorComponentRegistry = Object.fromEntries(
  allModules.map((m) => [m.type, m.editorComponent])
);

export const propMetaRegistry = Object.fromEntries(
  allModules.map((m) => [m.type, m.editorMeta.editableProps])
);

export const functionRegistry = Object.fromEntries(
  allModules.map((m) => [m.type, m.functionMeta])
);

export { ModulePropsMap }