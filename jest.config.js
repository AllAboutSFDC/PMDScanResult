const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

module.exports = {
    ...jestConfig,
    moduleNameMapper: {

        '^lightning/platformShowToastEvent$':
    
           
            '/Users/asif_jamal/Downloads/ShowToastEvent.js'
    
       },
       testResultsProcessor: "./myTestResultsProcessor.js",
    
    modulePathIgnorePatterns: ['<rootDir>/.localdevserver']
};
