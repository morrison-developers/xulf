import { ModuleInstance, ResolvedModuleInstance } from '@xulf/types';

/**
 * Converts a fully resolved module instance (`ResolvedModuleInstance`) back to the simpler, raw
 * format (`ModuleInstance`), where the children are represented as IDs (not full objects).
 */
export function ResolvedModuleInstanceToModuleInstance(
  resolvedMod: ResolvedModuleInstance,
  allModules: Record<string, ModuleInstance>
): ModuleInstance {
  const childrenIds =
    resolvedMod.props.children?.map((child: ResolvedModuleInstance) => child.id) ?? [];

  return {
    id: resolvedMod.id,
    type: resolvedMod.type,
    props: {
      ...resolvedMod.props,
      children: childrenIds,
    },
  };
}
