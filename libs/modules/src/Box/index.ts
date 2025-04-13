import Box from './Box';       // Regular Box component for the preview
import BoxEditor from './BoxEditor'; // BoxEditor component for the editor mode
import { editorMeta } from './editor';
import { functionMeta } from './functions';

/**
 * Box module definition.
 * 
 * This ties together the renderable component, its editor configuration,
 * and its available function graph inputs/outputs.
 */
export const BoxDef = {
  type: 'box',          // The module's type identifier
  component: Box,      // The regular component for preview
  editorComponent: BoxEditor,  // The editor-specific component for the editor
  editorMeta,                         // Editor-related metadata (e.g., editable props)
  functionMeta,                       // Function graph metadata
};
