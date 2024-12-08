import { JSImageObject } from "./JSImageObject";
import { applyAverageFilter } from "./JSImageObjectFilter";
import {
  CreateRequestMessagePayload,
  RequestMessages,
  ResponseMessages,
  WorkerMessageTypesValues,
} from "./ImageObjectWorkerTypes";
import {ProgressMonitorStates} from '../WorkerService';

const cache = new Map<number, JSImageObject>();

function postResponse(message: ResponseMessages) {
  self.postMessage(message);
}

self.addEventListener("message", (message: MessageEvent<RequestMessages>) => {
  const { type, requestId } = message.data;

  switch (type) {
    case WorkerMessageTypesValues.create: {
      const { width, height, buffer } = message.data
        .requestPayload as CreateRequestMessagePayload;

      const imageObject = new JSImageObject(width, height, buffer);
      cache.set(imageObject.id, imageObject);

      postResponse({
        type: WorkerMessageTypesValues.create,
        requestId,
        responsePayload: {
          id: imageObject.id,
          width,
          height,
          buffer
        },
      });
      break;
    }

    case WorkerMessageTypesValues.apply_average_filter: {
      const { id, iteration } = message.data.requestPayload;
      const imageObject = cache.get(id);
      if(!imageObject){
        throw new Error("not found id: " + id);
      }

      applyAverageFilter(imageObject, iteration, (progress: ProgressMonitorStates) => {
        postResponse({
          type: WorkerMessageTypesValues.apply_average_filter,
          requestId,
          responsePayload: {
            id,
          },
          progress: {
            value: progress.value,
            valueMin: progress.valueMin,
            valueMax: progress.valueMax,
            text: progress.text,
          }
        })
      });

      break;
    }

    case WorkerMessageTypesValues.delete: {
      const { id } = message.data.requestPayload;
      const imageObject = cache.delete(id);
      if(!imageObject){
        throw new Error("not found id: " + id);
      }
      postMessage({
        type: WorkerMessageTypesValues.delete,
        requestId,
        responsePayload: { id },
      });
      break;
    }

    default: {
      throw new Error("unknown message:" + JSON.stringify(message.data));
    }
  }
});
