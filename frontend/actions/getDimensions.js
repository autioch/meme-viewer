/* eslint no-magic-numbers: 0 */
/* eslint max-statements: 0 */
/* eslint complexity: 0 */

const RATIO = 0.75;

function getColRow(imageCount, ratio) {
  if (imageCount === 0) {
    return {
      row: 1,
      col: 1
    };
  }

  for (let row = 1; row <= imageCount; row++) {
    const maxItemsInCol = Math.ceil(row * ratio);

    for (let col = 1; col <= maxItemsInCol; col++) {
      if (row * col >= imageCount) {
        return {
          row,
          col
        };
      }
    }
  }

  throw Error(`Calculating rows/cols went wrong for ${imageCount} images.`);
}

export default function getDimensions(imageCount) {
  const { col, row } = getColRow(imageCount, RATIO);

  const imageWidth = Math.floor(window.innerWidth / row);
  const imageHeight = Math.floor(window.innerHeight / col);

  return {
    width: `${Math.floor(imageWidth)}px`,
    height: `${Math.floor(imageHeight)}px`
  };
}
