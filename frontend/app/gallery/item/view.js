import React from 'react';
import './styles.css';

export default function View({ image, dimensions, removeImage, hideImage }) {
  return (
    <div className="gallery__image-wrapper" style={dimensions}>
      <div className="gallery__image-title">{image.label}</div>
      <img className="gallery__image" src={image.link} alt={image.label} title={image.label} />
      <div className="gallery__image-remove" title="Remove image" onClick={() => removeImage(image)} >X</div>
      <div className="gallery__image-hide" title="Hide image" onClick={() => hideImage(image)} >H</div>
      <a className="gallery__image-open" href={image.link} target="_blank" title="Open in new window">{'>'}</a>
    </div>
  );
}
