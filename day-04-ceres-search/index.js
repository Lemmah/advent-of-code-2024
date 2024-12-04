//@ts-check

/**
 * Count 1 if letters form XMAS
 * 
 * @param {string} x
 * @param {string} m 
 * @param {string} a
 * @param {string} s
 * 
 * @returns {number} - 1 if letters are XMAS
 */
const oneXMAS = (x,m,a,s) => {
  if (
    x === 'X' &&
    m === 'M' &&
    a === 'A' &&
    s === 'S'
  ) return 1;
  return 0;
}

/**
 * Search for XMAS in a block of letters
 * - find horizontally, vertically, diagonally, forwards and backwards
 * 
 * @param {string[]} lines - lines to find XMAS
 * 
 * @returns {number} - count of XMAS found
 */
const countXmas = lines => {
  let count = 0;
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    for (let letterIndex = 0; letterIndex < lines[lineIndex].length; letterIndex++) {
      const currentLetter = lines[lineIndex][letterIndex];

      const horizontalForward1 = lines[lineIndex][letterIndex + 1] || '.';
      const horizontalForward2 = lines[lineIndex][letterIndex + 2] || '.';
      const horizontalForward3 = lines[lineIndex][letterIndex + 3] || '.';
      // count horizontal forward
      count += oneXMAS(currentLetter,horizontalForward1,horizontalForward2,horizontalForward3);
      // count horizontal backwards
      count += oneXMAS(horizontalForward3,horizontalForward2,horizontalForward1,currentLetter);

      const verticalForward1 = lines[lineIndex + 1]? lines[lineIndex + 1][letterIndex] : '.';
      const verticalForward2 = lines[lineIndex + 2]? lines[lineIndex + 2][letterIndex] : '.';
      const verticalForward3 = lines[lineIndex + 3]? lines[lineIndex + 3][letterIndex] : '.';
      // count vertical forward
      count += oneXMAS(currentLetter,verticalForward1,verticalForward2,verticalForward3);
      // count vertical backwards
      count += oneXMAS(verticalForward3,verticalForward2,verticalForward1,currentLetter);

      const positiveDiagonal1 = lines[lineIndex + 1]? lines[lineIndex + 1][letterIndex + 1] : '.';
      const positiveDiagonal2 = lines[lineIndex + 2]? lines[lineIndex + 2][letterIndex + 2] : '.';
      const positiveDiagonal3 = lines[lineIndex + 3]? lines[lineIndex + 3][letterIndex + 3] : '.';
      // count positive diagonal forward
      count += oneXMAS(currentLetter,positiveDiagonal1,positiveDiagonal2,positiveDiagonal3);
      // count positive diagonal backwards
      count += oneXMAS(positiveDiagonal3,positiveDiagonal2,positiveDiagonal1,currentLetter);

      const negativeDiagonal1 = lines[lineIndex + 1]? lines[lineIndex + 1][letterIndex - 1] : '.';
      const negativeDiagonal2 = lines[lineIndex + 2]? lines[lineIndex + 2][letterIndex - 2] : '.';
      const negativeDiagonal3 = lines[lineIndex + 3]? lines[lineIndex + 3][letterIndex - 3] : '.';
      // count negative diagonal forwards
      count += oneXMAS(currentLetter,negativeDiagonal1,negativeDiagonal2,negativeDiagonal3);
      // count negative diagonal backwards
      count += oneXMAS(negativeDiagonal3,negativeDiagonal2,negativeDiagonal1,currentLetter);
    }
  }
  return count;
}

module.exports = {
  countXmas
}
