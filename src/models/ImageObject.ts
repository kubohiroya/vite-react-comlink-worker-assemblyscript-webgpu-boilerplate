export class ImageObject {
  public width: number;
  public height: number;
  public data: Uint8ClampedArray;

  constructor(width: number, height: number, buffer: ArrayBuffer) {
    this.width = width;
    this.height = height;
    this.data = this.createImageArray(buffer, 0, width * height * 4);
  }

  createImageArray(
    buffer: ArrayBuffer,
    ptr: number,
    size: number,
  ): Uint8ClampedArray {
    return new Uint8ClampedArray(buffer, ptr, size);
  }

  public getData(): Uint8ClampedArray {
    return this.data;
  }
}
