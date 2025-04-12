import type { EditorMeta } from '../types';

export const editorMeta: EditorMeta = {
  displayName: 'Box',
  icon: '🧩',
  defaultProps: {
    customStyles: '',
    children: 'New Box',
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
    "name": "alignItems",
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
    "name": "justifyContent",
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
    "name": "customStyles",
    "type": "string"
  },
  {
    "name": "children",
    "type": "string"
  }
],
};
