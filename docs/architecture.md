# Architecture and deployment

## Application

`public/index.html` is the shell. `app.js` handles shared routing, reading, search, and the source library. `flight-deck.js` is the interactive entry page. `horizon.js` presents the world atlas, capability routes, and projects. `experience.js` presents lessons and the workshop. `arcade.js` uses `arcade-models.js` for rover, power, and arm games. `sandbox.js` runs the control experiment. `expeditions.js` provides guided work. `reels.js` loads attributed talks only after a user action.

The site runs at the Vercel origin and behind the `/factory` path on ditchthescroll.com. The local preview server reproduces the path prefix. Routes after the prefix use hashes, such as `/factory/#/arcade/arm`.

`public/official_aero_plan/` is an independent static companion at the canonical `https://www.christrovato.com/official_aero_plan` route. It has its own shell, hash navigation, academic/future/learning data and pure planning engine. The Factory navigation links to that canonical address. Exact Vercel rewrites serve its no-slash and trailing-slash entry points; existing Factory hash routes and IDs remain unchanged.

## Storage

Local learning records use `factory-journey-v2`, `factory-reading`, `factory-projects-v1`, and `factory-practice-v1`. Export/restore merges the four record groups and preserves conflicting notes. Appearance preferences are separate. Arcade runs, control experiments, and expedition drafts are session work with export controls. No cloud synchronization is implied.

The Aerospace Plan keeps a separate browser-local notebook for course records, scenarios, tasks, skills, projects, preferences and notes. Its validated JSON export/restore is independent of the Factory backup format. Hostnames and browser profiles do not share localStorage. The public repository contains research and application code, never an exported personal notebook. See its [maintenance guide](../public/official_aero_plan/README.md) before changing state schemas or academic data.

## Deployment

Deploy only `public/`. `prepare_deploy.py` builds an explicit allowlist and local manifest; generated payloads are ignored by Git. The current live site is deployed on Vercel. This repository import does not change its production deployment, attach a new deployment integration, or modify shared-domain routing.

For a new static Vercel project, select the Other framework preset, use `public` as the root, and leave the build command empty. Existing shared-domain routing requires separate coordination with the domain owner. The application needs no secrets or environment variables.

## Book production

The sanitized public authoring source is in `public-edition/work`. The PDF/HTML builder uses ReportLab and pypdf; install `public-edition/requirements.txt` in an isolated Python environment. Its current typography expects the named Windows fonts or an appropriate `BOOK_FONT_DIR`; do not redistribute proprietary font files. The checked-in PDF and reader are ready to use without rebuilding.

After editing and rebuilding the public book, `python prepare_content.py` reconstructs website book data and verifies its counts and source preservation. Do not substitute the original private manuscript for this public edition.

## Video production

The original silent animation can be rebuilt using `production/video/render_launch_video.py` after installing its requirements. It expects Windows fonts and writes to ignored `production/video/exports`.

The recut script uses the original animation, the actual site screenshots, and external archival media from an existing local source package specified by `FACTORY_ARCHIVE_DIR`. Full third-party source recordings and the purchased music file are not included in Git. The finished published film, source context, subtitles, and receipt are in `media/`.
