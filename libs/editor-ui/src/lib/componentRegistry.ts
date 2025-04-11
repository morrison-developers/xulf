import * as Essentials from '@xulf/essentials';
import type { ComponentType } from 'react';

export const componentRegistry: Record<string, ComponentType<any>> = {
  box: Essentials.Box,
  buttonOverlay: Essentials.ButtonOverlay,
  embed: Essentials.Embed,
  image: Essentials.Image,
  modal: Essentials.Modal,
  richText: Essentials.RichText,
};

export const propMetaRegistry: Record<string, { label: string; type: string }[]> = {
  box: Essentials.boxProps,
  buttonOverlay: Essentials.buttonOverlayProps,
  embed: Essentials.embedProps,
  image: Essentials.imageProps,
  modal: Essentials.modalProps,
  richText: Essentials.richTextProps,
};
