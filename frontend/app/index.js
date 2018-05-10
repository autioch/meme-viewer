import React from 'react';
import GalleryView from './gallery/view';
import ListView from './list/view';
import './styles.css';

export default ({ store, state }) => {
  const gallery = state.list.find((gal) => gal.id === state.selectedId);

  return (
    <div className="app">
      {gallery ? <GalleryView gallery={gallery} /> : ''}
      <ListView list={state.list} setGallery={store.setGallery} />
    </div>
  );
};
