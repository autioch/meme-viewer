const path = require('path');
const Bluebird = require('bluebird');
const cleanupFileName = require('./cleanupFileName');
const { dataPath, fs } = require('utils');

const MAX_RENAMES = 3;
const RENAME_CONCURENCY = {
  concurrency: MAX_RENAMES
};

let galleryList;

function setupGalleries(files) {
  return Bluebird
    .filter(files, (fileName) => fs.statAsync(path.join(dataPath, fileName)).then((stat) => stat.isDirectory()))
    .map((fileName) => cleanupFileName(fileName), RENAME_CONCURENCY)
    .then((fileNames) => {
      galleryList = fileNames;

      return galleryList;
    });
}

module.exports = {

  readGalleries() {
    if (galleryList) {
      return Bluebird.resolve(galleryList);
    }

    return fs.readFileAsync(path.join(dataPath, 'list.json')).then((list) => {
      galleryList = JSON.parse(list);

      return galleryList;
    });
  }
};
