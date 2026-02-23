module.exports = {
    testEnvironment: 'node',
    collectCoverageFrom: [
        'services/**/*.js',
        'controllers/**/*.js',
        'middlewares/**/*.js',
        '!node_modules/**',
        '!coverage/**',
    ],
    testMatch: [
        '**/__tests__/**/*.js',
        '**/?(*.)+(spec|test).js',
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
        },
    },
};