import type { VercelRequest, VercelResponse } from '@vercel/node';
import getScreenshot from './_chromium';
import { parseRequest } from './_parser';
import { getHtml } from './_template';

const isDev = !process.env.AWS_REGION;
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1';

export default async function handler(
	request: VercelRequest,
	response: VercelResponse
) {
	const parseReq = parseRequest(request.query);
	const html = getHtml(parseReq);

	if (isHtmlDebug) {
		response.setHeader('Content-Type', 'text/html');
		response.end(html);
		return;
	}

	const file = await getScreenshot(html, isDev);

	response.statusCode = 200;
	response.setHeader('Content-Type', 'image/png');
	response.setHeader(
		'Cache-Control',
		`public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
	);
	response.end(file);
}
