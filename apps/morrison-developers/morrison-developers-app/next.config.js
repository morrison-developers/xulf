//@ts-check

const { composePlugins, withNx } = require('@nx/next');
const path = require('path');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },

  compiler: {
    styledComponents: true,
  },

  experimental: {
    serverActions: {},
  },

  outputFileTracingIncludes: {
    'apps/morrison-developers/morrison-developers-app': [
      'libs/mor-dev-db/src/lib/generated/morrison-prisma-client',
      'node_modules/@prisma/client',
      'node_modules/.prisma/client'
    ]
  },

  outputFileTracingRoot: path.join(__dirname, '../../../'),
};

const plugins = [withNx];

module.exports = composePlugins(...plugins)(nextConfig);