/* eslint-disable no-empty-function */

export default {
  /* Gallery list */
  fetchGalleryList() {},
  setGalleryList({ data: galleryList }) {},
  setGallery({ data: galleryId }) {},
  toggleList() {},

  /* Image list */
  fetchImageList({ data: galleryId }) {},
  setImageList({ data: { galleryId, imageList } }) {},
  setImageDimensions() {},
  hideImage({ data: image }) {},
  removeImage({ data: image }) {}

};
