// @ts-check

const {
  getTrailheadScore,
  getTotalTrailheadsScores
} = require('./index.js');

describe('getTrailheadScore', () => {
  it('should get score of right-only trailhead', () => {
    const topographicMap = [ [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ];
    const trailheadPosition = '0,0';
    const trailheadScore = getTrailheadScore(trailheadPosition, topographicMap);
    expect(trailheadScore).toBe(1);
  });
  it('should get score of zero for short trailhead', () => {
    const topographicMap = [ [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] ];
    const trailheadPosition = '0,0';
    const trailheadScore = getTrailheadScore(trailheadPosition, topographicMap);
    expect(trailheadScore).toBe(0);
  });
  it('should get score of left-only trailhead', () => {
    const topographicMap = [ [ 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ] ];
    const trailheadPosition = '0,9';
    const trailheadScore = getTrailheadScore(trailheadPosition, topographicMap);
    expect(trailheadScore).toBe(1);
  });
  it('should get score of up-only trailhead', () => {
    const topographicMap = [ [9], [8], [7], [6], [5], [4], [3], [2], [1], [0] ];
    const trailheadPosition = '9,0';
    const trailheadScore = getTrailheadScore(trailheadPosition, topographicMap);
    expect(trailheadScore).toBe(1);
  });
  it('should get score of down-only trailhead', () => {
    const topographicMap = [ [0], [1], [2], [3], [4], [5], [6], [7], [8], [9] ];
    const trailheadPosition = '0,0';
    const trailheadScore = getTrailheadScore(trailheadPosition, topographicMap);
    expect(trailheadScore).toBe(1);
  });
  it('should get score for example provided - #1', () => {
    const topographicMap = [
      [
        NaN, NaN, NaN,
          0, NaN, NaN,
        NaN
      ],
      [
        NaN, NaN, NaN,
          1, NaN, NaN,
        NaN
      ],
      [
        NaN, NaN, NaN,
          2, NaN, NaN,
        NaN
      ],
      [
        6, 5, 4, 3,
        4, 5, 6
      ],
      [
          7, NaN, NaN, NaN,
        NaN, NaN,   7
      ],
      [
          8, NaN, NaN, NaN,
        NaN, NaN,   8
      ],
      [
          9, NaN, NaN, NaN,
        NaN, NaN,   9
      ]
    ];
    const trailheadPosition = '0,3';
    const trailheadScore = getTrailheadScore(trailheadPosition, topographicMap);
    expect(trailheadScore).toBe(2);
  });
  it('should get score for example provided - #2', () => {
    const topographicMap = [
      [
        NaN, NaN, 9, 0,
        NaN, NaN, 9
      ],
      [
        NaN, NaN, NaN, 1,
        NaN,   9,   8
      ],
      [
        NaN, NaN, NaN, 2,
        NaN, NaN,   7
      ],
      [
        6, 5, 4, 3,
        4, 5, 6
      ],
      [
        7, 6, 5, NaN,
        9, 8, 7
      ],
      [
          8,   7,   6, NaN,
        NaN, NaN, NaN
      ],
      [
          9,   8,   7, NaN,
        NaN, NaN, NaN
      ]
    ];
    const trailheadPosition = '0,3';
    const trailheadScore = getTrailheadScore(trailheadPosition, topographicMap);
    expect(trailheadScore).toBe(4);
  });
  it('should get score for example provided - #3', () => {
    const topographicMap = [
      [
        1,   0, NaN, NaN,
        9, NaN, NaN
      ],
      [
        2, NaN, NaN, NaN,
        8, NaN, NaN
      ],
      [
        3, NaN, NaN, NaN,
        7, NaN, NaN
      ],
      [
        4, 5, 6, 7,
        6, 5, 4
      ],
      [
        NaN, NaN, NaN, 8,
        NaN, NaN,   3
      ],
      [
        NaN, NaN, NaN, 9,
        NaN, NaN,   2
      ],
      [
        NaN, NaN, NaN, NaN,
        NaN,   0,   1
      ]
    ];
    const trailheadPosition = '6,5';
    const trailheadScore = getTrailheadScore(trailheadPosition, topographicMap);
    expect(trailheadScore).toBe(2);
  });
  it('should get score for example provided - #4', () => {
    const topographicMap = [
      [
        8, 9, 0, 1,
        0, 1, 2, 3
      ],
      [
        7, 8, 1, 2,
        1, 8, 7, 4
      ],
      [
        8, 7, 4, 3,
        0, 9, 6, 5
      ],
      [
        9, 6, 5, 4,
        9, 8, 7, 4
      ],
      [
        4, 5, 6, 7,
        8, 9, 0, 3
      ],
      [
        3, 2, 0, 1,
        9, 0, 1, 2
      ],
      [
        0, 1, 3, 2,
        9, 8, 0, 1
      ],
      [
        1, 0, 4, 5,
        6, 7, 3, 2
      ]
    ];
    const trailheadPosition = '0,2';
    const trailheadScore = getTrailheadScore(trailheadPosition, topographicMap);
    expect(trailheadScore).toBe(5);
  });
});


describe('getTotalTrailheadsScores', () =>  {
  it('should get total scores for provided example', () => {
    const topographicMap = [
      [
        8, 9, 0, 1,
        0, 1, 2, 3
      ],
      [
        7, 8, 1, 2,
        1, 8, 7, 4
      ],
      [
        8, 7, 4, 3,
        0, 9, 6, 5
      ],
      [
        9, 6, 5, 4,
        9, 8, 7, 4
      ],
      [
        4, 5, 6, 7,
        8, 9, 0, 3
      ],
      [
        3, 2, 0, 1,
        9, 0, 1, 2
      ],
      [
        0, 1, 3, 2,
        9, 8, 0, 1
      ],
      [
        1, 0, 4, 5,
        6, 7, 3, 2
      ]
    ];
    const totalTrailheadsScores = getTotalTrailheadsScores(topographicMap);
    expect(totalTrailheadsScores).toBe(36);
  });
});
