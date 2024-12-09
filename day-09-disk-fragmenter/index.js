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

module.exports = {
  getIndividualBlocks
}
