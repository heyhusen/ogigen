import type { RequestHandler } from '@sveltejs/kit';
import getScreenshot from './_chromium';
import { parseRequest } from './_parser';
import { getHtml } from './_template';

const isDev = !process.env.AWS_REGION;
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1';

export const get: RequestHandler = async ({ url }) => {
	const parsedReq = parseRequest(url.searchParams);
	const html = getHtml(parsedReq);

	if (isHtmlDebug) {
		return {
			headers: {
				'Content-Type': 'text/html',
			},
			body: html,
		};
	}

	const file = await getScreenshot(html, isDev);

	return {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
		},
		body: file,
	};
};
