import { getDocument } from 'pdfjs-dist/legacy/build/pdf'
import { PDFLinkService, PDFViewer } from 'pdfjs-dist/legacy/web/pdf_viewer'
import React, { useEffect, useState } from 'react'
import { getPdfViewer } from './pdfjs'
import 'pdfjs-dist/web/pdf_viewer.css'
import './styles.css'
interface Props {
  url: string;
}

export const PDFJSViewer: React.FC<Props> = ({ url }: Props) => {
  const [pdfViewer, setPdfViewer] = useState<PDFViewer>()

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
