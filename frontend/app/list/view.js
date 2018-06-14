import React from 'react';
import ItemView from './item/view';
import './styles.css';
import './scroll.css';

export default function ListView({ galleryList, isExpanded, toggleList, setGallery }) {
  return (
    <div className={`list${isExpanded ? ' is-expanded' : ''}`}>
      <div className ="list__toggle" onClick={toggleList}>{'< >'}</div>
      <div className ="list__content">
        {galleryList.map((gallery) => <ItemView key={gallery.id} gallery={gallery} setGallery={setGallery} />)}
      </div>
    </div>
  );
}
