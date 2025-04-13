'use client';

import { EditableProp } from '@xulf/modules/src/types';
import { LayoutModule } from '@xulf/types';
import { PropWidget } from './widgets/PropWidget';

export interface PropEditorProps {
  selectedModule: LayoutModule | null;
  editableProps: EditableProp[];
  onPropChange: (key: string, value: any) => void;
}

function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function PropEditor({ selectedModule, editableProps, onPropChange }: PropEditorProps) {
  if (!selectedModule) {
    return <p className="text-sm text-gray-500">Select a module to edit its props.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="text-xs uppercase text-gray-400 tracking-wide">
        {selectedModule.type}
      </div>

      <div className="border p-2 rounded bg-gray-50">
        {editableProps.map(({ name, type, options }) => {
            const kebabName = toKebabCase(name);
            const value = selectedModule.props[kebabName]; // 🪄 use kebab-case lookup

            return (
              <div key={kebabName} className="text-sm">
                <label className="block font-medium text-gray-700 mb-1">{name}</label>
                <PropWidget
                  name={kebabName}
                  type={type}
                  value={value}
                  options={options}
                  onChange={(key, value) => onPropChange(key, value)}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}