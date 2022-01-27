import { PDFViewer } from 'pdfjs-dist/types/web/pdf_viewer'
import React, { useEffect, useState } from 'react'

import { PDFJSViewer } from 'react-pdfjs-viewer'
import { PagesInitEventPayload, ScaleChangingEventPayload } from '../../dist/EventTypes'
// import 'react-pdfjs-viewer/dist/index.css'

const App = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageInput, setCurrentPageInput] = useState("1")
  const [currentScale, setCurrentScale] = useState(1)


  const [totalPageCount, setTotalPageCount] = useState<number>();
  const [pdfViewer, setPdfViewer] = useState<PDFViewer>()

  useEffect(() => {
    setCurrentPageInput(`${currentPage}`)
  }, [currentPage])

  return <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" />

    <PDFJSViewer
      url="/test.pdf"
      onPagesInit={({ source }: PagesInitEventPayload) => {
        setTotalPageCount(source.pagesCount)
        setPdfViewer(source)
      }}
      // Here I am using the direct state synchronization functionality of the library to get and set the current page 
      pageInfo={{ currentPage, setCurrentPage }}

      // Here I am handling the scale of the viewer manually, 
      // you could use scaleInfo for this purpose but this works as an example of how to do it manually.
      // You may want to do it manually in order to customize behaviour or access pdfjs API directly

      onScaleChanging={({ scale }: ScaleChangingEventPayload) => {
        setCurrentScale(scale)
      }}
      initialPage={1}
    />
    <div className="toolbar">
      <button className="toolbar-item toolbar-button" onClick={() => setCurrentPage(currentPage - 1)}>
        <i className="fas fa-arrow-up"></i>
      </button>
      <input
        className="toolbar-item toolbar-input"
        type="number"
        value={currentPageInput}
        onChange={(e) => setCurrentPageInput(e.target.value)}
        onBlur={() => {
          const newPage = Number(currentPageInput)
          if (!isNaN(newPage)) setCurrentPage(newPage)
          else setCurrentPageInput(`${currentPage}`)
        }}
        onKeyPress={({ key }) => {
          if (key !== "Enter") return
          const newPage = Number(currentPageInput)
          if (!isNaN(newPage)) setCurrentPage(newPage)
          else setCurrentPageInput(`${currentPage}`)
        }}
      />
      <div className="toolbar-item">of<br />{totalPageCount}</div>
      <button className="toolbar-item toolbar-button" onClick={() => setCurrentPage(currentPage + 1)}>
        <i className="fas fa-arrow-down"></i>
      </button>
      <button className="toolbar-item toolbar-button" onClick={() => pdfViewer?.increaseScale()}>
        <i className="fas fa-search-plus"></i>
      </button>
      <div className="toolbar-item">{currentScale}</div>
      <button className="toolbar-item toolbar-button" onClick={() => pdfViewer?.decreaseScale()} >
        <i className="fas fa-search-minus"></i>
      </button>
    </div>
  </div>
}

export default App
