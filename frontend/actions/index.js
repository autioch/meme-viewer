import jQuery from 'jquery';
import parseGalleries from './parseGalleries';
import getDimensions from './getDimensions';
import prepareImage from './prepareImage';

const HOST = 'http://localhost:9090/';

export default {

  setState({ data }) {
    return data;
  },

  fetchGalleries({ store }) {
    jQuery
      .ajax({
        url: `${HOST}gallery`,
        type: 'GET',
        crossDomain: true
      })
      .then((list) => store.setState({
        list: parseGalleries(list)
      }));
  },

  loadGallery({ data: galleryId, store }) {
    jQuery
      .ajax({
        url: `${HOST}image/${galleryId}`,
        type: 'GET',
        crossDomain: true
      })
      .then((imageList) => store.setGalleryImages({
        galleryId,
        imageList: JSON.parse(imageList).map((image) => prepareImage(image, HOST, galleryId))
      }));
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
  },

  setGallery({ data: newId, state, store }) {
    const oldId = state.selectedId;
    const list = state.list.map((item) => {
      if (item.id === oldId) {
        return {
          ...item,
          isSelected: false
        };
      }
      if (item.id === newId) {
        if (!item.isLoaded) {
          store.loadGallery(newId);
        }

        return {
          ...item,
          isSelected: true
        };
      }

      return item;
    });

    const selectedGallery = state.list.find((item) => item.id === newId);

    return {
      list,
      selectedId: selectedGallery.id,
      title: selectedGallery.id,
      imageDimensions: getDimensions(selectedGallery.images.length)
    };
  }
};
