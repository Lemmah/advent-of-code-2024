// @ts-check

const {
  getPriceForRegion,
  getTotalFencingPrice
} = require('./index.js');

describe('getPriceForRegion', () => {
  it('should get price for a singleton', () => {
    const farm = [['A']];
    const region = '0,0';
    const regionPrice = getPriceForRegion()(region, farm);
    expect(regionPrice).toBe(4);
  });
  it('should get price for 2 gardens in a region - #1 (horizontal)', () => {
    const farm = [['A','A']];
    const region = '0,1';
    const regionPrice = getPriceForRegion()(region, farm);
    expect(regionPrice).toBe(12);
  });
  it('should get price for 2 gardens in a region - #2 (vertical)', () => {
    const farm = [['A'],['A']];
    const region = '0,0';
    const regionPrice = getPriceForRegion()(region, farm);
    expect(regionPrice).toBe(12);
  });
});

describe('getTotalFencingPrice', () => {
  it('shoud pass given example', () => {
    const farm = [
      [
        'R', 'R', 'R', 'R',
        'I', 'I', 'C', 'C',
        'F', 'F'
      ],
      [
        'R', 'R', 'R', 'R',
        'I', 'I', 'C', 'C',
        'C', 'F'
      ],
      [
        'V', 'V', 'R', 'R',
        'R', 'C', 'C', 'F',
        'F', 'F'
      ],
      [
        'V', 'V', 'R', 'C',
        'C', 'C', 'J', 'F',
        'F', 'F'
      ],
      [
        'V', 'V', 'V', 'V',
        'C', 'J', 'J', 'C',
        'F', 'E'
      ],
      [
        'V', 'V', 'I', 'V',
        'C', 'C', 'J', 'J',
        'E', 'E'
      ],
      [
        'V', 'V', 'I', 'I',
        'I', 'C', 'J', 'J',
        'E', 'E'
      ],
      [
        'M', 'I', 'I', 'I',
        'I', 'I', 'J', 'J',
        'E', 'E'
      ],
      [
        'M', 'I', 'I', 'I',
        'S', 'I', 'J', 'E',
        'E', 'E'
      ],
      [
        'M', 'M', 'M', 'I',
        'S', 'S', 'J', 'E',
        'E', 'E'
      ]
    ];
    const fencingPrice = getTotalFencingPrice(farm);
    expect(fencingPrice).toBe(1930);
  });
});
