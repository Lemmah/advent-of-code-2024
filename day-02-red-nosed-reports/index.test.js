//@ts-check
const { isReportSafe, countSafeReports } = require('./index.js');

describe('isReportSafe', () => {
  it('should return true for safe report', () => {
    const report = [1, 3, 6, 7, 9];
    const reportSafe = isReportSafe(report);
    expect(reportSafe).toBe(true);
  });
  it('should return false if not all increasing', () => {
    const report = [1, 2, 3, 2, 3, 4];
    const reportSafe = isReportSafe(report);
    expect(reportSafe).toBe(false);
  });
  it('should return false if not all decreasing', () => {
    const report = [7, 6, 5, 6, 4, 3, 2];
    const reportSafe = isReportSafe(report);
    expect(reportSafe).toBe(false);
  });
  it('should return false if levels differing by more than 3', () => {
    const report = [1, 2, 7, 8, 9];
    const reportSafe = isReportSafe(report);
    expect(reportSafe).toBe(false);
  });
  it('should return false for levels differing by less than 1', () => {
    const report = [8, 6, 4, 4, 1];
    const reportSafe = isReportSafe(report);
    expect(reportSafe).toBe(false);
  });
});

describe('countSafeReports', () => {
  it('should count all the safe reports', () => {
    const reports = [
      [7, 6, 4, 2, 1],
      [1, 2, 7, 8, 9],
      [9, 7, 6, 2, 1],
      [1, 3, 2, 4, 5],
      [8, 6, 4, 4, 1],
      [1, 3, 6, 7, 9]
    ];
    const safeReportsCount = countSafeReports(reports);
    expect(safeReportsCount).toBe(2);
  });
  it('should return 0 for an empty list of reports', () => {
    const reports = [];
    const safeReportsCount = countSafeReports(reports);
    expect(safeReportsCount).toBe(0);
  });
});
