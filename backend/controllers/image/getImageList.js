const { httpStatus: { OK } } = require('utils');
const imageManager = require('./manager');

module.exports = async function getImageList(req, res) {
  const { galleryId } = req.params;
  const imageList = await imageManager.getGalleryImages(galleryId);

  res.setHeader('Content-Type', 'text/javascript');
  res.status(OK).send(JSON.stringify(imageList));
};
