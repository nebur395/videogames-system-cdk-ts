/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: [ '<rootDir>/test/specs/**/*.spec.ts' ],
  coveragePathIgnorePatterns: [ '<rootDir>/test/config' ],
  collectCoverage: false,
  coverageDirectory: '<rootDir>/test/results/unit/coverage',
  collectCoverageFrom: [ '<rootDir>/cdk/**/*.{ts,js}' ],
  coverageReporters: [[ 'lcov', { projectRoot: '../..' }]],
  transform: {
    '^.+\\.ts?$': [
      'ts-jest', {
        tsconfig: '<rootDir>/test/config/tsconfig.json'
      }
    ]
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json'
  ]
};
