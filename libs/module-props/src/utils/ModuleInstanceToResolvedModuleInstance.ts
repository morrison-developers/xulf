import type {
  ModuleInstance,
  ModuleProps,
  ResolvedModuleInstance,
} from '../index';

export function ModuleInstanceToResolvedModuleInstance(
  mod: ModuleInstance,
  allModules: Record<string, ModuleInstance>
): ResolvedModuleInstance {
  const resolvedChildren: ResolvedModuleInstance[] =
    (mod.props.children as string[] | undefined)?.map((childId: string) =>
      ModuleInstanceToResolvedModuleInstance(allModules[childId], allModules)
    ) ?? [];

  return {
    id: mod.id,
    type: mod.type,
    props: {
      ...mod.props,
      children: resolvedChildren,
    } as ModuleProps & { children?: ResolvedModuleInstance[] },
  };
}
