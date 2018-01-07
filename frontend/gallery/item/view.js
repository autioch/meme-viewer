const { h } = require('preact');

require('./styles');

module.exports = function View({ image, dimensions, removeImage, hideImage }) {
  return (
    <div className="gallery__image-wrapper" style={dimensions}>
      <div className="gallery__image-title">{image.label}</div>
      <img className="gallery__image" src={image.link} alt={image.label} title={image.label} />
      <div className="gallery__image-remove" title="Remove image" onclick={() => removeImage(image)} >X</div>
      <div className="gallery__image-hide" title="Hide image" onclick={() => hideImage(image)} >H</div>
      <a className="gallery__image-open" href={image.link} target="_blank" title="Open in new window">{'>'}</a>
    </div>
  );
};
