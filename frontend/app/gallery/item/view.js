import React from 'react';
import './styles.css';

export default function View({ image, imageDimensions, removeImage, hideImage }) {
  return (
    <div className="gallery-item__wrapper" style={Object.assign({}, imageDimensions)}>
      <div className="gallery-item__title">{image.label}</div>
      <img className="gallery-item__image" src={image.url} alt={image.label} title={image.label} />
      <div className="gallery-item__options">
        <div className="gallery-item__hide" title="Hide image" onClick={() => hideImage(image)} >H</div>
        <a className="gallery-item__open" href={image.url} target="_blank" title="Open in new window">{'>'}</a>
        <div className="gallery-item__remove" title="Remove image" onClick={() => removeImage(image)} >X</div>
      </div>
    </div>
  );
}
