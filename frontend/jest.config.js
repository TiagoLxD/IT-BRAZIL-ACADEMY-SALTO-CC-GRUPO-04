/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["/node_modules", "/.next/"],

  modulePaths: ["<rootDir>/src/", "<rootDir>/.jest"],
  moduleNameMapper: {},
    transformIgnorePatterns: [
      '/node_modules/',
      '^.+\\.module\\.(css|sass|scss)$',
    ],
};

module.exports = createJestConfig(customJestConfig);
