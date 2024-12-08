class ASImageObject {
  width: u32;
  height: u32;
  imageArray: Uint8ClampedArray;

  constructor(width: u32, height: u32) {
    this.width = width;
    this.height = height;
    this.imageArray = new Uint8ClampedArray(width * height * 4);
  }
}

let nextId: u32 = 1;

class ASImageObjects {
  static instances: Map<u32, ASImageObject> = new Map();
  constructor() {}

  static getSingleton(): Map<u32, ASImageObject> {
    return ASImageObjects.instances;
  }
}

export function initialize(): ASImageObjects {
  return new ASImageObjects();
}

// ImageObjectのインスタンスを作成
export function createImageObject(width: u32, height: u32): u32 {
  const id = nextId++;
  const image = new ASImageObject(width, height);
  ASImageObjects.getSingleton().set(id, image);
  return id;
}

export function setImageObjectContent(
  id: u32,
  initialImageContent: Uint8ClampedArray,
): void {
  const image = ASImageObjects.getSingleton().get(id);
  image.imageArray.set(initialImageContent);
}

export function getImageObjectPtr(id: u32): usize {
  const imageObject = ASImageObjects.getSingleton().get(id);
  if (!imageObject) throw new Error("Invalid ImageObject ID");
  return imageObject.imageArray.dataStart;
}

export function getImageObjectLen(id: u32): u32 {
  const imageObject = ASImageObjects.getSingleton().get(id);
  if (!imageObject) throw new Error("Invalid ImageObject ID");
  return imageObject.imageArray.length;
}

export function deleteImageObject(id: u32): void {
  ASImageObjects.getSingleton().delete(id);
}

// 平均化フィルタを適用
export function applyAverageFilter(id: u32, iteration: i32, requestId: i32): void {
  const imageObject = ASImageObjects.getSingleton().get(id);
  if (!imageObject) throw new Error("Invalid ImageObject ID");

  const width: i32 = imageObject.width;
  const height: i32 = imageObject.height;
  const imageArray = imageObject.imageArray;
  const copy = new Uint8ClampedArray(u32(width * height * 4));

  for (let c = 0; c < iteration; c++) {
    postProgressMessage(id, c, iteration, requestId);
    copy.set(imageArray);
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let r: u32 = 0,
          g: u32 = 0,
          b: u32 = 0,
          a: u32 = 0;

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const index: u32 = u32((y + dy) * width + (x + dx)) * 4;
            r += unchecked(copy[index]) & 0xff;
            g += unchecked(copy[index + 1]) & 0xff;
            b += unchecked(copy[index + 2]) & 0xff;
            a += unchecked(copy[index + 3]) & 0xff;
          }
        }

        const i: u32 = u32((y * width + x) * 4);
        unchecked((imageArray[i] = u32(r / 9)));
        unchecked((imageArray[i + 1] = u32(g / 9)));
        unchecked((imageArray[i + 2] = u32(b / 9)));
        unchecked((imageArray[i + 3] = u32(a / 9)));
      }
    }
  }
  postProgressMessage(id, iteration, iteration, requestId);
}

@external("hostModule", "postProgressMessage")
export declare function postProgressMessage(id: u32, value: u32, maxValue: u32, requestId: u32): void;
