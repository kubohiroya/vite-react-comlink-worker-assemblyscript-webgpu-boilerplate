import { ImageFilterBenchmark } from "../ImageFilterBenchmark";
import { WebGPUImageProcessor } from "./WebGPUImageProcessor";
import { useWebGPUDevice } from "./useWebGPUDevice";

export const WebGPUImageFilterBenchmark = ({
  title,
  options,
  iteration,
}: {
  title: string;
  options: { isWorker?: boolean; simd?: boolean };
  iteration: number;
}) => {
  const device = useWebGPUDevice();
  const imageProcessor = new WebGPUImageProcessor(device);
  return (
    <ImageFilterBenchmark
      title={title}
      processor={imageProcessor}
      options={options}
      iteration={iteration}
    />
  );
};
