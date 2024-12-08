const { countAntinodes } = require('./index.js');
const fs = require('node:fs/promises');

(async (inputFile) => {
  let antennasMap = [];

  const openFile = await fs.open(inputFile, 'r');
  for await (const line of openFile.readLines()) {
    antennasMap.push(line.split(''));
  }

  console.log('#1, Count Antinodes:', countAntinodes(antennasMap));
})('input.txt');
