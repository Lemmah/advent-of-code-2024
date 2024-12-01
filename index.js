//@ts-check

/**
 * Calculate the distance apart between to provided lists
 * 
 * @param {number[]} left - first group list
 * @param {number[]} right - second group list
 * @returns {number}
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

module.exports = {
  getDistanceApart
}