import React from 'react';
import ItemView from './item/view';
import './styles.css';

export default function GalleryView({ imageList, imageDimensions, removeImage, hideImage }) {
  return (
    <div className="gallery">
      {imageList.map((image) => <ItemView
        key={image.id}
        image={image}
        imageDimensions={imageDimensions}
        hideImage={hideImage}
        removeImage={removeImage}
      />)}
    </div>
  );
}
