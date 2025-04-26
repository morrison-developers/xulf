// eslint-disable-next-line import/no-anonymous-default-export
export default {
  displayName: 'grill-daddy',
  preset: '../../../jest.preset.cjs',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/apps/grill-daddy/grill-daddy',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  fakeTimers: {
    enableGlobally: true,
  },
};
