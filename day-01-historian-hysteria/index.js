//@ts-check
const fs = require('node:fs/promises');

/**
 * Calculate the distance apart between to provided lists
 * 
 * @param {number[]} left - first group list
 * @param {number[]} right - second group list
 * 
 * @returns {number} - distance apart
 */
const getDistanceApart = (left, right) => {
  let total = 0;
  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);
  for(let i = 0; i < left.length; i++) {
    total += Math.abs(right[i] - left[i]);
  }
  return total;
}

/**
 * Get similarity score between the two lists
 * 
 * @param {number[]} left - first group list
 * @param {number[]} right - second group list
 * 
 * @returns {number} - similarity score
 */
const getSimilarityScore = (left, right) => {
  let score = 0;
  for (const locationId of left) {
    const countRight = right.filter(rLocationId => rLocationId === locationId).length;
    score += (locationId * countRight);
  }
  return score;
}

/**
 * Parse input file to left and right list
 * 
 * @param {string} inputFilePath
 * 
 * @returns {Promise<[number[], number[]]>} - left[], right[]
 */
async function parseInputFile(inputFilePath) {
  let left = [];
  let right = [];

  const file = await fs.open(inputFilePath, 'r');
  for await (const line of file.readLines()) {
    const [leftLocationId, rightLocationId] = line.split('   ');
    left.push(Number(leftLocationId));
    right.push(Number(rightLocationId));
  }

  return [left, right];
}

module.exports = {
  getDistanceApart,
  getSimilarityScore,
  parseInputFile
}
