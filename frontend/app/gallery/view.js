import React from 'react';
import ItemView from './item/view';

export default function GalleryView({ gallery, dimensions, removeImage, hideImage }) {
  return (
    <div className="gallery">
      {gallery.images.map((image, index) => <ItemView
        key={index}
        image={image}
        hideImage={hideImage}
        dimensions={dimensions}
        removeImage={removeImage}
      />)}
    </div>
  );
}
