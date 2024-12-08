import ASImageObjectWorker from "./ASImageObjectWorker?worker";
import { ASImageObjectProxy } from "./ASImageObjectProxy";
import {
  ApplyAverageFilterResponseMessagePayload,
  CreateResponseMessagePayloadAS,
  DeleteResponseMessagePayload,
  ResponseMessagePayload,
  WorkerMessageTypes,
  WorkerMessageTypesValues,
} from "../ImageObject/ImageObjectWorkerTypes";
import {
  WorkerResponse,
} from "../WorkerService";
import { ImageObjectWorkerService } from "../ImageObject/ImageObjectWorkerService";
import { ImageObject } from "../ImageObject";


export class ASImageObjectWorkerService extends ImageObjectWorkerService<
  ImageObject
> {
  cache = new Map<number, ASImageObjectProxy>();

  createWorker(): Worker {
    return new ASImageObjectWorker();
  }

  applyMiddleware(
    response: WorkerResponse<WorkerMessageTypes, ResponseMessagePayload>,
  ): ASImageObjectProxy {
    switch (response.type) {
      case WorkerMessageTypesValues.create: {
        const { id, width, height, dataArray, ptr, len } =
          response.responsePayload as unknown as CreateResponseMessagePayloadAS;
        const asImageObjectProxy = new ASImageObjectProxy(
          width,
          height,
          dataArray.buffer,
          ptr,
          len,
          id,
        );
        this.cache.set(id, asImageObjectProxy);
        return asImageObjectProxy;
      }
      case WorkerMessageTypesValues.apply_average_filter: {
        const { id } =
          response.responsePayload as unknown as ApplyAverageFilterResponseMessagePayload;
        const asImageObjectProxy = this.cache.get(id);
        if (!asImageObjectProxy) {
          throw new Error("not found id: " + id);
        }
        return asImageObjectProxy;
      }
      case WorkerMessageTypesValues.delete: {
        const { id } =
          response.responsePayload as unknown as DeleteResponseMessagePayload;
        const asImageObjectProxy = this.cache.get(id);
        if (!asImageObjectProxy) {
          throw new Error("not found id: " + id);
        }
        return asImageObjectProxy;
      }
      default:
        throw new Error("unknown result");
    }
  }
}
