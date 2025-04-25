'use client';

import { ResolvedModuleInstance } from '@xulf/types';
import { CanvasModule } from '../../../../apps/xulf-ui/xulf-ui/src/app/components/editor/layout/CanvasModule';

export interface Box2EditorProps {
  orientation?: 'horizontal' | 'vertical';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-end';
  gap?: { row?: number; column?: number };
  customStyles?: string;
  children?: ResolvedModuleInstance[];
}

/** Parses a raw CSS string into a valid React style object */
function parseInlineStyles(css: string): React.CSSProperties {
  const style: React.CSSProperties = {};
  css.split(';').forEach((decl) => {
    const [prop, value] = decl.split(':').map((s) => s.trim());
    if (prop && value) {
      const jsProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      (style as any)[jsProp] = value;
    }
  });
  return style;
}

export const Box2Editor = ({
  orientation = 'vertical',
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  gap,
  customStyles,
  children,
}: Box2EditorProps) => {
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
    <div style={style} className="editor-box2">
      {children?.map((child) => (
        <CanvasModule
          key={child.id}
          mod={child}
          isSelected={false}
          onSelect={() => {}}
          connections={[]}
          editableProps={[]}
          onDrop={() => {}}
        />
      ))}
    </div>
  );
};

export default Box2Editor;
