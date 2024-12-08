import {instantiate} from "../../../build/as/ASModule.release";
import {
  CreateRequestMessagePayload,
  RequestMessages,
  ResponseMessages,
  WorkerMessageTypesValues,
} from "../ImageObject/ImageObjectWorkerTypes";

const wasmInstance = await instantiate(await WebAssembly.compileStreaming(
  fetch("../../../build/as/ASModule.release/index.wasm")), {
  "hostModule": {
    postProgressMessage(
          id: number, value: number, valueMax: number, requestId: number){
      self.postMessage({
          type: WorkerMessageTypesValues.apply_average_filter,
          requestId,
          responsePayload: {
            id,
          },
          progress: {
            value,
            valueMax
          }
        })
      }
  },
} as any);

function postResponse(message: ResponseMessages) {
  self.postMessage(message);
}

self.addEventListener("message", (message: MessageEvent<RequestMessages>) => {
  const { type, requestId } = message.data;

  switch (type) {
    case WorkerMessageTypesValues.create: {
      const { width, height, buffer } = message.data
        .requestPayload as CreateRequestMessagePayload;
      const id = wasmInstance.createImageObject(width, height);
      const dataArraySource = new Uint8ClampedArray(buffer);
      wasmInstance.setImageObjectContent(id, dataArraySource);
      const ptr = wasmInstance.getImageObjectPtr(id);
      const len = width * height * 4;
      const dataArray = new Uint8ClampedArray(
        wasmInstance.memory.buffer,
        ptr,
        len,
      );

      postResponse({
        type: WorkerMessageTypesValues.create,
        requestId,
        responsePayload: {
          id,
          width,
          height,
          dataArray,
          ptr,
          len,
        },
      });
      break;
    }

    case WorkerMessageTypesValues.apply_average_filter: {
      const { id, iteration } = message.data.requestPayload;
      wasmInstance.applyAverageFilter(id, iteration, requestId);
      postResponse({
        type: WorkerMessageTypesValues.apply_average_filter,
        requestId,
        responsePayload: {
          id
        },
      });
      break;
    }

    case WorkerMessageTypesValues.delete: {
      const { id } = message.data.requestPayload;
      wasmInstance.deleteImageObject(id);
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
