const {
  getSumPrintedMiddlePages,
  getSumCorrectedMiddlePages
} = require('./index.js');
const fs = require('node:fs/promises');

(async (inputFile) => {
  const openFile = await fs.open(inputFile, 'r');

  let orderingRules = [];
  let updates = [];
  const orderingRulePattern = /^(?<x>\d+)\|(?<y>\d+)$/
  for await (const line of openFile.readLines()) {
    if (line == '') continue;

    const matchOrderingRulePattern = line.match(orderingRulePattern);
    if(matchOrderingRulePattern !== null) {
      const {x, y} = matchOrderingRulePattern.groups;
      orderingRules.push([Number(x), Number(y)]);
    } else {
      const update = line.split(',').map(page => Number(page));
      updates.push(update);
    }
  }

  console.log("#1, Middle Page Sum:", getSumPrintedMiddlePages(updates,orderingRules));
  console.log("#2, Corrected Middle Page Sum:", getSumCorrectedMiddlePages(updates,orderingRules));
})('input.txt');
