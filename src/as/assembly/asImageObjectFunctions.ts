import { ASImageObject } from "./ASImageObject";
import { ASImageObjects } from "./ASImageObjects";
export function createASImageObject(
  width: u32,
  height: u32,
  buffer: ArrayBuffer,
): u32 {
  const image = new ASImageObject(width, height, buffer.slice(0, width * height * 4));
  ASImageObjects.getSingleton().set(image.id, image);
  return image.id;
}

export function getImageObjectPtrLen(id: u32): usize[] {
  const imageObject = ASImageObjects.getSingleton().get(id);
  if (!imageObject) throw new Error("Invalid ImageObject ID");
  return [imageObject.data.dataStart, imageObject.data.length];
}

export function getImageObjectWidthHeight(id: u32): u32[] {
  const imageObject = ASImageObjects.getSingleton().get(id);
  if (!imageObject) throw new Error("Invalid ImageObject ID");
  return [imageObject.width, imageObject.height];
}

export function getImageObjectData(id: u32): Uint8ClampedArray {
  const imageObject = ASImageObjects.getSingleton().get(id);
  if (!imageObject) throw new Error("Invalid ImageObject ID");
  return imageObject.data;
}

export function deleteImageObject(id: u32): void {
  ASImageObjects.getSingleton().delete(id);
}
