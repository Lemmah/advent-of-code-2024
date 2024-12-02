const {isReportSafe, isDampenedReportSafe} = require('./index.js');
const fs = require('node:fs/promises');

(async (inputFilePath) => {
  let safeReportsCount = 0;
  let safeDampenedReportsCount = 0;
  let totalReports = 0;
  const reportsFile = await fs.open(inputFilePath, 'r');

  for await (const line of reportsFile.readLines()) {
    const report = line.split(' ');
    if (isReportSafe(report)) safeReportsCount++;
    if (isDampenedReportSafe(report)) safeDampenedReportsCount++;
    totalReports++;
  }
  console.log('#1, Safe Reports:', safeReportsCount);
  console.log('#2, Safe Reports Dampened:', safeDampenedReportsCount);
  console.log('##, Total Reports:', totalReports);
})('input.txt');
