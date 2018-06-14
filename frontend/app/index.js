import React from 'react';
import { Helmet } from 'react-helmet';
import GalleryView from './gallery/view';
import ListView from './list/view';
import './styles.css';

export default ({ store, state: { galleryList, imageDimensions, imageList, isListExpanded, title } }) => (
  <div className="app">
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {imageList ? <GalleryView
      imageList={imageList}
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
