/* eslint-disable no-empty-function */
import { fetchGalleryList, fetchImageList } from './provider';
import getDimensions from './getDimensions';
import parseGalleries from './parseGalleries';
import parseImages from './parseImages';

export default {
  /* Gallery list */
  fetchGalleryList({ store }) {
    fetchGalleryList().then((list) => store.setGalleryList(parseGalleries(list)));
  },
  setGalleryList({ data: galleryList }) {
    return {
      galleryList
    };
  },
  selectGallery({ data: galleryId, state }) {
    return {
      galleryId,
      galleryList: state.galleryList.map((item) => {
        if (item.id === galleryId) {
          return {
            ...item,
            isSelected: true
          };
        }

        if (item.isSelected) {
          return {
            ...item,
            isSelected: false
          };
        }

        return item;
      })
    };
  },
  toggleList({ state: { isListExpanded } }) {
    return {
      isListExpanded: !isListExpanded
    };
  },

  setGallery({ data: galleryId, store }) {
    store
      .selectGallery(galleryId)
      .fetchImageList({
        galleryId
      });
  },

  /* Image list */
  fetchImageList({ data: { galleryId, force }, store, state }) {
    const gallery = state.galleryList.find((item) => item.id === galleryId);

    if (gallery.isLoaded && !force) {
      return;
    }

    fetchImageList(galleryId)
      .then((imageList) => {
        store
          .setImageList({
            galleryId,
            imageList: parseImages(imageList, galleryId)
          })
          .setImageDimensions();
      });
  },
  setImageList({ data: { galleryId, imageList }, state }) {
    return {
      galleryList: state.galleryList.map((item) => {
        if (item.id === galleryId) {
          return {
            ...item,
            imageList,
            isLoaded: true
          };
        }

        return item;
      })
    };
  },
  setImageDimensions({ state: { galleryList, galleryId } }) {
    const gallery = galleryList.find((item) => item.id === galleryId);

    if (!gallery) {
      return {};
    }

    return {
      imageDimensions: getDimensions(gallery.imageList)
    };
  },

  // removeImage({ data: image, store }) {},
  hideImage({ data: image, store }) {
    store.realHideImage(image).setImageDimensions();
  },
  realHideImage({ data: image, state }) {
    return {
      galleryList: state.galleryList.map((gallery) => {
        if (gallery.id !== image.galleryId) {
          return gallery;
        }

        return {
          ...gallery,
          imageList: gallery.imageList.filter((img) => img.id !== image.id)
        };
      })
    };
  }
};
