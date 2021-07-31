module.exports = {
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: ['*.json', '*.html'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
