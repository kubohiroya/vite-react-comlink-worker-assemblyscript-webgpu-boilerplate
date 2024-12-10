import React, { ReactNode, useEffect, useState } from "react";
import { PreloadImageObjectContextProvider } from "./usePreloadImageObject";
import { ImageFilterBenchmark } from "./ImageFilterBenchmark";
import { CircularProgress } from "@mui/material";
import { JSImageObjectWorkerService } from "./ImageObject/JSImageObjectWorkerService";
import { ASImageObjectWorkerService } from "./ASImageObject/ASImageObjectWorkerService";
import { ImageViewer } from "./ImageViewer";

const IMAGE_SOURCE_URL =
  "vite-react-promise-worker-assemblyscript-boilerplate/The_Great_Wave_off_Kanagawa.jpg";
const ITERATION = 100;

export const App = () => {
  return (
    <PreloadImageObjectContextProvider src={IMAGE_SOURCE_URL} loader={<CircularProgress />}>
      <h1>Image Filters</h1>
      <h2>Original Image:</h2>
      <ImageViewer />
      <ImageFilterBenchmark
        title={"Filtered Image with Vanilla-JavaScript WebWorker:"}
        iteration={ITERATION}
        workerService={new JSImageObjectWorkerService()}
      />
      <ImageFilterBenchmark
        title={
          "Filtered Image with AssemblyScript with WebWorker(single thread):"
        }
        iteration={ITERATION}
        workerService={new ASImageObjectWorkerService()}
      />
    </PreloadImageObjectContextProvider>
  );
};

export default App;
