// @ts-check

const {
  transformStone,
  transformStones,
  blinkAndCountStones,
  transformStoneAndCount
} = require('./index.js');

describe('transformStone', () => {
  it('should transform 0 to 1 without splitting', () => {
    const stone = 0;
    const transformed = transformStone(stone);
    expect(transformed.length).toBe(1);
    expect(transformed[0]).toBe(1);
  });
  it('should split even number of digits to two stones - #1', () => {
    const stone = 99;
    const transformed = transformStone(stone);
    expect(transformed.length).toBe(2);
  });
  it('should split even number of digits to two stones - #2', () => {
    const stone = 1234;
    const transformed = transformStone(stone);
    expect(transformed[0]).toBe(12);
    expect(transformed[1]).toBe(34);
  });
  it('should ignore leading zeros after splitting', () => {
    const stone = 1000;
    const transformed = transformStone(stone);
    expect(transformed[0]).toBe(10);
    expect(transformed[1]).toBe(0);
  });
  it('should multiply by 2024 if stone is not 0 or even', () => {
    const stone = 9;
    const transformed = transformStone(stone);
    expect(transformed.length).toBe(1);
    expect(transformed[0]).toBe(18216);
  });
});

describe('transformStones', () => {
  it('should transform 0 to 1 without splitting', () => {
    const stones = [0];
    const transformed = transformStones(stones);
    expect(transformed.length).toBe(1);
    expect(transformed[0]).toBe(1);
  });
  it('should split even number of digits to two stones', () => {
    const stones = [1234];
    const transformed = transformStones(stones);
    expect(transformed[0]).toBe(12);
    expect(transformed[1]).toBe(34);
  });
  it('should transform stones as in given example - #1', () => {
    const stones = [ 0, 1, 10, 99, 999 ];
    const expectedTransformed = [ 1, 2024, 1, 0, 9, 9, 2021976 ];
    const transformed = transformStones(stones);
    expect(transformed.length).toBe(expectedTransformed.length);
    transformed.forEach((stone, position) => {
      expect(stone).toBe(expectedTransformed[position]);
    })
  });
});

describe('transformStoneAndCount', () => {
  it('should count 1 stone for zero blinks', () => {
    const stone = 0;
    const count = transformStoneAndCount(stone, 0);
    expect(count).toBe(1);
  });
  it('should count 1 if first blink does not split', () => {
    const stone = 0;
    const count = transformStoneAndCount(stone, 1);
    expect(count).toBe(1);
  });
  it('should count 2 if first blink splits', () => {
    const stone = 99;
    const count = transformStoneAndCount(stone, 1);
    expect(count).toBe(2);
  });
  it('should count 4 for second blink of 12121212', () => {
    const stone = 12121212;
    const count = transformStoneAndCount(stone, 2);
    expect(count).toBe(4);
  })
});

describe('blinkAndCountStones', () => {
  const stones = [125, 17];

  it('should transform stones - 1 blink', () => {
    const stonesAfterBlinking = blinkAndCountStones(stones, 1);
    expect(stonesAfterBlinking).toBe(3);
  });
  it('should transform stones - 2 blinks', () => {
    const stonesAfterBlinking = blinkAndCountStones(stones, 2);
    expect(stonesAfterBlinking).toBe(4);
  });
  it('should transform stones - 3 blinks', () => {
    const stonesAfterBlinking = blinkAndCountStones(stones, 3);
    expect(stonesAfterBlinking).toBe(5);
  });
  it('should transform stones - 4 blinks', () => {
    const stonesAfterBlinking = blinkAndCountStones(stones, 4);
    expect(stonesAfterBlinking).toBe(9);
  });
  it('should transform stones - 5 blinks', () => {
    const stonesAfterBlinking = blinkAndCountStones(stones, 5);
    expect(stonesAfterBlinking).toBe(13);
  });
  it('should transform stones - 6 blinks', () => {
    const stonesAfterBlinking = blinkAndCountStones(stones, 6);
    expect(stonesAfterBlinking).toBe(22);
  });
  it('should transform stones - 25 blinks', () => {
    const stonesAfterBlinking = blinkAndCountStones(stones, 25);
    expect(stonesAfterBlinking).toBe(55312);
  });
});
