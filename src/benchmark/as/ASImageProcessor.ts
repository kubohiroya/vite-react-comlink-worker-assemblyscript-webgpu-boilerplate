import * as Comlink from "comlink";

import * as wasm from "../../../build/vite-react-comlink-worker-assemblyscript-boilerplate/assets";

import { ProgressMonitor } from "../ProgressMonitor";
import { ImageProcessor } from "../ImageProcessor";

export class ASImageProcessor implements ImageProcessor {
  public id!: number;

  constructor() {
  }

  public async initialize(
    width: number,
    height: number,
    buffer: ArrayBuffer,
  ): Promise<void> {
    this.id = wasm.createImageObject(width, height);
    const data = new Uint8ClampedArray(buffer);
    wasm.setImageObjectData(this.id, data);
  }

  public async applyAverageFilter(
    iteration: number,
    options: {
      simd: boolean,
    },
    progressMonitor: ProgressMonitor,
  ): Promise<void> {
    (globalThis as any).postProgressMessage = function postProgressMessage(
      value: number,
      valueMax: number,
    ): void {
      progressMonitor({ value, valueMax });
    };
    wasm.applyAverageFilter(this.id, options.simd || false, iteration);
  }

  public async transfer(): Promise<Uint8ClampedArray> {
    const [ptr, len] = wasm.getImageObjectPtrLen(this.id);
    wasm.deleteImageObject(this.id);
    return new Uint8ClampedArray(wasm.memory.buffer, ptr, len);
  }

  public close(): void {
    self.close();
  }
}

Comlink.expose(new ASImageProcessor());
