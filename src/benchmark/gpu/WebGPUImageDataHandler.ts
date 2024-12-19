import { ImageDataHandler } from "../ImageDataHandler";
import { ProgressMonitor } from "../../types/ProgressMonitor";
import shaderCode from "./applyAverageFilter.wgsl?raw";
export class WebGPUImageDataHandler implements ImageDataHandler {
  private device: GPUDevice;
  private pipeline!: GPUComputePipeline;
  private bindGroupLayout!: GPUBindGroupLayout;
  private uniformBuffer!: GPUBuffer;
  private buffers!: GPUBuffer[];
  private width!: number;
  private height!: number;

  private imageArray!: Uint8ClampedArray;

  constructor(device: GPUDevice) {
    this.device = device;
  }

  async initialize(
    width: number,
    height: number,
    arrayBuffer: ArrayBuffer,
  ): Promise<void> {
    this.width = width;
    this.height = height;

    const shaderModule = this.device.createShaderModule({
      code: shaderCode,
    });

    this.bindGroupLayout = this.device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.COMPUTE,
          buffer: { type: "read-only-storage" },
        },
        {
          binding: 1,
          visibility: GPUShaderStage.COMPUTE,
          buffer: { type: "storage" },
        },
        {
          binding: 2,
          visibility: GPUShaderStage.COMPUTE,
          buffer: { type: "uniform" },
        },
      ],
    });

    this.pipeline = this.device.createComputePipeline({
      layout: this.device.createPipelineLayout({
        bindGroupLayouts: [this.bindGroupLayout],
      }),
      compute: { module: shaderModule, entryPoint: "main" },
    });

    this.imageArray = new Uint8ClampedArray(arrayBuffer);

    this.uniformBuffer = this.device.createBuffer({
      label: "uniform buffer",
      size: 2 * Uint32Array.BYTES_PER_ELEMENT,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      mappedAtCreation: true,
    });
    new Uint32Array(this.uniformBuffer.getMappedRange()).set([width, height]);
    this.uniformBuffer.unmap();

    const bufferSize = this.imageArray.byteLength;

    this.buffers = [];
    [0, 1].forEach((i) => {
      this.buffers.push(
        this.device.createBuffer({
          label: `buffer ${i}`,
          size: bufferSize,
          usage:
            GPUBufferUsage.STORAGE |
            GPUBufferUsage.COPY_DST |
            GPUBufferUsage.COPY_SRC,
          mappedAtCreation: true,
        }),
      );
      new Uint8ClampedArray(this.buffers[i].getMappedRange()).set(
        this.imageArray,
      );
      this.buffers[i].unmap();
    });
  }

  async applyAverageFilter(
    iterations: number,
    options: { isWorker?: boolean; simd?: boolean },
    progressMonitor: ProgressMonitor,
  ): Promise<void> {
    const bindGroups = [0, 1].map((i) =>
      this.device.createBindGroup({
        layout: this.bindGroupLayout,
        entries: [
          { binding: 0, resource: { buffer: this.buffers[i % 2] } },
          { binding: 1, resource: { buffer: this.buffers[(i + 1) % 2] } },
          { binding: 2, resource: { buffer: this.uniformBuffer } },
        ],
      }),
    );

    for (let i = 0; i < iterations; i++) {
      const commandEncoder = this.device.createCommandEncoder();
      const passEncoder = commandEncoder.beginComputePass();
      passEncoder.setPipeline(this.pipeline);
      passEncoder.setBindGroup(0, bindGroups[i % 2]);
      passEncoder.dispatchWorkgroups(
        Math.ceil(this.width / 16),
        Math.ceil(this.height / 16),
      );
      passEncoder.end();
      this.device.queue.submit([commandEncoder.finish()]);
      progressMonitor({ value: i, valueMax: iterations });
    }

    const commandEncoder = this.device.createCommandEncoder();
    const resultBuffer = this.device.createBuffer({
      size: this.imageArray.byteLength,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });

    commandEncoder.copyBufferToBuffer(
      this.buffers[(iterations + 1) % 2],
      0,
      resultBuffer,
      0,
      this.imageArray.byteLength,
    );
    this.device.queue.submit([commandEncoder.finish()]);

    await resultBuffer.mapAsync(GPUMapMode.READ);
    const resultArray = new Uint8ClampedArray(resultBuffer.getMappedRange());
    this.imageArray.set(resultArray);
    resultBuffer.unmap();

    progressMonitor({ value: iterations, valueMax: iterations });
    return;
  }

  async delete(): Promise<void> {
    return;
  }

  async transfer(): Promise<Uint8ClampedArray> {
    return this.imageArray;
  }
}
