import type { EditorMeta } from '../types';

export const editorMeta: EditorMeta = {
  displayName: 'Box2',
  icon: '🧩',
  defaultProps: {
    customStyles: '',
    children: 'New Box2',
  },
  editableProps: [
  {
    "name": "orientation",
    "type": "string",
    "options": [
      "horizontal",
      "vertical"
    ]
  },
  {
    "name": "align-items",
    "type": "string",
    "options": [
      "flex-start",
      "center",
      "flex-end",
      "stretch",
      "baseline"
    ]
  },
  {
    "name": "justify-content",
    "type": "string",
    "options": [
      "flex-start",
      "center",
      "space-between",
      "space-around",
      "space-evenly",
      "flex-end"
    ]
  },
  {
    "name": "gap",
    "type": "string"
  },
  {
    "name": "custom-styles",
    "type": "string"
  },
  {
    "name": "children",
    "type": "string"
  }
],
};
