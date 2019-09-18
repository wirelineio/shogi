module.exports = {
  displayName: 'shogiboardjsx',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '**/src/Shogiboard/**/*.js',
    '!**/src/Shogiboard/svg/**/*.js',
    '!**/src/Shogiboard/ErrorBoundary.js',
    '!**/src/Shogiboard/errorMessages.js'
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 20,
  //     functions: 20,
  //     lines: 20,
  //     statements: 20
  //   }
  // },
  moduleFileExtensions: ['js', 'json'],

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/file-mock.js',
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': '<rootDir>/test/style-mock.js'
  },
  transform: { '^.+\\.js$': 'babel-jest' },
  testURL: 'http://localhost/'
};
