export type Layout = string | string[] | 'home' | 'page' | 'blog';

export interface ParsedRquest {
	layout: Layout;
	fontSize: string | string[];
	text: string | string[];
}
