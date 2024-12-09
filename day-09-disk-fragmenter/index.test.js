// @ts-check

const {
  getIndividualBlocks
} = require('./index.js');

describe('getIndividualBlocks', () => {
  it('should convert dense format to individual blocks - #1', () => {
    const denseFormat = [ '1', '2', '3', '4', '5' ];
    const individualBlocks = getIndividualBlocks(denseFormat);
    expect(individualBlocks.join('')).toBe('0..111....22222');
  });
  it('should convert dense format to individual blocks - #2', () => {
    const denseFormat = [
      '2', '3', '3', '3', '1',
      '3', '3', '1', '2', '1',
      '4', '1', '4', '1', '3',
      '1', '4', '0', '2'
    ];
    const individualBlocks = getIndividualBlocks(denseFormat);
    expect(individualBlocks.join('')).toBe('00...111...2...333.44.5555.6666.777.888899');
  });
});
