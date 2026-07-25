# drmonge.com

Static landing page for talks (slide PDFs + YouTube links). Hosted on GitHub Pages,
DNS on Porkbun.

## Adding a talk

Edit the `TALKS` array in `app.js`:
- `pdf`: path under `talks/` to a PDF (always export decks to PDF, not `.pptx`)
- `youtubeId`: the id from a YouTube URL (`youtube.com/watch?v=THIS_PART`)

Drop the PDF file itself into `talks/`.

## "View-only" caveat

PDFs are embedded via `<iframe src="...#toolbar=0&navpanes=0">`, which hides the
browser's built-in download/print toolbar in Chrome and Firefox. That deters casual
downloading, but it is **not real DRM**: the file is still a public URL the browser
must fetch to render it, so a visitor who opens dev tools or the network tab can
still get the file. There's no way to serve a PDF a browser can render but a
determined visitor truly cannot copy, on free static hosting or otherwise. If
stronger protection is ever needed, options are a server-rendered per-page-image
viewer or a proper DRM service — both add real infrastructure, not worth it unless
this becomes a real problem.

## DNS (Porkbun)

Point `drmonge.com` at GitHub Pages:
- 4 `A` records at the apex (`drmonge.com`) →
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- optional `CNAME` for `www` → `monge200.github.io`

Remove whatever record currently points the domain at the CU profile.
