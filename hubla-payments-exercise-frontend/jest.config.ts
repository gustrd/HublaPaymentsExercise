import type {Config} from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    html: '<html lang="zh-cmn-Hant"></html>',
    url: 'https://jestjs.io/',
    userAgent: 'Agent/007',
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
  },
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ]
};

export default config;