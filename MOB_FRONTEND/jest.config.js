module.exports = {
    preset: 'jest-expo',
    clearMocks: true,
    testMatch: [
        '<rootDir>/specs/**/*.[tj]s?(x)',
        '**/src/native/**/__tests__/**/*.spec.[jt]s?(x)'
    ],
    roots: ['<rootDir>', '../../'],
    setupFiles: ['../../node_modules/react-native-gesture-handler/jestSetup.js'],
    setupFilesAfterEnv: ['<rootDir>/setup.ts'],
    moduleNameMapper: {},
    transform: {
        '^.+\\.[jt]sx?$': ['babel-jest', { envName: 'test-expo' }]
    },
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native' +
        '|@react-native-community' +
        '|@react-navigation' +
        '|native-base' +
        '|@expo(nent)?/.*' +
        '|expo-.*/.*' +
        '|@unimodules' +
        '|@codler/react-native-keyboard-aware-scroll-view' +
        '|@react-native-picker' +
        '|victory-.*/.*' +
        '/)'
    ]
};