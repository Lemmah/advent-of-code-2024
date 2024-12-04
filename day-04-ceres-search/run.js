const { countXMAS, countMAS } = require('./index.js');
const fs = require('node:fs/promises');

(async (inputFile) => {
  const openFile = await fs.open(inputFile, 'r');

  let lines = [];
  for await (const line of openFile.readLines()) {
    lines.push(line);
  }

  console.log('#1, Count XMAS:', countXMAS(lines));
  console.log('#2, Count X-MAS:', countMAS(lines));
})('input.txt');
