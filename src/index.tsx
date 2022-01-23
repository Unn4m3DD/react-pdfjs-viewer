import { getDocument } from 'pdfjs-dist/legacy/build/pdf'
import { PDFLinkService, PDFViewer } from 'pdfjs-dist/legacy/web/pdf_viewer'
import React, { useEffect, useState } from 'react'
import { getPdfViewer } from './pdfjs'
import 'pdfjs-dist/web/pdf_viewer.css'
import './styles.css'
import {
  BaseViewerInitEventPayload,
  PageChangingEventPayload,
  RotationChangingEventPayload,
  PagesDestroyEventPayload,
  ScrollModeChangedEventPayload,
  PagesLoadedEventPayload,
  PagesInitEventPayload,
  ScaleChangingEventPayload,
  UpdateViewAreaEventPayload,
  OptionalContentConfigChangedEventPayload,
  SpreadModeChangedEventPayload
} from './EventTypes'
interface Props {
  url: string;
  onBaseViewerInit?: (payload: BaseViewerInitEventPayload) => void;
  onPageChanging?: (payload: PageChangingEventPayload) => void;
  onRotationChanging?: (payload: RotationChangingEventPayload) => void;
  onPagesDestroy?: (payload: PagesDestroyEventPayload) => void;
  onScrollModeChanged?: (payload: ScrollModeChangedEventPayload) => void;
  onPagesLoaded?: (payload: PagesLoadedEventPayload) => void;
  onPagesInit?: (payload: PagesInitEventPayload) => void;
  onScaleChanging?: (payload: ScaleChangingEventPayload) => void;
  onUpdateViewArea?: (payload: UpdateViewAreaEventPayload) => void;
  onOptionalContentConfigChanged?: (payload: OptionalContentConfigChangedEventPayload) => void;
  onSpreadModeChanged?: (payload: SpreadModeChangedEventPayload) => void;
}

export const PDFJSViewer: React.FC<Props> = ({
  url,
  onBaseViewerInit,
  onPageChanging,
  onRotationChanging,
  onPagesDestroy,
  onScrollModeChanged,
  onPagesLoaded,
  onPagesInit,
  onScaleChanging,
  onUpdateViewArea,
  onOptionalContentConfigChanged,
  onSpreadModeChanged
}: Props) => {
  const [pdfViewer, setPdfViewer] = useState<PDFViewer>()

  useEffect(() => {
    if (pdfViewer) {
      if (onBaseViewerInit) pdfViewer.eventBus.on('baseviewerinit', onBaseViewerInit)
      if (onPageChanging) pdfViewer.eventBus.on('pagechanging', onPageChanging)
      if (onRotationChanging) pdfViewer.eventBus.on('rotationchanging', onRotationChanging)
      if (onPagesDestroy) pdfViewer.eventBus.on('pagesdestroy', onPagesDestroy)
      if (onScrollModeChanged) pdfViewer.eventBus.on('scrollmodechanged', onScrollModeChanged)
      if (onPagesLoaded) pdfViewer.eventBus.on('pagesloaded', onPagesLoaded)
      if (onPagesInit) pdfViewer.eventBus.on('pagesinit', onPagesInit)
      if (onScaleChanging) pdfViewer.eventBus.on('scalechanging', onScaleChanging)
      if (onUpdateViewArea) pdfViewer.eventBus.on('updateviewarea', onUpdateViewArea)
      if (onOptionalContentConfigChanged) pdfViewer.eventBus.on('optionalcontentconfigchanged', onOptionalContentConfigChanged)
      if (onSpreadModeChanged) pdfViewer.eventBus.on('spreadmodechanged', onSpreadModeChanged)
    }
  }, [pdfViewer])

  useEffect(() => {
    const urlChanged = async (): Promise<void> => {
      if (!pdfViewer) return
      const pdfDocument = await getDocument({
        url: url
      }).promise
      pdfViewer.setDocument(pdfDocument);
      (pdfViewer.linkService as PDFLinkService).setDocument(pdfDocument, null)
    }
    if (pdfViewer) {
      urlChanged()
    }
  }, [url, pdfViewer])
  return (
    <div
      id='viewerContainer' style={{
        overflow: 'auto',
        position: 'absolute',
        width: '100%',
        height: '100%'
      }}
    >
      <div
        id='viewer'
        className='pdfViewer'
        ref={(element): void => {
          if (!element || pdfViewer) return
          setPdfViewer(getPdfViewer())
        }}
      />
    </div>
  )
}
