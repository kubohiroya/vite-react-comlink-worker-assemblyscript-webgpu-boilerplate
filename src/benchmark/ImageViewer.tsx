import React, { useEffect, useRef } from "react";
import { ImageObject } from "./ImageObject";
import { usePreloadImageObject } from "./usePreloadImageObject";

type ImageViewerProps = {
  imageObject?: ImageObject;
};
export const ImageViewer = (props: ImageViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const preloadImageObject = usePreloadImageObject();
  const targetImageObject = props.imageObject;
  const imageObject = targetImageObject ?? preloadImageObject;

  useEffect(() => {
    if (canvasRef.current == null) return;

    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    canvasRef.current.width = imageObject.width;
    canvasRef.current.height = imageObject.height;

    if (imageObject.width >= 0 && imageObject.height >= 0) {
      context.putImageData(
        new ImageData(
          imageObject.getDataArray(),
          imageObject.width,
          imageObject.height,
        ),
        0,
        0,
      );
    }
  }, [
    canvasRef.current,
    imageObject
  ]);

  return <canvas ref={canvasRef} style={{ border: "1px solid black" }} />;
};
