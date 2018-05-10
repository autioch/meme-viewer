import React from 'react';

// import './styles';

export default function View({ gallery, setGallery }) {
  return (
    <div className={`gallery__link${gallery.isSelected ? ' is-selected' : ''}`} onClick={() => setGallery(gallery)}>
      {gallery.label}
    </div>
  );
}
