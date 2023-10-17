const config = {
  verbose: true,
  coverageDirectory: '../coverage/',
  testPathIgnorePatterns: ['/node_modules/'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};

module.exports = config;
