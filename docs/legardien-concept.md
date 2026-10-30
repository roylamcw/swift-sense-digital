# Le Gardien concept route

Public, unofficial prospect demonstration approved by CW for
`https://www.swiftsensedigital.com/legardien-concept` on 30 October 2026.
The existing apex-to-www domain policy is unchanged.

## Isolation and privacy

- Buildless HTML, CSS, JavaScript and original images under `public/legardien-concept/`.
- One exact internal Next.js rewrite serves `index.html` while retaining the clean URL.
- No App Router layout, SSD analytics, Clarity, chatbot, backend, inbox or CRM is loaded.
- Form validation and preview occur only in the open page; closing clears the inputs.
- CSP retains `connect-src 'none'` and `form-action 'none'`. Use sample details only.
- HTML noindex/nofollow plus a route-scoped `X-Robots-Tag`. Not included in the sitemap.
- No hostname, DNS, existing page, production integration or dependency change.

## Source record

Adapted from the CW-requested Le Gardien Sites concept, source commit
`34a5aa24e428afa1e6d3128fb601d653bcf85388`.
Public company information was reviewed on 28 October 2026. The company website
showed maintenance; indexed official pages and its public LinkedIn profile informed
the concept. Verify availability, specifications and commercial terms before any
official launch. Sources are linked in the site's Sources & image credits dialog:

- https://legardien.com/
- https://legardien.com/architectural-and-design-glass/
- https://legardien.com/architectural-glass/
- https://legardien.com/design-glass/
- https://legardien.com/knowledge-centre/
- https://legardien.com/silicone-sealant/
- https://sg.linkedin.com/company/legardiensg
- https://sg.linkedin.com/jobs/view/procurement-logistics-coordinator-at-le-gardien-singapore-4467494505

Three original AI-generated architectural images, created for the concept on
28 October 2026, are visibly labelled illustrations, not completed Le Gardien
projects. No client logos, testimonials, project credits, certifications or
performance claims are invented. Wordmark is a concept typographic treatment,
not an asserted official logo.

## Verification

Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.
The test suite includes route scope, noindex, asset paths, anchor targets and
no-transmission/no-storage safeguards. Browser QA must additionally cover the
material tabs, product dialogs, mobile menu, required/email validation, sample
preview/edit/clear, desktop/mobile layout and existing SSD journeys.
