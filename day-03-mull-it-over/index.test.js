//@ts-check
const {
  getMulInstructions,
  getEnabledMulInstructions
} = require('./index.js');

describe('getMulInstructions', () => {
  it('should get all valid mul instructions', () => {
    const testData = 'abc_mul(8,1)mul(1,2)^*&*mul(33,33)]';
    const mulInstructions = getMulInstructions(testData);
    const realMulInstructions = [[8,1],[1,2],[33,33]];
    expect(realMulInstructions.length).toBe(mulInstructions.length);
  });
  it('should invalidate instruction for presence of 4 digit number', () => {
    const testData = 'mul(334,1234)$%^&mul(3210,2)jljl;jmul(2,1)';
    const realMulInstructions = [[2,1]];
    const mulInstructions = getMulInstructions(testData);
    expect(mulInstructions.length).toBe(realMulInstructions.length);
  });
  it('should invalidate instruction for missing opening parenthesis (', () => {
    const testData = 'mul2,1)mul(334,1234)$%^&mul(3210,2)jljl;';
    const realMulInstructions = [];
    const mulInstructions = getMulInstructions(testData);
    expect(mulInstructions.length).toBe(realMulInstructions.length);
  });
  it('should invalidate instruction for missing closing parenthesis )', () => {
    const testData = 'mul(2,1mul(334,1234)$%^&mul(3210,2)jljl;';
    const realMulInstructions = [];
    const mulInstructions = getMulInstructions(testData);
    expect(mulInstructions.length).toBe(realMulInstructions.length);
  });
  it('should invalidate instruction because of spaces', () => {
    const testData = 'abc_mul(8 , 1)mul(1 ,2)^*&*mul(33, 33)]';
    const realMulInstructions = [];
    const mulInstructions = getMulInstructions(testData);
    expect(mulInstructions.length).toBe(realMulInstructions.length);
  });
  it('should invalidate instruction for digits followed by letters', () => {
    const testData = 'abc_mul(8i,1)mul(1v,2)^*&*mul(1e2,33)]';
    const realMulInstructions = [];
    const mulInstructions = getMulInstructions(testData);
    expect(mulInstructions.length).toBe(realMulInstructions.length);
  });
  it('should should not pass for paranthesis not preceded by mul', () => {
    const testData = 'abc_muli(8,1)select(1,2)^*&*why(33,33)]';
    const realMulInstructions = [];
    const mulInstructions = getMulInstructions(testData);
    expect(mulInstructions.length).toBe(realMulInstructions.length);
  });
});

// getEnabledMulInstructions
// works for the given example
describe('getEnabledMulInstructions', () => {
  it('should get only enabled mul instructions', () => {
    const testData = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
    const enabledMulInstructions = [[2,4],[8,5]];
    const mulInstructions = getEnabledMulInstructions(testData);
    expect(mulInstructions.length).toBe(enabledMulInstructions.length);
  });
});
