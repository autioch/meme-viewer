function parseLabel(label) {
  return label.replace(/_/gi, ' ');
}

export default function parseGalleries(list) {
  const galleries = list
    .map((item) => {
      const { id, label = id, imageList = [] } = item;

      return {
        id,
        label: parseLabel(label),
        imageList,
        isLoaded: imageList.length > 0
      };
    });

  return galleries.sort((galA, galB) => parseInt(galA.id, 10) - parseInt(galB.id, 10));
}
