const { httpStatus: { OK, SERVER_ERROR } } = require('utils');
const imageManager = require('backend/managers/image');

module.exports = function getImage(req, res) {
  const { imageId, galleryId } = req.params;

  return imageManager
    .readImage(galleryId, imageId)
    .then((imageDetails) => {
      res.type(imageDetails.extension);
      res.status(OK).send(imageDetails.imageData);
    })
    .catch((err) => res.status(SERVER_ERROR).send({
      error: `Image not found.\n${err.message}`
    }));
};
