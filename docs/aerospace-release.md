# Aerospace Plan hosting

The canonical address is https://www.christrovato.com/official_aero_plan. Its source lives in `public/official_aero_plan/` in this repository. The Factory carries the same independent application and links to the canonical address.

The canonical site is an existing Next.js project. Publish this route by copying the thirteen production assets from the explicit `prepare_deploy.py` allowlist into its `public/official_aero_plan/` directory and preserving the rest of that site's source. Its `next.config.ts` includes:

```ts
{ source: "/official_aero_plan", destination: "/official_aero_plan/index.html" }
```

Keep the existing site's rewrites and headers. Do not replace the parent website with this static subdirectory. The Factory's own `public/vercel.json` separately handles both directory-entry forms.

Before publishing, run `npm run check`, verify a scenario and backup restore, and inspect narrow and desktop layouts. Test the actual no-slash route: the document resolves assets under its directory, while the app intercepts fragment links so ordinary navigation remains in the same document. Check the host homepage, Math Prep, and Specialization Atlas after updating the parent.

On 31 October 2026, canonical deployment `dpl_FPwTKg8bExT2pya96GN5dd36F3Qq` passed the parent production build and hosted-file checks and was promoted. The live route, search, empty initial planner, and interactive arm control were verified in Chrome. The prior 115 unrelated source files were preserved byte-for-byte. The full new engine/lab suite passed 37 tests; the Factory's nine existing suites also passed.

The site starts with no personal academic records. Data remains in the browser's origin-local storage, so the Factory mirror and canonical site have separate notebooks. Use the canonical site consistently and export from its Notebook tab to move progress. Never include personal backups or chat transcripts in a commit or deployment payload.
