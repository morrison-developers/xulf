//@ts-check

const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },

  compiler: {
    // For other options, see https://styled-components.com/docs/tooling#babel-plugin
    styledComponents: true,
  },
  experimental: {
    serverActions: {},
    outputFileTracingIncludes: {
      '/app/api/': [
        'node_modules/@prisma/client/**/*',
        'node_modules/.prisma/client/**/*',
        'libs/mor-dev-db/src/lib/generated/morrison-prisma-client/**/*',
      ],
    },
    outputFileTracingRoot: require('path').join(__dirname, '../../../'),
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
