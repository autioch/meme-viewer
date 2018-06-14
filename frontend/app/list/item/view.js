import React from 'react';
import './styles.css';

export default function View({ gallery, setGallery }) {
  return (
    <div
      className={`list-item${gallery.isSelected ? ' is-selected' : ''}`}
      onClick={() => setGallery(gallery.id)}
    >
      {gallery.id}
    </div>
  );
}
