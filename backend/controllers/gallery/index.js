const { httpStatus: { OK } } = require('utils');
const manager = require('./manager');

module.exports = [{
  path: '/gallery',
  method: 'get',
  async handler(req, res) {
    const galleryList = await manager.getGalleryList();

    res.setHeader('Content-Type', 'text/json');
    res.status(OK).send(JSON.stringify(galleryList));
  }
}];
