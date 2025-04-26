'use client';

import { Fragment, useEffect, useCallback } from 'react';
import { DropZone, useDnd } from '@xulf/drag';
import { CanvasModule } from '../layout/CanvasModule';
import { PropEditor } from '../props/PropEditor';
import { EditorSidebar } from '../sidebar/EditorSidebar';
import { useEditorState } from '../hooks/useEditorState';
import { v4 as uuid } from 'uuid';
// import { editorComponentRegistry } from '@xulf/modules';
import type { ModulePropsMap } from '@xulf/modules';
import { ModuleInstance, SiteJSON, ModuleType, ModuleInstanceToResolvedModuleInstance } from '@xulf/module-props'

interface EditorShellProps {
  siteId: string;
  siteJson: SiteJSON;
}

export default function EditorShell({ siteId, siteJson }: EditorShellProps) {
  const {
    editorState,
    setEditorState,
    selectedId,
    setSelectedId,
    saveStatus,
    editableProps,
    isDirty,
    setIsDirty,
    saveLayout,
    selectedModule,
  } = useEditorState(siteJson, siteId);

  const { setOnDropHandler } = useDnd();

  const handlePropChange = (moduleId: string, key: string, value: any) => {
    setEditorState((prev: SiteJSON) => {
      const mod = ModuleInstanceToResolvedModuleInstance(
        editorState.layout.modules[moduleId],
        editorState.layout.modules
      );

      if (!mod) return prev;

      const updatedModule = {
        ...mod,
        props: {
          ...mod.props,
          [key]: value,
        },
      };

      setIsDirty(true);
      return {
        ...prev,
        layout: {
          ...prev.layout,
          modules: {
            ...prev.layout.modules,
            [moduleId]: updatedModule,
          },
        },
      } as SiteJSON;
    });
  };

  const handleDropToRoot = useCallback((draggedId: string, type: string, index: number) => {
    setEditorState((prev: SiteJSON) => {
      const layout = { ...prev.layout };

      if (!layout.modules[draggedId]) {
        const typedType = type as ModuleType;

        layout.modules[draggedId] = {
          id: draggedId,
          type: typedType,
          props: {} as ModulePropsMap[typeof typedType],
          children: [],
        };
      }

      Object.values(layout.modules).forEach((mod) => {
        mod.children = mod.children?.filter((id) => id !== draggedId) ?? [];
      });

      const newRootIds = layout.rootModuleIds.filter((id) => id !== draggedId);
      newRootIds.splice(index, 0, draggedId);

      return {
        ...prev,
        layout: {
          ...layout,
          rootModuleIds: newRootIds,
        },
      };
    });

    setIsDirty(true);
  }, [setEditorState, setIsDirty]);

  const handleDropToModule = useCallback((draggedId: string, type: string, targetId: string, position: 'inside' | 'above' | 'below') => {
    setEditorState((prev) => {
      const layout = { ...prev.layout };

      Object.values(layout.modules).forEach((mod) => {
        mod.children = mod.children?.filter((id) => id !== draggedId) ?? [];
      });

      if (!layout.modules[draggedId]) {
        const typedType = type as ModuleType;

        layout.modules[draggedId] = {
          id: draggedId,
          type: typedType,
          props: {} as ModulePropsMap[typeof typedType],
          children: [],
        };
      }

      if (position === 'inside') {
        layout.modules[targetId].children = [
          ...(layout.modules[targetId].children ?? []),
          draggedId,
        ];
      } else {
        const parent = Object.values(layout.modules).find((mod) =>
          mod.children?.includes(targetId)
        );

        if (parent) {
          const siblings = parent.children!;
          const idx = siblings.indexOf(targetId);
          const insertAt = position === 'above' ? idx : idx + 1;
          siblings.splice(insertAt, 0, draggedId);
        } else {
          const idx = layout.rootModuleIds.indexOf(targetId);
          const newRootIds = layout.rootModuleIds.filter((id) => id !== draggedId);
          const insertAt = position === 'above' ? idx : idx + 1;
          newRootIds.splice(insertAt, 0, draggedId);
          layout.rootModuleIds = newRootIds;
        }
      }

      return { ...prev, layout };
    });

    setIsDirty(true);
  }, [setEditorState, setIsDirty]);

  useEffect(() => {
    setOnDropHandler((payload) => {
      if (!payload?.draggedId || !payload?.type) return;

      const { draggedId: originalId, type, targetId, position } = payload;
      const isNew = !editorState.layout.modules[originalId];

      let draggedId = originalId;

      if (isNew) {
        const newId = uuid();
        draggedId = newId;

        const typedType = type as ModuleType;

        const newModule: ModuleInstance = {
          id: newId,
          type: typedType,
          props: {} as ModulePropsMap[typeof typedType],
          children: [],
        };

        setEditorState((prev) => ({
          ...prev,
          layout: {
            ...prev.layout,
            modules: {
              ...prev.layout.modules,
              [newId]: newModule,
            },
          },
        }));
      }

      if (targetId === null) {
        handleDropToRoot(draggedId, type, 0);
      } else {
        handleDropToModule(draggedId, type, targetId, position);
      }
    });
  }, [editorState.layout.modules, handleDropToModule, handleDropToRoot, setOnDropHandler]);

  return (
    <div className="h-screen w-full overflow-hidden flex">
      <EditorSidebar />

      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">Canvas</h2>
          <button
            onClick={() => saveLayout(editorState)}
            disabled={!isDirty}
            className="text-xs px-3 py-1 border rounded bg-white shadow disabled:opacity-50"
          >
            {saveStatus === 'saving'
              ? 'Saving...'
              : saveStatus === 'saved'
              ? 'Saved ✓'
              : isDirty
              ? 'Save Changes'
              : 'No Changes'}
          </button>
        </div>

        {editorState.layout.rootModuleIds.length === 0 ? (
          <DropZone targetId={null} position="inside" onDrop={(id, type) => handleDropToRoot(id, type, 0)} />
        ) : (
          editorState.layout.rootModuleIds.map((id, index) => {
            const mod = editorState.layout.modules[id];
            const resolvedMod = ModuleInstanceToResolvedModuleInstance(mod, editorState.layout.modules);

            return (
              <Fragment key={id}>
                <DropZone
                  targetId={null}
                  position="above"
                  onDrop={(draggedId, type) => handleDropToRoot(draggedId, type, index)}
                />
                <CanvasModule
                  mod={resolvedMod}
                  isSelected={resolvedMod.id === selectedId}
                  onSelect={(id) => setSelectedId(id)}
                  connections={[]}
                  editableProps={resolvedMod.id === selectedId ? editableProps : []}
                  onDrop={(draggedId, type, targetId, pos) =>
                    handleDropToModule(draggedId, type, targetId, pos)
                  }
                />
                {index === editorState.layout.rootModuleIds.length - 1 && (
                  <DropZone
                    targetId={null}
                    position="below"
                    onDrop={(draggedId, type) => handleDropToRoot(draggedId, type, index + 1)}
                  />
                )}
              </Fragment>
            );
          })
        )}
      </div>

      <aside className="w-80 border-l bg-white p-4 overflow-y-auto">
        <h2 className="text-sm font-semibold mb-4">Edit Props</h2>
        <PropEditor
          selectedModule={selectedModule}
          editableProps={editableProps}
          onPropChange={(key, value) => {
            if (selectedModule) {
              handlePropChange(selectedModule.id, key, value);
            }
          }}
        />
      </aside>
    </div>
  );
}
