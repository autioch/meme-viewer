const HOST = 'http://localhost:9090/';

function prepareImage(image, url, galleryId) {
  return {
    id: image.id,
    label: image.id,
    url: `${url}image/${galleryId}/${image.id}`
  };
}

export default function parseImages(imageJSON, galleryId) {
  const images = JSON.parse(imageJSON);

  return images.map((image) => prepareImage(image, HOST, galleryId));
}
