//@ts-check
const { isReportSafe, countSafeReports, isDampenedReportSafe } = require('./index.js');

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

describe('isDampenedReportSafe', () => {
  it('should return true for safe report without removing levels', () => {
    const report = [1, 3, 6, 7, 9];
    const reportSafe = isDampenedReportSafe(report);
    expect(reportSafe).toBe(true);
  });
  it('should return true if removing a single level makes it safe - #1', () => {
    const report = [2, 5, 4, 3, 1];
    const reportSafe = isDampenedReportSafe(report);
    expect(reportSafe).toBe(true);
  });
  it('should return true if removing a single level makes it safe - #2', () => {
    const report = [1, 5, 2, 3, 4];
    const reportSafe = isDampenedReportSafe(report);
    expect(reportSafe).toBe(true);
  });
  it('should return true if removing a single level makes it safe - #3', () => {
    const report = [1, 2, 5, 3, 4];
    const reportSafe = isDampenedReportSafe(report);
    expect(reportSafe).toBe(true);
  });
  it('should return true if removing a single level makes it safe - #4', () => {
    const report = [1, 2, 3, 5, 4];
    const reportSafe = isDampenedReportSafe(report);
    expect(reportSafe).toBe(true);
  });
  it('should return true if removing a single level makes it safe - #5', () => {
    const report = [5, 5, 3, 2, 1];
    const reportSafe = isDampenedReportSafe(report);
    expect(reportSafe).toBe(true);
  });
  it('should return true if removing a single level makes it safe - #6', () => {
    const report = [5, 4, 5, 3, 2];
    const reportSafe = isDampenedReportSafe(report);
    expect(reportSafe).toBe(true);
  });
  it('should return true if removing a single level makes it safe - #7', () => {
    const report = [52, 51, 52, 49, 47, 45];
    const reportSafe = isDampenedReportSafe(report);
    expect(reportSafe).toBe(true);
  });
  it('should return false if no single level removal can make the report safe', () => {
    const report = [1, 1, 1, 1, 1];
    const reportSafe = isDampenedReportSafe(report);
    expect(reportSafe).toBe(false);
  });
});
