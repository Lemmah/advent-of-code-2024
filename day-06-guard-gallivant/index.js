// @ts-check

/**
 * Turn 90 degrees from current direction
 * 
 * @param {string} direction - current direction
 * 
 * @returns {string} - new direction
 */
const turn = direction => {
  const turns = {
    up : 'right',
    right : 'down',
    down : 'left',
    left : 'up'
  }
  return turns[direction];
};

/**
 * Move in a certain direction
 * 
 * @param {number[]} position - current position
 * @param {string} direction - direction of movement
 * 
 * @returns {number[]} - new position
 */
const move = (position, direction) => {
  const movements = {
    up : (row, col) => [row - 1, col],
    right : (row, col) => [row, col + 1],
    down : (row, col) => [row + 1, col],
    left : (row, col) => [row, col - 1]
  }
  const [row, col] = position;
  return movements[direction](row, col);
}

/**
 * Get the initial position of the guard in lab
 * 
 * @param {string[][]} labPositions - matrix repr of lab positions
 * 
 * @returns {number[]} - initial position of the guard
 */
const getGuardInitialPos = labPositions => {
  let row = 0, col = 0, guard = '^';
  for (let r = 0; r < labPositions.length; r++) {
    for (let c = 0; c < labPositions[r].length; c++) {
      if(labPositions[r][c] == guard) {
        row = r, col = c;
        break;
      };
    }
  }
  return [row, col];
}

/**
 * Count distinct positions guard will visit on patrol
 * 
 * @param {string[][]} labPositions - matrix repr of lab positions 
 * 
 * @returns {number} - number of positions guard will visit
 */
const countRoutePositions = labPositions => {
  let routePositions = new Set();

  let moveDirection = 'up';
  let obstacle = '#';
  let guardPosition = getGuardInitialPos(labPositions);
  while(labPositions[guardPosition[0]] && labPositions[guardPosition[0]][guardPosition[1]]) {
    const nextPosition = move(guardPosition, moveDirection);
    if (
      labPositions[nextPosition[0]] &&
      labPositions[nextPosition[0]][nextPosition[1]] == obstacle
    ) {
      moveDirection = turn(moveDirection);
      continue;
    }
    routePositions.add(`R${guardPosition[0]}C${guardPosition[1]}`);
    guardPosition = nextPosition;
  }

  return routePositions.size;
}

/**
 * Count possible obstructions that can make guard loop
 * 
 * @param {string[][]} labPositions - matrix repr of lab positions 
 * 
 * @returns {number} - number of possible looping obstructions
 */
const countLoopingObstructions = labPositions => {
  let loopingObstructions = new Set();
  const guardInitialPosition = getGuardInitialPos(labPositions);
  const inFrontOfGuard = move(guardInitialPosition, 'up');

  for (let row = 0; row < labPositions.length; row++) {
    for (let col = 0; col < labPositions[row].length; col++) {
      // skip making obstraction
      const obstruction = [row, col];
      if (
        JSON.stringify(obstruction) == JSON.stringify(inFrontOfGuard) ||
        JSON.stringify(obstruction) == JSON.stringify(guardInitialPosition) ||
        labPositions[obstruction[0]][obstruction[1]] == '#'
      ) continue;

      let turns = new Set();
      let turnsCount = 0;
      let guardPosition = guardInitialPosition;
      let moveDirection = 'up';
      let obstacle = '#';
      labPositions[row][col] = '#'; // make obstruction
      while(labPositions[guardPosition[0]] && labPositions[guardPosition[0]][guardPosition[1]]) {
        const nextPosition = move(guardPosition, moveDirection);
        if (
          labPositions[nextPosition[0]] &&
          labPositions[nextPosition[0]][nextPosition[1]] == obstacle
        ) {
          moveDirection = turn(moveDirection);
          turns.add(`R${nextPosition[0]}C${nextPosition[1]}`);
          turnsCount++;
          continue;
        }
        guardPosition = nextPosition;
        if(turnsCount > 3 * turns.size) {
          loopingObstructions.add(`R${row}C${col}`);
          break;
        }
      }
      labPositions[row][col] = '.'; // remove obstruction 
    }
  }

  return loopingObstructions.size;
}

module.exports = {
  turn,
  move,
  getGuardInitialPos,
  countRoutePositions,
  countLoopingObstructions
};
