import Box2 from './Box2';       // Regular Box2 component for the preview
import Box2Editor from './Box2Editor'; // Box2Editor component for the editor mode
import { editorMeta } from './editor';
import { functionMeta } from './functions';

/**
 * Box2 module definition.
 * 
 * This ties together the renderable component, its editor configuration,
 * and its available function graph inputs/outputs.
 */
export const Box2Def = {
  type: 'box2',          // The module's type identifier
  component: Box2,      // The regular component for preview
  editorComponent: Box2Editor,  // The editor-specific component for the editor
  editorMeta,                         // Editor-related metadata (e.g., editable props)
  functionMeta,                       // Function graph metadata
};
