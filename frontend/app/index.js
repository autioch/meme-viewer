import React from 'react';
import { Helmet } from 'react-helmet';
import GalleryView from './gallery/view';
import ListView from './list/view';
import './styles.css';

export default ({ store, state: { galleryId, galleryList, imageDimensions, isListExpanded } }) => {
  const gallery = galleryList.find((item) => item.id === galleryId);

  return (
    <div className="app">
      <Helmet>
        <title>{gallery ? gallery.id : 'Meme viewer'}</title>
      </Helmet>
      {gallery ? <GalleryView
        gallery={gallery}
        imageDimensions={imageDimensions}
        removeImage={store.removeImage}
        hideImage={store.hideImage}
      /> : ''}
      <ListView
        galleryList={galleryList}
        isExpanded={isListExpanded}
        toggleList={store.toggleList}
        setGallery={store.setGallery}
      />
    </div>
  );
};
