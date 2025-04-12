import * as path from 'path';
import * as fs from 'fs';
import { Project } from 'ts-morph';

const MODULES_DIR = path.resolve(__dirname, '../src');

function getPropsInterfaceName(fileName: string): string {
  const base = path.basename(fileName, '.tsx');
  return `${base}Props`;
}

function extractEditableProps(interfaceName: string, filePath: string) {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);
  const propsInterface = sourceFile.getInterface(interfaceName);

  if (!propsInterface) {
    console.warn(`⚠️  Interface ${interfaceName} not found in ${filePath}`);
    return [];
  }

  return propsInterface.getProperties().map((prop) => {
    const name = prop.getName();
    const typeNode = prop.getTypeNode();
    const typeText = typeNode?.getText() || '';

    if (typeText.includes('|') && typeText.includes(`'`)) {
      const options = typeText
        .split('|')
        .map((s) => s.trim().replace(/^'|'$/g, ''))
        .filter((s) => !!s);
      return { name, type: 'string', options };
    }

    if (typeText === 'number') return { name, type: 'number' };
    if (typeText === 'boolean') return { name, type: 'boolean' };
    if (typeText === 'string') return { name, type: 'string' };

    // fallback
    return { name, type: 'string' };
  });
}

function generateEditorMeta(moduleName: string, props: any[]) {
  return `import type { EditorMeta } from '../types';

export const editorMeta: EditorMeta = {
  displayName: '${moduleName}',
  icon: '🧩',
  defaultProps: {
    customStyles: '',
    children: 'New ${moduleName}',
  },
  editableProps: ${JSON.stringify(props, null, 2)},
};
`;
}

function run() {
  const moduleDirs = fs
    .readdirSync(MODULES_DIR)
    .filter((d) => fs.statSync(path.join(MODULES_DIR, d)).isDirectory());

  moduleDirs.forEach((dir) => {
    const moduleName = dir;
    const filePath = path.join(MODULES_DIR, dir, `${moduleName}.tsx`);
    const editorPath = path.join(MODULES_DIR, dir, `editor.ts`);

    if (!fs.existsSync(filePath)) {
      console.warn(`❌ Missing component file: ${filePath}`);
      return;
    }

    const propsInterface = getPropsInterfaceName(filePath);
    const editableProps = extractEditableProps(propsInterface, filePath);
    const contents = generateEditorMeta(moduleName, editableProps);

    fs.writeFileSync(editorPath, contents, 'utf-8');
    console.log(`✅ Wrote editor.ts for ${moduleName}`);
  });
}

run();
