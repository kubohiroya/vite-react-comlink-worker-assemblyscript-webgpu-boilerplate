export type ProgressMonitorStates = {
  value: number;
  valueMin: number;
  valueMax: number;
  text: string;
};

export type ProgressMonitor = (params: ProgressMonitorStates) => void;

export enum WorkerMessageTypeItem {
  create,
  delete,
  transfer,
}

export type BaseWorkerMessageTypes =
    | WorkerMessageTypeItem.create
    | WorkerMessageTypeItem.delete
    | WorkerMessageTypeItem.transfer;

export type GenericRequestMessagePayload = {
  id: number;
};

export type GenericResponseMessagePayload = {
  id: number;
}

export type CreateRequest<MY_CREATE_PAYLOAD> = {
  requestId: number;
  type: WorkerMessageTypeItem.create;
  requestPayload: MY_CREATE_PAYLOAD;
}

export interface GenericRequest<MY_WORKER_TYPES, REQP extends GenericRequestMessagePayload> {
  requestId: number;
  type: MY_WORKER_TYPES;
  requestPayload: REQP;
}

export interface TransferRequest<REQP> {
  requestId: number;
  type: WorkerMessageTypeItem.transfer;
  requestPayload: REQP;
}

export interface GenericResponse<MY_MESSAGE_TYPES, MY_RES_PAYLOAD> {
  requestId: number;
  type: MY_MESSAGE_TYPES;
  responsePayload: MY_RES_PAYLOAD;
  progress?: ProgressMonitorStates;
  error?: any;
}

class AbstractWorkerPromise<REQP, RESOLVE> {
  requestPayload: REQP;
  resolve: RESOLVE;
  reject: (reason?: any) => void;
  progressMonitor: ProgressMonitor | undefined;

  constructor(
      requestPayload: REQP,
      resolve: RESOLVE,
      reject: (reason?: any) => void,
      progressMonitor: ProgressMonitor | undefined,
  ) {
    this.requestPayload = requestPayload;
    this.resolve = resolve;
    this.reject = reject;
    this.progressMonitor = progressMonitor;
  }
}

class CreateWorkerPromise<MY_CREATE_PAYLOAD> extends AbstractWorkerPromise<MY_CREATE_PAYLOAD, (value: number | PromiseLike<number>) => void> {
  constructor(
      requestPayload: MY_CREATE_PAYLOAD,
      resolve: (value: number | PromiseLike<number>) => void,
      reject: (reason?: any) => void,
      progressMonitor: ProgressMonitor | undefined,
  ) {
    super(requestPayload, resolve, reject, progressMonitor);
  }
}

class GenericWorkerPromise<REQP extends GenericRequestMessagePayload, RESP> extends AbstractWorkerPromise<REQP, (value: RESP | PromiseLike<RESP>) => void> {

  constructor(
      requestPayload: REQP,
      resolve: (value: RESP | PromiseLike<RESP>) => void,
      reject: (reason?: any) => void,
      progressMonitor: ProgressMonitor | undefined,
  ) {
    super(requestPayload, resolve, reject, progressMonitor);
  }
}

class TransferWorkerPromise<REQP extends GenericRequestMessagePayload, RES> extends AbstractWorkerPromise<REQP, (value: RES | PromiseLike<RES>) => void>{

  constructor(
    requestPayload: REQP,
    resolve: (value: RES | PromiseLike<RES>) => void,
    reject: (reason?: any) => void,
    progressMonitor: ProgressMonitor | undefined,
  ) {
    super(requestPayload, resolve, reject, progressMonitor);
  }
}

