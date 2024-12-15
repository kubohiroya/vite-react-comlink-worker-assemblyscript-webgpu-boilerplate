import { ProgressMonitor } from "./ProgressMonitor";

export type ImageProcessor = {
    initialize(width: number, height: number, buffer: ArrayBuffer): Promise<void> ;
    applyAverageFilter(iteration: number, options: {
       isWorker?: boolean;
        simd?: boolean;
    }, progressMonitor: ProgressMonitor): Promise<void>;
    transfer(): Promise<Uint8ClampedArray>;
}