import * as path from 'path';
import * as fs from 'fs';
import * as fg from 'fast-glob';
import { Project } from 'ts-morph';

const MODULE_PROPS_DIR = path.resolve(__dirname, '../../module-props/src');
const GENERATED_DIR = path.resolve(MODULE_PROPS_DIR, './generated');  // 🟢 CHANGE: output into module-props/src/generated
const PROPS_MAP_OUTFILE = path.join(GENERATED_DIR, 'ModulePropsMap.ts');

const propFiles = fg.sync(`${MODULE_PROPS_DIR}/*/props.ts`, { absolute: true });

const project = new Project({
  tsConfigFilePath: path.resolve(__dirname, '../tsconfig.lib.json'),
});

function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function extractEditableProps(interfaceName: string, filePath: string) {
  const sourceFile = project.addSourceFileAtPathIfExists(filePath);
  if (!sourceFile) {
    console.warn(`❌ No source file found at ${filePath}`);
    return [];
  }

  const propsInterface = sourceFile.getInterface(interfaceName);
  if (!propsInterface) {
    console.warn(`⚠️ Interface ${interfaceName} not found in ${filePath}`);
    return [];
  }

  return propsInterface.getProperties().map((prop) => {
    const rawName = prop.getName();
    const name = toKebabCase(rawName);
    const typeNode = prop.getTypeNode();
    const typeText = typeNode?.getText() || '';

    if (typeText.includes('|') && typeText.includes(`'`)) {
      const options = typeText
        .split('|')
        .map((s) => s.trim().replace(/^'|'$/g, ''))
        .filter(Boolean);
      return { name, type: 'string', options };
    }

    if (typeText === 'number') return { name, type: 'number' };
    if (typeText === 'boolean') return { name, type: 'boolean' };
    if (typeText === 'string') return { name, type: 'string' };

    return { name, type: 'string' }; // fallback
  });
}

function generateEditorMeta(moduleName: string, props: any[]) {
  return `import type { EditorMeta } from '@xulf/types';

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

function generatePropsMapFile(entries: { moduleName: string; importPath: string }[]) {
  const contents = `// AUTO-GENERATED - DO NOT EDIT

${entries.map(({ moduleName, importPath }) => `import type { ${moduleName}Props } from '${importPath}';`).join('\n')}

export interface ModulePropsMap {
${entries.map(({ moduleName }) => `  ${moduleName.toLowerCase()}: ${moduleName}Props;`).join('\n')}
}
`;

  fs.mkdirSync(GENERATED_DIR, { recursive: true });
  fs.writeFileSync(PROPS_MAP_OUTFILE, contents, 'utf-8');
  console.log(`✅ Wrote props map to ${PROPS_MAP_OUTFILE}`);
}

function run() {
  const propsMapEntries: { moduleName: string; importPath: string }[] = [];

  propFiles.forEach((filePath) => {
    const dirName = path.basename(path.dirname(filePath));
    const interfaceName = `${dirName}Props`;
    const editableProps = extractEditableProps(interfaceName, filePath);
    if (editableProps.length === 0) return;

    const editorPath = path.join(MODULE_PROPS_DIR, dirName, 'editor.ts');
    const metaContents = generateEditorMeta(dirName, editableProps);
    fs.writeFileSync(editorPath, metaContents, 'utf-8');
    console.log(`✅ Wrote editor meta for ${dirName}`);

    const relativeImportPath = `../${dirName}/props`;  // 🟢 FIXED: Use relative path within module-props
    propsMapEntries.push({ moduleName: dirName, importPath: relativeImportPath });
  });

  if (propsMapEntries.length === 0) {
    console.warn('⚠️ No valid module props interfaces found.');
  }

  generatePropsMapFile(propsMapEntries);
}

run();
