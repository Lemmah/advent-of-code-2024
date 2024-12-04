/**
 * Extract all uncorrupted mul instructions
 * 
 * @param {string} data - corrupted data
 * 
 * @returns {Array} - uncorrupted mul instructions
 */
const getMulInstructions = data => {
  const mulInstructions = /mul\((?<a>\d{1,3})\,(?<b>\d{1,3})\)/g;
  return [...data.matchAll(mulInstructions)];
}

/**
 * Extract only enabled valid mul instructions
 * 
 * @param {string} data - corrupted data
 * 
 * @returns {Array} - enabled mul instructions
 */
const getEnabledMulInstructions = data => {
  const allInstructions = /(?:don\'t\(\)|do\(\)|mul\((?<a>\d{1,3})\,(?<b>\d{1,3})\))/g;
  let enabledMulInstructions = [];
  let mulInstructionsEnabled = true;
  [...data.matchAll(allInstructions)].forEach(instruction => {
    if (instruction[0] === "don't()") {
      mulInstructionsEnabled = false;
    } else if (instruction[0] === "do()") {
      mulInstructionsEnabled = true;
    } else if (mulInstructionsEnabled) {
      enabledMulInstructions.push(instruction);
    }
  });
  return enabledMulInstructions;
}

module.exports = {
  getMulInstructions,
  getEnabledMulInstructions
}
