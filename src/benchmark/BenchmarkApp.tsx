import React, {ReactNode, useEffect, useState } from "react";
import {ImageObjectLoaderContextProvider} from "./useImageObjectLoaderContext";
import { BenchmarkWithImageFilters } from "./BenchmarkWithImageFilters";
import { CircularProgress } from "@mui/material";
import { JSImageObjectWorkerService } from "./ImageObject/JSImageObjectWorkerService";
import { ASImageObjectWorkerService } from "./ASImageObject/ASImageObjectWorkerService";
import { ImageViewer } from "./ImageViewer";

const src =
  "vite-react-worker-assemblyscript-boilerplate/The_Great_Wave_off_Kanagawa.jpg";

export const BenchmarkApp = () => {
  return (
      <ImageObjectLoaderContextProvider src={src} loader={<CircularProgress/>}>
          <h1>Image Filters</h1>
          <h2>Original Image:</h2>
          <ImageViewer />
          <BenchmarkWithImageFilters
              title={'Filtered Image with Vanilla-JavaScript WebWorker:'}
              workerService={new JSImageObjectWorkerService()}
          />
          <BenchmarkWithImageFilters
              title={'Filtered Image with AssemblyScript with WebWorker(single thread):'}
              workerService={new ASImageObjectWorkerService()}
          />
      </ImageObjectLoaderContextProvider>
  );
};

export default BenchmarkApp;
