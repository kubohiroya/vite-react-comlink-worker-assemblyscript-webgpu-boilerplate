export class ImageObject {
  public width: number;
  public height: number;
  public buffer: ArrayBuffer;
  public data: Uint8ClampedArray;

  constructor(width: number, height: number, buffer: ArrayBuffer) {
    this.width = width;
    this.height = height;
    this.buffer = buffer;
    this.data = this.createImageArray(0, width * height * 4);
  }

  createImageArray(
    ptr: number,
    size: number,
  ): Uint8ClampedArray {
    return new Uint8ClampedArray(this.buffer, ptr, size);
  }

  public getData(): Uint8ClampedArray {
    if(this.data.length == 0){
      this.data = this.createImageArray(0, this.width * this.height * 4);
    }
    return this.data;
  }
}
