# Aerospace Plan hosting

The canonical address is https://www.christrovato.com/official_aero_plan. Its source lives in `public/official_aero_plan/` in this repository. The Factory carries the same independent application and links to the canonical address.

The canonical site is an existing Next.js project. Publish this route by copying the **18 production assets** from the explicit `prepare_deploy.py` allowlist into its `public/official_aero_plan/` directory and preserving the rest of that site's source. The complete-journey revision adds four modules and one stylesheet to the original 13 assets. Its `next.config.ts` includes:

```ts
{ source: "/official_aero_plan", destination: "/official_aero_plan/index.html" }
```

Keep the existing site's rewrites and headers. Do not replace the parent website with this static subdirectory. The Factory's own `public/vercel.json` separately handles both directory-entry forms.

Before publishing, run `npm run check`, verify a scenario and backup restore, and inspect narrow and desktop layouts. Test the actual no-slash route: the document resolves assets under its directory, while the app intercepts fragment links so ordinary navigation remains in the same document. Check the host homepage, Math Prep, and Specialization Atlas after updating the parent.

## Initial release receipt — 31 October 2026

Canonical deployment `dpl_FPwTKg8bExT2pya96GN5dd36F3Qq` passed the parent production build and hosted-file checks and was promoted. The live route, search, empty initial planner, and interactive arm control were verified in Chrome. The prior 115 unrelated source files were preserved byte-for-byte. The initial engine/lab suite passed 37 tests; the Factory's nine existing suites also passed. This receipt describes the original release, not the later journey revision.

## Complete-journey revision — published 31 October 2026

The revised source contains 111 course guides, seven subject paths, full mathematics foundations including MATH 104, named GE choices, UCSD college reference cases and 20 technical-elective guides. The shared model keeps course details and the example timeline consistent, retains five required elective slots and avoids repeating accepted articulated preparation. Schema 1 personal backups remain compatible; example selections and optional learning markers remain separate from official course records.

Validation passed **32 module syntax checks, nine Factory suites and 59 Aerospace Plan tests across six files**. The deployment payload now contains 18 Aerospace Plan assets. Canonical deployment `dpl_EsL1yRPA6rrSP875vkW3uWssrxsU` and Factory deployment `dpl_BYiCLGYNw7yMejuvWuhrCE6M1vyd` were built, verified and promoted. All 18 assets on each host matched the tested source by SHA-256, both before publication and on the public routes. Six live entry/existing routes passed, including the unchanged homepage, Math Prep, Specialization Atlas and Factory. The isolated parent build preserved 137 unrelated source files; the two maintained parent source trees were synchronized through a guarded 18-file copy. Browser checks covered all subject paths, worked examples, stage and GE choices, college conditions, saved filter context, old-backup restore and new-note persistence, plus 390px and 768px layouts. The live foundation path, MATH 104 guide and eight future scenarios were verified in Chrome. These are example plans, not an official evaluation of personal transfer credit.

The site starts with no personal academic records. Data remains in the browser's origin-local storage, so the Factory mirror and canonical site have separate notebooks. Use the canonical site consistently and export through **More → Notebook & backup**, or the footer's **Progress & backup**, to move progress. Never include personal backups or chat transcripts in a commit or deployment payload.
