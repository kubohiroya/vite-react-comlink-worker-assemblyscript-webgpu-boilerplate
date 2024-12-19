import { ASImageObject } from "./ASImageObject";
export class ASImageObjects {
  static instances: Map<u32, ASImageObject> = new Map();
  constructor() {}

  static getSingleton(): Map<u32, ASImageObject> {
    return ASImageObjects.instances;
  }
}
