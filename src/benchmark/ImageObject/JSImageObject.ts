import { ImageObject } from "../ImageObject";

export class JSImageObject extends ImageObject {
  static nextId = 0;
  public readonly id;
  public dataArray!: Uint8ClampedArray;

  constructor(
    width: number,
    height: number,
    buffer: ArrayBuffer,
    id?: number,
  ) {
    super(width, height, buffer);
    this.dataArray = this.createDataArray(buffer, 0, width * height * 4);
    this.id = id == undefined ? JSImageObject.nextId++ : id;
  }

  createDataArray(
    buffer: ArrayBuffer,
    ptr: number,
    size: number,
  ): Uint8ClampedArray {
    if (ptr >= 0) {
      return (this.dataArray = new Uint8ClampedArray(buffer, ptr, size));
    } else {
      return (this.dataArray = new Uint8ClampedArray(buffer));
    }
  }

  getDataArray(): Uint8ClampedArray {
    return this.dataArray;
  }
}