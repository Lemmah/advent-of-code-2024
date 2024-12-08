// @ts-check

const {
  getAllAntinodes
} = require('./index.js');

describe('getAllAntinodes', () => {
  it('should get 2 antinodes for 2 same frequency antennas', () => {
    const matchingFreqAntennas = [[3, 4], [4, 8]];
    const allAntinodes = getAllAntinodes(matchingFreqAntennas);
    expect(allAntinodes.length).toBe(2);
  });
  it('should get correct antinodes for 2 same frequency antennas', () => {
    const matchingFreqAntennas = [[3, 4], [4, 8]];
    const stringifiedAntinodes = ['[2,0]','[5,12]'];
    const allAntinodes = getAllAntinodes(matchingFreqAntennas);
    const allAntinodesMatch = allAntinodes.every(antinode => {
      return stringifiedAntinodes.includes(JSON.stringify(antinode));
    });
    expect(allAntinodesMatch).toBe(true);
  });
  it('should get 6 antinodes for 3 same frequency antennas', () => {
    const matchingFreqAntennas = [[3, 4], [4, 8], [5, 5]];
    const allAntinodes = getAllAntinodes(matchingFreqAntennas);
    expect(allAntinodes.length).toBe(6);
  });
  it('should get correct antinodes for 3 same frequency antennas', () => {
    const matchingFreqAntennas = [[3, 4], [4, 8], [5, 5]];
    const stringifiedAntinodes = [ '[2,0]', '[5,12]', '[1,3]', '[7,6]', '[3,11]', '[6,2]' ];
    const allAntinodes = getAllAntinodes(matchingFreqAntennas);
    const allAntinodesMatch = allAntinodes.every(antinode => {
      return stringifiedAntinodes.includes(JSON.stringify(antinode));
    });
    expect(allAntinodesMatch).toBe(true);
  });
  it('should get 0 antinodes for 1 same frequency antennas', () => {
    const matchingFreqAntennas = [[3, 4]];
    const allAntinodes = getAllAntinodes(matchingFreqAntennas);
    expect(allAntinodes.length).toBe(0);
  });
  it('should get 0 antinodes for 0 same frequency antennas', () => {
    const matchingFreqAntennas = [];
    const allAntinodes = getAllAntinodes(matchingFreqAntennas);
    expect(allAntinodes.length).toBe(0);
  });
});

