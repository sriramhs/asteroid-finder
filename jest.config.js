export const preset = 'ts-jest/presets/js-with-babel';
export const testEnvironment = 'jsdom';
export const moduleNameMapper = {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
};
export const setupFilesAfterEnv = ['./src/setupTests.ts'];
