// @ts-check

/**
 * Calculate the trailhead score for the given trailhead in topographic map
 * 
 * @param {string} trailheadPosition - position of the trailhead in map
 * @param {number[][]} topographicMap - where to count trailhead score
 * 
 * @returns {number} - the score (number of complete trails)
 */
const getTrailheadScore = (trailheadPosition, topographicMap) => {
  let positions = new Set([trailheadPosition]);
  let score = 0;
  while (positions.size) {
    const nextPositions = new Set();
    for (const position of positions) {
      const [x, y] = position.split(',').map(pos => Number(pos));
      const height = topographicMap[x][y];
      if (height === 9) {
        score += 1;
        continue;
      }
      const up = [x - 1, y].join(',');
      const down = [x + 1, y].join(',');
      const left = [x, y - 1].join(',');
      const right = [x, y + 1].join(',');
      const viablePositions = [up, down, left, right].forEach(pos => {
        const [x, y] = pos.split(',').map(pos => Number(pos));
        if(
          topographicMap[x] &&
          topographicMap[x][y] - height === 1
        ) {
          nextPositions.add(pos);
        }
      });
    }
    positions = nextPositions;
  }
  return score;
}

/**
 * Calculate the total trailheads scores
 * 
 * @param {number[][]} topographicMap - map with all trailheads
 * 
 * @returns {number} - total trailheads scores
 */
const getTotalTrailheadsScores = topographicMap => {
  let totalTrailheadsScores = 0;

  topographicMap.forEach((row, rIndex) => {
    row.forEach((position, pIndex) => {
      const isTrailhead = Number(position) == 0;
      totalTrailheadsScores += isTrailhead ? 
      getTrailheadScore(`${rIndex},${pIndex}`, topographicMap) : 0;
    })
  });

  return totalTrailheadsScores;
}

module.exports = {
  getTrailheadScore,
  getTotalTrailheadsScores
}
