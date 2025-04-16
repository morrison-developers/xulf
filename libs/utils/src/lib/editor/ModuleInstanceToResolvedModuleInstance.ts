// Function to resolve a ModuleInstance to a ResolvedModuleInstance
import type {
  ModuleInstance,
  ModuleProps,
  ResolvedModuleInstance,
} from '@xulf/types';

import { ModulePropsMap } from '@xulf/modules';

export function ModuleInstanceToResolvedModuleInstance<T extends keyof ModulePropsMap>(
  mod: ModuleInstance<T>,
  allModules: Record<string, ModuleInstance>
): ResolvedModuleInstance<T> {
  const resolvedChildren: ResolvedModuleInstance[] =
    (mod.props.children as string[] | undefined)?.map((childId: string) =>
      ModuleInstanceToResolvedModuleInstance(allModules[childId], allModules)
    ) ?? [];

  return {
    id: mod.id,
    type: mod.type,
    props: {
      ...mod.props,
      children: resolvedChildren, // Resolved to be the correct type based on the module
    } as ModuleProps<T> & { children?: ResolvedModuleInstance<T>[] },
  };
}