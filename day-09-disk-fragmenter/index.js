// @ts-check

/**
 * Get disk individual blocks from dense format
 * 
 * @param {string[]} denseFormatRepr - dense format repr of disk
 * 
 * @returns {string[]} - the actual blocks
 */
const getIndividualBlocks = denseFormatRepr => {
  let individualBlocks = [];
  let idNumber = 0;
  for (let i = 0; i < denseFormatRepr.length; i++) {
    const numberOfBlocks = Number(denseFormatRepr[i]);
    const isFreeSpace = i % 2 !== 0;
    const fileId = isFreeSpace ? '.' : String(idNumber);
    for (let j = 0; j < numberOfBlocks; j++) {
      individualBlocks.push(fileId);
    }
    if(!isFreeSpace) idNumber++;
  }
  return individualBlocks;
}

/**
 * Compact blocks by removing space between them
 * 
 * @param {string[]} indvidualBlocks - repr of disk block
 * 
 * @returns {string[]} - compacted non-free blocks
 */
const compactFiles = indvidualBlocks => {
  let compactedBlocks = [];
  const nonFreeBlocksCount = indvidualBlocks.reduce((count, block) => {
    return block !== '.' ? count+1 : count;
  }, 0);

  for (const block of indvidualBlocks) {
    if (compactedBlocks.length == nonFreeBlocksCount) break;
    const isFreeSpace = block == '.';
    if (isFreeSpace) {
      let lastBlock = indvidualBlocks.pop();
      while (lastBlock == '.') {
        lastBlock = indvidualBlocks.pop();
      }
      if(lastBlock) compactedBlocks.push(lastBlock);
    } else {
      compactedBlocks.push(block);
    }
  }

  return compactedBlocks;
}

/**
 * Calculate checksum for compacted blocks
 * 
 * @param {string[]} compactedBlocks - compacted non-free blocks
 * 
 * @returns {number} - the checksum
 */
const calcFSChecksum = compactedBlocks => {
  let checksum = 0;
  compactedBlocks.forEach((fileId, position) => {
    checksum += position * Number(fileId);
  });

  return checksum;
}

module.exports = {
  getIndividualBlocks,
  compactFiles,
  calcFSChecksum
}
