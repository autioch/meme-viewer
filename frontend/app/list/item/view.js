import React from 'react';
import './styles.css';

export default function View({ gallery, setGallery }) {
  return (
    <div
      className={`gallery__link${gallery.isSelected ? ' is-selected' : ''}`}
      onClick={() => setGallery(gallery.id)}
    >
      {gallery.id}
    </div>
  );
}
