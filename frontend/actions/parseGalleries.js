function parseLabel(label) {
  return label.replace(/_/gi, ' ');
}

export default function parseGalleries(list) {
  return list.map((item) => {
    const { id, label = id, images = [] } = item;

    return {
      id,
      label: parseLabel(label),
      images,
      isLoaded: images.length > 0
    };
  });
}
