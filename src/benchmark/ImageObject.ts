export abstract class ImageObject {
  public width: number;
  public height: number;
  public buffer: ArrayBuffer;
  public id!: number;

  constructor(width: number, height: number, buffer: ArrayBuffer) {
    this.width = width;
    this.height = height;
    this.buffer = buffer;
  }

  abstract getDataArray(): Uint8ClampedArray;
}
