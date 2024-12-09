// @ts-check

const {
  getIndividualBlocks,
  compactBlocks,
  calcFSChecksum,
  groupFilesBySize
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

describe('compactBlocks', () => {
  it('should fill up free space with left most file blocks - #1', () => {
    const individualBlocks = [
      '0', '.', '.', '1',
      '1', '1', '.', '.',
      '.', '.', '2', '2',
      '2', '2', '2'
    ];
    const compactedBlocks = compactBlocks(individualBlocks);
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
    const compactedBlocks = compactBlocks(individualBlocks);
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

describe('groupFilesBySize', () => {
  it('should have all sizes in map', () => {
    const denseFormatRepr = [ '1', '2', '3', '4', '5' ];
    const filesBySize = groupFilesBySize(denseFormatRepr);
    const availableSizes = [0,1,2,3,4,5,6,7,8,9];
    expect(Object.keys(filesBySize).length).toBe(availableSizes.length);
  });
  it('should have correct sizes in map - #1', () => {
    const denseFormatRepr = [ '1', '2', '3', '4', '5' ];
    const filesBySize = groupFilesBySize(denseFormatRepr);
    const sizesWithFileIds = ['1', '3', '5'];
    sizesWithFileIds.forEach(size => {
      const filesOfThisSize = filesBySize[size]
      expect(filesOfThisSize).not.toBe(undefined);
      expect(filesOfThisSize.length).toBe(1);
    });
  });
});
