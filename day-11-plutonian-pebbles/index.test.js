// @ts-check

const { transformStone } = require('./index.js');

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