export abstract class WorkerService<
    MY_WORKER_TYPES,
    MY_CREATE_PAYLOAD,
    REQP extends GenericRequestMessagePayload,
    RESP extends GenericResponseMessagePayload,
    RES> {
  requestIdCounter = 0;

  creates = new Map<number, CreateWorkerPromise<MY_CREATE_PAYLOAD>>();
  requests = new Map<number, GenericWorkerPromise<REQP, RESP>>();
  transfers = new Map<number, TransferWorkerPromise<REQP, RES>>();

  worker: Worker;

  constructor() {
    this.worker = this.createWorker();
    this.worker.onmessage = (event: MessageEvent<GenericResponse<MY_WORKER_TYPES, RESP>>) => {
      const { requestId, error, progress } = event.data;
      if (this.creates.has(requestId)) {
        const { resolve } = this.creates.get(requestId)!;
        this.creates.delete(requestId);
        resolve(
            (event.data.responsePayload).id,
        );
      } else if (this.requests.has(requestId)) {
        const { progressMonitor, resolve, reject } =
          this.requests.get(requestId)!;
        if (progressMonitor && progress) {
          progressMonitor(progress);
        } else if (error) {
          reject(new Error(error));
          this.requests.delete(requestId);
        } else {
          resolve(event.data.responsePayload);
        }
      } else if (this.transfers.has(requestId)) {
        const { resolve } = this.transfers.get(requestId)!;
        const result = this.instantiateResult(event.data.responsePayload);
        this.transfers.delete(requestId);
        resolve(result);
      }
    };
  }

  sendCreateRequest(requestPayload: MY_CREATE_PAYLOAD,
                    progressMonitor?: ProgressMonitor,): Promise<number>{
    const requestId = this.requestIdCounter++; // 一意のIDを生成

    return new Promise<number>(
        (
            resolve: (value: number | PromiseLike<number>) => void,
            reject: (reason?: any) => void,
        ) => {
          // 解決/拒否用のコールバックを保存
          this.creates.set(
              requestId,
              new CreateWorkerPromise<MY_CREATE_PAYLOAD>(
                  requestPayload,
                  resolve,
                  reject,
                  progressMonitor,
              ),
          );
          const message: CreateRequest<MY_CREATE_PAYLOAD> = {
            requestId,
            type: WorkerMessageTypeItem.create,
            requestPayload,
          };
          this.worker.postMessage(message);
        },
    );
  }

  sendGenericRequest(
      type: MY_WORKER_TYPES,
      requestPayload: REQP,
      progressMonitor?: ProgressMonitor,
  ): Promise<GenericResponseMessagePayload> {
    const requestId = this.requestIdCounter++; // 一意のIDを生成

    return new Promise<GenericResponseMessagePayload>(
        (
            resolve: (value: GenericResponseMessagePayload | PromiseLike<GenericResponseMessagePayload>) => void,
            reject: (reason?: any) => void,
        ) => {
          // 解決/拒否用のコールバックを保存
          this.requests.set(
              requestId,
              new GenericWorkerPromise<REQP, RESP>(
                  requestPayload,
                  resolve,
                  reject,
                  progressMonitor,
              ),
          );
          const message: GenericRequest<MY_WORKER_TYPES, REQP> = {
            requestId,
            type,
            requestPayload,
          };
          this.worker.postMessage(message);
        },
    );
  }

  sendTransferRequest(
    requestPayload: REQP,
    progressMonitor?: ProgressMonitor,
  ): Promise<RES> {
    const requestId = this.requestIdCounter++;

    return new Promise<RES>(
      (
        resolve: (value: RES | PromiseLike<RES>) => void,
        reject: (reason?: any) => void,
      ) => {
        this.transfers.set(
          requestId,
          new TransferWorkerPromise<REQP, RES>(
            requestPayload,
            resolve,
            reject,
            progressMonitor,
          ),
        );
        const message: TransferRequest<REQP> = {
          requestId,
          type: WorkerMessageTypeItem.transfer,
          requestPayload,
        };
        this.worker.postMessage(message);
      },
    );
  }

  abstract createWorker(): Worker;

  abstract instantiateResult(responsePayload: RESP): RES;

}
