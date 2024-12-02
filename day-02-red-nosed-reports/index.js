//@ts-check

/**
 * Check if report is safe
 * 
 * @param {number[]} report - a report with levels
 * 
 * @returns {boolean} - whether report is safe or not
 */
const isReportSafe = (report) => {
  let levelsAllIncreasing = true;
  let levelsAllDecreasing = true;

  for (let i = 1; i < report.length; i++){
    const currentLevel = Number(report[i]), previousLevel = Number(report[i - 1]);

    // short-circuit if level difference is unsafe
    const levelDifference = Math.abs(currentLevel - previousLevel);
    if (levelDifference < 1 || levelDifference > 3) {
      return false;
    }

    levelsAllIncreasing = levelsAllIncreasing && (currentLevel > previousLevel);
    levelsAllDecreasing = levelsAllDecreasing && (currentLevel < previousLevel);
  }

  return levelsAllDecreasing || levelsAllIncreasing;
}

/**
 * Count safe reports
 * 
 * @param {Array} reports - list of reports
 * 
 * @returns - count of safe reports
 */
const countSafeReports = (reports) => {
  let count = 0;

  for (const report of reports) {
    if(isReportSafe(report)) count++;
  }

  return count;
}

module.exports = { isReportSafe, countSafeReports };
