const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

module.exports = {
    ...jestConfig,
    moduleNameMapper: {

        '^lightning/platformShowToastEvent$':
    
           
            '/Users/ishitadutta/Desktop/ShowToastEvent.js'
    
       },
    
    modulePathIgnorePatterns: ['<rootDir>/.localdevserver']
};
