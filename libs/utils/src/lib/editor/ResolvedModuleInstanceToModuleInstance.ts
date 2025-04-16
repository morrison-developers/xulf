import { ModulePropsMap } from '@xulf/modules';
import { ModuleInstance, ResolvedModuleInstance } from '@xulf/types';

/**
 * Converts a fully resolved module instance (`ResolvedModuleInstance`) back to the simpler, raw
 * format (`ModuleInstance`), where the children are represented as IDs (not full objects).
 */
export function ResolvedModuleInstanceToModuleInstance<T extends keyof ModulePropsMap>(
  resolvedMod: ResolvedModuleInstance<T>,
  allModules: Record<string, ModuleInstance>
): ModuleInstance<T> {
  // Extract child IDs from resolved children
  const childrenIds = resolvedMod.props.children?.map((child: ResolvedModuleInstance) => child.id) ?? [];

  // Return a simplified module instance with children as IDs (not resolved instances)
  return {
    id: resolvedMod.id,
    type: resolvedMod.type,
    props: {
      ...resolvedMod.props,
      children: childrenIds,  // Flatten children to IDs
    },
  };
}
