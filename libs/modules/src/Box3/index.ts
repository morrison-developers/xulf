import Box3 from './Box3';       // Regular Box3 component for the preview
import Box3Editor from './Box3Editor'; // Box3Editor component for the editor mode
import { editorMeta } from './editor';
import { functionMeta } from './functions';

/**
 * Box3 module definition.
 * 
 * This ties together the renderable component, its editor configuration,
 * and its available function graph inputs/outputs.
 */
export const Box3Def = {
  type: 'box3',          // The module's type identifier
  component: Box3,      // The regular component for preview
  editorComponent: Box3Editor,  // The editor-specific component for the editor
  editorMeta,                         // Editor-related metadata (e.g., editable props)
  functionMeta,                       // Function graph metadata
};
