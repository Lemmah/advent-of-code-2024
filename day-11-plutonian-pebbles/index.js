// @ts-check

/**
 * Change stone according to transformation rules
 * 
 * @param {number} stone - stone engraving
 * 
 * @returns {number[]} - transformed stones
 */
const transformStone = stone => {
  const stoneStr = String(stone);
  const stoneDigitsCount = stoneStr.length;
  if (stone === 0){ 
    return [1];
  } else if (stoneDigitsCount % 2 === 0) {
    const middle = stoneDigitsCount / 2;
    return [
      stoneStr.slice(0,middle),
      stoneStr.slice(middle,)
    ].map(stone => Number(stone));
  }
  return [stone * 2024];
}

/**
 * Transform stones in line according to rules
 * 
 * @param {number[]} stones - array of stones in straight line
 * 
 * @returns {number[]} - transformed stones
 */
const transformStones = stones => {
  let transformed = [];
  stones.forEach(stone => transformed.push(...transformStone(stone)));
  return transformed;
}

/**
 * 
 * @param {number[]} stones - line of stones
 * @param {number} blinks - number of blinks
 * @returns {number} - count of stones
 */
const blinkAndCountStones = (stones, blinks) => {
  if (blinks === 0) return stones.length;
  return blinkAndCountStones(
    transformStones(stones),
    blinks - 1
  );
}

module.exports = {
  transformStone,
  transformStones,
  blinkAndCountStones
}
