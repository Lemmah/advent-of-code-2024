//@ts-check

const { countXMAS } = require('./index.js');

describe('countXmas', () => {
  it('should count horizontal forward', () => {
    const lines = [
      '.....XMAS.',
      '.XMAS.....'
    ];
    const xmasCount = countXMAS(lines);
    expect(xmasCount).toBe(2);
  });
  it('should count horizontal backwards', () => {
    const lines = [
      '.....SAMX.',
      '.SAMX.....'
    ];
    const xmasCount = countXMAS(lines);
    expect(xmasCount).toBe(2);
  });
  it('should count vertical forward', () => {
    const lines = [
      'X...X...',
      'M...M...',
      'A...A...',
      'S...S...'
    ];
    const xmasCount = countXMAS(lines);
    expect(xmasCount).toBe(2);
  });
  it('should count vertical backwards', () => {
    const lines = [
      'S...S',
      'A...A',
      'M...M',
      'X...X'
    ];
    const xmasCount = countXMAS(lines);
    expect(xmasCount).toBe(2);
  });
  it('should count positive diagonal forward', () => {
    const lines = [
      'X...X....',
      '.M...M...',
      '..A...A..',
      '...S...S.'
    ];
    const xmasCount = countXMAS(lines);
    expect(xmasCount).toBe(2);
  });
  it('should count positive diagonal backwards', () => {
    const lines = [
      'S...S...',
      '.A...A..',
      '..M...M.',
      '...X...X'
    ];
    const xmasCount = countXMAS(lines);
    expect(xmasCount).toBe(2);
  });
  it('should count negative diagonal forward', () => {
    const lines = [
      '...X...X',
      '..M...M.',
      '.A...A..',
      'S...S...'
    ];
    const xmasCount = countXMAS(lines);
    expect(xmasCount).toBe(2);
  });
  it('should count negative diagonal backwards', () => {
    const lines = [
      '...S...S.',
      '..A...A..',
      '.M...M...',
      'X...X....'
    ];
    const xmasCount = countXMAS(lines);
    expect(xmasCount).toBe(2);
  });
  it('should count all combinations - example provided', () => {
    const lines = [
      '....XXMAS.',
      '.SAMXMS...',
      '...S..A...',
      '..A.A.MS.X',
      'XMASAMX.MM',
      'X.....XA.A',
      'S.S.S.S.SS',
      '.A.A.A.A.A',
      '..M.M.M.MM',
      '.X.X.XMASX'
    ];
    const xmasCount = countXMAS(lines);
    expect(xmasCount).toBe(18);
  });
});
