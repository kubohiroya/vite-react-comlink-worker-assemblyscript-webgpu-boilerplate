import { ProgressMonitor } from "./ProgressMonitor";

export class JSImageObject {
  static nextId = 0;
  public readonly id;
  public width: number;
  public height: number;
  public imageArrays!: Uint8ClampedArray[];
  public currentImageArrayIndex = 0;

  constructor(width: number, height: number, buffer: ArrayBuffer, id?: number) {
    this.width = width;
    this.height = height;

    this.imageArrays = [
      this.createImageArray(buffer, 0, width * height * 4),
      this.createImageArray(buffer, 0, width * height * 4),
    ];

    this.id = id == undefined ? JSImageObject.nextId++ : id;
  }

  createImageArray(
    buffer: ArrayBuffer,
    ptr: number,
    size: number,
  ): Uint8ClampedArray {
    if (ptr >= 0) {
      return new Uint8ClampedArray(buffer, ptr, size);
    } else {
      return new Uint8ClampedArray(buffer);
    }
  }

  getData(): Uint8ClampedArray {
    return this.imageArrays[this.currentImageArrayIndex];
  }

  applyAverageFilter(
    iteration: number,
    progressMonitor: ProgressMonitor,
  ): JSImageObject {
    for (let c = 0; c < iteration; c++) {
      progressMonitor({
        value: c,
        valueMax: iteration,
      });

      const { width, height } = this;
      const inputImage = this.imageArrays[c % 2];
      const outputImage = this.imageArrays[(c + 1) % 2];
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
    }
    progressMonitor({
      value: iteration,
      valueMax: iteration,
    });

    return this;
  }
}
