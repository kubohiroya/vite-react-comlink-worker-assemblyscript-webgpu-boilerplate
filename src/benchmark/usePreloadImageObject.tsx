import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { JSImageObject } from "./ImageObject/JSImageObject";
import { ImageObject } from "./ImageObject";

export const PreloadImageObjectContext =
  createContext<ImageObject | null>(null);

export const PreloadImageObjectContextProvider = ({
  src,
  loader,
  children,
}: {
  src: string;
  loader: ReactNode;
  children?: ReactNode;
}) => {
  const [preloadImageObject, setPreloadImageObject] =
    useState<ImageObject | null>(null);

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
      setPreloadImageObject(
        new JSImageObject(canvas.width, canvas.height, buffer),
      );
    };
    offscreenImage.src = src;
  }, [src]);

  if (preloadImageObject == null) return loader;
  return (
    <PreloadImageObjectContext.Provider value={preloadImageObject}>
      {children}
    </PreloadImageObjectContext.Provider>
  );
};

export const usePreloadImageObject = () => {
  const context = useContext(PreloadImageObjectContext);
  if (context == null)
    throw new Error(
      "ImageObjectLoaderContext must be used within a PreloadImageObjectContextProvider",
    );
  return context;
};
