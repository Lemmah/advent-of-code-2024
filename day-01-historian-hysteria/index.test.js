//@ts-check
const {
  getDistanceApart,
  getSimilarityScore
} = require('./index.js');

describe('getDistanceApart', () => {
  it('should get distance apart for small lists', () => {
    const left = [1, 2];
    const right = [3, 4];
    const distance = getDistanceApart(left, right);
    expect(distance).toEqual(4);
  });
  it('should return zero for equal lists unsorted', () => {
    const left = [3, 2, 1];
    const right = [1, 2, 3];
    const distance = getDistanceApart(left, right);
    expect(distance).toEqual(0);
  });
  it('should get distance for example lists', () => {
    const left = [3, 4, 2, 1, 3, 3];
    const right = [4, 3, 5, 3, 9, 3];
    const distance = getDistanceApart(left, right);
    expect(distance).toEqual(11);
  })
});

describe('getSimilarityScore', () => {
  it('should get similarity score of equal lists', () => {
    const left = [1, 2, 3];
    const right = [1, 2, 3];
    const similarity = getSimilarityScore(left, right);
    expect(similarity).toEqual(6);
  });
  it('should get similarity score for provided example', () => {
    const left = [3, 4, 2, 1, 3, 3];
    const right = [4, 3, 5, 3, 9 ,3];
    const similarity = getSimilarityScore(left, right);
    expect(similarity).toEqual(31);
  });
});
