// MODULE IMPORTS
import { BoxDef } from './Box';
import { Box2Def } from './Box2';
import { Box3Def } from './Box3';
// AUTO-IMPORT MODULES HERE

import type { ModulePropsMap } from './generated/ModulePropsMap';
import type { ModuleDef } from './types';

export const allModules: ModuleDef[] = [
  BoxDef,
  Box2Def,
  Box3Def,
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