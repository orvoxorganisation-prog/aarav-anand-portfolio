# Aarav Anand — Portfolio

Personal portfolio of **Aarav Anand** — a Mumbai-based finance & risk management student. Co-Founder, COO & CRO at ORVOX Youth Forum.

Built as a fast, accessible, fully-indexable multi-page static site.

## Pages
- `index.html` — Home (hero, impact stats, featured projects, FAQ)
- `about.html` — About / author profile
- `projects.html` — Seven finance & data case studies
- `experience.html` — Experience & education
- `skills.html` — Skills & certifications
- `contact.html` — Contact + quick answers

## Stack
- Hand-written semantic HTML, CSS and vanilla JS — no build step
- Shared assets in `/assets` (`styles.css`, `main.js`, `sprite.svg`)
- SEO: per-page titles/meta, OpenGraph, Twitter cards, canonical URLs, `robots.txt`, `sitemap.xml`
- AEO: JSON-LD structured data (Person, WebSite, ProfilePage, CollectionPage, Article, FAQPage, BreadcrumbList, ContactPage, EducationalOccupationalCredential)
- PWA: `manifest.webmanifest` + icons
- Accessibility: semantic landmarks, skip link, focus states, reduced-motion support

## Develop locally
Any static server works, e.g.:

```bash
python -m http.server 4599
```

Then open http://localhost:4599

## Deploy
Static — deploys to Vercel, Netlify, Cloudflare Pages or GitHub Pages with no configuration. `vercel.json` adds caching and security headers.
