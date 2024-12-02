const {
  getDistanceApart,
  parseInputFile,
  getSimilarityScore
} = require('./index.js');

(async (inputFile) => {
  const parsedInput = await parseInputFile(inputFile);
  console.log('#1, Distance Apart:', getDistanceApart(...parsedInput));
  console.log('#2, Similarity Score:', getSimilarityScore(...parsedInput));
})('./input.txt');
