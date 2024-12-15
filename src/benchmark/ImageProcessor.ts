import { ProgressMonitor } from "./ProgressMonitor";

export abstract class ImageProcessor{
    abstract initialize(width: number, height: number, buffer: ArrayBuffer): Promise<void> ;
    abstract applyAverageFilter(iteration: number, options: {
        isWorker?: boolean;
        simd?: boolean;
    }, progressMonitor: ProgressMonitor): Promise<void>;
    abstract transfer(): Promise<Uint8ClampedArray>;
}