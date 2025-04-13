import { useState, useMemo, useEffect } from 'react';
import { propMetaRegistry } from '@xulf/modules';
import debounce from 'lodash/debounce';
import { WiringMap, SiteJSON } from '@xulf/types';

const DEFAULT_FUNCTION_GRAPH = { nodes: [], edges: [] };

/**
 * Hook for managing editor state, including module layout, selected module,
 * editable props, and function graph wiring.
 *
 * @param siteJson - Initial layout and function graph loaded from the server
 * @param siteId - The site ID used to fetch and persist data
 * @returns All editor state + update/setter helpers
 */
export function useEditorState(siteJson: SiteJSON, siteId: string) {
  /**
   * Complete editor state, including modules and function graph.
   */
  const [editorState, setEditorState] = useState<SiteJSON>(() => siteJson ?? {
    id: '',
    name: '',
    layout: {
      rootModuleIds: [],
      modules: {},
    },
    functions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  /**
   * Currently selected module ID in the canvas.
   */
  const [selectedId, setSelectedId] = useState<string | null>(null);

  /**
   * Tracks save operation status.
   */
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  /**
   * Indicates if the editor state has unsaved changes.
   */
  const [isDirty, setIsDirty] = useState(false);

  /**
   * The full module object for the selected module, or null.
   */
  const selectedModule = Object.values(editorState.layout?.modules ?? {}).find(
    (m) => m.id === selectedId
  ) ?? null;  

  /**
   * The editable props metadata for the selected module, based on its type.
   */
  const editableProps = selectedModule ? propMetaRegistry[selectedModule.type] ?? [] : [];

  /**
   * A computed map of logic connections for each module, used to drive visual/function wiring.
   * Format: { [targetModuleId]: [{ input, event }] }
   */
  // const wiringMap: WiringMap = useMemo(() => {
  //   const map: WiringMap = {};
  //   for (const edge of editorState.functions?.from ?? []) {
  //     const [sourceId, sourceEvent] = edge.source.split(':');
  //     const [targetId] = edge.target.split(':');
  //     if (!map[targetId]) map[targetId] = [];
  //     map[targetId].push({ input: sourceId, event: sourceEvent });
  //   }
  //   return map;
  // }, [editorState.functions]);
  
  /**
   * Debounced function to persist the current layout to the server.
   * Only triggers if isDirty is true or explicitly called.
   */
  const saveLayout = useMemo(
    () =>
      debounce(async (newState: SiteJSON) => {
        console.log('Saving layout...', newState);
        setSaveStatus('saving');
        await fetch(`/api/sites/${siteId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newState),
        });
        console.log('Layout saved successfully.');
        setSaveStatus('saved');
        setIsDirty(false);
        setTimeout(() => {
          setSaveStatus('idle');
        }, 1500);
      }, 2000),
    [siteId]
  );

  // Cancel debounced save when unmounting to avoid memory leaks
  useEffect(() => {
    return () => {
      saveLayout.cancel();
    };
  }, [saveLayout]);

  /**
   * Fetch the layout and function graph from the server when the siteId changes or on initial load.
   */
  useEffect(() => {
    const controller = new AbortController();
    const fetchLayout = async () => {
      try {
        const res = await fetch(`/api/sites/${siteId}`, { signal: controller.signal });
        const data = await res.json();
        if (data.layoutJson?.layout && data.layoutJson?.functions) {
          setEditorState(data.layoutJson);
        }        
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          // Request was aborted
        } else {
          console.error('Failed to fetch layout:', err);
        }
      }
    };

    fetchLayout();
    return () => controller.abort();
  }, [siteId]);

  /**
   * Auto-save the layout when dirty changes to true.
   */
  useEffect(() => {
    if (isDirty) {
      saveLayout(editorState);
    }
  }, [isDirty, editorState, saveLayout]);

  return {
    editorState,
    setEditorState,
    selectedId,
    setSelectedId,
    saveStatus,
    editableProps,
    isDirty,
    setIsDirty,
    saveLayout,
    // wiringMap,
    selectedModule,
  };
}
