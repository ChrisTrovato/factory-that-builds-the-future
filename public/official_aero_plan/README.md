# The Aerospace Plan

A static, browser-local aerospace learning and planning companion. Public educational content is separated from private course records, scenarios and notes. Research was checked on **31 October 2026**; a future academic year must be reviewed before relying on the old baseline.

## Run locally

Use a recent Node.js release for tests. No npm packages or build step are required. Serve this folder over HTTP rather than opening `index.html` as a file, because browser ES modules need an HTTP origin.

From this directory, with Python installed:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/`. Keep the terminal running while previewing; stop it with Ctrl+C. The leading and trailing slash behavior is handled by `index.html`. Hash links such as `#courses` are handled in the app.

Run the rule and data tests:

```sh
node --test engine.test.mjs academic-integration.test.mjs state-integration.test.mjs labs.test.mjs journey.test.mjs journey-content.test.mjs
```

These six files contain 59 tests covering planning rules, data integrity, complete subject journeys, course guides, GE alternatives, project connections and effort estimates. They do not replace browser checks for navigation, keyboard use, mobile layout, storage errors, or export/import dialogs.

## File responsibilities

| File | Responsibility |
| --- | --- |
| `index.html` | Page shell, metadata, navigation, dialog and entry script |
| `app.mjs` | Rendering, navigation and browser-local interaction |
| `styles.css` | Layout, typography, responsive behavior and reduced motion |
| `engine.mjs` | Pure requirement, unit, dependency, timeline and backup functions |
| `academic-data.mjs` | Embedded academic evidence ledger and normalized course/mapping adapter |
| `future-data.mjs` | Career themes, future scenarios, sources and project briefs |
| `learning-content.mjs` | Foundation diagnostics, study guides, starting tasks and opportunity leads |
| `labs.mjs` | Educational arm geometry and feedback-response experiments |
| `assets/` | Illustrations and other static media |
| `*.test.mjs` | Independently runnable rule/data tests |

## Academic data and evidence

`academic-data.mjs` exports the embedded `academic` ledger plus normalized `courses`, `mappings`, `sources`, `sourceById`, `degreePlan`, and `scenarios`. Sources preserve institution, direct URL, applicable year, checked date and evidence status.

For a new year:

1. Read the applicable official admissions, department catalog and ASSIST agreement. Confirm the sending college, receiving university, major and year before transcribing mappings.
2. Update the embedded `academic` ledger and only the source records actually rechecked. Do not replace every date with today's date to make the page look current.
3. Keep admission screening, complete degree requirements, general education and actual term availability separate. Preserve conflicts in `unresolved` until an authoritative answer resolves them.
4. For articulation, use `all` for a required course combination and `any` for alternative routes; a rule can satisfy several destination requirements. Never duplicate a course's earned units because it satisfies several requirements.
5. Preserve old course-code aliases. Update the pure normalization aliases in `engine.mjs` when adding codes that must share one course identity. Add a regression test before changing the behavior.
6. Run all tests and review affected course detail, planner, requirement and source views in the browser. Recheck actual hosting paths after deployment.

The 2026–27 Southwestern-to-UCSD aerospace ASSIST relationships were verified live in the build session. Several Southwestern catalog pages were checked through official search-indexed content because their direct pages were bot-gated; that distinction remains in their evidence statuses. The UCSD transfer grid is a department-published historical template, not a promise that a future section will be offered.

## Planning schemas

Courses contain a canonical `code`, `title`, `units`, `unitSystem` (`semester` or `quarter`), sources and prerequisite information. In the engine, prerequisite/corequisite lists use **outer OR, inner AND**:

```js
prerequisites: [['MATH 244'], ['MATH 101', 'MATH 104']]
```

That means MATH 244 **or both** MATH 101 and 104. Corequisites may be taken in the same term or earlier. Explicit college placement/equivalency/consent alternatives are preserved as `approvalRoutes`; they are never silently assumed approved.

UCSD `commonRoutePrereqs` are orientation guides, not complete catalog expressions. The adapter exposes them as `indicativePrerequisites`, leaves exact prerequisite arrays empty, and attaches a warning. Therefore the automated checker does **not** establish exact upper-division enrollment eligibility. Check catalog alternatives, minimum grades, standing, transfer evaluations and consent separately.

A personal course record is:

```js
{
  id: 'unique-record-id',
  code: 'MATH C2210',
  status: 'planned',
  term: '2027-spring',
  grade: null,
  verified: false
}
```

Recognized statuses include considering, planned, enrolled, completed, withdrawn, repeating and unknown. A satisfied requirement needs a completed record, recorded term, acceptable letter grade and `verified: true`. Verification is the user's recorded check against their evidence; this app does not connect to a registrar. A blank grade, Pass/credit notation without a known required letter-grade equivalent, unverified completion or pending petition remains uncertain. An approved petition also needs the qualifying completion record.

Requirement mappings keep their sending-college alternatives intact. A directly completed UCSD target course can also satisfy its own requirement, returned with `routeKind: 'direct'`; it does not invent a Southwestern articulation route. Direct and articulated course units remain in their actual semester/quarter systems.

`earnedUnits` deduplicates actual courses and repeated aliases. It does **not** certify that all counted credits are UC-transferable, nonduplicative under the receiving institution's evaluation, or applicable to the degree. It never combines semester and quarter totals. The 60-unit admission requirement, general education, GPA and admissions decision need separate checks.

Timeline calculations are explicit scenario bounds. They retain at least three university years, expose assumed regular/summer loads and workload capacity, and flag apparent bottlenecks. A feasible arithmetic scenario is not an admission prediction, full course scheduler or guaranteed graduation date.

## Personal state, export and restore

The app stores state in localStorage on the current website origin. It is not cloud synchronization: another device, browser profile or hostname has separate data, and clearing browser storage can erase it. If storage is unavailable, the educational content should remain usable; export current work before leaving.

Use **Progress & backup** to download a JSON backup regularly and before importing or resetting. Treat exported files as private if they contain grades, plans or notes. Do not commit them to the public repository. On restore, inspect the import preview and confirm replacement only after checking the file. Keep the previous backup until the restored record is verified.

Version 1 state has these top-level fields:

```js
{
  schemaVersion: 1,
  exportedAt: 'optional ISO date',
  courseRecords: [],
  scenarios: [],
  tasks: {},
  projects: {},
  skills: {},
  notes: {},
  preferences: {}
}
```

Each named scenario has `id`, `name`, `inputs` and optionally its own `courseRecords` snapshot. The validator rejects incompatible versions, invalid course statuses/terms, duplicate record IDs, invalid scenarios, unknown top-level fields, unsafe prototype keys and excessive data. A failed validation returns no replacement data and must leave the current notebook untouched. A successful validation returns a deep copy; it does not itself overwrite storage. Imported text must always be escaped or assigned with `textContent` before rendering.

Before changing the schema, define a migration and add old-version fixtures. Do not silently reinterpret historical grades, units or approved equivalencies when academic source data changes.

## Release checks

Keep this application under its dedicated route when adding it to an existing site. Verify that unrelated existing routes and their files are preserved. Before release, check the intended nested route directly, refresh a deep link, use a keyboard through the planner/dialog, inspect a narrow screen, and verify save → refresh → export → validated import. Publish no personal test records or backups. Record the actual deployment result separately; this README is not a claim that a release succeeded.
