// @ts-check
const {
  calcCalibrationResult
} = require('./index.js');
const fs = require('node:fs/promises');

(async (inputFile) => {
  let equations = [];
  const equationPattern = /(?<testValue>\d+)\:\s(?<operands>[\d+\s]+)$/

  const openFile = await fs.open(inputFile, 'r');
  for await (const line of openFile.readLines()) {
    const equation = line.match(equationPattern);
    if(equation && equation.groups){
      const { testValue, operands } = equation.groups;
      equations.push([
        Number(testValue),
        operands.split(' ').map(operand => Number(operand))
      ]);
    }
  }

  console.log('#1, Total Calibration Result:', calcCalibrationResult(equations));
})('input.txt');
