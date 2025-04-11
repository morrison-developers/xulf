import React from 'react';

interface Gap {
  /** Row gap between children, in pixels */
  row?: number;
  /** Column gap between children, in pixels */
  column?: number;
}

/**
 * Box is a flexible layout container inspired by a "Stack" or "Div".
 * You can control layout direction, alignment, and inject custom styles.
 */
export interface BoxProps {
  /** Layout orientation for children */
  orientation?: 'horizontal' | 'vertical';
  /** Cross-axis alignment */
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  /** Main-axis spacing */
  justifyContent?: 'flex-start' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-end';
  /** Row/column gap sizes */
  gap?: Gap;
  /** Raw CSS classes (e.g. Tailwind) injected into the Box */
  customStyles?: string;
  /** Content inside the Box */
  children?: React.ReactNode;
}

export const Box = ({
  orientation = 'vertical',
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  gap,
  customStyles,
  children,
}: BoxProps) => {
  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    alignItems,
    justifyContent,
    rowGap: gap?.row ?? 0,
    columnGap: gap?.column ?? 0,
  };

  return (
    <div style={style} className={customStyles}>
      {children}
    </div>
  );
};

export default Box;

export const editableProps = [
  { label: 'orientation', type: 'text' },
  { label: 'alignItems', type: 'text' },
  { label: 'justifyContent', type: 'text' },
  { label: 'customStyles', type: 'text' },
  { label: 'gap.row', type: 'number' },
  { label: 'gap.column', type: 'number' },
];
