import {useRef, useState } from "react";
import { useImageObjectLoaderContext } from "./useImageObjectLoaderContext";
import { Box, Button, Stack, styled } from "@mui/material";
import { ImageViewer } from "./ImageViewer";

import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { ImageObjectWorkerService } from "./ImageObject/ImageObjectWorkerService";
import { ImageObject } from "./ImageObject";

const iteration = 100;

const Caption = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
}));

export const BenchmarkWithImageFilters = ({title, workerService}:{
    title: string,
    workerService: ImageObjectWorkerService<ImageObject>
}) => {
    const imageObject = useImageObjectLoaderContext();
    const imageObjectRef = useRef<ImageObject>();
    const [isStarted, setStarted] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [isFinished, setFinished] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    return (
      <>
          <Box>
              <h2>{title}</h2>
              <Stack alignItems="center" spacing={2}>
                  {!isStarted ?(
                  <Button
                      variant="outlined"
                      onClick={()=>{
                          setStarted(true);
                          const startedTime = performance.now();
                          setElapsedTime(0);
                          workerService.createImageObject(
                              imageObject.width,
                              imageObject.height,
                              imageObject.buffer).then((updatedImageObject) => {
                              workerService.applyAverageFilter(updatedImageObject.id, iteration, ({
                                                                                         value,
                                                                                         valueMax,
                                                                                     }) => {
                                  setProgress(value);
                                  setElapsedTime(performance.now() - startedTime);
                                  if(value === valueMax) {
                                      imageObjectRef.current = updatedImageObject;
                                      setFinished(true);
                                  }
                              });
                          })
                      }}
                  >
                      Start
                  </Button>
              ): !isFinished ?
                  <>
                  <Gauge width={200} height={200} value={progress} valueMax={100}
                         sx={{
                             [`& .${gaugeClasses.valueText}`]: {
                                 fontSize: 20,
                                 transform: 'translate(0px, 0px)',
                             },
                         }}
                         text={({ value, valueMax }) => `${value} / ${valueMax}`}
                  />
                  <Caption>{(elapsedTime / 1000).toFixed(2)} sec</Caption>
                  </>
                      :
                  <>
                      <ImageViewer
                          imageObject={!imageObjectRef.current?
                              imageObject: imageObjectRef.current}
                      />
                      <Caption>{(elapsedTime / 1000).toFixed(2)} sec</Caption>
                  </>
              }
              </Stack>
          </Box>
      </>
  );
};
