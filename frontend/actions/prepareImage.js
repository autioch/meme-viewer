export default function prepareImage(image, url, galleryId) {
  return {
    id: image.id,
    label: image.id,
    url: `${url}image/${galleryId}/${image.id}`
  };
}
