const path = require('path');
const Bluebird = require('bluebird');
const { dataPath, fs, normalizeText } = require('utils');

function renameFilename(oldName, newName) {
  if (oldName === newName) {
    return Bluebird.resolve(newName);
  }

  return fs
    .renameAsync(path.join(dataPath, oldName), path.join(dataPath, newName))
    .then(() => newName)
    .catch((err) => ({
      id: oldName,
      newName,
      message: err.message
    }));
}

module.exports = function cleanupFileName(fileName) {
  const newName = normalizeText(fileName.toLowerCase()).replace(/[^a-z0-9]/gi, '_');

  return renameFilename(fileName, newName)
    .then(() => ({
      id: newName
    }))
    .catch((err) => ({
      id: fileName,
      newName,
      message: err.message
    }));
};
