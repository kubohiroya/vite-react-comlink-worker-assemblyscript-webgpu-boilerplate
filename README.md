# What is this?

https://x.com/kubohiroya/status/1868272358794150117

To further expand the usability of [AssemblyScript](https://www.assemblyscript.org/) (WebAssembly), I have published a project on GitHub called [vite-react-comlink-worker-assemblyscript-webgpu-boilerplate](https://github.com/kubohiroya/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate) (what a long name!).

https://github.com/kubohiroya/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate

As the name suggests, this is a boilerplate setup that combines Vite + React + Comlink/WebWorker + AssemblyScript + WebGPU. It includes configuration files and sample code for developing applications with this stack.

By building this project as explained below, you can run the entire sample code suite as a React application. Specifically, it’s a [demo app that shows 5 different implementations of an averaging image filter](https://kubohiroya.github.io/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate/):

1. JavaScript
2. JavaScript + WebWorker
3. AssemblyScript
4. AssemblyScript + WebWorker
5. WebGPU Compute Shader

Try opening it and experimenting with the actual behavior:

https://kubohiroya.github.io/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate/

* Each implementation applies a 3x3 averaging image filter to the pixels of an image, effectively adding a type of “blur” to it.
* Users can control the number of times the image processing is applied (from 0 up to 500 times) using a slider.
* While image processing is applied repeatedly, the current iteration count and elapsed time are displayed in the UI.
* To verify situations where the UI thread might be blocked, a digital clock is constantly displayed at the top of the screen.

# Benchmark Results of the 5 Implementations

The table below shows the results obtained by running this sample code on a MacBook Pro 16-inch 2021 (Apple M1 Max 64GB). The image used is "[The Great Wave off Kanagawa](https://ja.wikipedia.org/wiki/%E7%A5%9E%E5%A5%88%E5%B7%9D%E6%B2%96%E6%B5%AA%E8%A3%8F)" at 1024x706 pixels (24-bit color). The 3x3 averaging filter was applied 200 times in succession.

You can watch a video of it actually running at the [X post mentioned at the beginning](https://x.com/kubohiroya/status/1868272358794150117).

| Time in video | Implementation                | Execution Time | UI Thread Blocking |
|---------------|-------------------------------|----------------|--------------------|
|0:00-0:08       | JavaScript                    | 4.52 s         | Blocked            |
|0:09-0:15       | JavaScript + WebWorker        | 4.80 s         | Not blocked        |
|0:16-0:18       | AssemblyScript                | 1.84 s         | Blocked            |
|0:19-0:21       | AssemblyScript + WebWorker    | 1.82 s         | Not blocked        |
|0:22-0:23       | WebGPU Compute Shader         | 0.07 s         | Not blocked        |

* The pure JavaScript implementation is the slowest, and execution time gets shorter in the order of AssemblyScript → WebGPU Compute Shader.
* The overhead of using a WebWorker is almost negligible.
* If you run the image processing without using a WebWorker, the UI thread will be blocked, making the UI unresponsive and preventing buttons from being pressed. Also note that when this happens, the clock displayed at the top of the screen stops, while a clock running in another window continues.
* By using a WebWorker, you can avoid blocking the UI thread. The clock keeps running, and the progress UI (a React Material UI Gauge component) is updated accordingly.
* At the end of the video (0:22~), when using the WebGPU Compute Shader implementation, the processing speed is overwhelming. Since WebGPU is designed as an asynchronous API from the start, there is no UI thread blocking.

# Key Points

* With a straightforward implementation, running heavy tasks like image processing can block the UI thread while the processing is ongoing, reducing usability. In such situations, consider offloading these tasks from the UI thread to a WebWorker.
    * Writing code to directly use WebWorkers can become very complicated, so it’s a good idea to use a library like [Comlink](https://github.com/GoogleChromeLabs/comlink).
* To reduce the time the UI thread is blocked, you can replace JavaScript (TypeScript) code with AssemblyScript and compile it to WebAssembly to achieve more efficient execution.
    * AssemblyScript’s syntax is very close to JavaScript (TypeScript), making it much easier and less error-prone for humans or generative AI to develop or convert existing code compared to C or Rust.
    * Even if you use AssemblyScript, you should still consider running it in a WebWorker rather than the UI thread.
* The current best practice seems to be a combination of “offloading processing via Comlink/WebWorker” and “migrating TypeScript code to AssemblyScript.”
    * When doing so, it’s also important to check whether you can easily call back host-side functions from within WebWorker/AssemblyScript code and whether the mechanism for doing so is user-friendly and reliable.
* If you are allowed to use WebGPU, it may be worth considering the use of WebGPU Compute Shaders instead of AssemblyScript.
    * In this example, applying the image processing task 200 times took 1.82 s with AssemblyScript + WebWorker, but only 0.07 s with a WebGPU Compute Shader. Although developing with WebGPU is a bit more cumbersome, the performance gain is substantial.

# The Execution Sequence of the AssemblyScript + WebWorker Version

In the following sections, we explain the AssemblyScript + WebWorker version in detail.

The sequence diagram below shows how messages pass between the layers of modules, from the top-level React component all the way down to the memory managed by WebAssembly. It outlines how messages are exchanged step-by-step.

```mermaid
sequenceDiagram
    participant C as React Component
    participant E as EventHandler
    participant W as Comlink/WebWorker
    participant WA as WebAssembly Module
    participant M as memory(shared buffer)

    C->>W: new ComlinkWorker WebWorker initialization
    W->>WA: Load WASM module
    WA->>M: Allocate memory

    opt User clicks "Start"
      C->>+E: Event handler call
      E->>+W: Execute image generation method
      W->>+WA: Execute image generation function
      WA->>+M: Allocate buffer for image data (initialize)
      WA-->>-W: Returns image ID
      W-->>-E: Returns image ID
      E->>+W: Execute image processing method
      W->>+WA: Execute image processing function
      WA->>+M: Update buffer for image data
    opt Notify progress
      WA->>-W: Notify progress
      W->>-E: Notify progress
      E->>C: Update progress state
    end

    opt Image generation complete
      E->>+W: Execute image transfer method
      W->>+WA: Execute image transfer function
      WA->>+M: Retrieve buffer for image data and free memory
      M->>-WA: Return buffer for image data
      WA->>-W: Return image
      W->>-E: Return transferred image
      E->>-C: Update image state
    end
   end
```

Pay attention to the following three optional sequences in the diagram:

* User clicks the "Start" button: The image ID is returned back to a relatively shallow layer on the host side, namely the EventHandler.
* Progress notification: A callback is triggered from the WebAssembly module to the host side, causing the UI to update.
* Completion of image generation: This involves creating a view of the shared memory array on the WebAssembly side, deleting the object in the WebAssembly module’s memory, transferring the image data across the WebWorker boundary, returning a Promise to the host side, and finally displaying the generated image.

Although this configuration might look quite complicated at first glance, thanks to Comlink and AssemblyScript, you can develop with less redundant code that is more intuitive and easier to understand.

# Excerpts of Settings

## package.json Settings

Add the following to `package.json`:
```JSON:package.json
  "type": "module"
```
This enables ES Modules for the project.

For more details on other settings, please refer to [package.json](https://github.com/kubohiroya/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate/blob/main/package.json).

## vite.config.ts Settings

Vite 

We use [Vite](https://vite.dev/)as the build environment.
* [vite-plugin-assemblyscript-asc](https://github.com/krymel/vite-plugin-assemblyscript-asc) allows building AssemblyScript source into a .wasm file.
* [vite-plugin-restart](https://github.com/antfu/vite-plugin-restart) is used to complement the lack of hot-reload support in vite-plugin-assemblyscript-asc.
* [vite-plugin-comlink](https://github.com/mathe42/vite-plugin-comlink) enables using ComlinkWorker types from TypeScript.
* Additionally, @vitejs/plugin-react is used for React development.

For details, see [vite.config.ts](https://github.com/kubohiroya/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate/blob/main/vite.config.ts).

## tsconfig.json Settings

In `tsconfig.json`, under `compilerOptions`, add:

```JSON:tsconfig.json
  "compilerOptions":{
     :
    "target": "esnext",
    "module": "esnext",
    "lib": ["dom", "esnext", "webworker"],
    "types": ["node", "vite/client", "vite-plugin-comlink/client", "@webgpu/types"],
     :
  },
```
* Set `"target": "esnext"` and `"module": "esnext"` consistently, and add `"esnext"` to `"lib"`.
* Include `"webworker"` in `"lib"` to support WebWorker.
* Include `"vite/client", "vite-plugin-comlink/client"`, and `"@webgpu/types"` in `"types"` for type definitions and WebGPU support.

For details, see: [tsconfig.json](https://github.com/kubohiroya/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate/blob/main/tsconfig.json).

## src/as/tsconfig.json Sețtings

AssemblyScript source files are placed under `src/as/assembly/**/*.ts`. Create a separate tsconfig.json for AssemblyScript sources at `src/as/tsconfig.json`:

```JSON:src/as/tsconfig.json
{
  "extends": "../../node_modules/assemblyscript/std/assembly.json",
  "compilerOptions": {
    "lib": ["esnext"],
    "module": "esnext",
    "imports": {
      "env": "env"
    }
  },
  "include": ["./**/*.ts"]
}
```
* `"extends"` points to `assembly.json` in `node_modules`.
* This prevents the editor from warning about AssemblyScript types like `i32`.
* `"imports"` setup is crucial for callback functions, etc.

For details, see [src/as/tsconfig.json](https://github.com/kubohiroya/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate/blob/main/src/as/tsconfig.json).

## asconfig.json Settings

* `asconfig.json` configures the AssemblyScript compiler asc. 
Within `"target"`, set `"outFile"` and `"textFile"` for .wasm and .wat outputs. 
In this boilerplate, these files go under `./build` (You may need to add `./build` to your `.gitignore` file).

* Add "bindings": "esm" under "options":

```JSON:asconfig.json
  "options": {
    "bindings": "esm",
    "enable": [],
    "exportRuntime": true,
  }
```
Adjust other settings as needed. For SIMD, add `"enable": ["simd"]`.

For details, see [asconfig.json](https://github.com/kubohiroya/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate/blob/main/asconfig.json).

# Code

## Image Processing Code in AssemblyScript

The code looks like TypeScript (.ts), but it's AssemblyScript. Notice the use of u32 and other subtle differences.

Objects with constructors become [opaque reference counted pointers](https://www.assemblyscript.org/compiler.html#host-bindings) when passed between AssemblyScript and the host. Without a constructor, data is copied.

```TypeScript:ASImageObject.ts
class ASImageObject {
  width: u32;
  height: u32;
  data: Uint8ClampedArray;

  constructor(width: u32, height: u32) { 
    // provide constructor and mark this class to be used passing by opaque reference
    // to avoid copying array over module boundaris
    this.width = width;
    this.height = height;
    this.data = new Uint8ClampedArray(width * height * 4); // 1 pixel is 4 bytes(RGBA)
  }
}
```

To export functions to the host:

```TypeScript:index.ts
export {
  createImageObject,
  setImageObjectData,
  getImageObjectPtrLen,
  deleteImageObject,
  applyAverageFilter,
  getImageObjectWidthHeight
} from "./ASImageObject";
```

ASImageObjects.ts manages ASImageObject instances in a map.

Below is an example of applying the average filter, 
including the @external annotation and a postProgressMessage callback invoked from AssemblyScript to the host:


```TypeScript:ASImageObjects.ts
let nextId: u32 = 1; // ASImageObjectインスタンス管理用

class ASImageObjects {
  static instances: Map<u32, ASImageObject> = new Map();
  constructor() {}


/**
 * シングルトンを返す
 * @return 画像管理用オブジェクト
 */
  static getSingleton(): Map<u32, ASImageObject> {
    return ASImageObjects.instances;
  }
}

/**
 * ImageObjectをインスタンス化し、マップにセットし、idを返す
 * @param width 画像の幅
 * @param height 画像の高さ
 * @return 画像のid
 */
export function createImageObject(width: u32, height: u32): u32 {
  const id = nextId++;
  const image = new ASImageObject(width, height);
  ASImageObjects.getSingleton().set(id, image);
  return id;
}


/**
 * 指定したidのImageObjectに、画像データをセットする
 * @param id 画像のid
 * @param data 画像データ(1ピクセルあたりRGBA32ビット)
 */
export function setImageObjectData(
  id: u32,
  data: Uint8ClampedArray,
): void {
  const image = ASImageObjects.getSingleton().get(id);
  image.data.set(data);
}

/**
 * 指定したidのImageObjectのデータ配列のメモリ上の位置と長さを返す
 * @param id 画像のid
 * @return 位置、長さ
 */
export function getImageObjectPtrLen(id: u32): usize[] {
  const imageObject = ASImageObjects.getSingleton().get(id);
  if (!imageObject) throw new Error("Invalid ImageObject ID");
  return [imageObject.data.dataStart, imageObject.data.length];
}

/**
 * 指定したidのImageObjectの幅と高さを返す
 * @param id 画像のid
 * @return 幅、高さ
 */
export function getImageObjectWidthHeight(id: u32): u32[] {
  const imageObject = ASImageObjects.getSingleton().get(id);
  if (!imageObject) throw new Error("Invalid ImageObject ID");
  return [imageObject.width, imageObject.height];
}

/**
 * 指定したidのImageObjectをメモリ上から削除する
 * @param id 画像のid
 */
export function deleteImageObject(id: u32): void {
  ASImageObjects.getSingleton().delete(id);
}

/**
 * 指定したidのImageObjectに平均化フィルタを施す
 * @param id 画像のid
 * @param simd SIMD機能を使う場合はtrue(未実装）
 * @param iteration 繰り返し適用回数
 */
export function applyAverageFilter(id: u32, simd:boolean, iteration: i32): void {
  const imageObject = ASImageObjects.getSingleton().get(id);
  if (!imageObject) throw new Error("Invalid ImageObject ID");

  const width: i32 = imageObject.width;
  const height: i32 = imageObject.height;
  const data = imageObject.data;

  const copy = new Uint8ClampedArray(u32(width * height * 4));

  // 乗算で平均を計算 (1/9 を乗算: 0.1111... ≈ 285 / 256)
  const factor = v128.splat<i32>(285); // 乗算係数 (285 / 256 ≈ 1/9)
  const mask = v128.splat<i32>(0xFF);

  for (let c = 0; c < iteration; c++) {
    postProgressMessage(c, iteration);
    copy.set(data);

    for (let y: i32 = 1; y < height - 1; y++) {
         for (let x = 1; x < width - 1; x++) {
          let r: u32 = 0,
              g: u32 = 0,
              b: u32 = 0,
              a: u32 = 0;

          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const index: u32 = u32((y + dy) * width + (x + dx)) * 4;
              r += unchecked(copy[index]);
              g += unchecked(copy[index + 1]);
              b += unchecked(copy[index + 2]);
              a += unchecked(copy[index + 3]);
            }
          }

          const i: u32 = u32((y * width + x) * 4);
          unchecked((data[i] = u32(r / 9)));
          unchecked((data[i + 1] = u32(g / 9)));
          unchecked((data[i + 2] = u32(b / 9)));
          unchecked((data[i + 3] = u32(a / 9)));
       }
    }
  }
  postProgressMessage(iteration, iteration);
}

// @ts-ignore: decorator
@external("env", "postProgressMessage")
export declare function postProgressMessage(value: u32, maxValue: u32): void;
```

postProgressMessage is implemented on the host side (WebWorker).

## WebWorker Code via Comlink

Define a ProgressMonitor type:

```TypeScript:ProgressMonitor.ts
export type ProgressMonitor = (params: {
    value: number;
    valueMax: number;
}) => Promise<void>;
```

Define ImageProcessor type:

```TypeScript:ImageProcessor.ts
import { ProgressMonitor } from "./ProgressMonitor";

export type ImageProcessor = {
    initialize: (width: number, height: number, buffer: ArrayBuffer) => Promise<void> ;
    applyAverageFilter: (iteration: number, options: {
        isWorker?: boolean;
        simd?: boolean;
    }, progressMonitor: ProgressMonitor) => Promise<void>;
    transfer: () => Promise<Uint8ClampedArray>;
}
```

```TypeScript:ASImageProcessor.ts
import * as Comlink from "comlink";

import * as wasm from "../../../build/vite-react-comlink-worker-assemblyscript-boilerplate/assets";

import { ProgressMonitor } from "../ProgressMonitor";
import { ImageProcessor } from "../ImageProcessor";

/**
* このオブジェクトは、AssemblyScript側モジュール上のImageObjectインスタンスひとつに紐づけて利用する。
*/
export class ASImageProcessor extends ImageProcessor {
  public id!: number;

  constructor() {
    super();
  }

/**
  * AssemblyScript側モジュールにおいて、ImageObjectインスタンスを作成し初期化する。
  * AssemblyScript側モジュール上のImageObjectインスタンスのidを、このプロセッサのidとして設定する。
  @param width 幅
  @param height 高さ
  @param buffer 画像データのバッファ
  */
  public async initialize(
    width: number,
    height: number,
    buffer: ArrayBuffer,
  ): Promise<void> {
    this.id = wasm.createImageObject(width, height);
    const data = new Uint8ClampedArray(buffer);
    wasm.setImageObjectData(this.id, data);
  }

 /**
  * AssemblyScript側モジュールにおいて、ImageObjectインスタンスに平均化フィルタを適用する
  * @param iteration 繰り返し適用回数
  * @param options simdでSIMD処理を行うかどうかを指定する(未実装)
  * @param progressMonitor 進捗状況を通知するためのコールバック関数
  */
  public async applyAverageFilter(
    iteration: number,
    options: {
      simd: boolean,
    },
    progressMonitor: ProgressMonitor,
  ): Promise<void> {
    (globalThis as any).postProgressMessage = function postProgressMessage(
      value: number,
      valueMax: number,
    ): void {
      progressMonitor({ value, valueMax });
    };
    wasm.applyAverageFilter(this.id, options.simd || false, iteration);
  }

/**
 * WebWorker側から呼び出し元に画像データの所有権を委譲する
 * @return AssemblyScript側と共有した画像をもとに配列のビューを作成し、画像の所有権を委譲する
 */
  public async transfer(): Promise<Uint8ClampedArray> {
    const [ptr, len] = wasm.getImageObjectPtrLen(this.id);
    wasm.deleteImageObject(this.id);
    return new Uint8ClampedArray(wasm.memory.buffer, ptr, len);
  }

/**
 * このプロセッサの利用を終了する
 */
  public close(): void {
    self.close();
  }
}

// ASImageProcessorのオブジェクトをWebWorkerで共有される実体となるように登録する
Comlink.expose(new ASImageProcessor());
```

## React Component Code

Load the WebWorker using ComlinkWorker and specify {type: "module"}:

```TypeScript:app.tsx code fragment
const asImageWorkerProcessor = new ComlinkWorker<ASImageProcessor>(
  new URL("./as/ASImageProcessor", import.meta.url),
  {
    type: "module",
  },
);
```

In ImageFilterBenchmark.tsx, the code uses proxy to wrap progressMonitor if needed.


```TypeScript:ImageFilterBenchmark.tsx code fragment
import { proxy } from "comlink";

//...略...

export const ImageFilterBenchmark = ({
  title,
  processor,
  iteration,
  options,
}: {
  title: string;
  processor: ImageProcessor;
  iteration: number;
  options?: {
    isWorker?: boolean;
    simd?: boolean;
  };
}) => {
  const preloadImageObject = usePreloadImageObject();
  const [targetImageObject, setTargetImageObject] = useState<JSImageObject>();
  const [isStarted, setStarted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isFinished, setFinished] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const [, incrementActiveCount] = useAtom(incrementActiveCountAtom);
  const [, decrementActiveCount] = useAtom(decrementActiveCountAtom);

  // 進捗状況の更新（終了処理を含む）
  const updateProgress = useCallback(
    (width: number, height: number, startedTime: number) =>
      ({ value }: { value: number }): Promise<void> => {
        setProgress(value);
        setElapsedTime(performance.now() - startedTime);
        if (value === iteration) {
          processor.transfer().then((array) => {
            const updatedImageObject = new JSImageObject(
              width,
              height,
              new Uint8ClampedArray(array),
            );
            setTargetImageObject(updatedImageObject);
            setFinished(true);
            decrementActiveCount();
          });
        }
        return Promise.resolve();
      },
    [iteration, processor, decrementActiveCount],
  );

  // 画像処理プロセッサでの処理の実施
  const startProcessor = useCallback(() => {
    incrementActiveCount();
    setStarted(true);
    setElapsedTime(0);
    const startedTime = performance.now();
    const [width, height] = [
      preloadImageObject.width,
      preloadImageObject.height,
    ];
    processor.initialize(width, height, preloadImageObject.getData().slice(0));
    processor.applyAverageFilter(
      iteration,
      options || {},
      options?.isWorker
        ? proxy(updateProgress(width, height, startedTime))
        : updateProgress(width, height, startedTime),
    );
  }, [processor, iteration, options, incrementActiveCount, preloadImageObject]);

  const reset = () => {
    setStarted(false);
    setProgress(0);
    setFinished(false);
    setElapsedTime(0);
    setTargetImageObject(undefined);
  };

  return (
    <>
      <Stack direction="column" marginBottom={5}>
        <Stack alignItems="center" spacing={0}>
          {!isStarted ? (
            <>
              <Typography>{title}</Typography>
              <Button variant="outlined" onClick={startProcessor}>
                Start
              </Button>
            </>
          ) : !isFinished ? (
            <>
              <ProgressMeter value={progress} valueMax={iteration} />
              <ImageCaption>{(elapsedTime / 1000).toFixed(2)} sec</ImageCaption>
            </>
          ) : (
            <>
              <ImageViewer
                scale={0.3}
                imageObject={
                  targetImageObject ? targetImageObject : preloadImageObject
                }
              />
              <LinearProgress value={100} variant={"determinate"} />
              <Stack direction="row" spacing={2}>
                <Typography>{title}</Typography>
                <ImageCaption>
                  {(elapsedTime / 1000).toFixed(2)} sec
                </ImageCaption>
                <Button variant="outlined" onClick={reset} size={"small"}>
                  Reset
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
};
```

# How to Run

```bash
git clone https://github.com/kubohiroya/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate.git
cd vite-react-comlink-worker-assemblyscript-webgpu-boilerplate
pnpm install
pnpm run build
pnpm run dev
```

Access http://localhost:4200/ to use the sample app.

```bash
pnpm run preview
```
to preview the built version

# Migration Guide to AssemblyScript + WebWorker

Consider the following flow to improve performance:

```mermaid
graph TD;
  A(1: JS Version) --> _A;
  _A{Poor Performance?}-->|YES|B(Use this boilderplate)
  _A-->|NO|R0(Release)
  B-->|Add comlink|BA;
  B-->|Add AssemblyScript|BB;
  BA(2-a: JS+WebWorker) --> C;
  BB(2-b: AssemblyScript) --> C;
  C(3: AssemblyScript+WebWorker) --> D{Can use WebGPU?}
  D -->|YES|E
  D -->|NO|R1(Release)
  E(4: WebGPU ComputeShader) 
  E --> R2(Release)
 
```

## 1: JavaScript Version
* [src/benchmark/js/JSImageProcessor.ts](https://github.com/kubohiroya/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate/blob/main/src/benchmark/js/JSImageProcessor.ts)
* Start with a simple JS implementation.
* No Comlink, no AssemblyScript.

## 2-a: JavaScript + WebWorker Version
* [src/benchmark/js/JSImageProcessor.ts](https://github.com/kubohiroya/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate/blob/main/src/benchmark/js/JSImageProcessor.ts)
* Add Comlink and expose the JS processor via a worker.
## 2-b: AssemblyScript Version
* [src/benchmark/as/ASImageProcessor.ts](https://github.com/kubohiroya/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate/blob/main/src/benchmark/as/ASImageProcessor.ts)
* Switch to calling AssemblyScript-compiled functions directly, no worker.
* [ASImageProcessor.ts Line 2](https://github.com/kubohiroya/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate/blob/main/src/benchmark/as/ASImageProcessor.ts)の`import * as wasm from "../../../build/vite-react-comlink-worker-assemblyscript-boilerplate/assets";` to import wasm file with`vite-plugin-assemblyscript-asc`.
## 3: AssemblyScript + WebWorker Version
* [src/benchmark/as/ASImageProcessor.ts](https://github.com/kubohiroya/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate/blob/main/src/benchmark/as/ASImageProcessor.ts)
* Combine AssemblyScript and a WebWorker via Comlink.
## 4: WebGPU Compute Shader Version
* If suitable, use a WebGPU Compute Shader for maximum speed.
* [src/benchmark/gpu/WebGPUImageProcessor.ts](https://github.com/kubohiroya/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate/blob/main/src/benchmark/gpu/WebGPUImageProcessor.ts)
* [src/benchmark/gpu/averageFilter.wgsl](https://github.com/kubohiroya/vite-react-comlink-worker-assemblyscript-webgpu-boilerplate/blob/main/src/benchmark/gpu/averageFilter.wgsl)

# Conclusion

When performance is an issue, consider offloading heavy tasks to WebWorkers and implementing them in AssemblyScript. Use Comlink to simplify communication. If WebGPU is an option, it provides even greater performance gains.

This boilerplate consolidates current best practices and configurations. AssemblyScript and related tooling evolve rapidly, so you may need to adjust configurations over time.

In short, if WebGPU is feasible for your scenario, it’s probably worth using for computationally heavy tasks. If not, AssemblyScript + WebWorker is still a great improvement over a naive JavaScript-only approach.


