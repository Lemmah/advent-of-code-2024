// @ts-check

/**
 * Get Price for Fencing a Region
 */
const getPriceForRegion = () => {
  const visitedGardens = new Set();

  const visited = pos => visitedGardens.has(pos);

  /**
   * Calculate cost of fencing all gardens in same region
   * 
   * @param {string} garden - repr of garden position in farm
   * @param {string[][]} farm - all gardens
   * 
   * @returns {number} - cost of fencing that region
   */
  const calcPrice = (garden, farm) => {
    if (visitedGardens.has(garden)) return 0;

    const pos = garden.split(',').map(e => Number(e));
    const region = farm[pos[0]][pos[1]];

    let gardensInRegion = [pos];
    let perimeter = 0;
    let area = 0;

    while(gardensInRegion.length) {
      let discoveredGardens = [];

      for (const pos of gardensInRegion) {
        if (visited(String(pos))) continue;

        const up = farm[pos[0] - 1] ? farm[pos[0] - 1][pos[1]] : 'notInFarm';
        if (up != region) perimeter += 1;
        else discoveredGardens.push([pos[0] - 1, pos[1]]);

        const down = farm[pos[0] + 1] ? farm[pos[0] + 1][pos[1]] : 'notInFarm';
        if (down != region) perimeter += 1;
        else if(!visited(String([pos[0] + 1, pos[1]]))) discoveredGardens.push([pos[0] + 1, pos[1]]);
  
        const left = farm[pos[0]][pos[1] - 1];
        if (left != region) perimeter += 1
        else if(!visited(String([pos[0], pos[1] - 1]))) discoveredGardens.push([pos[0], pos[1] - 1]);

        const right = farm[pos[0]][pos[1] + 1];
        if (right != region) perimeter += 1;
        else if(!visited(String([pos[0], pos[1] + 1]))) discoveredGardens.push([pos[0], pos[1] + 1]);

        visitedGardens.add(String(pos));
        area += 1;
      }
      gardensInRegion = discoveredGardens;
    }

    return area * perimeter;
  }

  return calcPrice;
}

const getTotalFencingPrice = farm => {
  const calcPrice = getPriceForRegion();
  let price = 0;

  farm.forEach((row, rIndex) => {
    row.forEach((garden, gIndex) => {
      const gardenRepr = String([rIndex,gIndex]);
      price += calcPrice(gardenRepr, farm);
    })
  })

  return price;
}

module.exports = {
  getPriceForRegion,
  getTotalFencingPrice
}
