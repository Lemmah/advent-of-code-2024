//@ts-check
const { getDistanceApart } = require('./index.js');

describe('getDistanceApart', () => {
  test('should get distance apart for small lists', () => {
    const left = [1, 2];
    const right = [3, 4];
    const distance = getDistanceApart(left, right);
    expect(distance).toEqual(4);
  });
  test('should return zero for equal lists unsorted', () => {
    const left = [3, 2, 1];
    const right = [1, 2, 3];
    const distance = getDistanceApart(left, right);
    expect(distance).toEqual(0);
  });
  test('should get distance for example lists', () => {
    const left = [3, 4, 2, 1, 3, 3];
    const right = [4, 3, 5, 3, 9, 3];
    const distance = getDistanceApart(left, right);
    expect(distance).toEqual(11);
  })
});
