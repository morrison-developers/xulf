import { ResolvedModuleInstance, LayoutModule } from '../index';

/**
 * Converts a fully resolved module instance (`ResolvedModuleInstance`) to a LayoutModule.
 */
export function ResolvedModuleInstanceToLayoutModule(
  resolvedMod: ResolvedModuleInstance
): LayoutModule {
  const resolvedChildren: LayoutModule[] =
    resolvedMod.props.children?.map((child: ResolvedModuleInstance) =>
      ResolvedModuleInstanceToLayoutModule(child)
    ) ?? [];

  return {
    id: resolvedMod.id,
    type: resolvedMod.type,
    props: {
      ...resolvedMod.props,
      children: resolvedChildren,
    },
  };
}
