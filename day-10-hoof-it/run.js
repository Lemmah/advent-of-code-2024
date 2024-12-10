const { getTotalTrailheadsScores } = require('./index.js');
const fs = require('node:fs/promises');

(async (inputFile) => {
  const data = await fs.readFile(inputFile, { encoding: 'utf-8' });
  const topographicMap = data.split('\n').map(row => row.split('').map(pos => Number(pos)));

  console.log('#1, Total Trailheads Scores:', getTotalTrailheadsScores(topographicMap));
  console.log('#2, Total Trailheads Scores Ratings:', getTotalTrailheadsScores(topographicMap, true));
})('input.txt');
