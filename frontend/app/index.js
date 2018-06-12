import React from 'react';
import GalleryView from './gallery/view';
import ListView from './list/view';
import './styles.css';

export default ({ store, state: { hideImage, removeImage, list, selectedId, imageDimensions } }) => {
  const gallery = list.find((gal) => gal.id === selectedId);

  return (
    <div className="app">
      {gallery ? <GalleryView
        gallery={gallery}
        imageDimensions={imageDimensions}
        removeImage={removeImage}
        hideImage={hideImage}
      /> : ''}
      <ListView list={list} setGallery={store.setGallery}/>
    </div>
  );
};
