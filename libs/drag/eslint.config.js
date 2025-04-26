const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.base.config.cjs');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
];
