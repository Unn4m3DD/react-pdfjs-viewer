import React from 'react'

import { PDFJSViewer } from 'react-pdfjs-viewer'
// import 'react-pdfjs-viewer/dist/index.css'

const App = () => {
  return <div id="asd" style={{ height: "100vh", width: "100vw" }}>
    <PDFJSViewer url="/test.pdf" />
  </div >
}

export default App
