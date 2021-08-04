import { readFileSync } from 'fs';
import marked from 'marked';
import twemoji from 'twemoji';
import sanitizeHtml from './sanitizer';
import { ParsedRequest } from './types';

const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const ralewayCyrillicExt1 = readFileSync(
  `${__dirname}/../_fonts/raleway/v22/1Ptug8zYS_SKggPNyCAIT5lu.woff2`,
).toString('base64');
const ralewayCyrillic1 = readFileSync(
  `${__dirname}/../_fonts/raleway/v22/1Ptug8zYS_SKggPNyCkIT5lu.woff2`,
).toString('base64');
const ralewayVietnamese1 = readFileSync(
  `${__dirname}/../_fonts/raleway/v22/1Ptug8zYS_SKggPNyCIIT5lu.woff2`,
).toString('base64');
const ralewayLatinExt1 = readFileSync(
  `${__dirname}/../_fonts/raleway/v22/1Ptug8zYS_SKggPNyCMIT5lu.woff2`,
).toString('base64');
const ralewayLatin1 = readFileSync(
  `${__dirname}/../_fonts/raleway/v22/1Ptug8zYS_SKggPNyC0ITw.woff2`,
).toString('base64');
const ralewayCyrillicExt2 = readFileSync(
  `${__dirname}/../_fonts/raleway/v22/1Ptug8zYS_SKggPNyCAIT5lu.woff2`,
).toString('base64');
const ralewayCyrillic2 = readFileSync(
  `${__dirname}/../_fonts/raleway/v22/1Ptug8zYS_SKggPNyCkIT5lu.woff2`,
).toString('base64');
const ralewayVietnamese2 = readFileSync(
  `${__dirname}/../_fonts/raleway/v22/1Ptug8zYS_SKggPNyCIIT5lu.woff2`,
).toString('base64');
const ralewayLatinExt2 = readFileSync(
  `${__dirname}/../_fonts/raleway/v22/1Ptug8zYS_SKggPNyCMIT5lu.woff2`,
).toString('base64');
const ralewayLatin2 = readFileSync(
  `${__dirname}/../_fonts/raleway/v22/1Ptug8zYS_SKggPNyC0ITw.woff2`,
).toString('base64');

function getCss(fontSize: string) {
  return `
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
      display: block;
    }
    body {
      line-height: 1;
    }
    ol, ul {
      list-style: none;
    }
    blockquote, q {
      quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }

    /* cyrillic-ext */
    @font-face {
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${ralewayCyrillicExt1}) format('woff2');
      unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
    }
    /* cyrillic */
    @font-face {
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${ralewayCyrillic1}) format('woff2');
      unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
    }
    /* vietnamese */
    @font-face {
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${ralewayVietnamese1}) format('woff2');
      unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
    }
    /* latin-ext */
    @font-face {
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${ralewayLatinExt1}) format('woff2');
      unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${ralewayLatin1}) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    /* cyrillic-ext */
    @font-face {
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${ralewayCyrillicExt2}) format('woff2');
      unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
    }
    /* cyrillic */
    @font-face {
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${ralewayCyrillic2}) format('woff2');
      unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
    }
    /* vietnamese */
    @font-face {
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${ralewayVietnamese2}) format('woff2');
      unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
    }
    /* latin-ext */
    @font-face {
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${ralewayLatinExt2}) format('woff2');
      unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
      font-family: 'Raleway';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url(data:font/woff2;charset=utf-8;base64,${ralewayLatin2}) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    body {
        background-color: white;
        background-image: url("https://github.com/hapakaien/assets/raw/main/husen.id/Open%20Graph/light-silhouette-icon-optimized.svg");
        background-size: 500px 500px;
        background-repeat: no-repeat;
        background-position: center;
        height: 100vh;
        padding: 10px;
        font-family: 'Raleway', sans-serif;
    }

    main {
      padding: 20px;
    }

    img {
      position: fixed;
      right: 20px;
      bottom: 20px;
      wdth: 100px;
      height: 100px;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .heading {
        font-size: ${sanitizeHtml(fontSize)};
        font-style: normal;
        color: black;
    }`;
}

function getImage(src: string) {
  return `<img
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="100px"
        height="100px"
    />`;
}

export default function getHtml(parsedReq: ParsedRequest) {
  const { text, md, fontSize, image } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(fontSize)}
    </style>
    <body>
        <main>
            <div class="heading">
              ${emojify(md ? marked(text) : sanitizeHtml(text))}
            </div>
            ${getImage(image)}
        </main>
    </body>
</html>`;
}
