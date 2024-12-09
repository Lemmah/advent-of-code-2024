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
 * @param {string[]} individualBlocks - repr of disk block
 * 
 * @returns {string[]} - compacted non-free blocks
 */
const compactBlocks = individualBlocks => {
  let compactedBlocks = [];
  const nonFreeBlocksCount = individualBlocks.reduce((count, block) => {
    return block !== '.' ? count + 1 : count;
  }, 0);

  for (const block of individualBlocks) {
    if (compactedBlocks.length == nonFreeBlocksCount) break;
    const isFreeSpace = block == '.';
    if (isFreeSpace) {
      let lastBlock = individualBlocks.pop();
      while (lastBlock == '.') {
        lastBlock = individualBlocks.pop();
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

/**
 * Group files by block size
 * 
 * @param {string[]} denseFormatRepr - dense format repr of disk
 * 
 * @returns {Object} - size : [...fileIds] - fileIds grouped by size
 */
const groupFilesBySize = denseFormatRepr => {
  let filesBySize = {
    '0': [], '1': [], '2': [], '3': [], '4': [],
    '5': [], '6': [], '7': [], '8': [], '9': []
  }

  denseFormatRepr.forEach((block, position) => {
    const isFreeSpace = position % 2 !== 0;
    if (!isFreeSpace) filesBySize[block].push(position/2);
  });

  return filesBySize;
}

module.exports = {
  getIndividualBlocks,
  compactBlocks,
  calcFSChecksum,
  groupFilesBySize
}
