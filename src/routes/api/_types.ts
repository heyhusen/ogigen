export type Layout = string | 'home' | 'page' | 'blog';

export interface ParsedRquest {
	layout: Layout;
	fontSize: string;
	text: string;
}
