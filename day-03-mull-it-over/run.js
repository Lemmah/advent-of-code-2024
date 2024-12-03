const { getMulInstructions } = require('./index.js');
const { open } = require('node:fs/promises');

(async (inputFilePath) => {
  const inputFile = await open(inputFilePath, 'r');
  const data = await inputFile.readFile({ encoding: 'utf-8' });

  let result = 0;
  for (const mulInstruction of getMulInstructions(data)) {
    result += mulInstruction.groups.a * mulInstruction.groups.b;
  }

  console.log('#1, Uncorrupted mul instructions:', result);
})('input.txt');
