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
    if (!levelsAllIncreasing && !levelsAllDecreasing) return false;
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

/**
 * Check if report is safe with problem dumping
 * 
 * @param {number[]} report - a report with levels
 * 
 * @returns {boolean} - if report is safe with problem dumping
 */
const isDampenedReportSafe = report => {
  const originalReportIsSafe = isReportSafe(report);
  if(originalReportIsSafe) return originalReportIsSafe;

  let levelsAllIncreasing = true;
  let levelsAllDecreasing = true;
  
  for (let i = 1; i < report.length; i++){
    const currentLevel = Number(report[i]),
    previousLevel = Number(report[i - 1]),
    previousPreviousLevel = Number(report[i - 2]);
    let dampenRight = [...report];
    dampenRight.splice(i, 1);
    let dampenLeft = [...report];
    dampenLeft.splice(i - 1, 1);
    let dampenLeftLeft = [...report];
    dampenLeftLeft.splice(i - 2, 1);
    const levelDifference = Math.abs(currentLevel - previousLevel);
    if (levelDifference < 1 || levelDifference > 3) {
      return (isReportSafe(dampenRight) || isReportSafe(dampenLeft) || isReportSafe(dampenLeftLeft));
    }

    levelsAllIncreasing = levelsAllIncreasing && (currentLevel > previousLevel);
    levelsAllDecreasing = levelsAllDecreasing && (currentLevel < previousLevel);
    if (!levelsAllIncreasing && !levelsAllDecreasing) return (isReportSafe(dampenRight) || isReportSafe(dampenLeft) || isReportSafe(dampenLeftLeft));
  }
  return false;
}

module.exports = { isReportSafe, countSafeReports, isDampenedReportSafe };
