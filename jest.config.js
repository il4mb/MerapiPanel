"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
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
exports.default = config;
