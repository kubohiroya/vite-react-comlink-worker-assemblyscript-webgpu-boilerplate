import { ImageObject } from "../../models/ImageObject";
import { ProgressMonitor } from "../../types/ProgressMonitor";

export function applyAverageFilter(
    sourceImageObject: ImageObject,
    iteration: number,
    progressMonitor: ProgressMonitor,
): void {
  const { width, height } = sourceImageObject;

    const imageObject = sourceImageObject;

    const inputImage = new Uint8ClampedArray(imageObject.width * imageObject.height * 4);
    const outputImage = imageObject.getData();

    [...Array(iteration)].forEach((_: any, index:number)=>{

      progressMonitor({
        value: index,
        valueMax: iteration,
      });

      inputImage.set(outputImage);

      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          let r = 0,
              g = 0,
              b = 0,
              a = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const index = ((y + dy) * width + (x + dx)) * 4;
              r += inputImage[index + 0] & 0xff;
              g += inputImage[index + 1] & 0xff;
              b += inputImage[index + 2] & 0xff;
              a += inputImage[index + 3] & 0xff;
            }
          }
          const i = (y * width + x) * 4;
          outputImage[i] = Math.floor(r / 9) & 0xff;
          outputImage[i + 1] = Math.floor(g / 9) & 0xff;
          outputImage[i + 2] = Math.floor(b / 9) & 0xff;
          outputImage[i + 3] = Math.floor(a / 9) & 0xff;
        }
      }
    });

  progressMonitor({
    value: iteration,
    valueMax: iteration,
  });
}
