const path = require('path');

const MIN_LENGTH = 2;

function getDirectory() {
  if (process.argv.length > MIN_LENGTH) {
    return process.argv[MIN_LENGTH];
  }

  return path.join(__dirname, 'data', 'example');
}

// module.exports = getDirectory();
module.exports = path.join('d:', 'images');
