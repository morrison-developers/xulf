// eslint-disable-next-line @typescript-eslint/no-require-imports
const baseConfig = require('../../eslint.base.config.js');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'],
        },
      ],
    },
    languageOptions: {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      parser: require('jsonc-eslint-parser'),
    },
  },
];
