// Original project blueprints. Times are flexible exploration estimates, not schedules.
// All numerical scenarios are illustrative; ordinary household measurements are not calibration certificates.
export const projects = [
  {
    "id": "paper-linkage",
    "title": "Give a paper arm a measurable workspace",
    "tag": "Mechanisms",
    "level": "Beginner → geometry",
    "time": "1–3 hours, self-paced",
    "cost": "Paper and household supplies",
    "hook": "A robot arm becomes understandable when you can put a pencil where its gripper would be.",
    "question": "Which points can a two-link arm reach, and how closely does a paper model match its geometric prediction?",
    "why": "Choosing link lengths around a task is a real design problem. Connect drawing, physical motion, and prediction without buying a motor. The useful result is a defensible workspace map, including places the mechanism cannot reach.",
    "materials": [
      "Two stiff paper or thin-card strips",
      "Ruler, pencil, paper, and removable tape",
      "Two loose paper-fastener pivots, or folded tape hinges",
      "Optional protractor and existing calculator"
    ],
    "steps": [
      {
        "title": "Define the mechanism",
        "detail": "Mark pivot centers 100 mm apart on one stiff strip and 80 mm apart on another. Join them loosely, secure the shoulder to a backing sheet, and mark the tip. Record actual pivot spacing; overall strip length is not link length."
      },
      {
        "title": "Predict the boundary",
        "detail": "Sketch circles of radius 180 mm and 20 mm around the shoulder. An ideal planar two-link arm with unrestricted joints reaches the annulus between them. Explain the outer sum and inner difference using fully extended and folded configurations before trying trigonometry."
      },
      {
        "title": "Collect configurations",
        "detail": "Choose eight target dots, including one inside the inner boundary and one beyond the outer boundary. Try reaching each without stretching or moving the shoulder. Photograph successful configurations and record failures, joint interference, and paper bending. A failed reach is useful evidence."
      },
      {
        "title": "Compare coordinates",
        "detail": "For three configurations, measure angles and predict x = 100 cos θ1 + 80 cos(θ1 + θ2), y = 100 sin θ1 + 80 sin(θ1 + θ2), in millimeters. Here θ2 is relative to the first link. Compare with ruler measurements; check your calculator's degree mode."
      },
      {
        "title": "Change one design choice",
        "detail": "Repeat selected targets with a shorter second link or a deliberately restricted elbow. Keep the same target sheet. Explain which capability you gained or lost and whether looseness, measurement, or the ideal model best explains the largest discrepancy."
      }
    ],
    "evidence": [
      "One annotated mechanism photograph and dimensioned sketch",
      "Target table with predicted reach, observed reach, and errors",
      "Before/after workspace map and a short design decision"
    ],
    "success": "A reader can reconstruct your geometry, identify the angle convention, and see a measured limitation. A perfect-looking circle is unnecessary.",
    "reflection": [
      "Which discrepancy would better measurement reduce, and which comes from the mechanism itself?",
      "Would a longer arm always be a better arm for this task?"
    ],
    "next": "Use the arm-reach Math Studio model to compare your chosen lengths, then add a cardboard service fixture.",
    "chapter": "24",
    "missionIds": [
      "units",
      "trigonometry",
      "vectors",
      "uncertainty"
    ],
    "safety": "Keep this hand-operated and unloaded. Use blunt craft scissors carefully; do not add motors, sharp grippers, stretched bands, or suspended loads."
  },
  {
    "id": "measurement",
    "title": "Find out whether a fixture actually helps",
    "tag": "Measurement",
    "level": "Beginner → experimental reasoning",
    "time": "1–2 hours, self-paced",
    "cost": "Paper and household supplies",
    "hook": "A machine can hit almost the same wrong spot every time.",
    "question": "Does a simple placement guide reduce variation, and does it also reduce error from the intended location?",
    "why": "Repeatability and accuracy answer different questions. Create visible data rather than relying on whether a fixture feels better. Practice defining trials, retaining inconvenient measurements, and making a limited claim another person can check.",
    "materials": [
      "A small cardboard rectangle or smooth household block",
      "Paper target sheet, ruler, pencil, and tape",
      "Two straight cardboard strips for an L-shaped guide",
      "Optional spreadsheet already available on your computer"
    ],
    "steps": [
      {
        "title": "Define the measurement",
        "detail": "Draw a target cross and coordinate axes. Choose one corner of the rectangle as the measurement point. Record its horizontal and vertical displacement from the cross in millimeters. Keep orientation consistent; note the ruler's smallest marked division."
      },
      {
        "title": "Run an unassisted baseline",
        "detail": "Lift the rectangle clear and place it again from the same comfortable starting area for 12 trials. Mark or measure the chosen corner each time. Keep every result; do not restart a trial because it looks poor. Record any accidental bump as an observation."
      },
      {
        "title": "Add a low-energy fixture",
        "detail": "Tape down two guide strips at right angles. Seat the rectangle gently against both before each measurement. Repeat 12 trials with the same target and measurement method. Keep finger pressure light and similar; bending cardboard can create a misleading improvement."
      },
      {
        "title": "Separate bias from spread",
        "detail": "For each condition, calculate mean x and mean y. Their distance from zero describes the observed mean offset. Also report each axis's maximum-minus-minimum range. A tight cluster far from the cross is repeatable but biased. Plot all points at the same scale."
      },
      {
        "title": "Challenge the conclusion",
        "detail": "Remove and reinstall the guide, then take six more placements. Treat these as a separate check rather than mixing them into the original batch. If reinstallation shifts the cluster, explain the missing location feature. If your ruler cannot resolve a difference, say so."
      }
    ],
    "evidence": [
      "Photograph of the measurement setup and the exact trial definition",
      "Complete table of 30 placements, including notes and units",
      "One equal-scale scatter plot and a concise supported conclusion"
    ],
    "success": "Your report distinguishes mean offset from observed spread and explains whether the fixture helped within this small experiment. It never claims calibrated accuracy from an ordinary ruler.",
    "reflection": [
      "Did the fixture improve repeatability while preserving an offset?",
      "Which variable would you control next before applying the result elsewhere?"
    ],
    "next": "Add a location feature to the service-module project and assess it with the same method.",
    "chapter": "24",
    "missionIds": [
      "units",
      "ratios",
      "uncertainty",
      "writing"
    ],
    "safety": "Use light objects on a stable table. No powered mechanisms or sharp measuring probes are needed."
  },
  {
    "id": "service-module",
    "title": "Build a module that wants to be repaired",
    "tag": "Repair and assembly",
    "level": "Beginner → design iteration",
    "time": "2–4 hours, self-paced",
    "cost": "Reused cardboard and household supplies",
    "hook": "The interesting question is not whether a box opens. It is whether someone can replace the right thing and restore its function.",
    "question": "Can you make a removable module that is easy to identify, remove, reinstall, and check without damaging its surroundings?",
    "why": "Serviceability is a physical property you can prototype before electronics exist. Turn maintenance into a testable requirement. Cardboard can expose access problems, ambiguous orientation, fragile joints, and missing verification steps early.",
    "materials": [
      "Clean packaging cardboard, paper, and tape",
      "Ruler, pencil, and blunt craft scissors",
      "A lightweight paper cartridge to represent a replaceable component",
      "Optional household timer or phone stopwatch"
    ],
    "steps": [
      {
        "title": "Define the service task",
        "detail": "Make a small enclosure and a removable paper cartridge. Give the cartridge a visible marker that must align with a window after installation. Define successful restoration before building: the marker is visible, the module stays seated during gentle handling, and the enclosure remains usable."
      },
      {
        "title": "Build a first version",
        "detail": "Use folded tabs or removable tape, not permanent glue at the service joint. Include a handle and access opening. Photograph the assembly layers. Draw the removal path and identify which neighboring parts must move first."
      },
      {
        "title": "Write a testable instruction",
        "detail": "Create a six-step-or-shorter replacement instruction with a beginning condition and final check. Try following it literally after putting the model away briefly, or invite a willing person to try. Record hesitation, extra tools, incorrect orientation, and damaged tabs without coaching away the evidence."
      },
      {
        "title": "Measure the sequence",
        "detail": "Run five removal-and-reinstallation cycles. Record completion time if useful, but also count handling actions, first-attempt correct installations, and damage. A fast attempt that leaves the marker misaligned is not successful. Keep the same start and finish definitions across trials."
      },
      {
        "title": "Revise one interface",
        "detail": "Add a keyed corner, clearer label, stronger handle, or self-locating guide based on the largest observed problem. Repeat five cycles. Compare the versions and explain any tradeoff: a stronger latch may require more effort, while a wider opening may weaken the enclosure."
      }
    ],
    "evidence": [
      "Exploded sketch identifying the service boundary and removal direction",
      "Two versions photographed with the same view",
      "Ten-trial service record and a one-page illustrated replacement instruction"
    ],
    "success": "Demonstrate removal, reinstallation, and restoration. Tie at least one design change to observed evidence rather than appearance.",
    "reflection": [
      "What mistake did the geometry prevent, and what still depended on instructions?",
      "What would change if access were restricted to one side?"
    ],
    "next": "Use your results in the design review; a later CAD version can preserve tested interface dimensions.",
    "chapter": "24",
    "missionIds": [
      "writing",
      "communication",
      "uncertainty",
      "ethics"
    ],
    "safety": "Use empty, lightweight mock-ups only. Do not disassemble appliances, batteries, pressurized containers, or powered equipment for this project."
  },
  {
    "id": "factory-flow",
    "title": "Build a factory that exposes its bottleneck",
    "tag": "Production systems",
    "level": "Beginner → spreadsheet modeling",
    "time": "2–4 hours, self-paced",
    "cost": "No new hardware; an existing spreadsheet or paper grid",
    "hook": "Doubling the fastest station may produce exactly zero additional finished units.",
    "question": "Which station limits this fictional line, and how much does a proposed improvement change completed output?",
    "why": "Connect service time, capacity, queues, and assumptions, then check whether a transparent spreadsheet obeys simple cases. These teaching numbers are separate from real factories and the book's other scenarios.",
    "materials": [
      "An existing spreadsheet application, or graph paper",
      "Calculator and a way to save or photograph the table",
      "Three station labels: prepare, assemble, inspect"
    ],
    "steps": [
      {
        "title": "State the ideal assumptions",
        "detail": "Use one worker-equivalent server at each station, sequential routing, unlimited waiting space, no transport delay, no failures, and identical units available from time zero. Give the stations service times of 12, 20, and 15 minutes per unit. Capacity is 60 divided by service time: 5, 3, and 4 units per hour."
      },
      {
        "title": "Predict before simulating",
        "detail": "The steady-state bottleneck is assembly at 3 units per hour. The first hour need not contain three finished units: the first item must pass all stations. Record this distinction so startup does not look like a spreadsheet error."
      },
      {
        "title": "Build an event table",
        "detail": "Make one row per unit and a finish-time column per station. At each station, start time is the later of that unit's previous-station finish and the preceding unit's finish at this station. Add service time. Initialize unavailable predecessors at zero; show formulas."
      },
      {
        "title": "Verify a small case",
        "detail": "The first item finishes inspection at 47 minutes. The next two finish at 67 and 87 minutes. Check these manually. Count finished units by a stated horizon, including a unit finishing exactly at that time. Keep minutes internally rather than mixing units."
      },
      {
        "title": "Compare two changes",
        "detail": "First halve preparation time; then restore it and halve assembly time. Change only one cell per experiment. Predict the new bottleneck, recompute completions and waiting, and explain why improving assembly eventually exposes inspection. Add downtime or rejection only after the ideal table is understood."
      }
    ],
    "evidence": [
      "A formula-visible event table with assumptions and units",
      "Manual checks for the first three units",
      "One comparison chart and a recommendation tied to finished output"
    ],
    "success": "Reproduce 47, 67, and 87 minutes and explain why local speed and whole-line output differ. A reader can change an assumption without reconstructing the logic.",
    "reflection": [
      "How does the answer depend on the chosen time horizon?",
      "Which real constraint would make this ideal prediction optimistic?"
    ],
    "next": "Compare the same qualitative lesson with the existing factory-flow Lab and clearly label differences between their assumptions.",
    "chapter": "24",
    "missionIds": [
      "units",
      "ratios",
      "algebra",
      "economics"
    ],
    "safety": "This is a paper or software model. It is not an operating instruction for production equipment."
  },
  {
    "id": "virtual-rover",
    "title": "Make a rover turn without buying a rover",
    "tag": "Kinematics",
    "level": "Geometry bridge → undergraduate modeling",
    "time": "2–4 hours, self-paced",
    "cost": "No new hardware; paper, calculator, or existing spreadsheet",
    "hook": "Two wheel speeds become one path through the world.",
    "question": "How do left and right wheel speeds determine the motion of an ideal differential-drive rover?",
    "why": "Study motion before acquiring hardware. A good virtual rover separates geometry from traction, motors, sensing, and control. Produce predictions with clear conventions, then show exactly where the idealization stops.",
    "materials": [
      "Graph paper or an existing spreadsheet",
      "Calculator with radians and trigonometric functions",
      "Optional existing coding environment; no robot kit required"
    ],
    "steps": [
      {
        "title": "Draw the conventions",
        "detail": "Represent the rover as two driven wheels separated by b = 0.20 m, measured between their contact-center lines. Positive wheel speed moves forward. Start the midpoint at x = 0, y = 0, heading along positive x; counterclockwise heading is positive. Assume pure rolling on a plane."
      },
      {
        "title": "Calculate body motion",
        "detail": "For left and right linear wheel speeds vL and vR, calculate midpoint speed v = (vR + vL)/2 and angular speed ω = (vR − vL)/b. Use meters per second and radians per second. These are wheel-ground speeds, not motor revolutions per minute."
      },
      {
        "title": "Check three special cases",
        "detail": "Equal positive speeds give straight travel. Equal opposite speeds give rotation about the midpoint. With vL = 0.10 m/s and vR = 0.20 m/s, obtain v = 0.15 m/s, ω = 0.50 rad/s, and turning radius R = v/ω = 0.30 m."
      },
      {
        "title": "Plot a curved path",
        "detail": "For the curved case with constant speeds, use x = R sin(ωt), y = R[1 − cos(ωt)]. At t = π seconds the heading is 90 degrees and the midpoint is (0.30, 0.30) m. Plot several intermediate points with equal axis scales and label elapsed time."
      },
      {
        "title": "Expose the missing physics",
        "detail": "Repeat with another wheel separation, then introduce a clearly labeled hypothetical 5% shortfall in one wheel's actual speed. Recompute rather than claiming to model all slip. Explain why commanded speed alone cannot prove where a physical rover went."
      }
    ],
    "evidence": [
      "Coordinate-convention diagram and equation sheet",
      "Three special-case checks and an equal-scale trajectory plot",
      "A comparison showing one parameter change and the resulting limitation"
    ],
    "success": "Your model passes straight, spin, and quarter-circle checks, uses radians consistently, and distinguishes the rover midpoint from either wheel's path.",
    "reflection": [
      "Why does the same wheel-speed difference turn a narrower rover faster?",
      "What measurement would a physical rover need to challenge your prediction?"
    ],
    "next": "Try piecewise-constant wheel commands, carrying the ending position and heading into the next segment; compare with the vectors and accumulated-motion lessons.",
    "chapter": "24",
    "missionIds": [
      "units",
      "vectors",
      "trigonometry",
      "integral"
    ],
    "safety": "Keep this virtual. The blueprint does not require driving a vehicle or attaching a phone to moving machinery."
  },
  {
    "id": "sensor-study",
    "title": "Turn a phone photo into a cautious measurement",
    "tag": "Sensing",
    "level": "Beginner → calibration reasoning",
    "time": "1–3 hours, self-paced",
    "cost": "No new hardware; existing phone and household ruler",
    "hook": "A camera can give you a precise-looking number that is wrong for a very ordinary reason.",
    "question": "Can one reference length turn image distances into useful physical lengths, and where does that conversion fail?",
    "why": "Calibrate a simple camera-based measurement arrangement, not a complete lens model or certified instrument. Create a scale, test held-out lengths, and discover why geometry and reference quality matter as much as pixels.",
    "materials": [
      "Existing phone camera and a stable tabletop",
      "Household ruler, flat paper, pencil, and tape",
      "Existing image viewer with pixel coordinates, or a ruler for measuring the displayed photograph",
      "No purchases required"
    ],
    "steps": [
      {
        "title": "Create a flat reference scene",
        "detail": "Draw several line segments on paper and measure them with your ruler. Select a 100 mm segment as the calibration reference and two different lengths as checks. Record their ruler measurements separately. Keep every line and the reference in the same plane."
      },
      {
        "title": "Capture a controlled image",
        "detail": "Hold or support the phone approximately square-on to the paper. Use even light and keep the entire scene visible. Take one image without changing zoom. Record orientation and approximate distance. Avoid photographing personal information."
      },
      {
        "title": "Estimate the image scale",
        "detail": "Measure the reference in pixels if your existing viewer supports coordinates. Otherwise measure its displayed length with a ruler, keeping display zoom fixed. Divide 100 mm by that image length: physical millimeters per pixel, or per displayed millimeter."
      },
      {
        "title": "Validate on unused lengths",
        "detail": "Measure the two check segments in the same image and apply the scale. Report estimated length minus ruler-measured length for each. Do not adjust the scale to make these checks agree. Repeat the image measurement to see how endpoint selection affects the answer."
      },
      {
        "title": "Break the assumption deliberately",
        "detail": "Take a second photograph at an obvious oblique angle, keeping the paper flat. Recalibrate from the same reference and test the other lines again. Explain perspective-dependent scale and possible lens distortion. Never combine measurements from different display zoom levels without recalibrating."
      }
    ],
    "evidence": [
      "Reference and oblique photographs with non-sensitive subjects",
      "Calibration equation, units, and complete check-length table",
      "A short statement of usable conditions, observed errors, and reference limitations"
    ],
    "success": "Produce a reproducible scale and independent checks. Explain why agreement with an ordinary ruler does not establish traceable accuracy.",
    "reflection": [
      "Did changing the view affect every line equally?",
      "Which assumption would fail if the object stood above the reference plane?"
    ],
    "next": "Document the paper arm's geometry with this method, keeping limitations beside the result.",
    "chapter": "24",
    "missionIds": [
      "ratios",
      "slope",
      "uncertainty",
      "research"
    ],
    "safety": "Keep the phone on a stable surface or in your hand above a clear table. Do not balance it overhead or use photographs to make safety-critical measurements."
  },
  {
    "id": "orbital-model",
    "title": "Make the servicing robot move the shipyard",
    "tag": "Space systems",
    "level": "Algebra bridge → undergraduate dynamics",
    "time": "1–3 hours, self-paced",
    "cost": "No new hardware; use the existing orbital-momentum Lab",
    "hook": "In free flight, the support structure is part of the motion.",
    "question": "How does internal payload motion change a free-floating base's velocity when the system receives no external impulse?",
    "why": "Replace fixed-floor intuition with conservation reasoning. Interrogate the existing Lab, then reproduce a result independently. A useful space-systems portfolio explains assumptions and conservation checks as clearly as the visualization.",
    "materials": [
      "This site's orbital-momentum Lab",
      "Paper and calculator, or an existing spreadsheet",
      "A way to save a screenshot and parameter table"
    ],
    "steps": [
      {
        "title": "Read the model's conventions",
        "detail": "Open Orbit momentum in the Lab. Record base mass M, payload mass m, and payload velocity u relative to the base. Positive means the payload's commanded direction. The displayed base and payload velocities use a local inertial frame; neither is an orbital speed."
      },
      {
        "title": "Derive the recoil velocity",
        "detail": "Assume zero initial total momentum, fixed masses, no external impulse, and no rotation. Let base velocity be vB. Payload velocity is vB + u. Conservation gives MvB + m(vB + u) = 0, so vB = −mu/(M + m). Keep meters per second beside each velocity."
      },
      {
        "title": "Check one numerical case",
        "detail": "Set M = 1000 kg, m = 100 kg, and u = 0.10 m/s. Predict vB = −0.00909 m/s and payload velocity 0.09091 m/s, rounded. Their momenta are approximately −9.091 and +9.091 kg·m/s. Compare your calculation with the Lab and its conservation residual."
      },
      {
        "title": "Run a controlled sweep",
        "detail": "Hold base mass and relative velocity fixed; vary payload mass across five settings. Record outputs and plot recoil magnitude against payload mass. Explain why doubling payload mass does not exactly double recoil when total mass also changes. Check that zero relative velocity gives zero recoil."
      },
      {
        "title": "State the missing physics",
        "detail": "List what this model omits: rotation, flexible structures, actuator dynamics, docking impacts, thrusters, and orbital perturbations. Velocity alone does not determine final displacement or settling time. A larger base reduces this modeled recoil but does not provide a complete attitude-control solution."
      }
    ],
    "evidence": [
      "Screenshot with inputs and assumptions",
      "Independent momentum derivation and conservation residual",
      "Five-case table, one plot, and a limitation statement"
    ],
    "success": "Your calculation agrees with the Lab's frame conventions, and total momentum closes within rounding. Document any disagreement before treating the prediction as evidence.",
    "reflection": [
      "What changes if the arm throws away an object instead of retaining it?",
      "Why would a real service maneuver also require rotational analysis?"
    ],
    "next": "Read the space-assembly chapters and sketch where an external force or torque enters a fuller free-body model.",
    "chapter": "24",
    "missionIds": [
      "algebra",
      "vectors",
      "uncertainty",
      "writing"
    ],
    "safety": "Use the numerical model only. No recoil demonstrations, projectiles, suspended masses, or vacuum equipment are needed."
  },
  {
    "id": "design-review",
    "title": "Turn one small experiment into a design review",
    "tag": "Engineering communication",
    "level": "Any starting point → undergraduate practice",
    "time": "2–4 hours, self-paced",
    "cost": "No new hardware; reuse your existing project evidence",
    "hook": "A portfolio becomes convincing when another person can follow your decisions and challenge your evidence.",
    "question": "Can a reviewer understand the need, reconstruct the test, assess the limitation, and decide what should happen next?",
    "why": "A polished picture alone cannot explain engineering judgment. Build a review packet from another blueprint, including failures. Make your work portable across a class discussion, mentor conversation, or application.",
    "materials": [
      "One completed or partially completed project from this collection",
      "Original notes, measurements, photographs, and model files",
      "An existing document or slide editor, or neatly scanned paper",
      "Optional willing reviewer; self-review is a valid starting point"
    ],
    "steps": [
      {
        "title": "Name the decision",
        "detail": "Describe the task, one measurable requirement, and the decision. For example: choose which cardboard guide produces a smaller placement spread in this setup. Avoid turning a small test into a claim about all robots."
      },
      {
        "title": "Build a concise evidence packet",
        "detail": "Use five sections: problem and constraints; design; test method; results; next decision. Include a dimensioned sketch, assumptions, and a readable chart or table. Preserve units, sample counts, and unsuccessful trials. Prioritize evidence over decoration."
      },
      {
        "title": "Make the work reproducible",
        "detail": "Attach or link the raw table and original model. Identify file versions and explain how a result was calculated. Separate measured values, calculated predictions, and illustrative assumptions. Cite external material; label generated concept art so it cannot be mistaken for your built hardware."
      },
      {
        "title": "Conduct a small review",
        "detail": "Ask a willing reader to explain your conclusion, or revisit the packet after a break. Check three questions: what changed, what supports the claim, and what remains uncertain? Record confusion and objections. Never rewrite inconvenient data."
      },
      {
        "title": "Issue a revision",
        "detail": "Resolve one substantive weakness: clarify a requirement, correct a unit, improve a graph, or narrow an unsupported conclusion. Add a brief change log. Finish with a next experiment that could change your mind and an explicit condition under which you would stop or redesign."
      }
    ],
    "evidence": [
      "A compact PDF or equivalent review packet",
      "Raw-data/model folder with a plain-language file guide",
      "Review notes and a dated revision history"
    ],
    "success": "A reader can trace your main claim to an observation or calculation and identify its limits. Demonstrate judgment without claiming professional qualification or guaranteed employment.",
    "reflection": [
      "Which sentence sounds stronger than the evidence allows?",
      "What additional test would most improve confidence per unit of effort?"
    ],
    "next": "Use the same packet structure for a more advanced undergraduate project; compare later work against this baseline to see how your reasoning develops.",
    "chapter": "24",
    "missionIds": [
      "writing",
      "research",
      "communication",
      "ethics"
    ],
    "safety": "Remove personal identifiers and other people's private information before sharing. Share only material you own or are authorized to distribute."
  },
  {
    "id": "tolerance-stack",
    "title": "Make the fit survive ordinary variation",
    "tag": "Interfaces",
    "level": "Beginner → tolerance reasoning",
    "time": "1–3 hours, self-paced",
    "cost": "Paper, reused card, and a household ruler",
    "hook": "Two parts can each look right and still refuse to fit together.",
    "question": "How much clearance remains when several small dimensional variations combine?",
    "why": "A nominal drawing describes an intention. A usable interface must also tolerate how parts are made and measured. This project connects arithmetic intervals, physical fit, and an honest acceptance rule without pretending a household ruler is a precision instrument.",
    "materials": [
      "Paper or thin card, ruler, pencil, and tape",
      "Blunt craft scissors used carefully",
      "Existing calculator or spreadsheet"
    ],
    "steps": [
      {
        "title": "Define the interface",
        "detail": "Sketch a 60 mm nominal opening and a 56 mm nominal sliding card. Define clearance as opening width minus card width, measured in the same direction. Assume illustrative dimensional ranges of 59–61 mm for the opening and 55–57 mm for the card."
      },
      {
        "title": "Predict the limiting cases",
        "detail": "Calculate minimum clearance as 59 − 57 = 2 mm and maximum as 61 − 55 = 6 mm. The nominal answer is 4 mm. Explain why combining both minimum dimensions does not produce the minimum clearance."
      },
      {
        "title": "Make a small family",
        "detail": "Create three labeled openings and three cards around those target widths. Measure the actual widths, keeping your ruler resolution visible in the notes. Use card guides on a backing sheet rather than cutting a narrow hole with a knife. Do not quietly substitute nominal values for measurements."
      },
      {
        "title": "Test the combinations",
        "detail": "Try all nine opening/card pairs with gentle hand motion. Record whether each enters, binds, or feels loose, and calculate its measured clearance. Test in two orientations; imperfect parallelism can matter even when a single width measurement looks acceptable."
      },
      {
        "title": "Specify the next version",
        "detail": "Choose a practical clearance interval using the observations. If every version works, explain which new condition would discriminate between them instead of inventing a failure. Propose one change to the guide geometry or dimensional range, then retest the most informative pair."
      }
    ],
    "evidence": [
      "Dimensioned interface sketch with nominal values and permitted intervals",
      "Nine-pair fit table with actual measurements and observations",
      "One revised acceptance rule and its reason"
    ],
    "success": "Your minimum/maximum arithmetic is correct, and the physical evidence explains what the numerical clearance can and cannot predict.",
    "reflection": [
      "Which part of the fit depends on shape rather than width alone?",
      "Would making every tolerance tighter be the cheapest useful improvement?"
    ],
    "next": "Apply the interval method to a removable service module and explain which dimension locates the component.",
    "chapter": "24",
    "missionIds": [
      "units",
      "uncertainty",
      "cad",
      "writing"
    ],
    "safety": "Use lightweight card and blunt scissors. Keep fingers clear of cutting edges; do not force tight joints or use blades to create narrow slots."
  },
  {
    "id": "paper-beam",
    "title": "Ask a sheet of paper to carry a load",
    "tag": "Structures",
    "level": "Beginner → mechanics",
    "time": "1–3 hours, self-paced",
    "cost": "Paper and small household items",
    "hook": "The same material can behave very differently after one fold.",
    "question": "How does changing a paper strip's shape affect its deflection under the same small load?",
    "why": "Material choice is only part of structural design. Geometry and support conditions change how a load travels through an object. A deliberately modest comparison lets you connect a force diagram to an observed deformation without claiming to measure a material's certified strength.",
    "materials": [
      "Two equal paper strips cut from the same sheet",
      "Two stable low supports, ruler, and pencil",
      "One small coin or similarly light object",
      "A clear tabletop beneath the experiment"
    ],
    "steps": [
      {
        "title": "Define a repeatable span",
        "detail": "Set two low supports 100 mm apart on a table. Mark the support positions so they do not drift. Place one paper strip flat across them. Draw the supports, midpoint load, and expected downward deflection; distinguish the supported span from total strip length."
      },
      {
        "title": "Change geometry alone",
        "detail": "Fold the other equal strip into a shallow channel with two longitudinal creases. Keep its material, length, and support spacing the same. Record the fold dimensions. You are comparing two shapes, not claiming that their bending stiffnesses are already known."
      },
      {
        "title": "Collect an unloaded reference",
        "detail": "Observe the midpoint height before adding anything. Then gently place the same small coin at the midpoint and estimate the change with a ruler viewed from the side. Keep the coin near the table, never above a person, and stop if the paper buckles or slips."
      },
      {
        "title": "Repeat without hiding damage",
        "detail": "Remove the coin, check for permanent set, and repeat three times for each shape. Record deflection, recovery, sliding, and any crease change. If the movement is smaller than your reading resolution, report an upper bound or unresolved difference rather than a precise number."
      },
      {
        "title": "Explain the comparison",
        "detail": "For an ideal simply supported beam under a central force, deflection scales as F L³/(48 E I). Use this only as a reasoning model: span, material stiffness, and cross-sectional geometry matter. Paper creases, slipping supports, and large deflection can violate that idealization."
      }
    ],
    "evidence": [
      "Matched photographs and a labeled support/load diagram",
      "Six-trial table including unloaded references and damage observations",
      "A short explanation separating material, shape, and boundary conditions"
    ],
    "success": "You compare the shapes under a stated common setup and describe uncertainty and model limits. The outcome may be an unresolved difference.",
    "reflection": [
      "Which assumption would fail first if you kept increasing the load?",
      "Why is a crease both a useful geometric feature and a possible weakness?"
    ],
    "next": "Predict the effect of a shorter span, then repeat with the same small load instead of adding more weight.",
    "chapter": "24",
    "missionIds": [
      "statics",
      "materials",
      "stress",
      "uncertainty"
    ],
    "safety": "Keep supports low and use only one small, light test object over a clear table. Do not scale this into a lifting, climbing, or load-bearing structure."
  },
  {
    "id": "lunar-energy",
    "title": "Make a power budget that survives a pause",
    "tag": "Energy systems",
    "level": "Beginner → systems modeling",
    "time": "2–4 hours, self-paced",
    "cost": "No new hardware; calculator or existing spreadsheet",
    "hook": "Enough average power does not guarantee enough energy at the moment it is needed.",
    "question": "Can a fictional remote workshop finish its task while keeping a declared energy reserve through a supply interruption?",
    "why": "A battery budget joins units, integration, and priorities. The same bookkeeping applies to many small systems, but this example is a toy sequence, not a lunar-night design. It makes the difference between power, stored energy, and a promised capability visible.",
    "materials": [
      "Paper or an existing spreadsheet",
      "Calculator",
      "The power arcade for a separate interactive comparison"
    ],
    "steps": [
      {
        "title": "Define the accounting boundary",
        "detail": "Use a fictional usable storage capacity of 100 Wh and initial stored energy of 60 Wh. Treat supplied power as already available after conversion losses, so no efficiency is counted twice. Require a 20 Wh operating reserve. Declare a simplified model with no self-discharge or charge-rate limit."
      },
      {
        "title": "Write four intervals",
        "detail": "For four one-hour intervals, use supplied powers [30, 30, 0, 0] W and demanded powers [20, 40, 20, 20] W. Compute energy change as (supply − demand) × duration. Before calculating, predict when the reserve will be threatened."
      },
      {
        "title": "Track the state explicitly",
        "detail": "The end-of-interval storage values are 70, 60, 40, and 20 Wh. Check initial plus total supply minus total demand equals final storage. Clip charging at capacity and record any curtailed energy; never allow a spreadsheet to borrow negative stored energy."
      },
      {
        "title": "Introduce one disruption",
        "detail": "Remove supply during the second interval while keeping the demand unchanged. The sequence becomes 70, 30, 10, then an energy shortfall if the final demand is served. Report both reserve violation and unmet energy. A final value below zero is a failure indicator, not a possible battery state."
      },
      {
        "title": "Compare recoveries",
        "detail": "Test deferring an optional load, reducing a task duration, or increasing initial stored energy within capacity. Preserve essential loads and label every change. Compare the recovered task output and remaining reserve rather than calling the largest battery automatically best."
      }
    ],
    "evidence": [
      "Power/time schedule with units and boundary assumptions",
      "Nominal and disrupted energy-state tables",
      "A recovery recommendation that names which work is deferred"
    ],
    "success": "The nominal sequence closes at 20 Wh, the disruption exposes a real shortfall, and the revised plan obeys capacity and reserve constraints.",
    "reflection": [
      "Which quantities are measured in watts, and which in watt-hours?",
      "What real environmental or hardware limit would you model next?"
    ],
    "next": "Use the power arcade to challenge a strategy, documenting its different parameters before comparing outcomes.",
    "chapter": "24",
    "missionIds": [
      "units",
      "integral",
      "circuits",
      "systems"
    ],
    "safety": "Simulation only. Do not open, wire, charge experimentally, or modify batteries, solar hardware, or mains equipment."
  },
  {
    "id": "thermal-cooling",
    "title": "Tell a cooling curve from a guess",
    "tag": "Thermal modeling",
    "level": "Algebra → differential equations",
    "time": "2–4 hours, self-paced",
    "cost": "No new hardware; paper or existing spreadsheet",
    "hook": "A curve that looks plausible still needs a model and a check.",
    "question": "How does a simple cooling model approach its surroundings, and how can a coarse numerical step misrepresent it?",
    "why": "This project connects graphs and rates to a system that changes over time. You can inspect approximation error before touching a hot object. The goal is not to predict a spacecraft's temperature; it is to learn how a model earns trust through limiting cases and convergence.",
    "materials": [
      "Calculator with an exponential function",
      "Graph paper or an existing spreadsheet",
      "Optional existing coding environment"
    ],
    "steps": [
      {
        "title": "Declare the toy system",
        "detail": "Assume a uniform-temperature object at 80 °C in fixed 20 °C surroundings, with time constant τ = 10 minutes and no internal heating. The model is dT/dt = −(T − 20)/τ. It omits spatial gradients and any changing heat-transfer coefficient."
      },
      {
        "title": "Use the exact solution",
        "detail": "Calculate T(t) = 20 + 60 exp(−t/10), using minutes consistently. At ten minutes the predicted temperature is about 42.07 °C. Plot 0, 5, 10, 20, and 30 minutes. Explain why the initial slope is steeper than the later slope."
      },
      {
        "title": "Build a stepped approximation",
        "detail": "Use forward Euler: next T = current T − (current T − 20) Δt/10. Start with Δt = 5 minutes. At ten minutes the two steps give 35 °C, noticeably below the exact result. Put both methods on the same axes."
      },
      {
        "title": "Check convergence",
        "detail": "Repeat with steps of 1 minute and 0.5 minute, comparing at the same ten-minute time. The answers should move toward the exact curve. Then examine a 15-minute step: its first result falls below ambient, revealing an approximation problem rather than a refrigerator."
      },
      {
        "title": "Write the model boundary",
        "detail": "List which assumed constants would change in a real experiment. Explain that this terrestrial first-order cooling model differs from the Lab's ideal radiative heat-rejection calculation. Matching a curve at one point cannot establish that either model describes a particular machine."
      }
    ],
    "evidence": [
      "Equation sheet with units and assumptions",
      "Exact/Euler comparison plot and ten-minute error table",
      "A brief explanation of the below-ambient numerical artifact"
    ],
    "success": "Your exact ten-minute value is approximately 42.07 °C, and reducing the Euler step improves the comparison for this example.",
    "reflection": [
      "Why should a passive model with warmer initial conditions not cross below a fixed ambient temperature?",
      "What observation would challenge the uniform-temperature assumption?"
    ],
    "next": "Compare the thermal and differential-equations lessons, then formulate one measurement a future supervised experiment would need.",
    "chapter": "24",
    "missionIds": [
      "slope",
      "exponential",
      "odes",
      "thermal"
    ],
    "safety": "Keep the exercise numerical. No heating, hot surfaces, pressure vessels, or electrical experiments are required."
  },
  {
    "id": "sampling-study",
    "title": "Catch the motion your samples can hide",
    "tag": "Sensing and data",
    "level": "Trigonometry → signal reasoning",
    "time": "2–4 hours, self-paced",
    "cost": "No new hardware; an existing spreadsheet or calculator",
    "hook": "A smooth plot can confidently tell the wrong story about motion.",
    "question": "Can two different oscillations produce the same sampled observations, and what would reveal the ambiguity?",
    "why": "Sensors produce data at particular times, not an uninterrupted view of reality. Exploring a deliberately simple waveform connects trigonometry, graphs, and evidence quality. You will learn why a display's apparent motion is not automatically the object's true motion.",
    "materials": [
      "Spreadsheet or graph paper",
      "Calculator supporting sine in radians",
      "Optional existing coding environment"
    ],
    "steps": [
      {
        "title": "Define the continuous signal",
        "detail": "Use y(t) = sin(2π × 7t), with t in seconds and y a dimensionless displacement proxy. Its true frequency is 7 Hz. Generate a fine reference curve with a 0.001-second time step over one second; label it as an analytic teaching signal, not measured data."
      },
      {
        "title": "Take sparse samples",
        "detail": "Evaluate the same expression only at t = n/10 seconds for n from 0 through 10. These are 10 samples per second over the interval, including both endpoints. Plot the sample markers separately from the fine curve; connecting them with lines does not recover missing motion."
      },
      {
        "title": "Expose an exact ambiguity",
        "detail": "At those sample times, sin(2π × 7t) equals −sin(2π × 3t). Calculate both columns and compare them within rounding. A 3 Hz interpretation with a different phase is therefore consistent with this sample set. The sensor record alone cannot choose the true waveform."
      },
      {
        "title": "Increase the sampling rate",
        "detail": "Repeat at 40 samples per second and compare with the 7 Hz reference. Explain the benefit under the restricted assumption of a known frequency-limited signal. Do not generalize this into a claim that any fast-enough sample rate guarantees clean measurements in noise."
      },
      {
        "title": "Create an evidence rule",
        "detail": "Propose how a future motion study would document sample rate, timestamps, filtering, and expected frequency range. Include a test with a known reference signal. State whether a surprising low-frequency trace should trigger a physical explanation, a sampling check, or both."
      }
    ],
    "evidence": [
      "Analytic reference and sample-marker plots",
      "7 Hz versus negative 3 Hz sample comparison table",
      "A short sampling checklist with one falsifiable validation test"
    ],
    "success": "The sparse columns agree within rounding while the dense sampling resolves their difference. Your explanation distinguishes sampling rate from signal frequency.",
    "reflection": [
      "Why does drawing a smooth line through points not add measurements?",
      "What extra uncertainty appears if samples arrive at irregular times?"
    ],
    "next": "Bring the same skepticism to a vibration plot or phone-sensor study before interpreting an apparent oscillation.",
    "chapter": "24",
    "missionIds": [
      "trigonometry",
      "slope",
      "vibrations",
      "sensors"
    ],
    "safety": "Use synthetic data. Do not attach a phone to rotating equipment, induce vibration in machinery, or operate moving hardware to collect a signal."
  },
  {
    "id": "gear-trade",
    "title": "Trade speed for torque without losing the bookkeeping",
    "tag": "Mechanisms",
    "level": "Ratios → power reasoning",
    "time": "1–3 hours, self-paced",
    "cost": "No new hardware; paper and the existing Math Studio",
    "hook": "A slower output can be a stronger output, but the extra torque is not free power.",
    "question": "How do tooth ratio and efficiency change output speed, torque, and power in a simple gear pair?",
    "why": "This project gives ratios a physical job. You will build a comparison table that could guide an early mechanism choice, while separating ideal geometry from energy losses and from the limits of real gear hardware.",
    "materials": [
      "Gear-ratio model in Math Studio",
      "Paper, calculator, or existing spreadsheet",
      "Optional paper circles for a direction sketch"
    ],
    "steps": [
      {
        "title": "Choose a reference pair",
        "detail": "Use a 20-tooth driver turning at 120 rpm and a 60-tooth driven gear. Assume two external gears, fixed shafts, and steady motion. Predict output speed as 120 × 20/60 = 40 rpm. Mark opposite rotation directions on a sketch; speed magnitudes alone do not show direction."
      },
      {
        "title": "Add a torque assumption",
        "detail": "For an illustrative input torque of 0.20 N·m, ideal output torque is 0.60 N·m. If mechanical efficiency is 80%, the output becomes 0.48 N·m under this steady model. Efficiency is an assumption here, not a measured property of an actual gear."
      },
      {
        "title": "Close the power balance",
        "detail": "Convert rpm to radians per second with 2π/60. Input power is about 2.513 W; output power with the assumed efficiency is about 2.011 W. Their ratio is 0.80. Keep speed, torque, and power in separate columns so the ratio cannot masquerade as energy creation."
      },
      {
        "title": "Compare alternatives",
        "detail": "Repeat for driven tooth counts of 20, 40, and 60 while holding input conditions fixed. Use the Math Studio for the ideal geometry, then add the efficiency calculation separately. Record which model output is ideal and which value includes your additional assumption."
      },
      {
        "title": "Choose against a requirement",
        "detail": "Invent a clearly labeled teaching requirement for minimum output speed and torque. Identify which candidates satisfy both. If none do, say so and propose changing the requirement or input conditions; do not select a pair merely because its ratio is largest."
      }
    ],
    "evidence": [
      "Direction sketch and three-candidate comparison table",
      "One worked power-balance calculation with units",
      "A requirement-based selection and a limitation statement"
    ],
    "success": "Your 20:60 example gives 40 rpm and 0.48 N·m at 80% efficiency, and output power remains below input power.",
    "reflection": [
      "Which result comes from geometry, and which depends on an efficiency assumption?",
      "What constraints would real tooth strength, backlash, and bearing friction add?"
    ],
    "next": "Connect the chosen ratio to an arm task, then identify the missing acceleration and structural checks.",
    "chapter": "24",
    "missionIds": [
      "ratios",
      "algebra",
      "units",
      "dynamics"
    ],
    "safety": "Use the numerical model or paper sketches only. Keep hands away from real meshing gears and do not motorize a demonstration."
  },
  {
    "id": "quality-gate",
    "title": "Find the mistakes inside an inspection score",
    "tag": "Quality and evidence",
    "level": "Beginner → classification reasoning",
    "time": "2–4 hours, self-paced",
    "cost": "Paper cards or an existing spreadsheet",
    "hook": "An inspector can catch most defects and still send many good parts back.",
    "question": "What does an inspection result mean when missed defects and false alarms have different consequences?",
    "why": "Percentages become useful when their denominators are explicit. This project connects ratios, quality, and ethical judgment without borrowing a medical or safety-critical context. You will use a fictional dataset to make the tradeoff visible before recommending a threshold.",
    "materials": [
      "Twenty paper cards or spreadsheet rows",
      "Pencil and calculator",
      "Two columns for known condition and inspection decision"
    ],
    "steps": [
      {
        "title": "Create a labeled teaching batch",
        "detail": "Make 20 records: five marked truly defective and fifteen acceptable. Treat these labels as supplied ground truth for this toy study. Define a positive decision as 'flag for review'; it is not the same as confirming a defect."
      },
      {
        "title": "Assign the first inspection",
        "detail": "Flag four defective and four acceptable records. Leave one defective and eleven acceptable records unflagged. Build a two-by-two table. Verify the four cells add to 20 and that the true-condition column totals remain five and fifteen."
      },
      {
        "title": "Calculate distinct measures",
        "detail": "Recall is 4/5 = 80% of actual defects flagged. Precision is 4/8 = 50% of flagged items actually defective. Overall accuracy is (4 + 11)/20 = 75%. Explain each denominator in words. None of these numbers alone describes every consequence."
      },
      {
        "title": "Compare a stricter rule",
        "detail": "Create a second fictional inspection that flags all five defective records and seven acceptable records. Recall becomes 100%, precision 5/12, and accuracy 13/20. These are invented outcomes for comparison, not evidence that a real threshold can produce those exact results."
      },
      {
        "title": "Make a bounded recommendation",
        "detail": "State the relative consequences of review effort and missed defects for a harmless paper-part task. Choose a rule conditionally, then request a fresh labeled batch before claiming general performance. Explain that changing defect prevalence can change precision even when other behavior appears similar."
      }
    ],
    "evidence": [
      "Complete labeled 20-record dataset and two confusion tables",
      "Three metrics for both rules with explicit denominators",
      "A conditional recommendation and a proposed independent check"
    ],
    "success": "Your counts reconcile, and you can explain why perfect recall does not mean perfect inspection. The recommendation names the consequence it prioritizes.",
    "reflection": [
      "Who does the extra review work when false alarms increase?",
      "What would make your supplied ground-truth labels unreliable?"
    ],
    "next": "Add the inspection rule to a factory-flow model and count accepted output and rework separately.",
    "chapter": "24",
    "missionIds": [
      "ratios",
      "quality",
      "ethics",
      "communication"
    ],
    "safety": "Use invented paper-part data only. Do not apply this small exercise to medical screening, personnel decisions, or safety-critical acceptance."
  },
  {
    "id": "fault-tree",
    "title": "Make a failure explain what to check next",
    "tag": "Reliability and diagnosis",
    "level": "Beginner → systems reasoning",
    "time": "2–4 hours, self-paced",
    "cost": "Paper or an existing diagram/spreadsheet tool",
    "hook": "A useful fault diagram changes the next decision, not just the appearance of a report.",
    "question": "Which observations distinguish possible causes of a fictional service module's failure, and which assumptions control a reliability estimate?",
    "why": "Diagnosis joins logic, evidence, and communication. A compact fault model can expose an overlooked dependency and prevent a confident but unsupported explanation. You will separate a cause diagram from a probability calculation; they are related, but neither substitutes for measurements.",
    "materials": [
      "Paper, pencil, and three cause cards",
      "Calculator or existing spreadsheet",
      "A fictional module description; no actual machine needed"
    ],
    "steps": [
      {
        "title": "Define one failed function",
        "detail": "Use a virtual inspection carriage that fails to reach a target. Draw three possible causes: unavailable power, failed motion command, and obstructed path. State what 'reach' means and what observation reported the failure. A faulty position measurement could invalidate that report."
      },
      {
        "title": "Build a cause-and-check map",
        "detail": "For each cause, propose a distinct observation: available supply status, command log, or a geometry/clearance record. Add what outcome would support or weaken the hypothesis. Do not label the first plausible cause as confirmed before collecting the distinguishing observation."
      },
      {
        "title": "Try a conditional probability model",
        "detail": "For illustration only, assign independent probabilities 0.03, 0.02, and 0.01 that the three causes prevent this task. If any one causes failure, success is 0.97 × 0.98 × 0.99 = 0.941094, so failure probability is 0.058906."
      },
      {
        "title": "Challenge independence",
        "detail": "Compare the exact value with the simple sum 0.06; overlapping failures explain the difference. Then imagine a shared power fault disabling both the command system and drive. The independent multiplication is no longer justified. Describe the dependency before attempting a replacement calculation."
      },
      {
        "title": "Write a recovery decision",
        "detail": "Make a short diagnostic sequence that starts with non-invasive information and includes an explicit stop condition. Run it against three fictional cases with different causes. Record one ambiguous case where the available evidence cannot support a decision and request a discriminating check."
      }
    ],
    "evidence": [
      "Functional failure statement and cause/check diagram",
      "Transparent conditional probability calculation",
      "Three-case diagnostic record with one unresolved ambiguity"
    ],
    "success": "Your calculation yields 5.8906% under the stated toy assumptions, and your diagnosis distinguishes support for a hypothesis from proof.",
    "reflection": [
      "What common cause would make the diagram misleading?",
      "Which observation offers the most information without changing the system's condition?"
    ],
    "next": "Attach the cause/check map to a design review or service-module instruction and ask whether another person can follow the reasoning.",
    "chapter": "24",
    "missionIds": [
      "research",
      "ratios",
      "systems",
      "communication"
    ],
    "safety": "Use a fictional system. Do not bypass interlocks, energize failed equipment, open batteries, or troubleshoot mains hardware for this exercise."
  }
];
