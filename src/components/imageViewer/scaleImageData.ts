export function scaleImageData(imageData: ImageData, scale: number): ImageData {
  const srcWidth = imageData.width;
  const srcHeight = imageData.height;
  const dstWidth = Math.floor(srcWidth * scale);
  const dstHeight = Math.floor(srcHeight * scale);
  const dstImageData = new ImageData(dstWidth, dstHeight);

  const srcData = imageData.data;
  const dstData = dstImageData.data;

  for (let y = 0; y < dstHeight; y++) {
    for (let x = 0; x < dstWidth; x++) {
      const srcX = Math.floor(x / scale);
      const srcY = Math.floor(y / scale);

      const srcIndex = (srcY * srcWidth + srcX) * 4;
      const dstIndex = (y * dstWidth + x) * 4;

      dstData[dstIndex] = srcData[srcIndex];
      dstData[dstIndex + 1] = srcData[srcIndex + 1];
      dstData[dstIndex + 2] = srcData[srcIndex + 2];
      dstData[dstIndex + 3] = srcData[srcIndex + 3];
    }
  }

  return dstImageData;
}
