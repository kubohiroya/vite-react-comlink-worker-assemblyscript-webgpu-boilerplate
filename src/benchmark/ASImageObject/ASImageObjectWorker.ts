import { instantiate } from "../../../build/as/ASModule.release";
import { CreateRequestMessagePayload, MyWorkerMessageTypeItem, RequestMessages, ResponseMessages } from "../ImageObjectWorkerService";
import { WorkerMessageTypeItem } from "../WorkerService";

const wasmInstance = await instantiate(
  await WebAssembly.compileStreaming(
    fetch("../../../build/as/ASModule.release/index.wasm"),
  ),
  {
    hostModule: {
      postProgressMessage(
        id: number,
        value: number,
        valueMax: number,
        requestId: number,
      ) {
        self.postMessage({
          type: MyWorkerMessageTypeItem.applyAverageFilter,
          requestId,
          responsePayload: {
            id,
          },
          progress: {
            value,
            valueMax,
          },
        });
      },
    },
  } as any,
);

self.addEventListener("message", (message: MessageEvent<RequestMessages>) => {
  const { type, requestId } = message.data;

  switch (type) {
    case WorkerMessageTypeItem.create: {
      const { width, height, buffer } = message.data.requestPayload as CreateRequestMessagePayload;
      const id = wasmInstance.createImageObject(width, height);
      const dataArraySource = new Uint8ClampedArray(buffer);
      wasmInstance.setImageObjectContent(id, dataArraySource);

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

    case MyWorkerMessageTypeItem.applyAverageFilter: {
      const { id, iteration } = message.data.requestPayload;
      wasmInstance.applyAverageFilter(id, iteration, requestId);
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
      const { id } = message.data.requestPayload;
      const [width, height] = wasmInstance.getImageObjectWidthHeight(id);
      const [ptr, len] = wasmInstance.getImageObjectPtrLen(id);
      const dataArrayView = new Uint8ClampedArray(
        wasmInstance.memory.buffer,
        ptr,
        len,
      );
      const dataArray = Uint8ClampedArray.from(dataArrayView);
      wasmInstance.deleteImageObject(id);

      self.postMessage(
        {
          type: WorkerMessageTypeItem.transfer,
          requestId,
          responsePayload: { id, width, height, buffer: dataArray.buffer },
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
