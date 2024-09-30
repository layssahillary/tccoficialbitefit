// jest.config.mjs
export default {
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@services/(.*)$': '<rootDir>/src/services/$1',
  },
};
