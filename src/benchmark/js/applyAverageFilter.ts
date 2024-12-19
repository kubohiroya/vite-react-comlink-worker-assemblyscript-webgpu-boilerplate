import { ImageObject } from "../../models/ImageObject";
import { ProgressMonitor } from "../../types/ProgressMonitor";

export function applyAverageFilter(
    sourceImageObject: ImageObject,
    iteration: number,
    progressMonitor: ProgressMonitor,
): void {
  const { width, height } = sourceImageObject;

  const imageObject = sourceImageObject;

  const inputData = new Uint8ClampedArray(imageObject.width * imageObject.height * 4);
  const outputData = imageObject.getData();

  [...Array(iteration)].forEach((_: any, index:number)=>{

    progressMonitor({
      value: index,
      valueMax: iteration,
    });

    inputData.set(outputData);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let r = 0,
            g = 0,
            b = 0,
            a = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const index = ((y + dy) * width + (x + dx)) * 4;
            r += inputData[index + 0];
            g += inputData[index + 1];
            b += inputData[index + 2];
            a += inputData[index + 3];
          }
        }
        const i = (y * width + x) * 4;
        outputData[i] = Math.floor(r / 9);
        outputData[i + 1] = Math.floor(g / 9);
        outputData[i + 2] = Math.floor(b / 9);
        outputData[i + 3] = Math.floor(a / 9);
      }
    }
  });

  progressMonitor({
    value: iteration,
    valueMax: iteration,
  });
}
