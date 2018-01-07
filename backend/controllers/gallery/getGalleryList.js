const { httpStatus: { OK, SERVER_ERROR } } = require('utils');
const galleryManager = require('backend/managers/gallery');

module.exports = function getGalleryList(req, res) {
  return galleryManager
    .readGalleries()
    .then((galleryList) => {
      res.setHeader('Content-Type', 'text/javascript');
      res.status(OK).send(JSON.stringify(galleryList));
    })
    .catch((err) => res.status(SERVER_ERROR).send({
      error: `Galleries not found.\n${err.message}`
    }));
};
