module.exports = {
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js'],

  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'TS API test suite',
        outputDirectory: '../../../build/test/test-ts-api',
        outputName: './TEST-TS-API.xml',
      },
    ],
    [
      'jest-html-reporter',
      {
        pageTitle: 'TS API test suite',
        outputPath: '../../../build/reports/test-ts-api/index.html',
        includeFailureMsg: true,
      },
    ],
  ],
};
