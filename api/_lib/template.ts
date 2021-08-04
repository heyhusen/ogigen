import { readFileSync } from 'fs';
import marked from 'marked';
import twemoji from 'twemoji';
import sanitizeHtml from './sanitizer';
import { ParsedRequest } from './types';

const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(
  `${__dirname}/../_fonts/Inter-Regular.woff2`,
).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString(
  'base64',
);
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString(
  'base64',
);

function getCss(fontSize: string) {
  return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
    }

    html, body, main {
      margin: 0;
    }

    body {
        background-color: white;
        background-image: url("https://github.com/hapakaien/assets/raw/main/husen.id/Open%20Graph/light-silhouette-icon-optimized.svg");
        background-size: 500px 500px;
        background-repeat: no-repeat;
        background-position: center;
        height: 100vh;
        padding: 10px;
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
        font-family: 'Inter', sans-serif;
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
