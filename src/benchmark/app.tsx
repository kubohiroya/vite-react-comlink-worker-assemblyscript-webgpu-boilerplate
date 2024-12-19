import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

import { useAtom } from "jotai";
import { activeCountAtom, iterationCountAtom } from "./atoms";

import project from "../../package.json";
import { PreloadImageObjectContextProvider } from "../hooks/usePreloadImageObject";
import { ImageProcessingBenchmark } from "./ImageProcessingBenchmark";
import { ImageViewer } from "../components/imageViewer/ImageViewer";
import { JSImageDataHandler } from "./js/JSImageDataHandler";
import { ASImageDataHandler } from "./as/ASImageDataHandler";
import { WebGPUDeviceContextProvider } from "../hooks/gpu/useWebGPUDevice";
import { WebGPUImageProcessingBenchmark } from "./gpu/WebGPUImageProcessingBenchmark";
import DigitalClock from "../components/digitalClock/DigitalClock";
import { BenchmarkContainer } from "./components/BenchmarkContainer";

const IMAGE_SOURCE_URL = project.name + "/The_Great_Wave_off_Kanagawa.jpg";
const ITERATION_DEFAULT = 200;

const jsImageDataHandler = new JSImageDataHandler();
const jsImageDataHandlerWorker = new ComlinkWorker<JSImageDataHandler>(
  new URL("./js/JSImageDataHandler", import.meta.url),
  {
    type: "module",
  },
);

const asImageDataHandler = new ASImageDataHandler();
const asImageDataHandlerWorker = new ComlinkWorker<ASImageDataHandler>(
  new URL("./as/ASImageDataHandler", import.meta.url),
  {
    type: "module",
  },
);

const AppHeader = () => {
  return (
    <>
      <DigitalClock />
      <ImageViewer scale={1} height={100} dy={-440} />
    </>
  );
};

const mode = new URLSearchParams(location.search).get("mode");

export const App = () => {
  const [iterationCount, setIterationCount] = useAtom(iterationCountAtom);
  const [activeCount] = useAtom(activeCountAtom);

  useEffect(() => {
    setIterationCount(ITERATION_DEFAULT);
  }, []);

  if (mode === "clock") {
    return <DigitalClock />;
  }

  return (
    <PreloadImageObjectContextProvider
      src={IMAGE_SOURCE_URL}
      loader={<CircularProgress />}
    >
      <Stack direction={"column"}>
        <AppHeader />
        <Box style={{ margin: "35px 100px 30px 100px" }}>
          <Slider
            disabled={activeCount !== 0}
            value={iterationCount}
            onChange={(_: any, value: number | number[]) =>
              setIterationCount(value as number)
            }
            min={0}
            max={500}
            step={10}
            valueLabelDisplay="on"
            marks={[
              { value: 0, label: "0" },
              { value: 50, label: "50" },
              { value: 100, label: "100" },
              { value: 200, label: "200" },
              { value: 300, label: "300" },
              { value: 400, label: "400" },
              { value: 500, label: "500" },
            ]}
          />
        </Box>

        <BenchmarkContainer title={"JavaScript"}>
          <ImageProcessingBenchmark
            title={"JavaScript"}
            iteration={iterationCount}
            imageDataHandler={jsImageDataHandler}
            options={{ isWorker: false }}
          />
          <ImageProcessingBenchmark
            title={"JavaScript with WebWorker"}
            iteration={iterationCount}
            imageDataHandler={jsImageDataHandlerWorker}
            options={{ isWorker: true }}
          />
        </BenchmarkContainer>

        <BenchmarkContainer title={"AssemblyScript"}>
          <ImageProcessingBenchmark
            title={"AssemblyScript"}
            iteration={iterationCount}
            imageDataHandler={asImageDataHandler}
            options={{ isWorker: false }}
          />
          <ImageProcessingBenchmark
            title={"AssemblyScript with WebWorker"}
            iteration={iterationCount}
            imageDataHandler={asImageDataHandlerWorker}
            options={{ isWorker: true }}
          />
        </BenchmarkContainer>

        {false && (
          <BenchmarkContainer title={"AssemblyScript(SIMD)"}>
            <ImageProcessingBenchmark
              title={"AssemblyScript(SIMD)"}
              iteration={iterationCount}
              imageDataHandler={asImageDataHandlerWorker}
              options={{ isWorker: false, simd: true }}
            />
            <ImageProcessingBenchmark
              title={"AssemblyScript(SIMD) with WebWorker"}
              iteration={iterationCount}
              imageDataHandler={asImageDataHandlerWorker}
              options={{ isWorker: true, simd: true }}
            />
          </BenchmarkContainer>
        )}

        <WebGPUDeviceContextProvider
          loadingMessage={<CircularProgress />}
          notSupportedMessage={<Typography>WebGPU is not supported</Typography>}
        >
          <BenchmarkContainer title={"WebGPU"}>
            <WebGPUImageProcessingBenchmark
              title={"WebGPU Compute Shader"}
              iteration={iterationCount}
              options={{ isWorker: false }}
            />
          </BenchmarkContainer>
        </WebGPUDeviceContextProvider>
      </Stack>
    </PreloadImageObjectContextProvider>
  );
};

export default App;
