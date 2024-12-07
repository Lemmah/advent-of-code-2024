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
    routePositions.add(`${guardPosition[0]}${guardPosition[1]}`);
    guardPosition = nextPosition;
  }

  return routePositions.size;
}

module.exports = {
  turn,
  move,
  getGuardInitialPos,
  countRoutePositions
};
