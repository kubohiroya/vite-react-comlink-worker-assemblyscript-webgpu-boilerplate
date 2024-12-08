import React, {useEffect, useRef} from "react";
import { ImageObject } from "./ImageObject";
import { useImageObjectLoaderContext } from "./useImageObjectLoaderContext";

type ImageViewerProps = {
    imageObject?: ImageObject;
}
export const ImageViewer = (props: ImageViewerProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const contextImageObject = useImageObjectLoaderContext();
    const propImageObject = props.imageObject;
    const imageObject = propImageObject ?? contextImageObject;

    useEffect(() => {
        if (canvasRef.current == null) return;

        const context = canvasRef.current.getContext("2d");
        if (!context) return;

        canvasRef.current.width = imageObject.width;
        canvasRef.current.height = imageObject.height;

        context.putImageData(
            new ImageData(
                imageObject.getDataArray(),
                imageObject.width,
                imageObject.height,
            ),
            0,
            0,
        );

    }, [canvasRef.current]);

    return (
        <canvas ref={canvasRef} style={{border: "1px solid black"}}/>
    );
};