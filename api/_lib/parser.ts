import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export default function parseRequest(req: IncomingMessage) {
  console.log(`HTTP ${req.url}`);
  const { pathname, query } = parse(req.url || '/', true);
  const { fontSize, image, md } = query || {};

  if (Array.isArray(fontSize)) {
    throw new Error('Expected a single fontSize');
  }

  if (Array.isArray(image)) {
    throw new Error('Expected a single image');
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

  const defaultImage =
    'https://github.com/hapakaien/assets/raw/main/husen.id/Icon/base-optimized.svg';

  const parsedRequest: ParsedRequest = {
    fileType: extension === 'jpeg' ? extension : 'png',
    text: decodeURIComponent(text),
    md: md === '1' || md === 'true',
    fontSize: fontSize || '96px',
    image: image || defaultImage,
  };
  return parsedRequest;
}
