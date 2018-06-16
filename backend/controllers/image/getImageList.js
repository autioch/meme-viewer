const imageManager = require('./manager');

module.exports = async function getImageList(req, res) {
  const { galleryId } = req.params;
  const imageList = await imageManager.getImageList(galleryId);

  res.setHeader('Content-Type', 'text/javascript');
  res.status(200).send(JSON.stringify(imageList));
};
