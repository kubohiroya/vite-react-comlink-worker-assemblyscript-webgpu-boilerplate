import * as Comlink from "comlink";

import * as wasm from "../../../build/vite-react-comlink-worker-assemblyscript-boilerplate/assets";

import { ProgressMonitor } from "../../types/ProgressMonitor";
import { ImageDataHandler } from "../ImageDataHandler";

export class ASImageDataHandler implements ImageDataHandler {
  public id!: number;

  constructor() {}

  public async initialize(
    width: number,
    height: number,
    buffer: ArrayBuffer,
  ): Promise<void> {
    this.id = wasm.createASImageObject(width, height, buffer);
  }

  public async applyAverageFilter(
    iteration: number,
    options: {
      simd?: boolean;
    },
    progressMonitor: ProgressMonitor,
  ): Promise<void> {
    (globalThis as any).postProgressMessage = function(
      value: number,
      valueMax: number,
    ): void {
      progressMonitor({ value, valueMax });
    };
    if(options.simd){
      wasm.applyAverageFilterSIMD(this.id, iteration);
    }else{
      wasm.applyAverageFilter(this.id, iteration);
    }
  }

  public async transfer(): Promise<Uint8ClampedArray> {
    const [ptr, len] = wasm.getImageObjectPtrLen(this.id);
    //const [width, height] = wasm.getImageObjectWidthHeight(this.id);
    const array = new Uint8ClampedArray(wasm.memory.buffer, ptr, len)
    wasm.deleteImageObject(this.id);
    //const i = 1025*4;
    //console.log('transfer', new Uint8ClampedArray(array.slice(i,i+16)), width, height);
    return array;
  }

  public close(): void {
    self.close();
  }
}

Comlink.expose(new ASImageDataHandler());
