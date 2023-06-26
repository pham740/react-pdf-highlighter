import { isHTMLCanvasElement } from "./pdfjs-dom";
import type { LTWHP } from "../types.js";

export const getAreaAsPNG = (
  canvas: HTMLCanvasElement,
  position: LTWHP,
  extendedRenderer?: (newCanvas: CanvasRenderingContext2D) => void
): string => {
  const { left, top, width, height } = position;

  const doc = canvas ? canvas.ownerDocument : null;
  // @TODO: cache this?
  const newCanvas = doc && doc.createElement("canvas");

  if (!newCanvas || !isHTMLCanvasElement(newCanvas)) {
    return "";
  }

  newCanvas.width = width;
  newCanvas.height = height;

  const newCanvasContext = newCanvas.getContext("2d");

  if (!newCanvasContext || !canvas) {
    return "";
  }

  const dpr: number = window.devicePixelRatio;

  newCanvasContext.drawImage(
    canvas,
    left * dpr,
    top * dpr,
    width * dpr,
    height * dpr,
    0,
    0,
    width,
    height
  );
  extendedRenderer != null && extendedRenderer(newCanvasContext);

  return newCanvas.toDataURL("image/png");
};

export const getAreaAsPngWithContext = (
  canvas: HTMLCanvasElement,
  position: LTWHP,
  contextPosition: LTWHP
): string => {
  const pixelRatio: number = window.devicePixelRatio;
  return getAreaAsPNG(canvas, contextPosition, (newCanvas) => {
    newCanvas.globalAlpha = 0.2;
    newCanvas.fillStyle = "#7025B3";
    newCanvas.fillRect(
      position.left * pixelRatio,
      position.top * pixelRatio,
      position.width * pixelRatio,
      position.height * pixelRatio
    );
    newCanvas.globalAlpha = 1.0;
  });
};
