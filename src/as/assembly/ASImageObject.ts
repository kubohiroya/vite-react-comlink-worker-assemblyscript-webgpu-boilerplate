export class ASImageObject {
  static nextId: u32 = 0;
  id: u32;
  width: u32;
  height: u32;
  data: Uint8ClampedArray;

  constructor(width: u32, height: u32, buffer: ArrayBuffer) {
    this.id = ASImageObject.nextId++;
    this.width = width;
    this.height = height;
    this.data = Uint8ClampedArray.wrap(buffer, 0, width * height * 4);
  }
}
