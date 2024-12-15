import { proxy } from "comlink";
import {
  Box,
  Button,
  LinearProgress,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { ImageViewer } from "./ImageViewer";
import { JSImageObject } from "./JSImageObject";
import { useCallback, useState } from "react";
import { usePreloadImageObject } from "./usePreloadImageObject";
import { ProgressMeter } from "../components/ProgressMeter";
import { ImageProcessor } from "./ImageProcessor";
import { decrementActiveCountAtom, incrementActiveCountAtom } from "./atoms";
import { useAtom } from "jotai";

const ImageCaption = styled(Box)(({ theme }) => ({
  fontSize: 30,
  fontStyle: "bold",
  textAlign: "center",
}));

export const ImageFilterBenchmark = ({
  title,
  processor,
  iteration,
  options,
}: {
  title: string;
  processor: ImageProcessor;
  iteration: number;
  options?: {
    isWorker?: boolean;
    simd?: boolean;
  };
}) => {
  const preloadImageObject = usePreloadImageObject();
  const [targetImageObject, setTargetImageObject] = useState<JSImageObject>();
  const [isStarted, setStarted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isFinished, setFinished] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const [, incrementActiveCount] = useAtom(incrementActiveCountAtom);
  const [, decrementActiveCount] = useAtom(decrementActiveCountAtom);

  const updateProgress = useCallback(
    (width: number, height: number, startedTime: number) =>
      ({ value }: { value: number }): Promise<void> => {
        setProgress(value);
        setElapsedTime(performance.now() - startedTime);
        if (value === iteration) {
          processor.transfer().then((array) => {
            const updatedImageObject = new JSImageObject(
              width,
              height,
              new Uint8ClampedArray(array),
            );
            setTargetImageObject(updatedImageObject);
            setFinished(true);
            decrementActiveCount();
          });
        }
        return Promise.resolve();
      },
    [iteration, processor, decrementActiveCount],
  );

  const startProcessor = useCallback(() => {
    incrementActiveCount();
    setStarted(true);
    setElapsedTime(0);
    const startedTime = performance.now();
    const [width, height] = [
      preloadImageObject.width,
      preloadImageObject.height,
    ];
    processor.initialize(width, height, preloadImageObject.getData().slice(0));
    processor.applyAverageFilter(
      iteration,
      options || {},
      options?.isWorker
        ? proxy(updateProgress(width, height, startedTime))
        : updateProgress(width, height, startedTime),
    );
  }, [processor, iteration, options, incrementActiveCount, preloadImageObject]);

  const reset = () => {
    setStarted(false);
    setProgress(0);
    setFinished(false);
    setElapsedTime(0);
    setTargetImageObject(undefined);
  };

  return (
    <>
      <Stack direction="column" marginBottom={5}>
        <Stack alignItems="center" spacing={0}>
          {!isStarted ? (
            <>
              <Typography>{title}</Typography>
              <Button variant="outlined" onClick={startProcessor}>
                Start
              </Button>
            </>
          ) : !isFinished ? (
            <>
              <ProgressMeter value={progress} valueMax={iteration} />
              <ImageCaption>{(elapsedTime / 1000).toFixed(2)} sec</ImageCaption>
            </>
          ) : (
            <>
              <ImageViewer
                scale={0.3}
                imageObject={
                  targetImageObject ? targetImageObject : preloadImageObject
                }
              />
              <LinearProgress value={100} variant={"determinate"} />
              <Stack direction="row" spacing={2}>
                <Typography>{title}</Typography>
                <ImageCaption>
                  {(elapsedTime / 1000).toFixed(2)} sec
                </ImageCaption>
                <Button variant="outlined" onClick={reset} size={"small"}>
                  Reset
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
};
