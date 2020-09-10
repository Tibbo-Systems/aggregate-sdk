module.exports = {
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js'],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'TS API test suite',
        outputDirectory: '../../../build/test/test-jest',
        outputName: './TEST-JEST.xml',
      },
    ],
    [
      'jest-html-reporter',
      {
        pageTitle: 'TS API test suite',
        outputPath: '../../../build/reports/test-jest/index.html',
        includeFailureMsg: true,
      },
    ],
  ],
};
