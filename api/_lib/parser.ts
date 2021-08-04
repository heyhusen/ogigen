import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

function getArray(stringOrArray: string[] | string | undefined): string[] {
  if (typeof stringOrArray === 'undefined') {
    return [];
  }
  if (Array.isArray(stringOrArray)) {
    return stringOrArray;
  }
  return [stringOrArray];
}

function getDefaultImages(images: string[]): string[] {
  const defaultImage =
    'https://github.com/hapakaien/assets/raw/main/husen.id/Icon/base-optimized.svg';

  const img = images;

  if (!img || !img[0]) {
    return [defaultImage];
  }
  return img;
}

export default function parseRequest(req: IncomingMessage) {
  console.log(`HTTP ${req.url}`);
  const { pathname, query } = parse(req.url || '/', true);
  const { fontSize, images, md } = query || {};

  if (Array.isArray(fontSize)) {
    throw new Error('Expected a single fontSize');
  }

  const arr = (pathname || '/').slice(1).split('.');
  let extension = '';
  let text = '';
  if (arr.length === 0) {
    text = '';
  } else if (arr.length === 1) {
    [text] = arr;
  } else {
    extension = arr.pop() as string;
    text = arr.join('.');
  }

  const parsedRequest: ParsedRequest = {
    fileType: extension === 'jpeg' ? extension : 'png',
    text: decodeURIComponent(text),
    md: md === '1' || md === 'true',
    fontSize: fontSize || '96px',
    images: getArray(images),
  };
  parsedRequest.images = getDefaultImages(parsedRequest.images);
  return parsedRequest;
}
