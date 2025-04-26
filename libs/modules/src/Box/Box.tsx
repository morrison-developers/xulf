import React from 'react';

import type { BoxProps } from '@xulf/module-props';

/**
 * Box is a flexible layout container inspired by a "Stack" or "Div".
 * You can control layout direction, alignment, and inject custom styles.
 */

/** Parses a raw CSS string into a valid React style object */
function parseInlineStyles(css: string): React.CSSProperties {
  const style: React.CSSProperties = {};
  css.split(';').forEach((decl) => {
    const [prop, value] = decl.split(':').map((s) => s.trim());
    if (prop && value) {
      const jsProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase()); // kebab → camelCase
      (style as any)[jsProp] = value;
    }
  });
  return style;
}

export const Box = (props: BoxProps) => {
  const {
    orientation = 'vertical',
    alignItems = 'stretch',
    justifyContent = 'flex-start',
    gap,
    customStyles,
    children,
  } = props;

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    alignItems,
    justifyContent,
    rowGap: gap?.row ?? 0,
    columnGap: gap?.column ?? 0,
    ...parseInlineStyles(customStyles ?? ''),
  };

  return (
    <div style={style}>
      {children}
    </div>
  );
};

export default Box;
