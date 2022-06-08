/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // transform: {
  //   "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
  // },
  // transformIgnorePatterns: [
  //   "node_modules/(?!variables/.*)"
  // ],
  testEnvironment: 'jest-environment-jsdom',
  modulePaths: [
    "<rootDir>/src"
  ],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "css"
  ],
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy"
  },
  roots: ["src"]
};