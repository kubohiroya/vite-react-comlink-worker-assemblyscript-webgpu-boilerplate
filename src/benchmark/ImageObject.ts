export abstract class ImageObject {
  public width: number;
  public height: number;
  public id!: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  abstract getDataArray(): Uint8ClampedArray;
}
