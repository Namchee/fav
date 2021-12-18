import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest/presets/default-esm',
  verbose: true,
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.vue', '.ts'],
  moduleFileExtensions: ['vue', 'js', 'ts'],
  transform: {
    '.+\\.(t|j)sx?$': 'ts-jest',
    '.*\\.(vue)$': '@vue/vue3-jest',
  },
  moduleNameMapper: {
    '.+\\.(svg)(\\?component)?$': '<rootDir>/src/components/tests/iconMock.vue',
    '^@/(.*)': '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  collectCoverage: true,
};

export default config;
