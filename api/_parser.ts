import type { VercelRequest } from '@vercel/node';
import type { ParsedRquest } from './_types';

export function parseRequest(query: VercelRequest['query']) {
	const { layout, fontSize, text } = query;

	const parsedRequest: ParsedRquest = {
		layout,
		fontSize,
		text,
	};

	return parsedRequest;
}
