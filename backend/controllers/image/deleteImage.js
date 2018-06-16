const imageManager = require('./manager');

module.exports = async function deleteImage(req, res) {
  const { imageId, galleryId } = req.params;

  await imageManager.deleteImage(galleryId, imageId);

  res.status(200).send('File removed');
};
