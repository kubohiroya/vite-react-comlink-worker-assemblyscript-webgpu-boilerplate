import * as Comlink from "comlink";

import { ImageObject } from "../../models/ImageObject";
import { ProgressMonitor } from "../../types/ProgressMonitor";
import { ImageDataHandler } from "../ImageDataHandler";
import { applyAverageFilter } from "./applyAverageFilter";
import {applyAverageFilterDoubleBuffered} from "./applyAverageFilterDoubleBuffered"

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
    options: {
      simd?: boolean;
      doubleBuffering?: boolean;
    },
    progressMonitor: ProgressMonitor,
  ): Promise<void> {
    if(options.doubleBuffering){
      applyAverageFilterDoubleBuffered(this.imageObject, iteration, progressMonitor);
    }else{
      applyAverageFilter(this.imageObject, iteration, progressMonitor);
    }
  }

  public async transfer(): Promise<Uint8ClampedArray> {
    return this.imageObject.getData();
  }

  public close(): void {
    self.close();
  }
}

Comlink.expose(new JSImageDataHandler());
