// Original guided expeditions. All scenarios are educational; routes connect models with evidence, not course credit.
export const expeditions = [
  {
    "id": "robot-arm",
    "title": "Give an arm somewhere useful to go",
    "kicker": "Geometry → motion → a physical test",
    "world": "Earth / Orbit",
    "image": "assets/earth-workbench.png",
    "level": "Foundation to geometry bridge",
    "pace": "Four connected stages; move at your own pace",
    "hook": "A triangle becomes a position. A position becomes an assembly task.",
    "why": "Start with a familiar sketch, then let a real geometric constraint interrupt your intuition. The point is not to finish a game quickly. It is to explain why a target can be reached, what the joint angles mean, and which assumption stops matching a paper mechanism.",
    "outcome": "A predicted pose, a recorded target attempt, and a measured paper workspace.",
    "needs": [
      "A browser and a place to keep a field record",
      "Paper, a ruler, and optional thin card for the build"
    ],
    "prediction": {
      "question": "If you keep both link lengths fixed, does changing one joint always move the tip closer to a target?",
      "hint": "Sketch the target, shoulder, elbow, and tip. Predict a direction of motion before choosing an angle; distance from the shoulder and distance from the target are different quantities."
    },
    "lesson": {
      "missionIds": [
        "trigonometry",
        "vectors",
        "cad"
      ],
      "task": "Read the arm-position example and identify which angle is measured from a fixed axis and which is relative to another link. Draw two coordinate arrows and explain one component in words.",
      "evidence": "A labeled sketch with units and an explicit angle convention."
    },
    "experiment": {
      "href": "#/arcade/arm",
      "label": "Arm targeting arcade",
      "task": "Choose one preset and record its link lengths. Make a target attempt using the shoulder and relative-elbow controls. Before each of three adjustments, predict how the tip will move. Record the displayed coordinates and target error, then capture only when the tolerance is met.",
      "record": [
        "Preset and link lengths",
        "Three predicted/observed tip motions",
        "Joint angles and target error at a successful capture"
      ],
      "guardrail": "The target game models planar geometry. A captured target does not certify payload capacity, collision avoidance, motor control, or an actual robot."
    },
    "build": {
      "projectId": "paper-linkage",
      "task": "Build the paper arm and test the same geometric ideas at a convenient scale. Include one target outside its reachable region and one configuration affected by joint looseness.",
      "stretch": "Use the tolerance-stack blueprint to design a removable target fixture; explain why an accurate calculated tip can still miss a physical interface."
    },
    "reflection": {
      "prompts": [
        "Which prediction was wrong, and what geometric assumption caused it?",
        "What did the physical model reveal that the angle controls hide?",
        "Which measurement would make your next comparison stronger?"
      ],
      "takeaway": "A useful geometry model lets you predict a result and identify its boundaries. That is already design work."
    },
    "debrief": [
      "The elbow angle is relative to the first link; adding it to the shoulder angle gives the second link's world orientation.",
      "Two poses can sometimes reach the same point. A target alone does not uniquely specify the mechanism's configuration.",
      "A measured discrepancy can come from dimensions, angle readings, looseness, or the model. Name the possibilities before blaming one."
    ],
    "rubric": [
      {
        "criterion": "Make the prediction inspectable",
        "evidence": "A reviewer can see your axes, angles, units, and expected direction before the move."
      },
      {
        "criterion": "Use observed evidence",
        "evidence": "Three recorded adjustments connect a prediction to displayed coordinates and error."
      },
      {
        "criterion": "Connect model and mechanism",
        "evidence": "Your paper result identifies a real discrepancy or limit and proposes a useful next check."
      }
    ],
    "extension": {
      "href": "#/project/tolerance-stack",
      "label": "Design the fit around the target",
      "reason": "Move from a mathematical point to an interface with finite size and variation."
    }
  },
  {
    "id": "lunar-energy",
    "title": "Keep the workshop alive through the dark",
    "kicker": "Power → energy → priorities",
    "world": "Moon",
    "image": "assets/lunar-workshop.png",
    "level": "Foundation to systems bridge",
    "pace": "Four connected stages; no fixed completion time",
    "hook": "The best energy strategy is a promise you can still keep after the supply changes.",
    "why": "A power reading says how fast energy is moving. A storage budget says what remains possible. This expedition turns unit conversions into choices about essential work, optional science, reserve, and unmet demand, using a compressed teaching mission rather than a prediction of a lunar installation.",
    "outcome": "A before-run energy prediction, a checked conservation ledger, and a recovery budget.",
    "needs": [
      "A browser and calculator",
      "Paper or an existing spreadsheet; no batteries or electrical hardware"
    ],
    "prediction": {
      "question": "Will requesting every available science hour always produce the most useful completed mission?",
      "hint": "Separate the 60 W essential load from the optional 100 W science request. Look at the forecast and storage capacity before deciding when to spend energy."
    },
    "lesson": {
      "missionIds": [
        "units",
        "integral",
        "circuits",
        "systems"
      ],
      "task": "Explain why 60 W sustained for one hour consumes 60 Wh. Sketch a storage boundary with energy entering, useful demands leaving, and surplus that cannot be stored.",
      "evidence": "One unit-correct interval calculation and an annotated energy boundary."
    },
    "experiment": {
      "href": "#/arcade/power",
      "label": "Lunar power arcade",
      "task": "Choose a preset and read its 12-step forecast. Each step is one teaching hour, not a real lunar day. Predict a feasible science schedule, advance deliberately, and record stored energy, completed science hours, unmet essential energy, and curtailed energy. Compare with an essentials-only run from the same initial state.",
      "record": [
        "Preset, initial storage, and your science requests",
        "Forecast intervals that changed your decision",
        "Final science hours and all energy-ledger outputs"
      ],
      "guardrail": "Finite capacity, simplified supply, and the game's priority rule shape the result. Record those rules; do not treat a successful run as a battery-sizing recommendation."
    },
    "build": {
      "projectId": "lunar-energy",
      "task": "Build the four-interval spreadsheet budget and reproduce its nominal 20 Wh ending reserve. Then remove one supply interval and document the shortfall and one defensible recovery.",
      "stretch": "Add a column for an explicitly assumed loss or reserve rule. Keep the accounting boundary clear so you do not subtract the same loss twice."
    },
    "reflection": {
      "prompts": [
        "Which interval mattered more than the average supply suggested?",
        "What useful work did your safer strategy defer?",
        "What real environmental or hardware constraint would you need before making a design claim?"
      ],
      "takeaway": "A good budget exposes a tradeoff early enough to choose what happens next."
    },
    "debrief": [
      "Essential-load priority prevents optional requests from being equivalent to actual delivered science energy. Report achieved outcomes, not just requests.",
      "Curtailed energy is supplied energy that the system could not use or store; it is part of the ledger, not a disappearance.",
      "A reserve violation and total energy exhaustion are different events. Declare which one makes your plan unacceptable."
    ],
    "rubric": [
      {
        "criterion": "Keep units and boundaries clear",
        "evidence": "Your record distinguishes W, Wh, stored energy, and demand."
      },
      {
        "criterion": "Compare like with like",
        "evidence": "Both game strategies use the same preset and initial state."
      },
      {
        "criterion": "Explain the consequence",
        "evidence": "The recovery names deferred work, remaining reserve, and one omitted physical constraint."
      }
    ],
    "extension": {
      "href": "#/mission/heat",
      "label": "Follow the waste heat next",
      "reason": "Power that runs a machine also creates a thermal problem; energy accounting has another boundary."
    }
  },
  {
    "id": "rover-route",
    "title": "Bring the samples home, not just the rover",
    "kicker": "Coordinates → route → mission evidence",
    "world": "Mars / Ocean",
    "image": "assets/mars-outpost.png",
    "level": "Foundation to modeling bridge",
    "pace": "Four connected stages; explore and retry freely",
    "hook": "The shortest-looking route can be the wrong mission.",
    "why": "A route is a sequence of decisions under constraints. The grid makes those constraints visible: required samples, rough ground, a finite battery, and an uplink destination. Then a separate kinematic model shows what the grid leaves out about a moving machine.",
    "outcome": "Two route plans, an energy comparison, and a checked virtual-rover trajectory.",
    "needs": [
      "A browser and paper grid or notebook",
      "Calculator or spreadsheet for the optional kinematic extension"
    ],
    "prediction": {
      "question": "Can a longer route use less energy while still collecting every required sample and reaching the uplink?",
      "hint": "Ordinary moves cost 1 Wh and rough-ground moves cost 2 Wh in this teaching grid. Count the terrain of the route, not just its drawn length."
    },
    "lesson": {
      "missionIds": [
        "vectors",
        "frames",
        "algebra"
      ],
      "task": "Draw coordinate axes on a small grid and describe one destination relative to both the start and a shifted origin. Keep position, direction, and accumulated travel distinct.",
      "evidence": "One coordinate sketch and a route with an explicit start, goal, and sample requirements."
    },
    "experiment": {
      "href": "#/arcade/rover",
      "label": "Rover mission arcade",
      "task": "Choose one preset on the 8 × 7 grid. Queue a route that visits its required samples and ends at the uplink. Inspect the route preview and remaining energy before running. Compare a direct-looking route with a route that avoids rough cells, using Step, Undo, and Reset to examine the same starting conditions.",
      "record": [
        "Preset, sample requirements, and route sequence",
        "Ordinary and rough moves with predicted energy cost",
        "Observed battery result and whether the full mission was completed"
      ],
      "guardrail": "A successful grid route does not model wheel slip, slope, turning radius, localization error, or communications performance. The cells are a planning abstraction."
    },
    "build": {
      "projectId": "virtual-rover",
      "task": "Create the differential-drive model. Verify equal-wheel straight motion, opposite-wheel spin, and the specified quarter-circle case. Explain why a grid corner is not automatically a realizable wheel-speed command.",
      "stretch": "Add a hypothetical wheel-speed mismatch and show how the path changes while keeping it separate from the arcade's discrete energy rules."
    },
    "reflection": {
      "prompts": [
        "Which route looked efficient before you counted its terrain?",
        "What would stop a real rover from following an exact grid line?",
        "Which part of your evidence shows mission completion rather than motion alone?"
      ],
      "takeaway": "Planning becomes engineering when the path, resources, and definition of success agree."
    },
    "debrief": [
      "An uplink arrival without the required samples does not complete the stated task.",
      "Coordinates locate a point; a route orders actions. The same set of visited cells can have different consequences in a different order.",
      "The grid and differential-drive model answer different questions. Their assumptions should remain visible when you connect them."
    ],
    "rubric": [
      {
        "criterion": "Define the whole mission",
        "evidence": "The plan includes all sample requirements, the destination, and finite energy."
      },
      {
        "criterion": "Predict before executing",
        "evidence": "A terrain-based energy estimate is recorded before the run."
      },
      {
        "criterion": "Expose the abstraction",
        "evidence": "The kinematic checks pass and your review names a physical effect absent from the grid."
      }
    ],
    "extension": {
      "href": "#/project/sampling-study",
      "label": "Question the motion measurements",
      "reason": "A rover also needs observations it can trust; sampled data can hide the behavior you hope to detect."
    }
  },
  {
    "id": "resilient-factory",
    "title": "Improve the factory that actually exists in your model",
    "kicker": "Rates → bottlenecks → useful output",
    "world": "Earth",
    "image": "assets/earth-workbench.png",
    "level": "Foundation to production reasoning",
    "pace": "Four connected stages; compare one change at a time",
    "hook": "A faster machine is only useful if its extra work can become accepted output.",
    "why": "This expedition joins ratios, timing, and evidence. Start by finding what limits a simple line. Then add an inspection decision and ask who absorbs the consequences of rework and false alarms. Productivity becomes a question about the whole process, not the most impressive component.",
    "outcome": "A bottleneck prediction, a two-change comparison, and an inspection-aware recommendation.",
    "needs": [
      "A browser and calculator",
      "Paper or an existing spreadsheet for the event table and inspection records"
    ],
    "prediction": {
      "question": "If you halve the faster station's service time, will completed output double?",
      "hint": "Write each station's capacity in items per hour. Identify the smallest capacity before moving a control; startup and steady-state capacity are separate ideas."
    },
    "lesson": {
      "missionIds": [
        "ratios",
        "slope",
        "quality",
        "economics"
      ],
      "task": "Convert one service time into a rate, then explain the difference between an attempt, a first-pass accepted item, and a repaired item. Use words before percentages.",
      "evidence": "A small process sketch with rate units and a precise definition of accepted output."
    },
    "experiment": {
      "href": "#/lab",
      "label": "Factory and space Lab",
      "task": "Open the production-flow model. Record its baseline station times and capacities. Improve the faster station alone, then reset and improve the bottleneck alone. Predict each result before applying it. Compare the whole-line capacity and identify whether the limiting station changes.",
      "record": [
        "Baseline parameters and limiting station",
        "Two isolated changes and predictions",
        "Observed whole-line output and any changed bottleneck"
      ],
      "guardrail": "This simplified capacity model does not automatically include startup, random downtime, transport, inventory limits, or inspection errors. Avoid adding them to the interpretation without adding them to the model."
    },
    "build": {
      "projectId": "factory-flow",
      "task": "Build the event table and reproduce the first three inspection finish times: 47, 67, and 87 minutes. Then use the quality-gate blueprint to distinguish missed defects from unnecessary review.",
      "stretch": "Add a clearly labeled review branch to the event table. Keep first-pass output, rework, and eventual accepted output separate."
    },
    "reflection": {
      "prompts": [
        "Which attractive local improvement changed little at the system level?",
        "Who handles the extra work when an inspection rule flags good parts?",
        "What measurement would you request before spending money on the proposed improvement?"
      ],
      "takeaway": "The useful comparison is a changed system outcome under a stated boundary, not a faster isolated action."
    },
    "debrief": [
      "Capacity is a rate under assumptions. It is not automatically the number completed during the first hour.",
      "An inspection percentage needs a denominator and a consequence. High recall can coexist with a large review workload.",
      "A bottleneck can move after an improvement. That is a reason to update the model, not a failure of the idea."
    ],
    "rubric": [
      {
        "criterion": "Locate the constraint",
        "evidence": "Rates and units support the baseline bottleneck choice."
      },
      {
        "criterion": "Check the model independently",
        "evidence": "The event-table checkpoints are reproduced without relying on the displayed capacity alone."
      },
      {
        "criterion": "Recommend a useful change",
        "evidence": "The recommendation includes accepted output, review burden, and a missing real-world measurement."
      }
    ],
    "extension": {
      "href": "#/project/quality-gate",
      "label": "Build the inspection comparison",
      "reason": "Give the word quality a measurable meaning before incorporating it into a production claim."
    }
  },
  {
    "id": "orbital-service",
    "title": "Service a spacecraft without inventing a fixed floor",
    "kicker": "Momentum → interfaces → recovery",
    "world": "Orbit",
    "image": "assets/shipyard-hero.png",
    "level": "Algebra to systems bridge",
    "pace": "Four connected stages; keep the model small enough to check",
    "hook": "The robot's base belongs in the calculation.",
    "why": "An orbital servicing concept combines motion, restraint, interfaces, and diagnosis. This expedition starts with a conservation law you can verify, then brings the result into a cardboard maintenance sequence. The connection is conceptual: the paper model is not space-qualified hardware.",
    "outcome": "An independently checked recoil result and a service plan with observable completion conditions.",
    "needs": [
      "The existing orbital-momentum Lab",
      "Paper or cardboard for a lightweight service module; calculator"
    ],
    "prediction": {
      "question": "What happens to the base's velocity when the same payload moves relative to a lighter base?",
      "hint": "Start with zero total momentum. The payload's speed relative to the base differs from its speed in the local inertial frame."
    },
    "lesson": {
      "missionIds": [
        "algebra",
        "vectors",
        "dynamics",
        "systems"
      ],
      "task": "Draw the base and retained payload as a two-body system. Label their masses and frame conventions, then rearrange the zero-momentum equation to solve for base velocity.",
      "evidence": "A two-body diagram and one equation with units and a stated reference frame."
    },
    "experiment": {
      "href": "#/lab",
      "label": "Orbital momentum Lab",
      "task": "Open Orbit momentum. Set base mass to 1000 kg, payload mass to 100 kg, and relative speed to 0.10 m/s. Predict −0.00909 m/s for the base and 0.09091 m/s for the payload, rounded. Check the displayed momentum balance. Halve only base mass, predict the direction of change, and compare.",
      "record": [
        "Masses, relative velocity, and inertial velocities",
        "Independent mass-times-velocity sum",
        "One controlled mass change and its interpretation"
      ],
      "guardrail": "The Lab isolates translation with fixed masses and no external impulse. It omits rotation, arm mass, flexibility, capture impact, and active attitude control."
    },
    "build": {
      "projectId": "service-module",
      "task": "Build the removable cardboard module. Add an observable capture or seating check before calling the replacement complete. Write which part must be restrained before another part can move.",
      "stretch": "Use the fault-tree blueprint to distinguish a failed motion command from an obstruction or an unreliable observation; define a stop condition."
    },
    "reflection": {
      "prompts": [
        "Which quantity did you initially imagine was measured relative to a fixed floor?",
        "How could a correct motion prediction still leave a service task incomplete?",
        "What observation would justify attempting the next step after a failed capture?"
      ],
      "takeaway": "A credible service sequence combines a physical model with observable states and a recoverable next action."
    },
    "debrief": [
      "The base recoils because the retained system conserves momentum under the stated assumptions; the payload does not push against an invisible floor.",
      "Velocity, displacement, and settling time are different claims. This Lab supplies the first, not a complete maneuver timeline.",
      "A restoration check matters as much as removal. A module that looks installed may not be seated or functioning."
    ],
    "rubric": [
      {
        "criterion": "Use the right frame",
        "evidence": "Relative and inertial velocities are separately labeled."
      },
      {
        "criterion": "Close the conservation check",
        "evidence": "The independent momentum sum is approximately zero within rounding."
      },
      {
        "criterion": "Make the service state observable",
        "evidence": "The model instruction includes restraint, a completion check, and a stopping rule."
      }
    ],
    "extension": {
      "href": "#/project/fault-tree",
      "label": "Design the diagnostic next step",
      "reason": "A failed attempt should narrow the possibilities rather than merely trigger another attempt."
    }
  },
  {
    "id": "scientific-story",
    "title": "Tell a story the evidence can support",
    "kicker": "Prediction → observation → explanation",
    "world": "Earth / every world",
    "image": "assets/earth-workbench.png",
    "level": "Any starting point",
    "pace": "Four connected stages; clarity matters more than speed",
    "hook": "A useful explanation makes someone else better at making the next decision.",
    "why": "Writing and general education are part of engineering because evidence must cross a conversation. Build one short explanation around a real model comparison. Your audience should be able to distinguish what happened, what you inferred, and what remains unknown without needing to trust your confidence.",
    "outcome": "A compact review packet with a traceable claim, a readable visual, and a revision.",
    "needs": [
      "One existing model and a notebook",
      "An existing document editor or paper; no special publishing tools"
    ],
    "prediction": {
      "question": "Can you explain the model result without describing every control on the page?",
      "hint": "Choose a reader and a decision. Predict one change, then decide which observation would support or weaken that prediction."
    },
    "lesson": {
      "missionIds": [
        "writing",
        "research",
        "communication",
        "ethics"
      ],
      "task": "Write a testable claim with a boundary: 'Under these assumptions, changing X should change Y in this direction.' Separate an observation from an explanation and identify the evidence each sentence would need.",
      "evidence": "A one-sentence claim, named audience, and a deliberately limited scope."
    },
    "experiment": {
      "href": "#/studio",
      "label": "Math Studio",
      "task": "Choose one of the four models. Record a baseline, change exactly one input, and capture the resulting numerical comparison. Predict before moving the control. Repeat once with a different value to see whether your explanation still holds; retain any surprising result.",
      "record": [
        "Model name, assumptions, and baseline inputs",
        "Two controlled comparisons with predictions",
        "A result that challenged or refined the wording of your claim"
      ],
      "guardrail": "A demonstration of a formula is not evidence of a complete engineered machine. Label any conceptual illustration separately from measured or calculated results."
    },
    "build": {
      "projectId": "design-review",
      "task": "Create the compact design-review packet using your model comparison. Include a readable plot or table, units, assumptions, the calculation route, and a next decision. Ask a willing reader to explain your conclusion back, or self-review after a break.",
      "stretch": "Add a quality-gate or sampling-study result to show how a confident-looking statistic or plot can support more than one interpretation."
    },
    "reflection": {
      "prompts": [
        "Which sentence became narrower after you inspected the evidence?",
        "What did a reader need that your first explanation omitted?",
        "What observation would make you change your conclusion?"
      ],
      "takeaway": "Clear communication is not decoration around the technical work. It is how the work becomes inspectable and useful."
    },
    "debrief": [
      "A good headline can invite attention; the evidence must carry the actual claim.",
      "A counterexample or unresolved discrepancy belongs in the record. Hiding it makes the explanation less useful.",
      "The next experiment should be capable of changing the conclusion. Otherwise it may only repeat what the model already assumes."
    ],
    "rubric": [
      {
        "criterion": "Make one bounded claim",
        "evidence": "The reader can identify the audience, decision, and assumptions in a few sentences."
      },
      {
        "criterion": "Trace the evidence",
        "evidence": "The chart or table leads back to recorded inputs and a reproducible calculation."
      },
      {
        "criterion": "Improve through review",
        "evidence": "A short change log shows one substantive revision and a next test that could challenge the conclusion."
      }
    ],
    "extension": {
      "href": "#/project/quality-gate",
      "label": "Explain a tradeoff with consequences",
      "reason": "Practice telling the difference between a compelling percentage and a decision supported by the right denominator."
    }
  }
];
