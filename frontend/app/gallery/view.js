import React from 'react';
import ItemView from './item/view';
import './styles.css';

export default function GalleryView({ gallery, imageDimensions, removeImage, hideImage }) {
  return (
    <div className="gallery">
      {gallery.images.map((image) => <ItemView
        key={image.id}
        image={image}
        hideImage={() => hideImage({
          gallery,
          image
        })}
        imageDimensions={imageDimensions}
        removeImage={removeImage}
      />)}
    </div>
  );
}
