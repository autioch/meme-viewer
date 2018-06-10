const { httpStatus: { OK } } = require('utils');
const imageManager = require('./manager');

module.exports = async function deleteImage(req, res) {
  const { imageId, galleryId } = req.params;

  await imageManager.deleteImage(galleryId, imageId);

  res.status(OK).send('File removed');
};
