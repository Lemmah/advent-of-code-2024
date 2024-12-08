// @ts-check

/**
 * Check if provided equation can be valid
 * 
 * @param {number} testValue - possible result of equation
 * @param {number[]} operands - numbers involved
 * 
 * @returns {boolean} - whether equation is valid or not
 */
const isValidEquation = (testValue, operands, concat = false) => {
  let results = operands.slice(0,1);

  for (const operand of operands.slice(1,)) {
    const add = results.map(each => each + operand);
    const mul = results.map(each => each * operand);
    if (concat) {
      const concat = results.map(each => {
        const result = String(each) + String(operand);
        return Number(result);
      });
      results = [...add, ...mul, ...concat];
    } else {
      results = [...add, ...mul];
    }
  }

  return results.includes(testValue);
}

/**
 * Calculate total calibration result
 * 
 * @param {Array} equations - representation of equations
 * 
 * @returns {number} - total valid test values
 */
const calcCalibrationResult = (equations, concat = false) => {
  let result = 0;

  for (const equation of equations) {
    const testValue = equation[0];
    const operands = equation[1];
    if(isValidEquation(testValue,operands,concat))
      result += testValue;
  }
  return result;
}

module.exports = {
  isValidEquation,
  calcCalibrationResult
}
