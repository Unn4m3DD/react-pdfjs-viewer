import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'
import * as pdfjsViewer from 'pdfjs-dist/legacy/web/pdf_viewer'
import { GenericL10n, PDFViewer } from 'pdfjs-dist/legacy/web/pdf_viewer'
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

// The workerSrc property shall be specified.
//
export const getPdfViewer = (): PDFViewer => {
  const container = document.getElementById(
    'viewerContainer'
  ) as HTMLDivElement
  console.log(container)
  const eventBus = new pdfjsViewer.EventBus()

  // (Optionally) enable hyperlinks within PDF files.
  const pdfLinkService = new pdfjsViewer.PDFLinkService({
    eventBus
  })

  // (Optionally) enable find controller.
  const pdfFindController = new pdfjsViewer.PDFFindController({
    eventBus,
    linkService: pdfLinkService
  })

  const pdfViewer = new pdfjsViewer.PDFViewer({
    container,
    eventBus,
    linkService: pdfLinkService,
    findController: pdfFindController,
    // scriptingManager: pdfScriptingManager,
    renderer: 'canvas',
    l10n: new GenericL10n('en')
  } as any)
  pdfLinkService.setViewer(pdfViewer)
  // pdfScriptingManager.setViewer(pdfViewer)

  eventBus.on('pagesinit', function () {
    // pdfViewer.currentScaleValue = 'page-width'
    // pdfFindController.executeCommand("find", { query: SEARCH_FOR })
  })
  return pdfViewer
}

// Loading document.
