import { ImageObject } from "./ImageObject";

export class DoubleBufferingImageObject {
  private imageObject: ImageObject;
  public data2: Uint8ClampedArray;
  public dataArray: Uint8ClampedArray[];
  public currentIndex;

  constructor(imageObject: ImageObject) {
    this.imageObject = imageObject;
    this.data2 = this.imageObject.createImageArray(
      imageObject.data.buffer.slice(0),
      0,
      imageObject.width * imageObject.height * 4,
    );
    this.dataArray = [imageObject.data, this.data2];
    this.currentIndex = 0;
  }

  setCurrentIndex(index: number): void {
    this.currentIndex = index;
  }

  getInputData(): Uint8ClampedArray {
    return this.dataArray[this.currentIndex % 2];
  }

  getOutputData(): Uint8ClampedArray {
    return this.dataArray[(this.currentIndex + 1) % 2];
  }

  copyData1ToData2(): void {
    this.data2.set(this.imageObject.data);
  }

  copyData2ToData1(): void {
    this.imageObject.data.set(this.data2);
  }
}
