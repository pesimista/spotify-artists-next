// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

// custom config to be passed to Jest
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  coveragePathIgnorePatterns: [
    '.mock.ts',
    '/mocks',
    '/.next',
    '/coverage',
    '.config.js',
    '/pages',
  ],
  collectCoverageFrom: ['**/*.(t|j)s(x)?'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
