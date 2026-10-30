# Case study: connecting coursework to physical systems

## Problem

Foundational mathematics and general education can feel disconnected from an ambition to build robots or spacecraft. A long document alone gives readers limited feedback about what an equation actually does.

## Approach

The Factory pairs a public engineering field guide with small manipulable models, practice, project blueprints, and guided experiments. A two-joint arm makes trigonometry visible. A rover exposes route and energy tradeoffs. A control-response experiment connects derivative feedback to damping. Each activity gives learners a concrete observation to explain.

## Implementation decisions

- Browser-native JavaScript modules keep the deployment static and the runtime dependency surface small.
- Hash routes support independently addressable lessons and activities without a server application.
- Shared content records keep lesson, project, and route references consistent.
- Local browser storage and explicit export/merge support ownership of notes without creating accounts.
- Session-only experiments explain their limits and offer export rather than promising background persistence.
- Explicit video loading avoids automatically contacting the video provider on page load.
- An allowlisted deployment boundary separates public assets from private production context.

## Evidence

Nine validation suites cover numerical relationships, energy conservation across 12,288 lunar-power schedules, rover preset solutions, robot-arm inverse geometry, keyboard/event cleanup, content references, and backup conflict preservation. The control sandbox uses a bounded one-dimensional mass model and a fixed-step RK4 integration; its output is educational rather than a hardware qualification.

The October 29 release was checked in the browser at phone and desktop sizes. Live checks included robot-arm target capture, expedition text export, and explicitly loaded YouTube playback. The 39-second launch video was decoded completely and its published link and playback were checked after posting.

## Limits and next questions

The work has no formal user study or demonstrated learning-outcome measurement. It has no backend, multi-device account sync, or real-hardware controller. External media availability depends on its publisher. A productive next iteration would observe a learner completing one expedition, record where they get stuck, and improve the smallest confusing step.

## Collaboration and ownership

The user supplied the motivation, direction, feedback, publishing decisions, and iterative scope. Codex assisted extensively with implementation and production. Future work should include explaining individual models, reproducing checks, and documenting independent changes as understanding develops.
