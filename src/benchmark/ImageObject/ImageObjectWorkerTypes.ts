import { WorkerRequest, WorkerResponse } from "../WorkerService";

export enum WorkerMessageTypesValues {
  create,
  apply_average_filter,
  delete,
}

export type WorkerMessageTypes =
  | WorkerMessageTypesValues.create
  | WorkerMessageTypesValues.apply_average_filter
  | WorkerMessageTypesValues.delete;

export type CreateRequestMessagePayload = {
  width: number;
  height: number;
  buffer: SharedArrayBuffer | ArrayBuffer;
};

export type DeleteRequestMessagePayload = {
  id: number;
};

export type ApplyAverageFilterRequestMessagePayload = {
  id: number;
  iteration: number;
};

export type CreateRequestMessage = WorkerRequest<
  WorkerMessageTypesValues.create,
  CreateRequestMessagePayload
>;
export type ApplyAverageFilterRequestMessage = WorkerRequest<
  WorkerMessageTypesValues.apply_average_filter,
  ApplyAverageFilterRequestMessagePayload
>;

export type DeleteRequestMessage = WorkerRequest<
  WorkerMessageTypesValues.delete,
  DeleteRequestMessagePayload
>;

type CreateResponseMessagePayloadBase = {
  id: number;
  width: number;
  height: number;
};

export type CreateResponseMessagePayload = CreateResponseMessagePayloadBase & {
  buffer: ArrayBuffer;
};

export type CreateResponseMessagePayloadAS =
  CreateResponseMessagePayloadBase & {
    dataArray: Uint8ClampedArray;
    ptr: number;
    len: number;
  };

export type ApplyAverageFilterResponseMessagePayload = {
  id: number;
};

export type DeleteResponseMessagePayload = {
  id: number;
};

export type CreateResponseMessageAS = WorkerResponse<
  WorkerMessageTypesValues.create,
  CreateResponseMessagePayloadAS
>;

export type CreateResponseMessage = WorkerResponse<
  WorkerMessageTypesValues.create,
  CreateResponseMessagePayload
>;

export type ApplyAverageFilterResponseMessage = WorkerResponse<
  WorkerMessageTypesValues.apply_average_filter,
  ApplyAverageFilterResponseMessagePayload
>;
export type DeleteResponseMessage = WorkerResponse<
  WorkerMessageTypesValues.delete,
  DeleteResponseMessagePayload
>;

export type RequestMessages =
  | CreateRequestMessage
  | ApplyAverageFilterRequestMessage
  | DeleteRequestMessage;

export type RequestMessagePayload =
  | CreateRequestMessagePayload
  | ApplyAverageFilterRequestMessagePayload
  | ApplyAverageFilterRequestMessagePayload
  | DeleteRequestMessagePayload;

export type ResponseMessages =
  | CreateResponseMessage
  | CreateResponseMessageAS
  | ApplyAverageFilterResponseMessage
  | DeleteResponseMessage;

export type ResponseMessagePayload =
  | CreateResponseMessagePayload
  | CreateResponseMessagePayloadAS
  | ApplyAverageFilterResponseMessagePayload
  | DeleteResponseMessagePayload;
