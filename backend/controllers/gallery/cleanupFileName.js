const path = require('path');
const dataPath = require('dataPath');
const fs = require('fs').promises;
const diacriticsRemovalMap = require('./diacriticsRemovalMap');
const Bluebird = require('bluebird');

module.exports = function cleanupFileName(fileName) {
  const newName = diacriticsRemovalMap
    .reduce((normalized, change) => normalized.replace(change.letters, change.base), fileName.toLowerCase())
    .replace(/[^\w\s]/gi, '_')
    .replace(/[^a-z0-9]/gi, '_');

  if (fileName === newName) {
    return Bluebird.resolve(newName);
  }

  return fs
    .rename(path.join(dataPath, fileName), path.join(dataPath, newName))
    .then(() => newName);
};
