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
  SpreadModeChangedEventPayload,
  PageRenderedEventPayload
} from './EventTypes'
interface Props {
  url: string;
  initialPage?: number;
  pageInfo?: {
    currentPage: number; setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  };
  initialScale?: number;
  scaleInfo?: {
    currentScale: number; setCurrentScale: React.Dispatch<React.SetStateAction<number>>;
  };
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
  pageInfo,
  scaleInfo,
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
  onSpreadModeChanged,
  initialScale,
  initialPage
}: Props) => {
  const [pdfViewer, setPdfViewer] = useState<PDFViewer>()

  useEffect(() => {
    if (pdfViewer) {
      if (onBaseViewerInit) pdfViewer.eventBus.on('baseviewerinit', onBaseViewerInit)
      if (onRotationChanging) pdfViewer.eventBus.on('rotationchanging', onRotationChanging)
      if (onPagesDestroy) pdfViewer.eventBus.on('pagesdestroy', onPagesDestroy)
      if (onScrollModeChanged) pdfViewer.eventBus.on('scrollmodechanged', onScrollModeChanged)
      if (onPagesLoaded) pdfViewer.eventBus.on('pagesloaded', onPagesLoaded)
      if (onUpdateViewArea) pdfViewer.eventBus.on('updateviewarea', onUpdateViewArea)
      if (onOptionalContentConfigChanged) pdfViewer.eventBus.on('optionalcontentconfigchanged', onOptionalContentConfigChanged)
      if (onSpreadModeChanged) pdfViewer.eventBus.on('spreadmodechanged', onSpreadModeChanged)
    }
  }, [onBaseViewerInit, onOptionalContentConfigChanged, onPageChanging, onPagesDestroy, onPagesInit, onPagesLoaded, onRotationChanging, onScaleChanging, onScrollModeChanged, onSpreadModeChanged, onUpdateViewArea, pdfViewer])

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
  React.useEffect(() => {
    if (!pdfViewer) return
    if (pageInfo?.currentPage && pageInfo.currentPage !== pdfViewer.currentPageNumber) {
      pdfViewer.currentPageNumber = pageInfo.currentPage
    }
    if (scaleInfo?.currentScale && scaleInfo.currentScale !== pdfViewer.currentScale) {
      pdfViewer.currentScale = scaleInfo.currentScale
    }
  }, [pageInfo?.currentPage, pdfViewer, scaleInfo?.currentScale])
  return (
    <div id='asd' style={{ height: '100vh', width: '100vw', position: 'relative' }}>
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
            const newPdfViewer = getPdfViewer()
            newPdfViewer.eventBus.on('pagechanging', (payload: PageChangingEventPayload) => {
              if (pageInfo?.currentPage && pageInfo.currentPage !== payload.pageNumber) pageInfo.setCurrentPage(payload.pageNumber)
              onPageChanging && onPageChanging(payload)
            })
            newPdfViewer.eventBus.on('scalechanging', (payload: ScaleChangingEventPayload) => {
              if (scaleInfo?.currentScale && scaleInfo.currentScale !== payload.scale) scaleInfo.setCurrentScale(payload.scale)
              onScaleChanging && onScaleChanging(payload)
            })
            newPdfViewer.eventBus.on('pagesinit', (payload: PagesInitEventPayload) => {
              console.log('ad')
              newPdfViewer._setScale(initialScale || 1)
              newPdfViewer.currentPageNumber = initialPage || 1
              onPagesInit && onPagesInit(payload)
            })
            setPdfViewer(newPdfViewer)
          }}
        />
      </div>
    </div>
  )
}
