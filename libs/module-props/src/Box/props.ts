export interface Gap {
  row?: number;
  column?: number;
}

export interface BoxProps {
  orientation?: 'horizontal' | 'vertical';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-end';
  gap?: Gap;
  customStyles?: string;
  children?: React.ReactNode;
}
