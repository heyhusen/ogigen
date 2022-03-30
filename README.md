# Ogigen - Open Graph Image Generator

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/hapakaien/ogigen/CI?label=CI&style=flat-square)](https://github.com/hapakaien/ogigen/actions/workflows/main.yml) [![GitHub deployments](https://img.shields.io/github/deployments/hapakaien/ogigen/production?label=vercel&logo=vercel&style=flat-square)](https://ogigen.husen.id/)

Serverless service that generates dynamic Open Graph images that you can embed in your `<meta>` tags.

For each keystroke, headless chromium is used to render an HTML page and take a screenshot of the result which gets cached.

> This project started as a forked repo of the [Vercel's OG image generator](https://github.com/vercel/og-image), which uses dotdom as its template engine. But, due to personal preference, I replaced it with Svelte.

## What is an Open Graph image?

Have you ever posted a hyperlink to Twitter, Facebook, or Slack and seen an image popup?
How did your social network know how to "unfurl" the URL and get an image?
The answer is in your `<head>`.

The [Open Graph protocol](http://ogp.me) says you can put a `<meta>` tag in the `<head>` of a web page to define this image.

It looks like the following:

```html
<head>
    <title>Title</title>
    <meta property="og:image" content="https://ogigen.husen.id/api?layout=home" />
</head>
```

## Notes

Even though this service can actually be used on the fly, but I only use this during build of my site for efficiency reasons.
