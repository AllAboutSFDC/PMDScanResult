const fs = require('fs');
const path = require('path');

function myTestResultsProcessor(testResults, config) {
  const formattedResults = JSON.stringify(testResults, null, 2);
  const outputFile = path.resolve(__dirname, 'test-results.json');
  fs.writeFileSync(outputFile, formattedResults);
  return testResults;
}

module.exports = myTestResultsProcessor;
