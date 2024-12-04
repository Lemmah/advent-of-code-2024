//@ts-check

const { countXMAS, countMAS } = require('./index.js');

describe('countXMAS', () => {
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

describe('countMAS', () => {
  it('should count one x-mas', () => {
    const lines = [
      'M.S',
      '.A.',
      'M.S'
    ];
    const masCount = countMAS(lines);
    expect(masCount).toBe(1);
  });
  it('should count two horizontal x-mas', () => {
    const lines = [
      'M.SM.S',
      '.A..A.',
      'M.SM.S'
    ];
    const masCount = countMAS(lines);
    expect(masCount).toBe(2);
  });
  it('should count two vertical x-mas', () => {
    const lines = [
      'M.S',
      '.A.',
      'M.S',
      'M.S',
      '.A.',
      'M.S'
    ];
    const masCount = countMAS(lines);
    expect(masCount).toBe(2);
  });
  it('should count all x-mass - provided example', () => {
    const lines = [
      '.M.S......',
      '..A..MSMS.',
      '.M.S.MAA..',
      '..A.ASMSM.',
      '.M.S.M....',
      '..........',
      'S.S.S.S.S.',
      '.A.A.A.A..',
      'M.M.M.M.M.',
      '..........'
    ];
    const masCount = countMAS(lines);
    expect(masCount).toBe(9);
  });
});