import type { ParsedRquest } from './_types';

const entityMap: { [key: string]: string } = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
	'/': '&#x2F;',
};

export default function sanitizeHtml(html: ParsedRquest['text']) {
	return String(html).replace(/[&<>"'\\/]/g, (key) => entityMap[key]);
}
