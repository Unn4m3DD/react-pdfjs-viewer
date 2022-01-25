import { PDFViewer } from 'pdfjs-dist/types/web/pdf_viewer'
import React, { useState } from 'react'

import { PDFJSViewer } from 'react-pdfjs-viewer'
// import 'react-pdfjs-viewer/dist/index.css'

const App = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentScale, setCurrentScale] = useState(1)
  const [pdfViewer, setPdfViewer] = useState<PDFViewer>()
  return <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
    <h1 style={{ position: 'absolute', top: 100, left: 100, zIndex: 1 }}>
      <button onClick={() => setCurrentPage(currentPage - 1)} >-</button>
      {currentPage}
      <button onClick={() => setCurrentPage(currentPage + 1)}>+</button>
    </h1>
    <h1 style={{ position: 'absolute', top: 200, left: 100, zIndex: 1 }}>
      <button onClick={() => pdfViewer?.decreaseScale()} >-</button>
      {currentScale}
      <button onClick={() => pdfViewer?.increaseScale()}>+</button>
    </h1>

    <PDFJSViewer
      url="/test.pdf"
      pageInfo={{ currentPage, setCurrentPage }}
      scaleInfo={{ currentScale, setCurrentScale }}
      onPagesInit={({ source }) => {
        setPdfViewer(source)
      }}
      initialPage={20}
      onBaseViewerInit={console.log}
      onPageChanging={console.log}
      onRotationChanging={console.log}
      onPagesDestroy={console.log}
      onScrollModeChanged={console.log}
      onPagesLoaded={console.log}
      onScaleChanging={console.log}
      onUpdateViewArea={console.log}
      onOptionalContentConfigChanged={console.log}
      onSpreadModeChanged={console.log}
    />
  </div >
}

export default App
