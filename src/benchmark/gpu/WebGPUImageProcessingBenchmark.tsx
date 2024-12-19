import { ImageProcessingBenchmark } from "../ImageProcessingBenchmark";
import { WebGPUImageDataHandler } from "./WebGPUImageDataHandler";
import { useWebGPUDevice } from "../../hooks/gpu/useWebGPUDevice";

export const WebGPUImageProcessingBenchmark = ({
  title,
  options,
  iteration,
}: {
  title: string;
  options: { isWorker?: boolean; simd?: boolean };
  iteration: number;
}) => {
  const device = useWebGPUDevice();
  const imageDataHandler = new WebGPUImageDataHandler(device);
  return (
    <ImageProcessingBenchmark
      title={title}
      imageDataHandler={imageDataHandler}
      options={options}
      iteration={iteration}
    />
  );
};
