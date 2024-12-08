import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { JSImageObject } from "./ImageObject/JSImageObject";

export type ImageObjectLoaderContextType = JSImageObject;

export const ImageObjectLoaderContext =
  createContext<ImageObjectLoaderContextType | null>(null);

export const ImageObjectLoaderContextProvider = ({
  src,
  loader,
  children,
}: {
  src: string;
  loader: ReactNode;
  children?: ReactNode;
}) => {
  const [imageObjectLoaderContextValue, setImageObjectLoaderContextValue] =
    useState<ImageObjectLoaderContextType | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context == null) throw new Error();
    const offscreenImage = new Image();
    offscreenImage.onload = async () => {
      canvas.width = offscreenImage.width;
      canvas.height = offscreenImage.height;
      context.drawImage(offscreenImage, 0, 0);
      const buffer = context.getImageData(0, 0, canvas.width, canvas.height)
        .data.buffer;
      setImageObjectLoaderContextValue(
        new JSImageObject(canvas.width, canvas.height, buffer),
      );
    };
    offscreenImage.src = src;
  }, [src]);

  if (imageObjectLoaderContextValue == null) return loader;
  return (
    <ImageObjectLoaderContext.Provider value={imageObjectLoaderContextValue}>
      {children}
    </ImageObjectLoaderContext.Provider>
  );
};

export const useImageObjectLoaderContext = () => {
  const context = useContext(ImageObjectLoaderContext);
  if (context == null)
    throw new Error(
      "ImageObjectLoaderContext must be used within a ImageObjectLoaderContextProvider",
    );
  return context;
};
