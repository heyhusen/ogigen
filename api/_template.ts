import sanitizeHtml from './_sanitizer';
import type { ParsedRquest } from './_types';

function getCss(fontSize: ParsedRquest['fontSize']) {
	return `
		@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;700&family=Outfit&display=swap');
		@import url("https://unpkg.com/tailwindcss@3.0.23/src/css/preflight.css");

		:root {
			--font-sans: 'Barlow', sans-serif;
			--font-brand: 'Outfit', sans-serif;
			--font-size: ${fontSize};
			--gray-6: #475569;
			--gray-8: #1E293B;
			--accent: #2563EB;
		}

		body {
			background-color: white;
			color: var(--gray-6);
			font-family: var(--font-sans);
			font-size: 1rem;
			font-weight: normal;
			line-height: 1.5;
		}

		svg {
			position: fixed;
			top: -5rem;
			left: -10rem;
			z-index: -2;
			color: var(--accent);
			opacity: 0.1;
		}

		.page {
			display: grid;
			min-height: 100vh;
			place-content: center;
			font-family: var(--font-brand);
			font-size: var(--font-size);
		}

		.page--home {
			font-size: 9.5rem;
		}

		.page div span {
			position: relative;
			color: white;
		}

		.page div span:before {
			position: absolute;
			top: 1rem;
			bottom: 1rem;
			left: -0.75rem;
			right: -0.75rem;
			z-index: -1;
			background-color: var(--accent);
			content: '';
		}

		.blog {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			padding: 4.75rem;
		}

		.blog h1 {
			font-size: 4.5rem;
			font-weight: bold;
			line-height: 1.25;
			color: var(--gray-8);
		}

		.blog .author {
			display: flex;
			align-items: center;
			gap: 1rem;
			font-size: 1.5rem;
		}

		.blog img {
			border-radius: 999px;
			width: 3rem;
			aspect-ratio: 1;
		}

		.url {
			position: fixed;
			right: 2rem;
			bottom: 2rem;
			z-index: -1;
			background-color: var(--accent);
			font-family: var(--font-brand);
			font-size: 1.75rem;
			color: white;
			padding: 0.125rem 0.75rem;
		}
	`;
}

function getPage(text: ParsedRquest['text']) {
	return `
		<main class="page">
			<div>${text}</div>
		<main>
	`;
}

function getHome() {
	return `
		<main class="page page--home">
			<div>Hi! I'm <span>Husen.</span></div>
		<main>
	`;
}

function getBlog(text: ParsedRquest['text']) {
	return `
		<main class="blog">
			<h1>${sanitizeHtml(text)}</h1>

			<div class="author">
				<img
					src="https://gravatar.com/avatar/6fdd18b64c36b4691e4f0fd4fbda82d2?s=100"
				/>

				<span>Written by <strong>Ahmad Husen</strong></span>
			</div>
		</main>
	`;
}

function getLayout(layout: ParsedRquest['layout'], text: ParsedRquest['text']) {
	switch (layout) {
		case 'blog':
			return getBlog(text);

		case 'page':
			return getPage(text);

		default:
			return getHome();
	}
}

export function getHtml(parsedReq: ParsedRquest) {
	const { layout, fontSize, text } = parsedReq;

	return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Generated Image</title>
			<style>
				${getCss(fontSize)}
			</style>
		</head>
		<body>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 141.804 141.769"
			>
				<path
					fill="currentColor"
					d="M.12 134.372c.365-22.504 3.599-41.78 9.103-54.258 2.386-5.41 4.9-9.117 8.637-12.739 12.093-11.72 29.632-18.64 49.557-19.553 1.96-.09 3.618-.217 3.683-.282.161-.161-1.1-4.07-2.226-6.897-2.577-6.473-5.859-11.677-9.65-15.303-2.619-2.504-5.365-3.999-8.995-4.896-5.094-1.26-12.279-.952-19.39.83-4.766 1.196-10.693 3.355-14.643 5.336-3 1.505-4.123 1.84-6.155 1.834C.971 28.42-3.295 17.198 3.5 11.236c2.87-2.519 13.87-6.977 22.607-9.162C32.85.387 36.116-.011 43.12 0c5.308.009 5.894.044 8.46.51 7.509 1.36 13.792 4.155 19.085 8.488 1.796 1.47 5.422 5.23 6.983 7.24 6.457 8.313 11.5 19.715 14.142 31.97l.314 1.457 1.458.314c11.79 2.542 23.017 7.414 31.14 13.515 4.052 3.044 8.44 7.658 10.745 11.297 3.03 4.783 4.911 9.949 5.992 16.444.488 2.94.486 12.026-.005 15.494-1.366 9.649-4.595 19.896-9.019 28.611-1.813 3.574-4.075 5.406-7.546 6.113-2.547.52-5.289-.119-7.5-1.746-2.92-2.15-4.49-5.78-3.999-9.248.208-1.467.544-2.373 1.855-5.004 2.008-4.028 4.172-10.045 5.34-14.846 1.126-4.63 1.422-7.013 1.437-11.58.015-4.597-.144-5.898-1.076-8.84-1.107-3.493-2.525-5.77-5.22-8.379-4.46-4.32-11.1-7.981-19.12-10.544-1.23-.394-2.29-.662-2.356-.596-.066.065-.19 1.682-.278 3.593-.913 19.992-7.826 37.541-19.558 49.647-2.5 2.58-5.198 4.686-8.135 6.35-12.138 6.878-33.323 10.984-58.767 11.39L0 141.77zm25.262-13.583c14.651-1.547 26.933-4.77 32.394-8.498 3.794-2.592 8.764-9.573 11.554-16.232 3.053-7.288 4.607-15.029 4.82-24.005l.107-4.542-4.542.108c-4.591.108-7.573.398-11.386 1.105-10.839 2.01-20.163 6.482-26.68 12.794-1.749 1.695-2.67 3.032-3.931 5.706-3.049 6.466-5.429 16.767-6.738 29.163-.213 2.018-.388 3.922-.388 4.23 0 .693-.108.689 4.79.171z"
				/>
			</svg>

			${getLayout(layout, text)}

			<span class="url">husen.id</span>
		</body>
		</html>
	`;
}
