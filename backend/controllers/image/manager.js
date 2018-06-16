const path = require('path');
const fs = require('fs').promises;
const dataPath = require('dataPath');
const qbLog = require('qb-log');
const { existsSync } = require('fs');

const forbiddenExtensions = ['js', 'css', 'htm', 'html'];
const ignoredExtensions = ['json'];
const KB = 1024;
const MIN_KB = 7;

function removeFile(fullPath) {
  try {
    fs.unlink(fullPath);
  } catch (err) {
    qbLog.error(err.message);
  }
}

async function statImage(galleryFolder, fileName) {
  const fullPath = path.join(galleryFolder, fileName);
  const stat = await fs.stat(fullPath);

  return {
    stat,
    fileName,
    fullPath
  };
}

function filterImage({ stat, fileName, fullPath }) {
  if (!stat.isFile()) {
    return false;
  }
  if (stat.size < KB * MIN_KB) {
    removeFile(fullPath);

    return false;
  }

  const extension = path.extname(fileName).replace('.', '');

  if (forbiddenExtensions.includes(extension)) {
    removeFile(fullPath);

    return false;
  }

  return !ignoredExtensions.includes(extension);
}

async function prepareGallery(galleryFolder) {
  const dataItems = await fs.readdir(galleryFolder);
  const statPromises = dataItems.map((fileName) => statImage(galleryFolder, fileName));
  const stats = await Promise.all(statPromises);
  const imagePromises = stats.filter((item) => filterImage(item));
  const images = await Promise.all(imagePromises);

  return images.map((item) => ({
    id: item.fileName
  }));
}

const galleryCache = {};

module.exports = {

  deleteImage(galleryId, imageId) {
    const imagePath = path.join(dataPath, galleryId, imageId);

    return fs.unlink(imagePath);
  },

  async readImage(galleryId, imageId) {
    const imagePath = path.join(dataPath, galleryId, imageId);
    const imageData = await fs.readFile(imagePath);

    return {
      imageData,
      extension: path.extname(imagePath).replace('.', '')
    };
  },

  async getImageList(galleryId) {
    const galleryFolder = path.join(dataPath, galleryId);

    if (galleryCache[galleryFolder]) {
      return galleryCache[galleryFolder];
    }

    const cachePath = path.join(dataPath, galleryId, `${galleryId}.json`);

    if (existsSync(cachePath)) {
      const fileContents = await fs.readFile(cachePath, 'utf8');

      return JSON.parse(fileContents);
    }

    const galleryImages = await prepareGallery(galleryFolder);

    galleryCache[galleryFolder] = galleryImages;

    await fs.writeFile(cachePath, JSON.stringify(galleryImages), 'utf8');

    return galleryImages;
  }

};
