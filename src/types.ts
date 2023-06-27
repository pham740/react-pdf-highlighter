export enum UserProblematic {
  YES = "YES",
  NO = "NO",
  UNSURE = "UNSURE",
  UNREVIEWED = "UNREVIEWED",
}

export enum SeverityScore {
  LOW = "LOW",
  MEDIUM = "MID",
  HIGH = "HIGH",
  UNSURE = "UNSURE",
  UNREVIEWED = "UNREVIEWED",
}

export enum SeverityScoreColor {
  LOW = "#00E2F0",
  MID = "#EDF222",
  HIGH = "#FF8888",
  UNSURE = "#BDBDBD",
}

export interface LTWH {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface LTWHP extends LTWH {
  pageNumber?: number;
}

export interface Scaled {
  x1: number;
  y1: number;

  x2: number;
  y2: number;

  width: number;
  height: number;

  pageNumber?: number;
}

export interface Position {
  boundingRect: LTWHP;
  rects: Array<LTWHP>;
  pageNumber: number;
}

export interface ScaledPosition {
  boundingRect: Scaled;
  rects: Array<Scaled>;
  pageNumber: number;
  usePdfCoordinates?: boolean;
}

export interface Content {
  text?: string;
  image?: string;
  imageWithContext?: string;
}

export interface HighlightContent {
  content: Content;
  isActive: boolean;
}

export interface Info {
  user_defined?: boolean;
  model_problematic: boolean;
  user_problematic: UserProblematic;
  severity_score: string;
}

export interface HighlightInfo {
  info: Info;
}

export interface NewHighlight extends HighlightContent, HighlightInfo {
  position: ScaledPosition;
}

export interface IHighlight extends NewHighlight {
  id: string;
  page_id?: string;
}

export interface ViewportHighlight extends HighlightContent, HighlightInfo {
  position: Position;
}

export interface Viewport {
  convertToPdfPoint: (x: number, y: number) => Array<number>;
  convertToViewportRectangle: (pdfRectangle: Array<number>) => Array<number>;
  width: number;
  height: number;
}

export interface Page {
  node: HTMLElement;
  number: number;
}
