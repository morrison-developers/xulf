import React from 'react';

interface Gap {
  /** Row gap between children, in pixels */
  row?: number;
  /** Column gap between children, in pixels */
  column?: number;
}

/**
 * Box3 is a flexible layout container inspired by a "Stack" or "Div".
 * You can control layout direction, alignment, and inject custom styles.
 */
export interface Box3Props {
  /** Layout orientation for children */
  orientation?: 'horizontal' | 'vertical';
  /** Cross-axis alignment */
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  /** Main-axis spacing */
  justifyContent?: 'flex-start' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-end';
  /** Row/column gap sizes */
  gap?: Gap;
  /** Raw CSS string applied inline to the container */
  customStyles?: string;
  /** Content inside the container */
  children?: React.ReactNode;
}

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

export const Box3 = (props: Box3Props) => {
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

export default Box3;
