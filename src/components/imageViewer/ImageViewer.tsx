import React, { useEffect, useRef } from "react";
import { usePreloadImageObject } from "../../hooks/usePreloadImageObject";
import { ImageObject } from "../../models/ImageObject";
import { scaleImageData } from "./scaleImageData";

type ImageViewerProps = {
  imageObject?: ImageObject;
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
    const height = Math.floor(imageObject.height * props.scale);
    if (width > 0 && height > 0) {
      if (props.width) {
        canvasRef.current.width = props.width;
      } else {
        canvasRef.current.width = width;
      }
      if (props.height) {
        canvasRef.current.height = props.height;
      } else {
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
        props.dx ? props.dx : 0,
        props.dy ? props.dy : 0,
      );
    }
  }, [
    canvasRef.current,
    props.dx,
    props.dy,
    props.width,
    props.height,
    preloadImageObject,
    targetImageObject,
  ]);

  return <canvas ref={canvasRef} style={{ border: "1px solid black" }} />;
};
