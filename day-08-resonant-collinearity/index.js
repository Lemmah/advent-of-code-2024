// @ts-check

/**
 * Get all antinodes for same frequency antennas
 * 
 * @param {number[][]} sameFreqAntennas - positions of same freq antennas
 * 
 * @returns {number[][]} - all antinodes positions
 */
const getAllAntinodes = sameFreqAntennas => {
  let antinodes = [];

  for (let aIndex = 0; aIndex < sameFreqAntennas.length; aIndex++) {
    const firstAntenna = sameFreqAntennas[aIndex];
    for (const secondAntenna of sameFreqAntennas.slice(aIndex + 1,)) {
      const distanceApart = [
        firstAntenna[0] - secondAntenna[0],
        firstAntenna[1] - secondAntenna[1]
      ];
      const doubleDistanceApart = distanceApart.map(distance => distance * 2);
      const firstAntinode = [
        firstAntenna[0] - doubleDistanceApart[0],
        firstAntenna[1] - doubleDistanceApart[1]
      ];
      const secondAntinode = [
        secondAntenna[0] + doubleDistanceApart[0],
        secondAntenna[1] + doubleDistanceApart[1]
      ];
      antinodes.push(firstAntinode, secondAntinode);
    }
  }

  return antinodes;
}

module.exports = {
  getAllAntinodes
}