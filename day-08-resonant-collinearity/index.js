// @ts-check

/**
 * Get all antinodes for same frequency antennas
 * 
 * @param {number[][]} sameFreqAntennas - positions of same freq antennas
 * 
 * @returns {number[][]} - all antinodes positions
 */
const getAllAntinodes = (sameFreqAntennas, rHarmonics = false, mapSize = 50) => {
  let antinodes = [];
  mapSize = rHarmonics ? mapSize : 1;

  for (let aIndex = 0; aIndex < sameFreqAntennas.length; aIndex++) {
    const firstAntenna = sameFreqAntennas[aIndex];
    for (const secondAntenna of sameFreqAntennas.slice(aIndex + 1,)) {
      let distanceApart = [
        firstAntenna[0] - secondAntenna[0],
        firstAntenna[1] - secondAntenna[1]
      ];

      if(!rHarmonics)
        distanceApart = distanceApart.map(distance => distance * 2);

      let firstAntinode;
      let secondAntinode;
      let c = mapSize;
      while (c > 0) {
        firstAntinode = [
          firstAntenna[0] - (c * distanceApart[0]),
          firstAntenna[1] - (c * distanceApart[1])
        ];
        secondAntinode = [
          secondAntenna[0] + (c * distanceApart[0]),
          secondAntenna[1] + (c * distanceApart[1])
        ];
        antinodes.push(firstAntinode, secondAntinode);
        c--;
      }
    }
  }

  return antinodes;
}

/**
 * Get same frequency antennas positions
 * 
 * @param {string[][]} antennasMap - frequencies of antennas and their position
 * 
 * @returns {Object} - groups of same freq antennas
 */
const getSameFreqAntennas = antennasMap => {
  let sameFrequencyAntennas = {};
  for (let i = 0; i < antennasMap.length; i++) {
    for (let a = 0; a < antennasMap[i].length; a++) {
      const antennaFreq = antennasMap[i][a];
      if (antennaFreq != '.') {
        if (!sameFrequencyAntennas[antennaFreq]) {
          sameFrequencyAntennas[antennaFreq] = [];
        }
        sameFrequencyAntennas[antennaFreq].push([i,a]);
      }
    }
  }
  return sameFrequencyAntennas;
}

/**
 * Count valid antinodes
 * 
 * @param {string[][]} antennasMap - frequencies of antennas and their position
 * 
 * @returns {number} - how many valid antinodes are created
 */
const countAntinodes = (antennasMap, rHarmonics = false) => {
  let antinodes = new Set();

  const sameFreqAntennas = getSameFreqAntennas(antennasMap);
  for(const frequency in sameFreqAntennas) {
    const allAntinodes = getAllAntinodes(sameFreqAntennas[frequency], rHarmonics);
    allAntinodes.forEach(antinode => {
      if (
        antennasMap[antinode[0]] &&
        antennasMap[antinode[0]][antinode[1]]
      ) {
        antinodes.add(`R${antinode[0]}C${antinode[1]}`);
      }
    });
  }

  return antinodes.size;
}

module.exports = {
  getAllAntinodes,
  getSameFreqAntennas,
  countAntinodes
}