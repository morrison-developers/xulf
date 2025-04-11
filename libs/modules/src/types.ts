export interface EditableProp {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'string[]';
}

export interface EditorMeta {
  displayName: string;
  icon?: string;
  defaultProps: Record<string, any>;
  editableProps: EditableProp[];
}

export interface ModuleDef {
  type: string;
  component: React.FC<any>;
  editorMeta: EditorMeta;
  functionMeta: FunctionMeta;
}

export interface FunctionConfig {
  name: string;
  type: 'string' | 'number' | 'boolean';
  label: string;
}

export interface FunctionIO {
  name: string;
  type: 'action' | 'event';
  config?: FunctionConfig[]; // ✅ Optional config array
}

export interface FunctionMeta {
  inputs: FunctionIO[];
  outputs: FunctionIO[];
}
