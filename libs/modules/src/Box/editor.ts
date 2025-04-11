import type { EditorMeta } from '../types';

/**
 * Editor metadata for the Box module.
 * 
 * - `defaultProps`: values shown when a module is first added to the canvas
 * - `editableProps`: props available in the right-side editor panel
 *   - `name`: key of the prop
 *   - `type`: control type ('string', 'number', 'boolean', or 'string[]')
 */
export const editorMeta: EditorMeta = {
  displayName: 'Box',
  icon: '🧩',
  defaultProps: {
    orientation: 'vertical',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    gap: { row: 0, column: 0 },
    customStyles: 'bg-gray-100 p-4',
    children: 'New Box',
  },
  editableProps: [
    { name: 'orientation', type: 'string' },
    { name: 'alignItems', type: 'string' },
    { name: 'justifyContent', type: 'string' },
    { name: 'gap.row', type: 'number' },
    { name: 'gap.column', type: 'number' },
    { name: 'customStyles', type: 'string' },
    { name: 'children', type: 'string' },
  ],
};
