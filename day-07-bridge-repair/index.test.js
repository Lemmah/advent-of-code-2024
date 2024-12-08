// @ts-check

const {
  isValidEquation,
  calcCalibrationResult
} = require('./index.js');

describe('isValidEquation', () => {
  it('should return true for valid equation - #1', () => {
    const testValue = 190;
    const operands = [10, 19];
    const equationIsValid = isValidEquation(testValue, operands);
    expect(equationIsValid).toBe(true);
  });
  it('should return true for valid equation - #2', () => {
    const testValue = 3267;
    const operands = [81, 40, 27];
    const equationIsValid = isValidEquation(testValue, operands);
    expect(equationIsValid).toBe(true);
  });
  it('should return true for valid equation - #3', () => {
    const testValue = 292;
    const operands = [11, 6, 16, 20];
    const equationIsValid = isValidEquation(testValue, operands);
    expect(equationIsValid).toBe(true);
  });
  it('should return false for invalid equation - #1', () => {
    const testValue = 156;
    const operands = [15, 6];
    const equationIsValid = isValidEquation(testValue, operands);
    expect(equationIsValid).toBe(false);
  });
  it('should return false for invalid equation - #2', () => {
    const testValue = 7290;
    const operands = [6, 8, 6, 15];
    const equationIsValid = isValidEquation(testValue, operands);
    expect(equationIsValid).toBe(false);
  });
  it('should return false for invalid equation - #3', () => {
    const testValue = 21037;
    const operands = [9, 7, 18, 13];
    const equationIsValid = isValidEquation(testValue, operands);
    expect(equationIsValid).toBe(false);
  });
});

describe('calcCalibrationResult', () => {
  it('should get total calibration result for provided example', () => {
    const equations = [
      [ 190, [ 10, 19 ] ],
      [ 3267, [ 81, 40, 27 ] ],
      [ 83, [ 17, 5 ] ],
      [ 156, [ 15, 6 ] ],
      [ 7290, [ 6, 8, 6, 15 ] ],
      [ 161011, [ 16, 10, 13 ] ],
      [ 192, [ 17, 8, 14 ] ],
      [ 21037, [ 9, 7, 18, 13 ] ],
      [ 292, [ 11, 6, 16, 20 ] ]
    ];
    const totalCalibrationResult = calcCalibrationResult(equations);
    expect(totalCalibrationResult).toBe(3749);
  });
});
