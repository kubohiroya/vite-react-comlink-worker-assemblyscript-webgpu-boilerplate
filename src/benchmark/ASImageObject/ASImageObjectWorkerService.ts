import ASImageObjectWorker from "./ASImageObjectWorker?worker";

import { ImageObjectWorkerService, ResponseMessagePayload, TransferResponseMessagePayload } from "../ImageObjectWorkerService";
import { ImageObject } from "../ImageObject";
import { JSImageObject } from "../ImageObject/JSImageObject";

export class ASImageObjectWorkerService extends ImageObjectWorkerService {
  createWorker(): Worker {
    return new ASImageObjectWorker();
  }

  instantiateResult(response: ResponseMessagePayload): ImageObject {
    const { id, width, height, buffer } =
      response as unknown as TransferResponseMessagePayload;
    return new JSImageObject(width, height, buffer, id);
  }
}