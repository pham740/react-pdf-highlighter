// "viewport" rectangle is { top, left, width, height }

// "scaled" means that data structure stores (0, 1) coordinates.
// for clarity reasons I decided not to store actual (0, 1) coordinates, but
// provide width and height, so user can compute ratio himself if needed

import type { LTWHP, Scaled, Viewport } from "../types";

interface WIDTH_HEIGHT {
  width: number;
  height: number;
}

export const viewportToScaled = (
  rect: LTWHP,
  { width, height }: WIDTH_HEIGHT
): Scaled => {
  return {
    x1: rect.left,
    y1: rect.top,

    x2: rect.left + rect.width,
    y2: rect.top + rect.height,

    width,
    height,

    pageNumber: rect.pageNumber,
  };
};

const pdfToViewport = (pdf: Scaled, viewport: Viewport): LTWHP => {
  const [x1, y1, x2, y2] = viewport.convertToViewportRectangle([
    pdf.x1,
    pdf.y1,
    pdf.x2,
    pdf.y2,
  ]);

  return {
    left: x1,
    top: viewport.height - y1,

    width: x2 - x1,
    height: y1 - y2,

    pageNumber: pdf.pageNumber,
  };
};

const ltwhpToViewportRect = (ltwhp: LTWHP, viewport: Viewport) => {
  return {
    x1: ltwhp.left,
    y1: viewport.height - ltwhp.top,
    x2: ltwhp.width + ltwhp.left,
    y2: viewport.height - ltwhp.top - ltwhp.height,
    pageNumber: ltwhp.pageNumber,
  };
};

export const viewportToPdf = (ltwhp: LTWHP, viewport: Viewport): Scaled => {
  const rect = ltwhpToViewportRect(ltwhp, viewport);

  const [x1, y1] = viewport.convertToPdfPoint(rect.x1, rect.y1);
  const [x2, y2] = viewport.convertToPdfPoint(rect.x2, rect.y2);

  return {
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    width: viewport.width,
    height: viewport.height,
    pageNumber: ltwhp.pageNumber,
  };
};

export const scaledToViewport = (
  scaled: Scaled,
  viewport: Viewport,
  usePdfCoordinates: boolean = false
): LTWHP => {
  const { width, height } = viewport;

  if (usePdfCoordinates) {
    return pdfToViewport(scaled, viewport);
  }

  if (scaled.x1 === undefined) {
    throw new Error("You are using old position format, please update");
  }

  const x1 = (width * scaled.x1) / scaled.width;
  const y1 = (height * scaled.y1) / scaled.height;

  const x2 = (width * scaled.x2) / scaled.width;
  const y2 = (height * scaled.y2) / scaled.height;

  return {
    left: x1,
    top: y1,
    width: x2 - x1,
    height: y2 - y1,
    pageNumber: scaled.pageNumber,
  };
};
