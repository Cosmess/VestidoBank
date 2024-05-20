module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    coverageDirectory: './coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
  };
  