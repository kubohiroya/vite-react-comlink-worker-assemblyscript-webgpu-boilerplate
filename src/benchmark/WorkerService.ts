// WebWorkerへのリクエストの型定義
export interface WorkerRequest<T, P> {
  requestId: number;
  type: T;
  requestPayload: P;
}

// WebWorkerからのレスポンスの型定義
export interface WorkerResponse<T, R> {
  requestId: number;
  type: T;
  responsePayload: R;
  progress?: ProgressMonitorStates;
  error?: any;
}

export type ProgressMonitorStates = {
  value: number;
  valueMin: number;
  valueMax: number;
  text: string;
};

export type ProgressMonitor = (params: ProgressMonitorStates) => void;

// リクエスト管理用の型定義
class WorkerRequestPromise<P, R2> {
  requestPayload: P;
  resolve: (value: R2 | PromiseLike<R2>) => void;
  reject: (reason?: any) => void;
  progressMonitor: ProgressMonitor | undefined;

  constructor(
    requestPayload: P,
    resolve: (value: R2 | PromiseLike<R2>) => void,
    reject: (reason?: any) => void,
    progressMonitor: ProgressMonitor | undefined,
  ) {
    this.requestPayload = requestPayload;
    this.resolve = resolve;
    this.reject = reject;
    this.progressMonitor = progressMonitor;
  }
}

export abstract class WorkerService<T, P, R, R2> {
  requestIdCounter = 0;
  requests = new Map<number, WorkerRequestPromise<P, R2>>();
  worker: Worker;

  constructor() {
    this.worker = this.createWorker();
    this.worker.onmessage = (event: MessageEvent<WorkerResponse<T, R>>) => {
      const { requestId, error, progress } = event.data;
      if (this.requests.has(requestId)) {
        const { progressMonitor, resolve, reject } = this.requests.get(requestId)!;
        if(progressMonitor && progress){
          progressMonitor(progress);
        }else if (error) {
          reject(new Error(error));
          this.requests.delete(requestId);
        } else {
          resolve(this.applyMiddleware(event.data));
          this.requests.delete(requestId);
        }
      }
    };
  }

  sendRequest(type: T, requestPayload: P, progressMonitor?: ProgressMonitor): Promise<R2> {
    const requestId = this.requestIdCounter++; // 一意のIDを生成

    return new Promise<R2>(
      (
        resolve: (value: R2 | PromiseLike<R2>) => void,
        reject: (reason?: any) => void,
      ) => {
        // 解決/拒否用のコールバックを保存
        this.requests.set(
          requestId,
          new WorkerRequestPromise<P, R2>(requestPayload, resolve, reject, progressMonitor),
        );
        // Workerにメッセージを送信
        const message: WorkerRequest<T, P> = { requestId, type, requestPayload };
        this.worker.postMessage(message); // TODO: ここで、transferableについての実装を追加！
      },
    );
  }

  abstract createWorker(): Worker;

  abstract applyMiddleware(result: WorkerResponse<T, R>): R2;
}
