const { h } = require('preact');

require('./styles');

module.exports = function View({ gallery, setGallery }) {
  return (
    <div className={`gallery__link${gallery.isSelected ? ' is-selected' : ''}`} onclick={() => setGallery(gallery)}>
      {gallery.label}
    </div>
  );
};
