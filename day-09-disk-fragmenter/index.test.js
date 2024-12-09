// @ts-check

const {
  getIndividualBlocks,
  compactFiles
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

describe('compactFiles', () => {
  it('should fill up free space with left most file blocks - #1', () => {
    const individualBlocks = [
      '0', '.', '.', '1',
      '1', '1', '.', '.',
      '.', '.', '2', '2',
      '2', '2', '2'
    ];
    const compactedBlocks = compactFiles(individualBlocks);
    expect(compactedBlocks.join('')).toBe('022111222');
  });
  it('should fill up free space with left most file blocks - #2', () => {
    const individualBlocks = [
      '0', '0', '.', '.', '.', '1', '1',
      '1', '.', '.', '.', '2', '.', '.',
      '.', '3', '3', '3', '.', '4', '4',
      '.', '5', '5', '5', '5', '.', '6',
      '6', '6', '6', '.', '7', '7', '7',
      '.', '8', '8', '8', '8', '9', '9'
    ];
    const compactedBlocks = compactFiles(individualBlocks);
    expect(compactedBlocks.join('')).toBe('0099811188827773336446555566');
  });
});

describe('calcFSChecksum', () => {
  it('should calculate checksum for example file - #1', () => {
    const compactedBlocks = [
      '0', '0', '9', '9', '8', '1',
      '1', '1', '8', '8', '8', '2',
      '7', '7', '7', '3', '3', '3',
      '6', '4', '4', '6', '5', '5',
      '5', '5', '6', '6'
    ];
    const fileSystemChecksum = calcFSChecksum(compactedBlocks);
    expect(fileSystemChecksum).toBe(1928)
  });
});
