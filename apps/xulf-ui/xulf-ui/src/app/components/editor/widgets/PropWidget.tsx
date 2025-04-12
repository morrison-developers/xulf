"use client";
import { useState } from 'react';
import { FullScreenEditorModal } from '../ui/CustomStylesModal'; // Import modal component

interface PropWidgetProps {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'string[]';
  value: any;
  options?: string[];
  onChange: (value: any) => void;
}

export const PropWidget = ({ name, type, value, options, onChange }: PropWidgetProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCustomStyles = () => {
    if (type === 'string' && name === 'customStyles') {
      setModalOpen(true);
    } else {
      onChange(value);
    }
  };

  switch (type) {
    case 'string':
      if (name === 'customStyles') {
        return (
          <>
            <button
              className="w-full border rounded px-2 py-1 text-sm"
              onClick={handleCustomStyles}
            >
              Edit Custom Styles
            </button>
            <FullScreenEditorModal
              isOpen={isModalOpen}
              initialValue={value || ''}
              onClose={() => setModalOpen(false)}
              onSave={(css) => onChange(css)}
            />
          </>
        );
      }
      return options ? (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
        />
      );
    case 'number':
      return (
        <input
          type="number"
          value={value || 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full border rounded px-2 py-1 text-sm"
        />
      );
    case 'boolean':
      return (
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4"
        />
      );
    default:
      return null;
  }
};
