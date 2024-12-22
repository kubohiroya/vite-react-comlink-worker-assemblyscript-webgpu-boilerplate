import * as Comlink from "comlink";

import * as wasm from "../../../build/vite-react-comlink-worker-assemblyscript-boilerplate/assets";

import { ProgressMonitor } from "../../types/ProgressMonitor";
import { ImageDataHandler } from "../ImageDataHandler";

export class ASImageDataHandler implements ImageDataHandler {
  public id!: number;

  private static monitors: Map<number,ProgressMonitor> = new Map();

  static {
    (globalThis as any).postProgressMessage = function(
        id: number,
        value: number,
        valueMax: number,
    ): void {
      const monitor = ASImageDataHandler.monitors.get(id);
      if(monitor) {
        monitor({value, valueMax});
      }
    }
  }

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

    ASImageDataHandler.monitors.set(this.id, progressMonitor);

    if(options.simd){
      wasm.applyAverageFilterSIMD(this.id, iteration);
    }else{
      wasm.applyAverageFilter(this.id, iteration);
    }

    ASImageDataHandler.monitors.delete(this.id);
  }

  public async transfer(): Promise<Uint8ClampedArray> {
    const [ptr, len] = wasm.getImageObjectPtrLen(this.id);
    const array = new Uint8ClampedArray(wasm.memory.buffer, ptr, len)
    wasm.deleteImageObject(this.id);
    return array;
  }

  public close(): void {
    self.close();
  }
}

Comlink.expose(new ASImageDataHandler());
