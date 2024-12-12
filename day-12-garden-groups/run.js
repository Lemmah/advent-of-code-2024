const fs = require('node:fs/promises');
const { getTotalFencingPrice } = require('./index.js');

(async (inputFile) => {
  const openFile = await fs.open(inputFile, 'r');
  let garden = [];

  for await (const line of openFile.readLines()) {
    garden.push(line.split(''));
  }

  console.log('#1, Fencing Costs:', getTotalFencingPrice(garden));
})('input.txt');
