import jQuery from 'jquery';
import parseGalleries from './parseGalleries';
import getDimensions from './getDimensions';
import prepareImage from './prepareImage';

const HOST = 'http://localhost:9090/';

export default {
  fetchGalleryList({ store }) {
    jQuery
      .ajax({
        url: `${HOST}gallery`,
        type: 'GET',
        crossDomain: true
      })
      .then((list) => store.setGalleryList(list));
  },
  setGalleryList({ data }) {
    return {
      list: parseGalleries(data)
    };
  },
  toggleList({ state: { isListExpanded } }) {
    return {
      isListExpanded: !isListExpanded
    };
  },
  setImageDimensions({ state }) {
    return {
      imageDimensions: getDimensions(state.imageList.length)
    };
  },
  fetchImageList({ data: galleryId, store }) {
    jQuery
      .ajax({
        url: `${HOST}image/${galleryId}`,
        type: 'GET',
        crossDomain: true
      })
      .then((imageList) => store.setImageList(imageList));
  },
  setImageList({ data: imageListJSON, state: { galleryId } }) {
    const images = JSON.parse(imageListJSON);

    return {
      imageList: images.map((image) => prepareImage(image, HOST, galleryId))
    };
  },

  /* TODO */

  setGallery({ data: galleryId }) {
    return {
      title: galleryId,
      galleryId
    };
  },

  setGalleryImages({ state, data: { galleryId, imageList } }) {
    return {
      imageDimensions: getDimensions(imageList.length),
      list: state.list.map((item) => {
        if (item.id !== galleryId) {
          return item;
        }

        return {
          ...item,
          isLoaded: true,
          images: imageList
        };
      })
    };
  },

  setGallery({ data: newId, state, store }) {
    const list = state.list.map((item) => {
      if (item.id !== newId) {
        return {
          ...item,
          isSelected: false
        };
      }

      if (!item.isLoaded) {
        store.loadGallery(newId);
      }

      return {
        ...item,
        isSelected: true
      };
    });

    const selectedGallery = state.list.find((item) => item.id === newId);

    return {
      list,
      selectedId: selectedGallery.id,
      title: selectedGallery.id,
      imageDimensions: getDimensions(selectedGallery.images.length)
    };
  },

  // removeImage({ data }) { },

  hideImage({ data, state: { list } }) {
    const { image, gallery: { id: galleryId } } = data;
    let imageCount = 0;

    const newList = list.map((item) => {
      if (item.id !== galleryId) {
        return item;
      }

      const newImages = item.images.filter((img) => img.id !== image.id);

      imageCount = newImages.length;

      return {
        ...item,
        isLoaded: true,
        images: newImages
      };
    });

    return {
      imageDimensions: getDimensions(imageCount),
      list: newList
    };
  }
};
