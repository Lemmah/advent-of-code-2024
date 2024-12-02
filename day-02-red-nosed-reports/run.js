const {isReportSafe} = require('./index.js');
const fs = require('node:fs/promises');

(async (inputFilePath) => {
  let safeReportsCount = 0;
  const reportsFile = await fs.open(inputFilePath, 'r');

  for await (const line of reportsFile.readLines()) {
    const report = line.split(' ');
    if (isReportSafe(report)) safeReportsCount++;
  }
  console.log('#1, Safe Reports:', safeReportsCount);
})('input.txt');
