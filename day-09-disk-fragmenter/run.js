const {
  getIndividualBlocks,
  compactBlocks,
  calcFSChecksum
} = require('./index.js');
const fs = require('node:fs/promises');

(async (inputFile) => {
  const data = await fs.readFile(inputFile, { encoding: 'utf-8' });
  const denseFormatRepr = data.split('');
  const individualBlocks = getIndividualBlocks(denseFormatRepr);
  const compactedBlocks = compactBlocks(individualBlocks);
  const fileSystemChecksum = calcFSChecksum(compactedBlocks);
  console.log('#1, Filesystem Checksum:', fileSystemChecksum);
})('input.txt');
