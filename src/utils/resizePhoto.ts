export const resizePhoto = (
  originalSize: number[],
  newSize: number[]
): number[] => {
  const ratio = originalSize[0] / originalSize[1];

  const maximizedToWidth = [newSize[0], newSize[0] / ratio];
  const maximizedToHeight = [newSize[1] * ratio, newSize[1]];

  if (maximizedToWidth[1] > newSize[1]) {
    return maximizedToHeight;
  } else {
    return maximizedToWidth;
  }
};
