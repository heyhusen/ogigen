const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		fontFamily: {
			sans: ['Barlow', 'sans-serif'],
		},
		extend: {},
	},

	plugins: [forms, typography],
};

module.exports = config;
