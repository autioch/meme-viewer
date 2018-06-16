import jQuery from 'jquery';

const HOST = 'http://localhost:9090/';

export function fetchGalleryList() {
  return jQuery.ajax({
    url: `${HOST}gallery`,
    type: 'GET',
    crossDomain: true
  });
}

export function fetchImageList(galleryId) {
  return jQuery.ajax({
    url: `${HOST}image/${galleryId}`,
    type: 'GET',
    crossDomain: true
  });
}
