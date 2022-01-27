# react-pdfjs-viewer

> Pdfjs viewer package for react

[![NPM](https://img.shields.io/npm/v/react-pdfjs-viewer.svg)](https://www.npmjs.com/package/react-pdfjs-viewer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add @unn4m3dd/react-pdfjs-viewer

or

npm install @unn4m3dd/react-pdfjs-viewer
```




## Usage
This snippet should give you a headstart on using react-pdfjs-viewer
```tsx
import { PDFJSViewer } from 'react-pdfjs-viewer'
const App = () => {
  <PDFJSViewer url="/test.pdf"/>
}
```
Keep in mind that you need to host this pdf since regular CORS rules apply.

For further details of how to unlock the full potential of pdfjs I would suggest that you check out the source code for this [simple pdf viewer](https://github.com/Unn4m3DD/react-pdfjs-viewer/blob/master/example):
![simplescreenrecorder-2022-01-27_18 50 37](https://user-images.githubusercontent.com/42273661/151424914-c1ba7193-5ed3-4902-a8af-f46ac60b4118.gif)
An instance of the viewer running can be found [here](https://react-pdfjs-viewer.unn4m3dd.xyz)
## PDFJSViewer Props

| Property   |      Type      |  Default | Description |
|----------|:-------------:|:------:|------|
| url | `string` | must be provided | The url from which the pdf will be loaded |
| initialPage | `number` | 1 | The initial page when pdf is opened |
| pageInfo | `{ currentPage: number, setCurrentPage: SetStateFunction }` | undefined | If provided, these react state variables are always in sync with the pdf viewer state. This means that reading from currentPage retrieves the currently displayed page and calling setCurrentPage changes the currently displayed page |
| initialScale | `number` | 1 | The initial scale when pdf is opened |
| scaleInfo | `{ currentScale: number, setCurrentScale: SetStateFunction }` | undefined | If provided, these react state variables are always in sync with the pdf viewer state. This means that reading from currentScale retrieves the currently displayed scale and calling setCurrentScale changes the currently displayed scale |
| [onEventName](#supported-events) | EventPayload | undefined | If provided it will be called whenever the event occurs |

### Supported Events
If you know of any event that is not listed here but that is supported by pdfjs-viewer feel free to submit an issue or a pull request addressing that!  
All events return it's source, a `PDFViewer`, as part of their payload
| Property   |      Payload      |
|-|-|
|onBaseViewerInit | `-` |
|onPageChanging | `{ pageNumber: number, pageLabel: string \| null,  previous: number }`|
|onRotationChanging | `{ pagesRotation: number, pageNumber: number }` |
|onPagesDestroy |`-`|
|onScrollModeChanged |`{ mode: PDFScrollMode }`|
|onPagesLoaded |`{ pagesCount: number }`|
|onPagesInit |`-`|
|onScaleChanging |`{ scale: number, presetValue: string }`|
|onUpdateViewArea |`{ scale: number, location: {    pageNumber: number, scale: number \| null, top: number, left: number, rotation: number, pdfOpenParams: string } }`|
|onOptionalContentConfigChanged |`{ promise: Promise<any> }`|
|onSpreadModeChanged |`{ mode: PDFSpreadMode }`|

*PDFScrollMode* = `{ UNKNOWN: -1; VERTICAL: 0; HORIZONTAL: 1; WRAPPED: 2 }`  
*PDFSpreadMode* = `{ UNKNOWN: -1; NONE: 0; ODD: 1; EVEN: 2 }`


## License

MIT © [Unn4m3DD](https://github.com/Unn4m3DD)
