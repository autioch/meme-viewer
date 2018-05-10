export default function prepareImage(image, gallery) {
  if (image.isPrepared) {
    return;
  }

  const link = `image/${gallery.id}/${image.id}`;
  const label = image.id.replace(/_/gi, ' ');

  image.link = link;
  image.width = 0;
  image.height = 0;
  image.label = label;

  /* Read data from image */
  const tag = document.createElement('img');

  tag.className = 'gallery__image';
  tag.alt = label;
  tag.title = label;

  tag.onload = () => {
    image.width = tag.width;
    image.height = tag.height;
    image.isPrepared = true;
  };
  tag.src = link;
}
