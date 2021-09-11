module.exports = {
  verbose: true,
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
  coverageReporters: ["html", "json", "lcov", "text", "clover"],
  modulePathIgnorePatterns: ["<rootDir>/node_modules"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/interface.d.ts",
    "!src/**/*interfaces.d.ts",
    "!src/**/*.d.ts",
    "!src/index.ts",
    "!src/app.logger.ts"
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node',
  testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
