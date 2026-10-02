# ZINICH Official Website

A modern static marketing website for ZINICH, built with HTML, CSS, and JavaScript.

## Features
- Responsive landing page
- Dark/light theme toggle
- Animated reveal sections
- Contact form with Gmail mailto fallback
- SEO metadata and social sharing tags
- Sitemap and robots configuration
- Favicon and web manifest

## Project structure
- `index.html` — site structure and SEO metadata
- `style.css` — styling and responsive layout
- `main.js` — interaction logic and form behavior
- `google-apps-script.gs` — optional Gmail delivery script for automatic form forwarding
- `robots.txt` — crawler instructions
- `sitemap.xml` — sitemap for search indexing
- `site.webmanifest` — PWA metadata
- `assets/` — images and branding assets

## Local preview
Open `index.html` in a browser, or run a small static server in the project folder, such as:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Contact form setup
The form is configured to send messages to:

- `zainduah55@gmail.com`

For automatic email delivery without opening the mail app, set the Google Apps Script URL in `main.js`:

```js
const CONTACT_WEBHOOK_URL = "https://script.google.com/.../exec";
```

## Deployment
Deploy the static site to any hosting provider such as GitHub Pages, Netlify, or Vercel.

## License
This project is for ZINICH internal use and deployment.
