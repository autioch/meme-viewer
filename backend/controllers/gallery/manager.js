const cleanupFileName = require('./cleanupFileName');
const dataPath = require('dataPath');
const fs = require('fs').promises;
const { existsSync } = require('fs');
const path = require('path');

let galleryList;

async function statItem(fileName) {
  const stat = await fs.stat(path.join(dataPath, fileName));

  return {
    stat,
    fileName
  };
}

async function readGalleryFolder() {
  const dataItems = await fs.readdir(dataPath);
  const statPromises = dataItems.map((fileName) => statItem(fileName));
  const stats = await Promise.all(statPromises);
  const galleries = stats.filter(({ stat }) => stat.isDirectory());
  const renamePromises = galleries.map(({ fileName }) => cleanupFileName(fileName));

  return Promise.all(renamePromises);
}

module.exports = {
  async getGalleryList() {
    if (galleryList) {
      return galleryList;
    }

    const cachePath = path.join(dataPath, 'list.json');

    if (existsSync(cachePath)) {
      const fileContents = await fs.readFile(cachePath, 'utf8');

      return JSON.parse(fileContents);
    }

    galleryList = await readGalleryFolder();

    await fs.writeFile(cachePath, JSON.stringify(galleryList), 'utf8');

    return galleryList;
  }
};
