import { ImageObject } from "../ImageObject";
import {ProgressMonitor, WorkerService } from "../WorkerService";
import {RequestMessagePayload, ResponseMessagePayload, WorkerMessageTypes, WorkerMessageTypesValues } from "./ImageObjectWorkerTypes";

export abstract class ImageObjectWorkerService<TARGET  extends ImageObject> extends WorkerService<
    WorkerMessageTypes,
    RequestMessagePayload,
    ResponseMessagePayload,
    TARGET
> {

    public createImageObject(
        width: number,
        height: number,
        buffer: ArrayBuffer,
    ): Promise<TARGET> {
        return this.sendRequest(
            WorkerMessageTypesValues.create,
            {
                width,
                height,
                buffer,
            }
        );
    }

    public applyAverageFilter(
        id: number,
        iteration: number,
        progressMonitor: ProgressMonitor,
    ): Promise<TARGET> {
        return this.sendRequest(WorkerMessageTypesValues.apply_average_filter, {
            id,
            iteration,
        }, progressMonitor);
    }

    public deleteImageObject(id: number): Promise<TARGET> {
        return this.sendRequest(WorkerMessageTypesValues.delete, {
            id,
        });
    }
}