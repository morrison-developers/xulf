import * as Essentials from '@xulf/essentials';
import { ComponentType } from 'react';

export const componentRegistry: Record<string, ComponentType<any>> = {
  box: Essentials.Box,
  buttonOverlay: Essentials.ButtonOverlay,
  embed: Essentials.Embed,
  image: Essentials.Image,
  modal: Essentials.Modal,
  richText: Essentials.RichText,
};
