const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

module.exports = {
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
        '\\.svg$': '<rootDir>/test/mocks/svg-mock.js'
    },
    setupFiles: ['./test/test-setup.js'],
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!mathletics-portal-communication-service)'
    ]
}; 
