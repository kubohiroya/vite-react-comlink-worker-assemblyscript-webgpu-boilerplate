export async function instantiate(module, imports = {}) {
  const __module0 = imports.hostModule;
  const adaptedImports = {
    env: Object.assign(Object.create(globalThis), imports.env || {}, {
      abort(message, fileName, lineNumber, columnNumber) {
        // ~lib/builtins/abort(~lib/string/String | null?, ~lib/string/String | null?, u32?, u32?) => void
        message = __liftString(message >>> 0);
        fileName = __liftString(fileName >>> 0);
        lineNumber = lineNumber >>> 0;
        columnNumber = columnNumber >>> 0;
        (() => {
          // @external.js
          throw Error(`${message} in ${fileName}:${lineNumber}:${columnNumber}`);
        })();
      },
    }),
    hostModule: Object.assign(Object.create(__module0), {
      postProgressMessage(id, value, maxValue, requestId) {
        // src/as/assembly/ASImageObject/postProgressMessage(u32, u32, u32, u32) => void
        id = id >>> 0;
        value = value >>> 0;
        maxValue = maxValue >>> 0;
        requestId = requestId >>> 0;
        __module0.postProgressMessage(id, value, maxValue, requestId);
      },
    }),
  };
  const { exports } = await WebAssembly.instantiate(module, adaptedImports);
  const memory = exports.memory || imports.env.memory;
  const adaptedExports = Object.setPrototypeOf({
    initialize() {
      // src/as/assembly/ASImageObject/initialize() => src/as/assembly/ASImageObject/ASImageObjects
      return __liftInternref(exports.initialize() >>> 0);
    },
    createImageObject(width, height) {
      // src/as/assembly/ASImageObject/createImageObject(u32, u32) => u32
      return exports.createImageObject(width, height) >>> 0;
    },
    setImageObjectContent(id, initialImageContent) {
      // src/as/assembly/ASImageObject/setImageObjectContent(u32, ~lib/typedarray/Uint8ClampedArray) => void
      initialImageContent = __lowerTypedArray(Uint8ClampedArray, 5, 0, initialImageContent) || __notnull();
      exports.setImageObjectContent(id, initialImageContent);
    },
    getImageObjectPtrLen(id) {
      // src/as/assembly/ASImageObject/getImageObjectPtrLen(u32) => ~lib/array/Array<usize>
      return __liftArray(pointer => __getU32(pointer) >>> 0, 2, exports.getImageObjectPtrLen(id) >>> 0);
    },
    getImageObjectWidthHeight(id) {
      // src/as/assembly/ASImageObject/getImageObjectWidthHeight(u32) => ~lib/array/Array<u32>
      return __liftArray(pointer => __getU32(pointer) >>> 0, 2, exports.getImageObjectWidthHeight(id) >>> 0);
    },
  }, exports);
  function __liftString(pointer) {
    if (!pointer) return null;
    const
      end = pointer + new Uint32Array(memory.buffer)[pointer - 4 >>> 2] >>> 1,
      memoryU16 = new Uint16Array(memory.buffer);
    let
      start = pointer >>> 1,
      string = "";
    while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
  }
  function __liftArray(liftElement, align, pointer) {
    if (!pointer) return null;
    const
      dataStart = __getU32(pointer + 4),
      length = __dataview.getUint32(pointer + 12, true),
      values = new Array(length);
    for (let i = 0; i < length; ++i) values[i] = liftElement(dataStart + (i << align >>> 0));
    return values;
  }
  function __lowerTypedArray(constructor, id, align, values) {
    if (values == null) return 0;
    const
      length = values.length,
      buffer = exports.__pin(exports.__new(length << align, 1)) >>> 0,
      header = exports.__new(12, id) >>> 0;
    __setU32(header + 0, buffer);
    __dataview.setUint32(header + 4, buffer, true);
    __dataview.setUint32(header + 8, length << align, true);
    new constructor(memory.buffer, buffer, length).set(values);
    exports.__unpin(buffer);
    return header;
  }
  class Internref extends Number {}
  const registry = new FinalizationRegistry(__release);
  function __liftInternref(pointer) {
    if (!pointer) return null;
    const sentinel = new Internref(__retain(pointer));
    registry.register(sentinel, pointer);
    return sentinel;
  }
  const refcounts = new Map();
  function __retain(pointer) {
    if (pointer) {
      const refcount = refcounts.get(pointer);
      if (refcount) refcounts.set(pointer, refcount + 1);
      else refcounts.set(exports.__pin(pointer), 1);
    }
    return pointer;
  }
  function __release(pointer) {
    if (pointer) {
      const refcount = refcounts.get(pointer);
      if (refcount === 1) exports.__unpin(pointer), refcounts.delete(pointer);
      else if (refcount) refcounts.set(pointer, refcount - 1);
      else throw Error(`invalid refcount '${refcount}' for reference '${pointer}'`);
    }
  }
  function __notnull() {
    throw TypeError("value must not be null");
  }
  let __dataview = new DataView(memory.buffer);
  function __setU32(pointer, value) {
    try {
      __dataview.setUint32(pointer, value, true);
    } catch {
      __dataview = new DataView(memory.buffer);
      __dataview.setUint32(pointer, value, true);
    }
  }
  function __getU32(pointer) {
    try {
      return __dataview.getUint32(pointer, true);
    } catch {
      __dataview = new DataView(memory.buffer);
      return __dataview.getUint32(pointer, true);
    }
  }
  return adaptedExports;
}
