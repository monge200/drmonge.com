# drmonge.com

Static landing page for talks (slide PDFs + YouTube links). Hosted on GitHub Pages,
DNS on Porkbun.

## Adding a talk

Edit the `TALKS` array in `app.js`:
- `pdf`: path under `talks/` to a PDF (always export decks to PDF, not `.pptx`)
- `youtubeId`: the id from a YouTube URL (`youtube.com/watch?v=THIS_PART`)

Drop the PDF file itself into `talks/`.

## "View-only" caveat

PDFs are embedded via a self-hosted PDF.js viewer (`vendor/pdfjs/`, Mozilla's
open-source viewer, vendored — not a build dependency) instead of a raw
`<iframe src="file.pdf">`. Reasons:
- The browser-native trick (`#toolbar=0`) only hides Chrome/Firefox's toolbar;
  Safari's iframe PDF plugin ignores it and often renders page one only, with no
  scrolling. PDF.js renders consistently (full scroll/paging) in every browser.
- `web/viewer-custom.css` hides PDF.js's download/print/open-file buttons, which
  a raw iframe embed can't do at all.

This is still **not real DRM**: the PDF is a public URL PDF.js fetches client-side,
so a visitor using dev tools or the network tab can still get the file. There's no
way to serve a PDF a browser can render but a determined visitor truly cannot copy,
on free static hosting or otherwise. If stronger protection is ever needed, options
are a server-rendered per-page-image viewer or a proper DRM service — both add real
infrastructure, not worth it unless this becomes a real problem.

To update PDF.js: download a new `pdfjs-X.Y.Z-dist.zip` from
https://github.com/mozilla/pdf.js/releases, replace `vendor/pdfjs/`, and re-apply
the `viewer-custom.css` `<link>` line in `web/viewer.html` (see git history for the
one-line diff).

## DNS (Porkbun)

Point `drmonge.com` at GitHub Pages:
- 4 `A` records at the apex (`drmonge.com`) →
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- optional `CNAME` for `www` → `monge200.github.io`

Remove whatever record currently points the domain at the CU profile.
