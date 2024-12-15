import * as Comlink from "comlink";

import {JSImageObject} from "../JSImageObject";
import {ProgressMonitor} from "../ProgressMonitor";
import { ImageProcessor } from "../ImageProcessor";

export class JSImageProcessor implements ImageProcessor{
  public imageObject!: JSImageObject;

  constructor() {
  }

  public async initialize(
    width: number,
    height: number,
    buffer: ArrayBuffer,
  ): Promise<void> {
    this.imageObject = new JSImageObject(width, height, buffer);
  }

  public async applyAverageFilter(
    iteration: number,
    options: {},
    progressMonitor: ProgressMonitor,
  ): Promise<void> {
    this.imageObject?.applyAverageFilter(iteration, progressMonitor);
  }

  public async transfer(): Promise<Uint8ClampedArray> {
    return this.imageObject?.getData();
  }

  public close(): void {
    self.close();
  }
}

Comlink.expose(new JSImageProcessor());
