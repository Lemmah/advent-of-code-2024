//@ts-check
const { isReportSafe } = require('./index.js');

describe('isReportSafe', () => {
  it('should return true for safe report', () => {
    const report = [7, 6, 4, 2, 1];
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

xdescribe('countSafeReports', () => {

});