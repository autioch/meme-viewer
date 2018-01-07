/* eslint class-methods-use-this: 0 */
const { Component, h } = require('preact');
const ListView = require('./list/view');
const GalleryView = require('./gallery/view');

module.exports = class View extends Component {
  constructor(props) {
    super(props);

    this.setGallery = this.setGallery.bind(this);
    this.state = {
      selectedId: null,
      list: []
    };
  }

  componentDidMount() {
    window
      .fetch('gallery')
      .then((result) => result.json())
      .then((list) => {
        list.forEach((gallery) => {
          gallery.label = gallery.tags.join(', ');// gallery.id.toString().replace(/_/gi, ' ');
        });
        this.setState({
          list
        });
      });
  }

  setGallery(gallery) {
    /*  Not really that good.*/
    this.state.list.forEach((gal) => {
      gal.isSelected = gal.id === gallery.id;
    });

    this.setState({
      selectedId: gallery.id
    });

    document.querySelector('title').textContent = gallery.label;
  }

  render() {
    const gallery = this.state.list.find((gal) => gal.id === this.state.selectedId);

    return (
      <div className="app">
        {gallery ? <GalleryView gallery={gallery} /> : ''}
        <ListView list={this.state.list} setGallery={this.setGallery} />
      </div>
    );
  }
};
