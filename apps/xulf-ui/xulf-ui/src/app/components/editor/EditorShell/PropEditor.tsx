import { EditableProp } from '@xulf/modules/src/types';
import { LayoutModule } from '../../../types/layout';
import { PropWidget } from '../widgets/PropWidget'; // import the PropWidget component
export interface PropEditorProps {
  selectedModule: LayoutModule | null;
  editableProps: EditableProp[];
  onPropChange: (key: string, value: any) => void;
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
        {editableProps.map(({ name, type, options }) => (
          <div key={name} className="text-sm">
            <label className="block font-medium text-gray-700 mb-1">{name}</label>
            <PropWidget
              name={name}
              type={type}
              value={selectedModule.props[name]}
              options={options}
              onChange={(value) => onPropChange(name, value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
