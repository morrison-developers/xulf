const baseConfig = require('../../eslint.base.config.cjs');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.json'],
    plugins: ['react-hooks'],
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}'],
        },
      ],
    },
    languageOptions: {
      parser: require('jsonc-eslint-parser'),
    },
  },
];
