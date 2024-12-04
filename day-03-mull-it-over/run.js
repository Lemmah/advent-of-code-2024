const { getMulInstructions, getEnabledMulInstructions } = require('./index.js');
const { open } = require('node:fs/promises');

(async (inputFilePath) => {
  const inputFile = await open(inputFilePath, 'r');
  const data = await inputFile.readFile({ encoding: 'utf-8' });

  let result = 0;
  for (const mulInstruction of getMulInstructions(data)) {
    result += mulInstruction.groups.a * mulInstruction.groups.b;
  }

  let result2 = 0;
  for (const mulInstruction of getEnabledMulInstructions(data)) {
    result2 += mulInstruction.groups.a * mulInstruction.groups.b;
  }

  console.log('#1, Uncorrupted mul instructions:', result);
  console.log('#2, Enabled mul instructions:', result2);
})('input.txt');
