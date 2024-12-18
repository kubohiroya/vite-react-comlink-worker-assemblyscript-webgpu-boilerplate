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
      simd: boolean;
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

Comlink.expose(new ASImageDataHandler());
