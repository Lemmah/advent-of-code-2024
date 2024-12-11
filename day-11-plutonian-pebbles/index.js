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
 * Memoize Transform and count stones
 */
const transformStoneAndCount = (() => {
  const memo = new Map();

  /**
   * Transform and count stones without array
   * 
   * @param {number} stone - stone engraving
   * @param {number} blinks - number of blinks
   * 
   * @returns {number} - number of stones after transformations
   */
  const memoTransformStoneAndCount = (stone, blinks) => {
    if (blinks === 0) return 1;
    const key = `${stone}-${blinks}`;
    let result = memo.get(key);
    if (result) return result;
  
    const transform = transformStone(stone);
    const increment = transform.length - 1;
    if (increment === 1) {
      result = memoTransformStoneAndCount(transform[0], blinks - 1) + memoTransformStoneAndCount(transform[1], blinks - 1);
    } else {
      result = memoTransformStoneAndCount(transform[0], blinks - 1);
    }

    memo.set(key, result);

    return result;
  }

  return memoTransformStoneAndCount;
})();

/**
 * 
 * @param {number[]} stones - line of stones
 * @param {number} blinks - number of blinks
 * @returns {number} - count of stones
 */
const blinkAndCountStones = (stones, blinks) => {
  if (stones.length === 0) return 0;
  const firstStone = stones[0];
  const remainingStones = stones.slice(1,);
  return transformStoneAndCount(firstStone, blinks) + blinkAndCountStones(remainingStones, blinks);
}

module.exports = {
  transformStone,
  transformStones,
  blinkAndCountStones,
  transformStoneAndCount
}
