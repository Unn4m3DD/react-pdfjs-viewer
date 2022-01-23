import { PDFViewer } from 'pdfjs-dist/types/web/pdf_viewer'

export interface PDFEventPayload {
  source: PDFViewer;
}

// export interface DispatchEventInSandboxEventPayload extends PDFEventPayload {
//   detail: {
//     id: string;
//     name: string;
//   };
// }
// export interface FileAttachmentAnnotationEventPayload extends PDFEventPayload {}

// export interface CursorToolChangedEventPayload extends PDFEventPayload {
//   tool: number;
// }

// export type SandboxCreatedEventPayload = PDFEventPayload
// export type PrintEventPayload = PDFEventPayload
// export type SaveEventPayload = PDFEventPayload

// export interface OutlineLoadedEventPayload extends PDFEventPayload {
//   outlineCount: number;
//   currentOutlineItemPromise: Promise<any>;
// }
// export interface SideBarViewChangedEventPayload extends PDFEventPayload {
//   view: number;
// }
// export type ToggleOutlineTreeEventPayload = PDFEventPayload
// export type ResetLayersEventPayload = PDFEventPayload
// export type CurrentOutlineItemEventPayload = PDFEventPayload

// export interface FindEventPayload extends PDFEventPayload {}

// export interface FindBarCloseEventPayload extends PDFEventPayload {}

// export interface AttachmentsLoadedEventPayload extends PDFEventPayload {}

// export interface LayersLoadedEventPayload extends PDFEventPayload {}

// export interface OptionalContentConfigEventPayload extends PDFEventPayload {}

// export interface LocalizedEventPayload extends PDFEventPayload {}

// export interface DocumentLoadedEventPayload extends PDFEventPayload {}

// export interface DocumentInitEventPayload extends PDFEventPayload {}

// export interface MetadataLoadedEventPayload extends PDFEventPayload {}

// export interface ResizeEventPayload extends PDFEventPayload {}

// export interface HashChangeEventPayload extends PDFEventPayload {}

// export interface BeforePrintEventPayload extends PDFEventPayload {}

// export interface AfterPrintEventPayload extends PDFEventPayload {}

// export interface UpdateFromSandboxEventPayload extends PDFEventPayload {}

// export interface FileInputChangeEventPayload extends PDFEventPayload {}

// export interface DownloadEventPayload extends PDFEventPayload {}

// export interface OpenFileEventPayload extends PDFEventPayload {}

// export interface TextLayerRenderedEventPayload extends PDFEventPayload {}

// export interface UpdateTextLayerMatchesEventPayload extends PDFEventPayload {}

// export interface UpdateFindMatchesCountEventPayload extends PDFEventPayload {}

// export interface UpdateFindControlStateEventPayload extends PDFEventPayload {}

// export interface SecondaryToolBarResetEventPayload extends PDFEventPayload {}

// export interface FindFromUrlHashEventPayload extends PDFEventPayload {}

// export interface PageModeEventPayload extends PDFEventPayload {}

// export interface NamedActionEventPayload extends PDFEventPayload {}

// export interface PresentationModeChangedEventPayload extends PDFEventPayload {}

// export interface PageNumberChangedEventPayload extends PDFEventPayload {}

// export interface ScaleChangedEventPayload extends PDFEventPayload {}

// export interface AnnotationLayerRenderedEventPayload extends PDFEventPayload {}

// export interface XfaLayerRenderedEventPayload extends PDFEventPayload {}

// export interface PageRenderedEventPayload extends PDFEventPayload {}

// export interface PageRenderEventPayload extends PDFEventPayload {}

export type BaseViewerInitEventPayload = PDFEventPayload

export interface PageChangingEventPayload extends PDFEventPayload {
  pageNumber: number;
  pageLabel: string | null;
  previous: number;
}

export interface RotationChangingEventPayload extends PDFEventPayload {
  pagesRotation: number; // clockwise in degrees
  pageNumber: number;
}

export type PagesDestroyEventPayload = PDFEventPayload

type PDFScrollMode = { UNKNOWN: -1; VERTICAL: 0; HORIZONTAL: 1; WRAPPED: 2 }
export interface ScrollModeChangedEventPayload extends PDFEventPayload {
  mode: PDFScrollMode;
}

export interface PagesLoadedEventPayload extends PDFEventPayload {
  pagesCount: number;
}

export type PagesInitEventPayload = PDFEventPayload

export interface ScaleChangingEventPayload extends PDFEventPayload {
  scale: number;
  presetValue: string;
}

export interface UpdateViewAreaEventPayload extends PDFEventPayload {
  scale: number;
  location: {
    pageNumber: number;
    scale: number | null;
    top: number;
    left: number;
    rotation: number;
    pdfOpenParams: string;
  };
}

export interface OptionalContentConfigChangedEventPayload extends PDFEventPayload {
  promise: Promise<any>;
}

type PDFSpreadMode = { UNKNOWN: -1; NONE: 0; ODD: 1; EVEN: 2}
export interface SpreadModeChangedEventPayload extends PDFEventPayload {
  mode: PDFSpreadMode;
}
