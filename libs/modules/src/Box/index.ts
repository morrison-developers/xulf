import Component from './Box';
import { editorMeta } from './editor';
import { functionMeta } from './functions';

/**
 * Box module definition.
 * 
 * This ties together the renderable component, its editor configuration,
 * and its available function graph inputs/outputs.
 */
export const BoxDef = {
  type: 'box',
  component: Component,
  editorMeta,
  functionMeta,
};
