# Development work log

This log records real work and evidence. Dates below describe milestones, not invented Git commits. The project was first imported into GitHub on **2026-10-30**; the earlier work was completed locally with Codex assistance.

## 2026-10-29 — Public learning world and interactive edition

- Developed and published the public engineering field guide and static learning website.
- Expanded to 34 lessons, 36 practice questions, 16 project blueprints, six expeditions, 12 models/games, five environments, and seven attributed talks.
- Added rover planning, lunar-energy scheduling, robot-arm targeting, and the control-response sandbox.
- Kept personal context out of the public edition and deployed from a file allowlist.
- Validated the models and content with nine suites, then checked key interactions on the live site.
- Produced a 39-second launch film with the requested archival opening, continuing music, original model animations, and real site captures.
- Published the launch film on X at 10:22 PM America/Los_Angeles and verified its video and website link.

Evidence: [live site](https://ditchthescroll.com/factory), [test runner](../check_all.mjs), [published film](https://x.com/VeryBullishGuy/status/2116037892246216830), [media notes](../media/Factory_Thiel_Film_Notes.txt).

## 2026-10-30 — Repository and portfolio handoff

- Collected the complete deployable public edition, public book authoring source, checks, assets, and launch deliverables in one repository.
- Added a reviewer-oriented README, architecture notes, case study, attribution notes, and privacy boundary.
- Added a simple daily-log command and work template so future changes can include explanation and evidence.
- Reran the nine validation suites against the packaged source and checked the staged files before publication.

Evidence: [README](../README.md), [case study](case-study.md), [validation](validation.md), [daily log helper](../scripts/log-work.mjs).

## 2026-10-31 — Aerospace Plan integration

- Added the independent Aerospace Plan under `public/official_aero_plan/`, with the canonical publication address [christrovato.com/official_aero_plan](https://www.christrovato.com/official_aero_plan).
- Integrated the researched Southwestern-to-UCSD pathway, course explorer and scenario planner, study guidance, project ladder, specialization/career exploration, and 2035+ engineering scenarios. The evidence ledger distinguishes current policy, historical templates, assumptions and unresolved advising questions.
- Added restrained navigation and footer links from the Factory. Preserved existing lesson/project IDs, hash routes, Factory state keys and interactions.
- Kept course records, notes and scenarios in a separate browser-local notebook with validated JSON backup. Public files contain educational content and code, not private transcripts, chat histories or exported personal state.
- Extended the explicit deployment allowlist and added exact Vercel entry rewrites for both `/official_aero_plan` and `/official_aero_plan/`. Extended the default check runner to cover `.mjs` source and the four Aerospace Plan test files.
- Validation: `npm run check` passed 28 module syntax checks, all nine existing Factory suites and all four Aerospace Plan files (37 tests). A separate `node --test` run also passed all 37. All 61 allowlisted assets exist, including 13 new production files; the copied production source matched the frozen source by hash. Local HTTP checks returned 200 for the Factory shell, both Aerospace Plan entry forms, its module and hero asset.
- Browser review verified the 390px and 768px layouts, local backup restore, no-slash navigation, keyboard skip link, and the Factory's new link. The canonical route was published and its live search, initially empty planner and interactive arm control were checked. See [release notes](aerospace-release.md) for hosting details.

Evidence: [Aerospace source and maintenance guide](../public/official_aero_plan/README.md), [academic data](../public/official_aero_plan/academic-data.mjs), [test runner](../check_all.mjs), [deployment allowlist](../prepare_deploy.py).
