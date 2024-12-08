import { ProgressMonitor } from "../WorkerService";
import { JSImageObject } from "./JSImageObject";

export function applyAverageFilter(
  imageObject: JSImageObject,
  iteration: number,
  progressMonitor: ProgressMonitor,
): JSImageObject {
  const { width, height, dataArray } = imageObject;
  const progressMonitorText = "Applying Average Filter";
  for (let c = 0; c < iteration; c++) {
    progressMonitor({
      value: c,
      valueMin: 0,
      valueMax: iteration,
      text: progressMonitorText,
    });
    const copy = Uint8ClampedArray.from(dataArray);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let r = 0,
          g = 0,
          b = 0,
          a = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const index = ((y + dy) * width + (x + dx)) * 4;
            r += copy[index + 0] & 0xff;
            g += copy[index + 1] & 0xff;
            b += copy[index + 2] & 0xff;
            a += copy[index + 3] & 0xff;
          }
        }
        const i = (y * width + x) * 4;
        dataArray[i] = (r / 9) & 0xff;
        dataArray[i + 1] = (g / 9) & 0xff;
        dataArray[i + 2] = (b / 9) & 0xff;
        dataArray[i + 3] = (a / 9) & 0xff;
      }
    }
  }
  progressMonitor({
    value: iteration,
    valueMin: 0,
    valueMax: iteration,
    text: progressMonitorText,
  });
  return imageObject;
}
