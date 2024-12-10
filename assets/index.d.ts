declare namespace __AdaptedExports {
  /** Exported memory */
  export const memory: WebAssembly.Memory;
  // Exported runtime interface
  export function __new(size: number, id: number): number;
  export function __pin(ptr: number): number;
  export function __unpin(ptr: number): void;
  export function __collect(): void;
  export const __rtti_base: number;
  /**
   * src/as/assembly/ASImageObject/initialize
   * @returns `src/as/assembly/ASImageObject/ASImageObjects`
   */
  export function initialize(): __Internref7;
  /**
   * src/as/assembly/ASImageObject/createImageObject
   * @param width `u32`
   * @param height `u32`
   * @returns `u32`
   */
  export function createImageObject(width: number, height: number): number;
  /**
   * src/as/assembly/ASImageObject/setImageObjectContent
   * @param id `u32`
   * @param initialImageContent `~lib/typedarray/Uint8ClampedArray`
   */
  export function setImageObjectContent(id: number, initialImageContent: Uint8ClampedArray): void;
  /**
   * src/as/assembly/ASImageObject/getImageObjectPtrLen
   * @param id `u32`
   * @returns `~lib/array/Array<usize>`
   */
  export function getImageObjectPtrLen(id: number): Array<number>;
  /**
   * src/as/assembly/ASImageObject/deleteImageObject
   * @param id `u32`
   */
  export function deleteImageObject(id: number): void;
  /**
   * src/as/assembly/ASImageObject/applyAverageFilter
   * @param id `u32`
   * @param iteration `i32`
   * @param requestId `i32`
   */
  export function applyAverageFilter(id: number, iteration: number, requestId: number): void;
  /**
   * src/as/assembly/ASImageObject/getImageObjectWidthHeight
   * @param id `u32`
   * @returns `~lib/array/Array<u32>`
   */
  export function getImageObjectWidthHeight(id: number): Array<number>;
}
/** src/as/assembly/ASImageObject/ASImageObjects */
declare class __Internref7 extends Number {
  private __nominal7: symbol;
  private __nominal0: symbol;
}
/** Instantiates the compiled WebAssembly module with the given imports. */
export declare function instantiate(module: WebAssembly.Module, imports: {
  env: unknown,
  hostModule: unknown,
}): Promise<typeof __AdaptedExports>;
