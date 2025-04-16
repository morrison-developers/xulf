import { ModulePropsMap } from '@xulf/modules';
import { ResolvedModuleInstance, LayoutModule } from '@xulf/types';

/**
 * Converts a fully resolved module instance (`ResolvedModuleInstance`) to a LayoutModule.
 * This ensures the `children` are properly converted to LayoutModule[] for rendering.
 */
export function ResolvedModuleInstanceToLayoutModule<T extends keyof ModulePropsMap>(
  resolvedMod: ResolvedModuleInstance<T>
): LayoutModule {
  // Resolve children from ResolvedModuleInstance to LayoutModule
  const resolvedChildren: LayoutModule[] =
    resolvedMod.props.children?.map((child: ResolvedModuleInstance) => ResolvedModuleInstanceToLayoutModule(child)) ?? [];

  return {
    id: resolvedMod.id,
    type: resolvedMod.type,
    props: {
      ...resolvedMod.props,
      children: resolvedChildren, // Use LayoutModule[] for children
    },
  };
}
