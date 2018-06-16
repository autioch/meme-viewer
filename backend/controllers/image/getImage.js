const imageManager = require('./manager');

module.exports = async function getImage(req, res) {
  const { imageId, galleryId } = req.params;
  const imageDetails = await imageManager.readImage(galleryId, imageId);

  res.type(imageDetails.extension);
  res.status(200).send(imageDetails.imageData);
};
