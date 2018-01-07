const path = require('path');

const MIN_LENGTH = 2;

function getDirectory() {
  if (process.argv.length > MIN_LENGTH) {
    return process.argv[MIN_LENGTH];
  }

  return 'example';
}

module.exports = path.join(__dirname, '..', 'data', getDirectory());
