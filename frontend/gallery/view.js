const { h, Component } = require('preact');
const ItemView = require('./item/view');
const getDimensions = require('./getDimensions');
const prepareImage = require('./prepareImage');

require('./styles');

module.exports = class GalleryView extends Component {
  constructor(props) {
    super(props);

    this.hideImage = this.hideImage.bind(this);
    this.removeImage = this.removeImage.bind(this);

    this.state = {
      dimensions: {},
      imageList: []
    };
    this.fetchImageList();
  }

  removeImage(image) {
    return window
      .fetch(image.link, {
        method: 'delete'
      })
      .then(() => this.hideImage(image));
  }

  hideImage(image) {
    this.setImageList(this.state.imageList.filter((img) => image.id !== img.id));
  }

  fetchImageList() {
    const { id, imageList } = this.props.gallery;

    if (imageList) {
      this.setImageList(imageList);
    } else {
      window
        .fetch(`image/${id}`)
        .then((result) => result.json())
        .then((newImageList) => this.setImageList(newImageList));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.gallery.id !== this.props.gallery.id) {
      this.setState({
        dimensions: {},
        imageList: []
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gallery.id !== this.props.gallery.id) {
      this.fetchImageList();
    }
  }

  setImageList(imageList) {
    const { gallery } = this.props;

    imageList.forEach((image) => prepareImage(image, gallery));

    // side effect :(
    gallery.imageList = imageList;

    this.setState({
      imageList,
      dimensions: getDimensions(imageList.length)
    });
  }

  render() {
    const { dimensions, imageList } = this.state;

    return (
      <div className="gallery">
        {imageList.map((image, index) => <ItemView
          image={image}
          dimensions={dimensions}
          key={index}
          removeImage={this.removeImage}
          hideImage={this.hideImage}
          />)}
      </div>
    );
  }
};
