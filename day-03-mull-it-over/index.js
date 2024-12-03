const getMulInstructions = data => {
  const mulInstructions = /mul\((?<a>\d{1,3})\,(?<b>\d{1,3})\)/g;
  return [...data.matchAll(mulInstructions)];
}

module.exports = {
  getMulInstructions
}