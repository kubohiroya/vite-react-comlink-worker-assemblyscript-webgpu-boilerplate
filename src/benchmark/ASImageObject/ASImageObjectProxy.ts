import { ImageObject } from "../ImageObject";

export class ASImageObjectProxy extends ImageObject {
  public id: number;
  public buffer: ArrayBuffer;
  public ptr: number;
  public len: number;

  constructor(
    width: number,
    height: number,
    buffer: ArrayBuffer,
    ptr: number,
    len: number,
    id: number,
  ) {
    super(width, height);
    this.buffer = buffer;
    this.ptr = ptr;
    this.len = len;
    this.id = id;
  }

  getDataArray(): Uint8ClampedArray {
    return new Uint8ClampedArray(this.buffer, this.ptr, this.len);
  }
}
