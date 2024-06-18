module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
      '^.+\\.(js|jsx)$': 'babel-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: ['node_modules/(?!(axios)/)'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
    moduleNameMapper: {
    //   'node:fs': 'fs', // Map Node.js core modules correctly
    '^axios$': require.resolve('axios'),
    'node:fs': 'fs'

    },
  };
  