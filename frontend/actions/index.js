export default {

  setState({ data }) {
    return data;
  },

  fetchGalleries({ store }) {
    window
      .fetch('gallery')
      .then((result) => result.json())
      .then((list) => store.setState({
        list
      }));
  },

  setGallery({ data, state }) {
    const list = state.list.map((item) => Object.assign({}, item, {
      isSelected: item.id === data
    }));

    return {
      list,
      selectedId: data,
      title: state.list.find((item) => item.id === data).id
    };
  }
};
