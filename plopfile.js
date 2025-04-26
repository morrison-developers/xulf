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
      const baseModulePath = 'libs/modules/src/{{pascalCase name}}';
      const basePropsPath = 'libs/module-props/src/{{pascalCase name}}';

      return [
        // 1. PROPS INTERFACE (in module-props)
        {
          type: 'add',
          path: `${basePropsPath}/props.ts`,
          templateFile: 'plop-templates/props.hbs',
        },

        // 2. OPTIONAL: Keep module-props barrel index up-to-date
        {
          type: 'append',
          path: 'libs/module-props/src/index.ts',
          pattern: /(\/\/ AUTO-EXPORT PROPS HERE)/,
          template: "export * from './{{pascalCase name}}/props';\n$1",
        },

        // 3. COMPONENT (Preview Component)
        {
          type: 'add',
          path: `${baseModulePath}/{{pascalCase name}}.tsx`,
          templateFile: 'plop-templates/component.hbs',
        },

        // 4. EDITOR COMPONENT (Editor{{name}})
        {
          type: 'add',
          path: `${baseModulePath}/{{pascalCase name}}Editor.tsx`,
          templateFile: 'plop-templates/editor-component.hbs',
        },

        // 5. EDITOR META
        {
          type: 'add',
          path: `${baseModulePath}/editor.ts`,
          templateFile: 'plop-templates/editor.hbs',
        },

        // 6. FUNCTION META
        {
          type: 'add',
          path: `${baseModulePath}/functions.ts`,
          templateFile: 'plop-templates/functions.hbs',
        },

        // 7. MODULE INDEX
        {
          type: 'add',
          path: `${baseModulePath}/index.ts`,
          templateFile: 'plop-templates/module-index.hbs',
        },

        // 8. Update MAIN MODULE REGISTRY (libs/modules/src/index.ts)
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
