module.exports = [{
  path: '/image/:galleryId',
  method: 'get',
  handler: require('./getImageList')
}, {
  path: '/image/:galleryId/:imageId',
  method: 'get',
  handler: require('./getImage')
}, {
  path: '/image/:galleryId/:imageId',
  method: 'delete',
  handler: require('./deleteImage')
}];
