import type { RequestEvent } from '@sveltejs/kit/types/internal';
import type { ParsedRquest } from './_types';

export function parseRequest(query: RequestEvent['url']['searchParams']) {
	const parsedRequest: ParsedRquest = {
		layout: query.get('layout'),
		fontSize: query.get('fontSize'),
		text: query.get('text'),
	};

	return parsedRequest;
}
