const baseConfig = require('../../../eslint.base.config.cjs');
const { FlatCompat } = require('@eslint/eslintrc');
const { fixupConfigRules } = require('@eslint/compat');
const js = require('@eslint/js');
const nx = require('@nx/eslint-plugin');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...baseConfig,
  ...fixupConfigRules(compat.extends('next')),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
  { ignores: ['.next/**/*'] },
];
