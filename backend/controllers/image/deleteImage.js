const { httpStatus: { OK, SERVER_ERROR } } = require('utils');
const imageManager = require('backend/managers/image');

module.exports = function deleteImage(req, res) {
  const { imageId, galleryId } = req.params;

  imageManager
    .deleteImage(galleryId, imageId)
    .then(() => res.status(OK).send('File removed'))
    .catch((err) => res.status(SERVER_ERROR).send({
      error: `Image not found.\n${err.message}`
    }));
};
