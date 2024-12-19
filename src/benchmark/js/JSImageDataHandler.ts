import * as Comlink from "comlink";

import { ImageObject } from "../../models/ImageObject";
import { ProgressMonitor } from "../../types/ProgressMonitor";
import { ImageDataHandler } from "../ImageDataHandler";
import { applyAverageFilter } from "./applyAverageFilter";

export class JSImageDataHandler implements ImageDataHandler {
  public imageObject!: ImageObject;

  constructor() {}

  public async initialize(
    width: number,
    height: number,
    buffer: ArrayBuffer,
  ): Promise<void> {
    this.imageObject = new ImageObject(width, height, buffer);
  }

  public async applyAverageFilter(
    iteration: number,
    options: {},
    progressMonitor: ProgressMonitor,
  ): Promise<void> {
    applyAverageFilter(this.imageObject, iteration, progressMonitor);
  }

  public async transfer(): Promise<Uint8ClampedArray> {
    return this.imageObject.getData();
  }

  public close(): void {
    self.close();
  }
}

Comlink.expose(new JSImageDataHandler());
