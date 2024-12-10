import JSImageObjectWorker from "./JSImageObjectWorker?worker";
import { JSImageObject } from "./JSImageObject";
import { ImageObjectWorkerService, ResponseMessagePayload, TransferResponseMessagePayload } from "../ImageObjectWorkerService";
import { ImageObject } from "../ImageObject";

export class JSImageObjectWorkerService extends ImageObjectWorkerService {
  createWorker(): Worker {
    return new JSImageObjectWorker();
  }

  instantiateResult(response: ResponseMessagePayload): ImageObject {
    const { id, width, height, buffer } =
        response as unknown as TransferResponseMessagePayload;
    return new JSImageObject(width, height, buffer, id);
  }
}
