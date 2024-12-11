import * as wasm from "../../../build/vite-react-promise-worker-assemblyscript-boilerplate/assets";
import { CreateRequestMessagePayload, ImageObjectWorkerMessageTypeItem, RequestMessages } from "../ImageObjectWorkerService";
import { WorkerMessageTypeItem } from "../WorkerService";

self.addEventListener("message", (message: MessageEvent<RequestMessages>) => {
  const {type, requestId} = message.data;

  switch (type) {
    case WorkerMessageTypeItem.create: {
      const {width, height, buffer} = message.data.requestPayload as CreateRequestMessagePayload;
      const id = wasm.createImageObject(width, height);
      const dataArraySource = new Uint8ClampedArray(buffer);
      wasm.setImageObjectContent(id, dataArraySource);

      self.postMessage({
        type: WorkerMessageTypeItem.create,
        requestId,
        responsePayload: {
          id,
          width,
          height,
        },
      });
      break;
    }

    case ImageObjectWorkerMessageTypeItem.applyAverageFilter: {
      const {id, iteration} = message.data.requestPayload;
      wasm.applyAverageFilter(id, iteration, type, requestId);
      self.postMessage({
        type,
        requestId,
        responsePayload: {
          id,
        },
      });
      break;
    }

    case WorkerMessageTypeItem.transfer: {
      const {id} = message.data.requestPayload;
      const [width, height] = wasm.getImageObjectWidthHeight(id);
      const [ptr, len] = wasm.getImageObjectPtrLen(id);
      const dataArrayView = new Uint8ClampedArray(
          wasm.memory.buffer,
          ptr,
          len,
      );
      const dataArray = Uint8ClampedArray.from(dataArrayView);
      wasm.deleteImageObject(id);

      self.postMessage(
          {
            type: WorkerMessageTypeItem.transfer,
            requestId,
            responsePayload: {id, width, height, buffer: dataArray.buffer},
          },
          [dataArray.buffer],
      );
      break;
    }

    default: {
      throw new Error("unknown message:" + JSON.stringify(message.data));
    }
  }
});

(globalThis as any).postProgressMessage = function postProgressMessage(
    id: number,
    value: number,
    valueMax: number,
    type: number,
    requestId: number,
):void {
  self.postMessage({
    type,
    requestId,
    responsePayload: {
      id,
    },
    progress: {
      value,
      valueMax,
    },
  });
};

