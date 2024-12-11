const {
  blinkAndCountStones
} = require('./index.js');
const fs = require('node:fs/promises');

(async (inputFile) => {
  const data = await fs.readFile(inputFile, { encoding: 'utf-8' });
  const stones = data.split(' ').map(s => Number(s));

  console.log('#1, Blink 25, Stones Count:', blinkAndCountStones(stones, 25));
  console.log('#2, Blink 75, Stones Count:', blinkAndCountStones(stones, 75));
})('input.txt');
