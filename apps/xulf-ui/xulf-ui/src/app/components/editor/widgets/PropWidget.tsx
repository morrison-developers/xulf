"use client";
import { useState } from "react";
import { FullScreenEditorModal } from "../ui/CustomStylesModal"; // Import modal component

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

  // Render custom styles button when 'customStyles' prop is passed for string type
  const renderStringInput = () => {
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
            onSave={(css) => {
              setModalOpen(false);
              onChange(css);
            }}
          />
        </>
      );
    }
    // For other string fields, use input or select
    if (options) {
      return (
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
      );
    }

    return (
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-2 py-1 text-sm"
      />
    );
  };

  const renderNumberInput = () => (
    <input
      type="number"
      value={value || 0}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full border rounded px-2 py-1 text-sm"
    />
  );

  const renderBooleanInput = () => (
    <input
      type="checkbox"
      checked={!!value}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4"
    />
  );

  switch (type) {
    case 'string':
      return renderStringInput();
    case 'number':
      return renderNumberInput();
    case 'boolean':
      return renderBooleanInput();
    default:
      return null;
  }
};
