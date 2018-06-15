function parseLabel(label) {
  return label.replace(/_/gi, ' ');
}

export default function parseGalleries(list) {
  return list.map((item) => {
    const { id, label = id, imageList = [] } = item;

    return {
      id,
      label: parseLabel(label),
      imageList,
      isLoaded: imageList.length > 0
    };
  });
}
