import jQuery from 'jquery';
import parseGalleries from './parseGalleries';
import getDimensions from './getDimensions';

export default {

  setState({ data }) {
    return data;
  },

  fetchGalleries({ store }) {
    jQuery
      .ajax({
        url: 'http://localhost:9090/gallery',
        type: 'GET',
        crossDomain: true
      })
      .then((list) => store.setState({
        list: parseGalleries(list)
      }));
  },

  setGallery({ data, state }) {
    const list = state.list.map((item) => Object.assign({}, item, {
      isSelected: item.id === data
    }));

    const selectedGallery = state.list.find((item) => item.id === data);

    return {
      list,
      selectedId: data,
      title: selectedGallery.id,
      imageDimensions: getDimensions(selectedGallery.images.length)
    };
  }
};
