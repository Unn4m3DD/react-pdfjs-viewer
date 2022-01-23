import React from 'react'

import { PDFJSViewer } from 'react-pdfjs-viewer'
// import 'react-pdfjs-viewer/dist/index.css'

const App = () => {
  return <div id="asd" style={{ height: "100vh", width: "100vw" }}>
    <PDFJSViewer
      url="/test.pdf"
      onBaseViewerInit={console.log}
      onPageChanging={console.log}
      onRotationChanging={console.log}
      onPagesDestroy={console.log}
      onScrollModeChanged={console.log}
      onPagesLoaded={console.log}
      onPagesInit={console.log}
      onScaleChanging={console.log}
      onUpdateViewArea={console.log}
      onOptionalContentConfigChanged={console.log}
      onSpreadModeChanged={console.log}
    />
  </div >
}

export default App
