const path = require('path');

module.exports = function (plop) {
  plop.setGenerator('module', {
    description: 'Generate a new module for Xulf',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Module name (e.g., Box):',
      },
    ],
    actions: function () {
      const basePath = 'libs/modules/src/{{pascalCase name}}';

      return [
        // 1. Component (Preview)
        {
          type: 'add',
          path: `${basePath}/{{pascalCase name}}.tsx`,
          templateFile: 'plop-templates/component.hbs',
        },
        // 2. Editor component (Editor{Name})
        {
          type: 'add',
          path: `${basePath}/{{pascalCase name}}Editor.tsx`,
          templateFile: 'plop-templates/editor-component.hbs',
        },
        // 3. Editor meta
        {
          type: 'add',
          path: `${basePath}/editor.ts`,
          templateFile: 'plop-templates/editor.hbs',
        },
        // 4. Function meta
        {
          type: 'add',
          path: `${basePath}/functions.ts`,
          templateFile: 'plop-templates/functions.hbs',
        },
        // 5. Index aggregator
        {
          type: 'add',
          path: `${basePath}/index.ts`,
          templateFile: 'plop-templates/module-index.hbs',
        },
        {
          type: 'modify',
          path: 'libs/modules/src/index.ts',
          pattern: /(\/\/ AUTO-IMPORT MODULES HERE)/,
          template: "import { {{pascalCase name}}Def } from './{{pascalCase name}}';\n$1",
        },
        {
          type: 'modify',
          path: 'libs/modules/src/index.ts',
          pattern: /(\/\/ AUTO-REGISTER MODULES HERE)/,
          template: '  {{pascalCase name}}Def,\n$1',
        },
      ];
    },
  });
};
