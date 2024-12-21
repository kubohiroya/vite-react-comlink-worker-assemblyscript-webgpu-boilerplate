import { proxy } from "comlink";
import {
  Box,
  Button,
  LinearProgress,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { ImageViewer } from "../components/imageViewer/ImageViewer";
import { ImageObject } from "../models/ImageObject";
import {memo, useState } from "react";
import { usePreloadImageObject } from "../hooks/usePreloadImageObject";
import { ProgressMeter } from "../components/progressMeter/ProgressMeter";
import { ImageDataHandler } from "./ImageDataHandler";
import { decrementActiveCountAtom, incrementActiveCountAtom } from "./atoms";
import { useAtom } from "jotai";

const ImageCaption = styled(Box)(({ theme }) => ({
  fontSize: 30,
  fontStyle: "bold",
  textAlign: "center",
}));

export const ImageProcessingBenchmark = memo(({
  title,
  imageDataHandler,
  iteration,
  options,
}: {
  title: string;
  imageDataHandler: ImageDataHandler;
  iteration: number;
  options?: {
    doubleBuffering?: boolean,
    isWorker?: boolean;
    simd?: boolean;
  };
}) => {
  const preloadImageObject = usePreloadImageObject();
  const [targetImageObject, setTargetImageObject] = useState<ImageObject>();
  const [isStarted, setStarted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const [, incrementActiveCount] = useAtom(incrementActiveCountAtom);
  const [, decrementActiveCount] = useAtom(decrementActiveCountAtom);

  const updateProgress = (width: number, height: number, startedTime: number) =>
      async ({ value }: { value: number }): Promise<void> => {
        setProgress(value);
        setElapsedTime(performance.now() - startedTime);
        if (value === iteration) {
          const array = await imageDataHandler.transfer();
          const updatedImageObject = new ImageObject(
              width,
              height,
              array,
           );
           setTargetImageObject(updatedImageObject);
          decrementActiveCount();
          }
        }
      ;

  const startProcessor = async() => {
    incrementActiveCount();
    setStarted(true);
    setElapsedTime(0);
    const startedTime = performance.now();
    const [width, height] = [
      preloadImageObject.width,
      preloadImageObject.height,
    ];
    await imageDataHandler.initialize(
      width,
      height,
      preloadImageObject.getData().slice(0),
    );
    await imageDataHandler.applyAverageFilter(
      iteration,
      options || {},
        options?.isWorker
        ? proxy(updateProgress(width, height, startedTime))
        : updateProgress(width, height, startedTime),
    );
  };

  const reset = () => {
    setStarted(false);
    setProgress(0);
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
          ) : !targetImageObject ? (
            <>
              <ProgressMeter value={progress} valueMax={iteration} />
              <ImageCaption>{(elapsedTime / 1000).toFixed(2)} sec</ImageCaption>
            </>
          ) : (
            <>
              <ImageViewer
                  scale={0.3}
                  width={targetImageObject.width * 0.3}
                  height={targetImageObject.height * 0.3}
                  imageObject={
                    targetImageObject
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
});
