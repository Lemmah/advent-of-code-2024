// @ts-check

const {
  turn,
  move,
  getGuardInitialPos,
  countRoutePositions,
  countLoopingObstructions
} = require('./index.js');

describe('turn', () => {
  it('should turn 90 degrees : up => right', () => {
    const currentDirection = 'up';
    const nextDirection = turn(currentDirection);
    expect(nextDirection).toBe('right');
  });
  it('should turn 90 degrees : right => down', () => {
    const currentDirection = 'right';
    const nextDirection = turn(currentDirection);
    expect(nextDirection).toBe('down');
  });
  it('should turn 90 degrees: down => left', () => {
    const currentDirection = 'down';
    const nextDirection = turn(currentDirection);
    expect(nextDirection).toBe('left');
  });
  it('should turn 90 degrees : left => up', () => {
    const currentDirection = 'left';
    const nextDirection = turn(currentDirection);
    expect(nextDirection).toBe('up');
  });
});

describe('move', () => {
  it('should move up : -ve row', () => {
    const currentPostion = [2,1];
    const direction = 'up';
    const [row, column] = move(currentPostion, direction);
    expect(row).toBe(1);
    expect(column).toBe(1);
  });
  it('should move right : +ve column', () => {
    const currentPosition = [1, 1];
    const direction = 'right';
    const [row, column] = move(currentPosition, direction);
    expect(row).toBe(1);
    expect(column).toBe(2);
  });
  it('should move down : +ve row', () => {
    const currentPosition = [1,1];
    const direction = 'down';
    const [row, column] = move(currentPosition, direction);
    expect(row).toBe(2);
    expect(column).toBe(1);
  });
  it('should move left : -ve column', () => {
    const currentPosition = [1,2];
    const direction = 'left';
    const [row, column] = move(currentPosition, direction);
    expect(row).toBe(1);
    expect(column).toBe(1);
  });
});

describe('getGuardInitialPos', () => {
  it('should get guard position - only position', () => {
    const labPositions = [['^']];
    const initialGuardPosition = getGuardInitialPos(labPositions);
    expect(initialGuardPosition[0]).toBe(0);
    expect(initialGuardPosition[1]).toBe(0);
  });
  it('should get guard position - third row', () => {
    const labPositions = [['.'],['.'],['^']];
    const initialGuardPosition = getGuardInitialPos(labPositions);
    expect(initialGuardPosition[0]).toBe(2);
    expect(initialGuardPosition[1]).toBe(0);
  })
});

describe('countRoutePositions', () => {
  it('should count guard starting position', () => {
    const labPositions = [['^']];
    const routePositionsCount = countRoutePositions(labPositions);
    expect(routePositionsCount).toBe(1);
  });
  it('should count forwards without obstacles', () => {
    const labPositions = [['.'],['.'],['^']];
    const routePositionsCount = countRoutePositions(labPositions);
    expect(routePositionsCount).toBe(3);
  });
  it('should count with one obstacle', () => {
    const labPositions = [['#'],['.'],['.'],['^']];
    const routePositionsCount = countRoutePositions(labPositions);
    expect(routePositionsCount).toBe(3);
  });
  it('should execute all four turns correctly', () => {
    const labPositions = [
      ['#', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '#'],
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.'],
      ['^', '.', '.', '#', '.']
    ];
    const routePositionsCount = countRoutePositions(labPositions);
    expect(routePositionsCount).toBe(11);
  });
  it('should leave mapped area right', () => {
    const labPositions = [
      ['#', '.', '.'],
      ['^', '.', '.']
    ];
    const routePositionsCount = countRoutePositions(labPositions);
    expect(routePositionsCount).toBe(3);
  });
  it('should execute all four turns correctly', () => {
    const labPositions = [
      ['#', '.', '.', '.', '.'],
      ['.', '#', '.', '.', '#'],
      ['.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.'],
      ['^', '.', '.', '#', '.']
    ];
    const routePositionsCount = countRoutePositions(labPositions);
    expect(routePositionsCount).toBe(4);
  });
  it('should count provided example', () => {
    const labPositions = [
      ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '#', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '#', '.', '.', '^', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '#', '.'],
      ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.']
    ];
    const routePositionsCount = countRoutePositions(labPositions);
    expect(routePositionsCount).toBe(41);
  });
});

describe('countLoopingObstructions', () => {
  it('should count one possible looping obstruction', () => {
    const labPositions = [
      ['#', '#', '#', '#'],
      ['.', '.', '.', '#'],
      ['.', '.', '.', '#'],
      ['.', '.', '.', '#'], // only obstruction in [3][1] will loop
      ['^', '.', '#', '#']
    ];
    const routePositionsCount = countLoopingObstructions(labPositions);
    expect(routePositionsCount).toBe(1);
  });
  it('should count possible looping obstructions for the provided example', () => {
    const labPositions = [
      ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '#', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '#', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '#', '.', '.', '^', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '.', '.', '#', '.'],
      ['#', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
      ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.']
    ];
    const routePositionsCount = countLoopingObstructions(labPositions);
    expect(routePositionsCount).toBe(6);
  });
});
