import { useCallback, useRef, useState } from "react";
import { usePreloadImageObject } from "./usePreloadImageObject";
import { Box, Button, Stack, styled } from "@mui/material";
import { ImageViewer } from "./ImageViewer";

import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { ImageObjectWorkerService } from "./ImageObjectWorkerService";
import { ImageObject } from "./ImageObject";

const Caption = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
}));

export const ImageFilterBenchmark = ({
  title,
  iteration,
  workerService,
}: {
  title: string;
  iteration: number;
  workerService: ImageObjectWorkerService;
}) => {
  const preloadImageObject = usePreloadImageObject();
  const [targetImageObject, setTargetImageObject] = useState<ImageObject>();
  const [isStarted, setStarted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isFinished, setFinished] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const startBenchmark = useCallback(() => {
    setStarted(true);
    const startedTime = performance.now();
    setElapsedTime(0);
    workerService
      .create(
        preloadImageObject.width,
        preloadImageObject.height,
        preloadImageObject.buffer,
      )
      .then((imageObjectId: number) => {
        workerService.applyAverageFilter(
          imageObjectId as number,
          iteration,
          ({value, valueMax}:{ value: number, valueMax: number }) => {
            setProgress(value);
            setElapsedTime(performance.now() - startedTime);
            if (value === valueMax) {
              workerService
                .transfer(imageObjectId as number)
                .then((targetImageObject: ImageObject) => {
                  setTargetImageObject(targetImageObject);
                  setFinished(true);
                });
            }
          },
        );
      });
  }, [preloadImageObject]);

  return (
    <>
      <Box>
        <h2>{title}</h2>
        <Stack alignItems="center" spacing={2}>
          {!isStarted ? (
            <Button variant="outlined" onClick={startBenchmark}>
              Start
            </Button>
          ) : !isFinished ? (
            <>
              <Gauge
                width={200}
                height={200}
                value={progress}
                valueMax={iteration}
                sx={{
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 20,
                    transform: "translate(0px, 0px)",
                  },
                }}
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
              />
              <Caption>{(elapsedTime / 1000).toFixed(2)} sec</Caption>
            </>
          ) : (
            <>
              <ImageViewer
                imageObject={
                  targetImageObject ? targetImageObject : preloadImageObject
                }
              />
              <Caption>{(elapsedTime / 1000).toFixed(2)} sec</Caption>
            </>
          )}
        </Stack>
      </Box>
    </>
  );
};
