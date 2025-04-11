import styled from 'styled-components';

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
  /** Raw CSS injected into the Box */
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
  const StyledBox = styled.div`
    display: flex;
    flex-direction: ${orientation === 'horizontal' ? 'row' : 'column'};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    row-gap: ${gap?.row ?? 0}px;
    column-gap: ${gap?.column ?? 0}px;
    ${customStyles || ''}
  `;

  return <StyledBox>{children}</StyledBox>;
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
