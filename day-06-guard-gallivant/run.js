const { countRoutePositions } = require('./index.js');
const fs = require('node:fs/promises');

(async (inputFile) => {
  const labPositions = [];

  const openFile = await fs.open(inputFile, 'r');

  for await (const line of openFile.readLines()) {
    const positions = line.split('');
    labPositions.push(positions);
  }

  console.log('#1, Count Visted Positions:', countRoutePositions(labPositions));
})('input.txt');
