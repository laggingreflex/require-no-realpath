const fs = require('fs');

const stackMatch = `
  at toRealPath (module.js
  at tryFile (module.js
  at tryPackage (module.js
  at Function.Module._findPath (module.js
  at Function.Module._resolveFilename (module.js
`
  .split(/[\s]*[\n\r]+[\s]*/g)
  .filter(Boolean)

const realpathSync = fs.realpathSync;
fs.realpathSync = (input, opts) => {
  const output = realpathSync.call(fs, input, opts);
  const { stack } = new Error('stack');

  // console.log(`stack:`, stack);
  // console.log(`stackMatch:`, stackMatch);

  let match = stack;
  for (const line of stackMatch) {
    const split = match.split(line);
    if (split.length < 2) {
      // console.log(`!!match`, { line });
      // console.log('return', { output });
      return output;
    }
    // console.log('matched', { line });
    match = split.slice(1).join(' ');
  }
  // console.log('return', { input });
  return input
};

module.exports = () => fs.realpathSync = realpathSync;
