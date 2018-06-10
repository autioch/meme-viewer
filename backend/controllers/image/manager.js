const path = require('path');
const { dataPath, fs } = require('utils');
const qbLog = require('qb-log');
const Bluebird = require('bluebird');

const seenExtensions = [];
const forbiddenExtensions = ['js', 'css', 'htm', 'html'];

const hiddenExtensions = ['json'];
const KB = 1024;
const MIN_KB = 7;

function removeFile(parentDir, fileName) {
  try {
    fs.unlinkAsync(path.join(parentDir, fileName));
  } catch (err) {
    qbLog.error(err.message);
  }
}

function filterImage(galleryFolder, file) {
  return fs
    .statAsync(path.join(galleryFolder, file))
    .then((stat) => {
      if (!stat.isFile()) {
        return false;
      }

      if (stat.size < KB * MIN_KB) {
        removeFile(galleryFolder, file);

        return false;
      }

      const extension = path.extname(file).replace('.', '');

      if (seenExtensions.indexOf(extension) === -1) {
        seenExtensions.push(extension);
        qbLog.info('Extensions', seenExtensions);
      }

      if (forbiddenExtensions.indexOf(extension) > -1) {
        removeFile(galleryFolder, file);

        return false;
      }

      if (hiddenExtensions.indexOf(extension) > -1) {
        return false;
      }

      return true;
    });
}

function prepareGallery(galleryFolder) {
  return fs
    .readdirAsync(galleryFolder)
    .then((files) =>
      Bluebird
        .filter(files, (file) => filterImage(galleryFolder, file))
        .map((file) => ({
          id: file
        }))
    );
}

module.exports = {

  deleteImage(galleryId, imageId) {
    const imagePath = path.join(dataPath, galleryId, imageId);

    return fs.unlinkAsync(imagePath);
  },

  readImage(galleryId, imageId) {
    const imagePath = path.join(dataPath, galleryId, imageId);

    return fs
      .readFileAsync(imagePath)
      .then((imageData) => ({
        imageData,
        extension: path.extname(imagePath).replace('.', '')
      }));
  },

  getGalleryImages(galleryId) {
    const galleryFolder = path.join(dataPath, galleryId);
    const galleryJson = path.join(dataPath, galleryId, `${galleryId}.json`);

    return fs
      .statAsync(galleryJson)
      .then(() => JSON.parse(fs.readFileAsync(galleryJson)))
      .catch(() => prepareGallery(galleryFolder));
  }

};
