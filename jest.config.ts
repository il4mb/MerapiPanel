import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
    '@testing-library/jest-dom'
  ],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
    "^.+\\.scss$": "jest-transform-stub"
  }
};

export default config;