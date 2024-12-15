import React, { useEffect, useRef } from "react";
import { usePreloadImageObject } from "./usePreloadImageObject";
import { JSImageObject } from "./JSImageObject";

function scaleImageData(imageData: ImageData, scale: number): ImageData {
  const srcWidth = imageData.width;
  const srcHeight = imageData.height;
  const dstWidth = Math.floor(srcWidth * scale);
  const dstHeight = Math.floor(srcHeight * scale);
  const dstImageData = new ImageData(dstWidth, dstHeight);

  const srcData = imageData.data;
  const dstData = dstImageData.data;

  for (let y = 0; y < dstHeight; y++) {
    for (let x = 0; x < dstWidth; x++) {
      const srcX = Math.floor(x / scale);
      const srcY = Math.floor(y / scale);

      const srcIndex = (srcY * srcWidth + srcX) * 4;
      const dstIndex = (y * dstWidth + x) * 4;

      dstData[dstIndex] = srcData[srcIndex];
      dstData[dstIndex + 1] = srcData[srcIndex + 1];
      dstData[dstIndex + 2] = srcData[srcIndex + 2];
      dstData[dstIndex + 3] = srcData[srcIndex + 3];
    }
  }

  return dstImageData;
}

type ImageViewerProps = {
  imageObject?: JSImageObject;
  scale: number;
  width?: number;
  height?: number;
  dx?: number;
  dy?: number;
};

export const ImageViewer = (props: ImageViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const preloadImageObject = usePreloadImageObject();
  const targetImageObject = props.imageObject;

  useEffect(() => {
    if (canvasRef.current == null) return;

    const context = canvasRef.current.getContext("2d");
    if (!context) return;

    const imageObject = targetImageObject ?? preloadImageObject;
    const width = Math.floor(imageObject.width * props.scale);
    const height = Math.floor(imageObject.height * props.scale)
    if (width > 0 && height > 0) {
      if(props.width){
        canvasRef.current.width = props.width;
      } else{
        canvasRef.current.width = width;
      }
      if(props.height) {
        canvasRef.current.height = props.height;
      }else{
        canvasRef.current.height = height;
      }
      context.putImageData(
        scaleImageData(
          new ImageData(
            imageObject.getData(),
              imageObject.width,
              imageObject.height,
          ),
          props.scale,
        ),
          props.dx? props.dx: 0,
          props.dy? props.dy: 0,
      );
    }
  }, [canvasRef.current, props.dx, props.dy, props.width, props.height, preloadImageObject, targetImageObject]);

  return <canvas ref={canvasRef} style={{ border: "1px solid black" }} />;
};
