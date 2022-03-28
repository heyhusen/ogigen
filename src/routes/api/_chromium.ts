import core from 'puppeteer-core';
import { getOptions } from './_options';

let corePage: core.Page | null;

async function getPage(isDev: boolean) {
	if (corePage) {
		return corePage;
	}

	const options = await getOptions(isDev);
	const browser = await core.launch(options);
	corePage = await browser.newPage();

	return corePage;
}

export default async function getScreenshot(html: string, isDev: boolean) {
	const page = await getPage(isDev);
	await page.setViewport({ width: 1200, height: 630 });
	await page.setContent(html);
	const file = await page.screenshot({ type: 'png' });

	return file;
}
