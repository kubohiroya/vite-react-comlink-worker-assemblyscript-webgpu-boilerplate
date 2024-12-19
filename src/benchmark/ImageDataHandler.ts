import { ProgressMonitor } from "../types/ProgressMonitor";

export type ImageDataHandler = {
  initialize(width: number, height: number, buffer: ArrayBuffer): Promise<void>;
  applyAverageFilter(
    iteration: number,
    options: {
      isWorker?: boolean;
      simd?: boolean;
    },
    progressMonitor: ProgressMonitor,
  ): Promise<void>;
  transfer(): Promise<Uint8ClampedArray>;
};
