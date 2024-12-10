const {
  getIndividualBlocks,
  compactBlocks,
  compactFiles,
  calcFSChecksum
} = require('./index.js');
const fs = require('node:fs/promises');

(async (inputFile) => {
  const data = await fs.readFile(inputFile, { encoding: 'utf-8' });
  const denseFormatRepr = data.split('');

  const individualBlocks = getIndividualBlocks(denseFormatRepr);
  const compactedBlocks = compactBlocks(individualBlocks);
  const fileSystemChecksumB = calcFSChecksum(compactedBlocks);
  console.log('#1, Filesystem Checksum - Compacted Blocks:', fileSystemChecksumB);

  const compactedFiles = compactFiles(denseFormatRepr);
  const fileSystemChecksumF = calcFSChecksum(compactedFiles);
  console.log('#2, Filesystem Checksum - Compacted Files:', fileSystemChecksumF);
})('input.txt');
