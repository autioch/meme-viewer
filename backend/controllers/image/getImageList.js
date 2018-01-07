const { httpStatus: { OK, SERVER_ERROR } } = require('utils');
const imageManager = require('backend/managers/image');

module.exports = function getImageList(req, res) {
  const { galleryId } = req.params;

  imageManager
    .getGalleryImages(galleryId)
    .then((imageList) => {
      res.setHeader('Content-Type', 'text/javascript');
      res.status(OK).send(JSON.stringify(imageList));
    })
    .catch((err) => {
      res.status(SERVER_ERROR).send({
        error: `Gallery not found.\n${err.message}`
      });
    });
};
