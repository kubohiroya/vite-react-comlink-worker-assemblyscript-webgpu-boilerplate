import JSImageObjectWorker from "./JSImageObjectWorker?worker";
import {
  ApplyAverageFilterResponseMessagePayload,
  CreateResponseMessagePayload,
  DeleteResponseMessagePayload,
  ResponseMessagePayload,
  WorkerMessageTypes,
  WorkerMessageTypesValues,
} from "./ImageObjectWorkerTypes";
import {WorkerResponse,} from "../WorkerService";
import {JSImageObject} from "./JSImageObject";
import {ImageObjectWorkerService} from "./ImageObjectWorkerService";
import { ImageObject } from "../ImageObject";


export class JSImageObjectWorkerService extends ImageObjectWorkerService<ImageObject> {
  cache = new Map<number, JSImageObject>();

  createWorker(): Worker {
    return new JSImageObjectWorker();
  }

  applyMiddleware(
      response: WorkerResponse<WorkerMessageTypes, ResponseMessagePayload>,
  ): JSImageObject {
    switch (response.type) {
      case WorkerMessageTypesValues.create: {
        const { width, height, buffer, id } =
            response.responsePayload as unknown as CreateResponseMessagePayload;
        const jsImageObject = new JSImageObject(width, height, buffer, id);
        this.cache.set(jsImageObject.id, jsImageObject);
        return jsImageObject;
      }
      case WorkerMessageTypesValues.apply_average_filter: {
        const { id } =
            response.responsePayload as unknown as ApplyAverageFilterResponseMessagePayload;
        const jsImageObject = this.cache.get(id);
        if (!jsImageObject) {
          throw new Error("not found id: " + id);
        }
        return jsImageObject;
      }
      case WorkerMessageTypesValues.delete: {
        const { id } =
            response.responsePayload as unknown as DeleteResponseMessagePayload;
        const jsImageObject = this.cache.get(id);
        if (!jsImageObject) {
          throw new Error("not found id: " + id);
        }
        this.cache.delete(id);
        return jsImageObject;
      }
      default:
        throw new Error("unknown result");
    }
  }
}
