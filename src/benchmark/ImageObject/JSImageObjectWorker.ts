import { JSImageObject } from "./JSImageObject";
import { applyAverageFilter } from "./JSImageObjectFilter";
import { ProgressMonitorStates, WorkerMessageTypeItem } from "../WorkerService";
import { CreateRequestMessagePayload, ImageObjectWorkerMessageTypeItem, RequestMessages, ResponseMessages } from "../ImageObjectWorkerService";

const cache = new Map<number, JSImageObject>();

self.addEventListener("message", (message: MessageEvent<RequestMessages>) => {
  const { type, requestId } = message.data;

  switch (type) {
    case WorkerMessageTypeItem.create: {
      const { width, height, buffer } = message.data
        .requestPayload as CreateRequestMessagePayload;

      const imageObject = new JSImageObject(width, height, buffer);
      cache.set(imageObject.id, imageObject);
      self.postMessage({
        type: WorkerMessageTypeItem.create,
        requestId,
        responsePayload: {
          id: imageObject.id,
          width,
          height,
        },
      });
      break;
    }

    case ImageObjectWorkerMessageTypeItem.applyAverageFilter: {
      const { id, iteration } = message.data.requestPayload;
      const imageObject = cache.get(id);
      if (!imageObject) {
        throw new Error("not found id: " + id);
      }

      applyAverageFilter(
        imageObject,
        iteration,
        (progress: ProgressMonitorStates) => {
          self.postMessage({
            type,
            requestId,
            responsePayload: {
              id,
            },
            progress: {
              value: progress.value,
              valueMin: progress.valueMin,
              valueMax: progress.valueMax,
              text: progress.text,
            },
          });
        },
      );

      break;
    }

    case WorkerMessageTypeItem.transfer: {
      const { id } = message.data.requestPayload;
      const imageObject = cache.get(id);
      cache.delete(id);
      if (!imageObject) {
        throw new Error("not found: id " + id);
      }
      const { width, height, dataArray } = imageObject;
      postMessage({
        type: WorkerMessageTypeItem.transfer,
        requestId,
        responsePayload: { id, width, height, buffer: dataArray.buffer },
      });
      break;
    }

    default: {
      throw new Error("unknown message: " + JSON.stringify(message.data));
    }
  }
});
