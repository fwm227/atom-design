module.exports = {
  verbose: true,
  testRegex: "/tests/.*.test.jsx?$",
  moduleFileExtensions: ['js'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  },
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testPathIgnorePatterns: ['/node_modules/', '/backup/']
};
