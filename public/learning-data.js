// Original, self-paced learning material for the personal reader edition.
// Every numerical scenario and archival/test packet below is illustrative.
// Minutes are suggested exploration time, not deadlines or course credit.
export const missions = [
  {
    id: 'units', title: 'Make a number mean something', track: 'math', level: 'Foundation', minutes: 12,
    hook: 'The sketch says “50.” The machine needs to know fifty what.',
    skill: 'Convert units and check the dimensions of a calculation.',
    why: 'A drawing, a simulation, and a measurement can describe the same object in different units. You can become the person who notices the mismatch before anyone builds from it.',
    story: [
      'Imagine a paper model of an inspection carriage. Its proposed speed is 50 millimeters per second, and it travels for 4 seconds. Before choosing a motor or writing code, you can predict the distance with a ruler and arithmetic.',
      'A unit is part of the quantity. Converting millimeters to meters changes the number used to describe a distance; the distance itself stays the same. Keeping units beside every intermediate result makes the reasoning visible to someone checking your work.'
    ],
    steps: [
      'Write the inputs: speed = 50 mm/s and elapsed time = 4 s. Assume constant speed during this interval.',
      'Multiply speed by time: (50 mm/s) × (4 s) = 200 mm. Seconds cancel, leaving a length.',
      'Convert with 1 m = 1,000 mm: 200 mm × (1 m / 1,000 mm) = 0.200 m.',
      'Check another route: 50 mm/s = 0.050 m/s. Then 0.050 m/s × 4 s = 0.200 m. Both routes describe the same travel.'
    ],
    equation: 'distance = speed × time = (50 mm/s)(4 s) = 200 mm = 0.200 m',
    check: {question: 'At a constant 40 mm/s for 5 s, how far does the paper carriage travel?', options: ['2.0 m', '0.200 m', '0.020 m'], answer: 1, explanation: '40 × 5 = 200 mm. Dividing by 1,000 gives 0.200 m. A quick sketch of a 20-centimeter travel helps check the scale.'},
    action: 'Draw a 200 mm travel on paper. Add one prediction in millimeters and one in meters, then explain why their numerical values differ.',
    chapter: '22', chapterLabel: 'Mathematics becomes a physical language'
  },
  {
    id: 'ratios', title: 'Count what actually worked', track: 'math', level: 'Foundation', minutes: 15,
    hook: 'Twenty attempts do not necessarily produce twenty useful parts.',
    skill: 'Use fractions, percentages, and a clearly defined denominator.',
    why: 'Yield connects classroom ratios to the output a workshop can promise. Knowing exactly what a percentage counts helps you read ambitious claims with confidence.',
    story: [
      'In a fictional task-board experiment, 18 of 20 placements pass the first inspection. Two need another attempt. You are interested in first-pass success, so the denominator is all 20 original attempts, including the inconvenient ones.',
      'The observed percentage describes this test. It is not a guarantee about the next batch. To use it for planning, you must explicitly assume that future conditions and performance resemble those in the small experiment.'
    ],
    steps: [
      'Write the fraction before the percentage: 18 first-pass successes / 20 original attempts = 0.90.',
      'Multiply by 100 to express the ratio as a percentage: 0.90 × 100 = 90%.',
      'For an illustrative planning model, apply that yield to 40 attempts: 40 × 0.90 = 36 expected first-pass successes.',
      'Keep the categories separate. If the two unsuccessful parts are later repaired, final output can improve while the original first-pass result remains 18 out of 20.'
    ],
    equation: 'first-pass yield = accepted on first attempt / all original attempts = 18 / 20 = 90%',
    check: {question: 'Assuming the same 90% yield, what is the model’s expected first-pass output from 80 attempts?', options: ['72 accepted parts', '80 accepted parts', '90 accepted parts'], answer: 0, explanation: '80 × 0.90 = 72. This is an expected count under the stated model, not a promise that a particular batch contains exactly 72 successes.'},
    action: 'Invent a ten-trial paper-placement record with two failures. Write separate lines for attempts, first-pass successes, and eventual successes after retries.',
    chapter: '12', chapterLabel: 'Why another robot may change nothing'
  },
  {
    id: 'algebra', title: 'Turn the relationship around', track: 'math', level: 'Foundation', minutes: 18,
    hook: 'You know the turning effect you want. Which force would produce it?',
    skill: 'Rearrange an equation before substituting numbers.',
    why: 'Algebra lets you change which quantity is the design choice. One relationship can answer several different engineering questions.',
    story: [
      'Sketch a simple lever with a defined pivot. In this illustrative calculation, a force acts perpendicular to the lever, and the required turning moment is 0.60 newton-meters. The perpendicular distance from the pivot is 0.12 meters.',
      'The calculation concerns an ideal lever, not a tightening instruction for real hardware. Friction, strength, and the rest of the mechanism would matter in a design. Here the useful discovery is that you can solve for force instead of only calculating torque.'
    ],
    steps: [
      'Start with T = F × r, where T is torque, F is perpendicular force, and r is the lever arm.',
      'Divide both sides by r: F = T / r. This preserves the equality and isolates the unknown.',
      'Substitute with units: F = 0.60 N·m / 0.12 m = 5 N. The meters cancel.',
      'Halve the lever arm to 0.06 m while holding torque fixed: F = 0.60 / 0.06 = 10 N. A shorter lever requires more force in this model.'
    ],
    equation: 'T = F × r  →  F = T / r  →  0.60 N·m / 0.12 m = 5 N',
    check: {question: 'For the same 0.60 N·m torque and a 0.20 m perpendicular lever arm, what force is required?', options: ['12 N', '0.12 N', '3 N'], answer: 2, explanation: 'F = 0.60 / 0.20 = 3 N. The longer lever should reduce the required force, so the direction of the change also makes sense.'},
    action: 'Draw two lever lengths and label their predicted forces. Explain the comparison without numbers before showing the arithmetic.',
    chapter: '04', chapterLabel: 'The physical grammar of machines'
  },
  {
    id: 'slope', title: 'Read the change hiding in a graph', track: 'math', level: 'Foundation', minutes: 18,
    hook: 'A warm machine and a rapidly warming machine are different observations.',
    skill: 'Calculate slope, label axes, and distinguish an observation from an extrapolation.',
    why: 'Slope gives change a unit. It turns a rising line into information you can compare with a model.',
    story: [
      'Use a fictional temperature record: 20°C at 0 minutes, 24°C at 2 minutes, and 28°C at 4 minutes. Draw each point before drawing a line. Time belongs on the horizontal axis; temperature belongs on the vertical axis.',
      'These points fit a straight line over the observed interval. That does not establish endless warming at the same rate. Heat loss, a changing power input, or a different environment could bend the graph outside the measurements.'
    ],
    steps: [
      'Find the temperature change from the first point to the last: 28°C − 20°C = 8°C.',
      'Find the elapsed time: 4 min − 0 min = 4 min. Slope = 8°C / 4 min = 2°C/min.',
      'Write the fitted relationship with its starting value: T = 20°C + (2°C/min) × t, where t is elapsed time in minutes.',
      'The line predicts 32°C at 6 minutes. Mark this prediction differently from the three measured points because 6 minutes lies outside the observed interval.'
    ],
    equation: 'slope = change in temperature / change in time = (28 − 20)°C / (4 − 0) min = 2°C/min',
    check: {question: 'What does the slope of 2°C/min describe?', options: ['The temperature is always 2°C.', 'The measured temperature increased by an average of 2°C per minute over the interval.', 'The temperature must rise forever.'], answer: 1, explanation: 'Slope describes a rate over the interval being examined. It does not replace the starting temperature or prove behavior beyond the data.'},
    action: 'Plot the three observations and the 6-minute prediction. Add a sentence identifying the next measurement that would test your extrapolation.',
    chapter: '22', chapterLabel: 'Mathematics becomes a physical language'
  },
  {
    id: 'trigonometry', title: 'Locate the end of the arm', track: 'math', level: 'Bridge', minutes: 20,
    hook: 'An angle becomes useful when it tells you where a tool will be.',
    skill: 'Resolve a length into horizontal and vertical components.',
    why: 'The same geometry appears in linkages, instrument mounts, and robot motion. A coordinate sketch gives sine and cosine a physical job.',
    story: [
      'Draw a rigid 0.30 m link with its pivot at the origin. Its angle is 60° counterclockwise from the positive horizontal axis. You want the endpoint coordinates, not a different physical link.',
      'The horizontal and vertical components are projections of the same length. Neither needs to equal the full 0.30 m. Together they must describe an endpoint that remains 0.30 m from the pivot. Keep the calculator in degree mode for this example.'
    ],
    steps: [
      'Label x horizontally and y vertically. With the angle measured from x, use x = L cos θ and y = L sin θ.',
      'Calculate x = 0.30 m × cos 60° = 0.30 × 0.5 = 0.150 m.',
      'Calculate y = 0.30 m × sin 60° ≈ 0.30 × 0.866 = 0.260 m.',
      'Check the distance: √(0.150² + 0.260²) ≈ 0.300 m. The small rounding difference comes from using only three decimals.'
    ],
    equation: '(x, y) = (L cos θ, L sin θ) ≈ (0.150 m, 0.260 m) for L = 0.30 m and θ = 60°',
    check: {question: 'Rotate the same link to 90° from the positive horizontal axis. Where is its endpoint?', options: ['(0.30 m, 0 m)', '(0.30 m, 0.30 m)', '(0 m, 0.30 m)'], answer: 2, explanation: 'At 90°, cos θ = 0 and sin θ = 1. The link points straight up, so its full length appears in the vertical component.'},
    action: 'Make a paper link and sketch its endpoint at 0°, 30°, 60°, and 90°. Predict which coordinate grows before calculating it.',
    chapter: '09', chapterLabel: 'Making motion answer to evidence'
  },
  {
    id: 'vectors', title: 'Let direction count', track: 'math', level: 'Bridge', minutes: 18,
    hook: 'Three newtons to the right plus four upward does not mean seven to the right.',
    skill: 'Add vector components and calculate a resultant magnitude.',
    why: 'Forces and displacements have directions. Component bookkeeping helps you see where a structure or moving object must respond.',
    story: [
      'Consider an ideal point acted on by two forces: 3 N to the right and 4 N upward. Choose right as positive x and up as positive y. This is a force sketch on paper; it is not a structural design or a prescription for a physical test.',
      'A vector keeps the directional information that a bare number loses. You combine x components with x components and y components with y components. Only afterward do you calculate the size of the combined force.'
    ],
    steps: [
      'Write the forces as ordered components: F₁ = (3 N, 0 N) and F₂ = (0 N, 4 N).',
      'Add matching components: F₁ + F₂ = (3 N, 4 N). Draw the diagonal from the origin to that point.',
      'Use the right triangle: magnitude = √(3² + 4²) N = √25 N = 5 N.',
      'A third force of (−3 N, −4 N) would make the vector sum zero. That balances this ideal point-force model; a real extended body also requires a moment balance.'
    ],
    equation: '(3, 0) N + (0, 4) N = (3, 4) N; magnitude = √(3² + 4²) N = 5 N',
    check: {question: 'Which additional force cancels the resultant (3 N, 4 N)?', options: ['(−3 N, −4 N)', '(−3 N, 4 N)', '(3 N, −4 N)'], answer: 0, explanation: 'Each component needs its opposite: 3 + (−3) = 0 and 4 + (−4) = 0. Reversing only one component leaves the other unbalanced.'},
    action: 'Draw the three arrows tip to tail on a square grid. Use the closed triangle to explain why the vector sum is zero.',
    chapter: '22', chapterLabel: 'Mathematics becomes a physical language'
  },
  {
    id: 'derivative', title: 'Catch a changing speed', track: 'math', level: 'Stretch', minutes: 25,
    hook: 'Knowing where a carriage is does not yet tell you how fast it is moving.',
    skill: 'Connect a position function, a local slope, and velocity.',
    why: 'The derivative gives changing motion a language. It lets you ask about speed at one instant instead of treating an entire journey as uniform.',
    story: [
      'Use a fictional motion model x(t) = (0.05 m/s²)t² for times from 0 to 3 seconds. The carriage starts at the origin. Because time is squared, equal time steps produce increasingly large position changes.',
      'Begin with two nearby positions rather than a differentiation rule. Their difference divided by elapsed time estimates a local speed. Calculus studies what happens as that time interval shrinks, assuming the position function is sufficiently smooth.'
    ],
    steps: [
      'At 1.9 s, x = 0.05 × 1.9² = 0.1805 m. At 2.1 s, x = 0.05 × 2.1² = 0.2205 m.',
      'The nearby average speed is (0.2205 − 0.1805) m / (2.1 − 1.9) s = 0.200 m/s.',
      'Differentiate the model: v(t) = (0.10 m/s²)t. At t = 2 s, v = 0.200 m/s. For this quadratic, the symmetric estimate matches exactly.',
      'Compare the whole first two seconds: x(2) = 0.20 m, so average speed from 0 to 2 s is 0.10 m/s. The final speed is larger because the carriage accelerated.'
    ],
    equation: 'x(t) = (0.05 m/s²)t²  →  v(t) = dx/dt = (0.10 m/s²)t',
    check: {question: 'What is the model’s instantaneous velocity at 3 s?', options: ['0.45 m/s', '0.30 m/s', '0.15 m/s'], answer: 1, explanation: 'Use v(3) = 0.10 × 3 = 0.30 m/s. The value 0.45 is the position in meters, not the velocity.'},
    action: 'Draw position and velocity on separate graphs. Explain why one curves upward while the other is a straight rising line.',
    chapter: '22', chapterLabel: 'Mathematics becomes a physical language'
  },
  {
    id: 'integral', title: 'Add up a motion', track: 'math', level: 'Stretch', minutes: 22,
    hook: 'The carriage did not spend the whole trip at its final speed.',
    skill: 'Find displacement from the area under a velocity–time graph.',
    why: 'Integration connects rates to accumulated quantities: velocity to displacement, power to energy, and flow rate to transferred volume.',
    story: [
      'A fictional carriage increases its velocity uniformly from 0 to 0.60 m/s over 3 seconds. It then continues at 0.60 m/s for another 2 seconds. The motion stays in the positive direction throughout.',
      'Draw velocity vertically and elapsed time horizontally. During acceleration the area beneath the graph is a triangle; during steady travel it is a rectangle. Adding their areas finds displacement without requiring advanced integration techniques.'
    ],
    steps: [
      'For the first interval, calculate the triangle area: ½ × 3 s × 0.60 m/s = 0.90 m.',
      'For the second interval, calculate the rectangle area: 2 s × 0.60 m/s = 1.20 m.',
      'Add the contributions: total displacement = 0.90 + 1.20 = 2.10 m.',
      'Check a tempting shortcut: final velocity × all 5 seconds gives 3.00 m. It overestimates travel because the carriage was slower during the first 3 seconds.'
    ],
    equation: 'displacement = ∫ velocity dt = ½(3 s)(0.60 m/s) + (2 s)(0.60 m/s) = 2.10 m',
    check: {question: 'A separate model has a constant velocity of 0.40 m/s for 5 s. What is its displacement?', options: ['0.08 m', '5.40 m', '2.00 m'], answer: 2, explanation: 'The area is a rectangle: 0.40 m/s × 5 s = 2.00 m. The seconds cancel, so the result has units of distance.'},
    action: 'Shade the triangle and rectangle on your graph. Then sketch a return trip with negative velocity and explain why signed displacement can differ from total distance traveled.',
    chapter: '11', chapterLabel: 'The factory has a pulse'
  },
  {
    id: 'uncertainty', title: 'Ask whether it still fits', track: 'math', level: 'Bridge', minutes: 22,
    hook: 'Two nominal dimensions look compatible. Their possible variation is the real question.',
    skill: 'Calculate a worst-case interval and state what its bounds mean.',
    why: 'Reasoning with variation helps you design a fit that survives imperfect parts and measurements instead of trusting a single attractive number.',
    story: [
      'A fictional opening is 20.00 ± 0.05 mm wide. A tongue intended to enter it is 19.80 ± 0.04 mm wide. In this exercise, the ± values are stipulated dimensional bounds, not standard deviations or statistical confidence intervals.',
      'The one-dimensional clearance is opening width minus tongue width. Its smallest value combines the smallest opening with the largest tongue. This bound checks width only; surface shape, angular misalignment, and temperature could still affect a real insertion.'
    ],
    steps: [
      'Write the opening interval: 19.95 to 20.05 mm. Write the tongue interval: 19.76 to 19.84 mm.',
      'Calculate nominal clearance: 20.00 − 19.80 = 0.20 mm.',
      'Calculate minimum clearance: 19.95 − 19.84 = 0.11 mm. Calculate maximum clearance: 20.05 − 19.76 = 0.29 mm.',
      'Report the complete result: width clearance lies between 0.11 and 0.29 mm under these bounds. Do not turn this into a claim that the entire assembly is qualified.'
    ],
    equation: 'minimum clearance = minimum opening − maximum tongue = 19.95 mm − 19.84 mm = 0.11 mm',
    check: {question: 'Change the tongue to 19.95 ± 0.04 mm. What is the new minimum clearance?', options: ['−0.04 mm, so interference is possible', '+0.05 mm, so every combination fits', '+0.14 mm, so clearance always increases'], answer: 0, explanation: 'The largest tongue is 19.99 mm. Subtracting it from the smallest opening, 19.95 mm, gives −0.04 mm. Nominal clearance alone hid this possibility.'},
    action: 'Draw the two dimensional intervals on a number line. Mark the unfavorable pair and explain why both extremes must be considered together.',
    chapter: '05', chapterLabel: 'How a factory learns to trust a measurement'
  },
  {
    id: 'exponential', title: 'Follow a repeated multiplier', track: 'math', level: 'Bridge', minutes: 20,
    hook: 'Halving an error repeatedly follows a different pattern from subtracting a fixed amount.',
    skill: 'Interpret powers as repeated multiplication and distinguish exponential from linear change.',
    why: 'Repeated multipliers appear in growth models and error reduction. Recognizing the pattern helps you question both dramatic forecasts and promises of effortless precision.',
    story: [
      'Imagine an ideal paper calculation that starts with a 16 mm position error. Each correction leaves exactly half the previous error. An iteration is one correction step; no duration in seconds has been assigned.',
      'This is a mathematical teaching rule, not a controller to install on a robot. Real motion includes measurement limits, delay, friction, and other effects. The model helps you understand the pattern before asking whether a physical system follows it.'
    ],
    steps: [
      'Start at step 0 with 16 mm. After one step, 16 × ½ = 8 mm; after two, 8 × ½ = 4 mm.',
      'Continue: step 3 gives 2 mm and step 4 gives 1 mm. Each step removes half the current error, not a fixed number of millimeters.',
      'Write the pattern compactly: eₙ = 16 mm × (½)ⁿ, where n counts correction steps.',
      'Compare a linear rule that subtracts 4 mm each step: 16, 12, 8, 4, 0. The halving rule stays positive at every finite step in exact arithmetic.'
    ],
    equation: 'remaining error after n steps: eₙ = 16 mm × (½)ⁿ',
    check: {question: 'Under the exact halving rule, what error remains after five correction steps?', options: ['0 mm', '0.5 mm', '5 mm'], answer: 1, explanation: '16 × (½)⁵ = 16 / 32 = 0.5 mm. The model approaches zero but does not reach it after a finite number of steps.'},
    action: 'Make a table for steps 0 through 6. Add a hypothetical 0.2 mm measurement resolution and explain why ever-smaller model errors would become harder to observe.',
    chapter: '09', chapterLabel: 'Making motion answer to evidence'
  },
  {
    id: 'writing', title: 'Write something another person can test', track: 'general', level: 'Foundation', minutes: 22,
    hook: '“Easy to assemble” is a promising intention. It still leaves everyone guessing.',
    skill: 'Turn a vague claim into a bounded requirement and an honest result.',
    why: 'Writing gives intentions a form others can act on. Clear scope and precise verbs can prevent disagreements from becoming expensive hardware.',
    story: [
      'Suppose you are describing a harmless cardboard module for a class project. “Easy to assemble” could mean quick, comfortable, intuitive, or hard to install incorrectly. Choose one question before deciding what evidence would answer it.',
      'For this exercise, define an illustrative timed test: five beginners perform three recorded trials each after one practice trial. Your chosen acceptance rule is at least 14 of the 15 recorded trials completed within 90 seconds without help or damage. These thresholds are a classroom choice, not an industry standard.'
    ],
    steps: [
      'Replace “easy” with the observable outcome: completion within 90 s, without help or damage, under the stated procedure.',
      'State the denominator: 5 participants × 3 recorded trials = 15 trials. Keep practice trials separate.',
      'Imagine 14 qualifying successes and one assisted trial. Report 14/15 ≈ 93.3% observed success, including the assisted trial in the record.',
      'Conclude that this prototype met this test’s rule. Describe the failed trial and what another test should investigate.'
    ],
    equation: 'recorded trials = 5 × 3 = 15; observed qualifying success = 14 / 15 ≈ 93.3%',
    check: {question: 'What does the hypothetical 14-of-15 result justify?', options: ['The module is easy for every possible user.', 'The assisted trial can be omitted.', 'The module met the stated rule in this bounded test.'], answer: 2, explanation: 'The requirement and result align for this procedure. Broader claims would need evidence covering other users, circumstances, and definitions of ease.'},
    action: 'Rewrite one vague sentence from a current assignment. Add an observable outcome, scope, and a way someone else could check it.',
    chapter: '03', chapterLabel: 'From an intention to an accepted artifact'
  },
  {
    id: 'research', title: 'Separate the claim from the evidence', track: 'general', level: 'Foundation', minutes: 25,
    hook: 'A polished demonstration can be real and still answer only a small part of your question.',
    skill: 'Compare a claim, its supporting record, and its limits.',
    why: 'Research literacy lets you stay curious about ambitious technology while making decisions from evidence that actually supports them.',
    story: [
      'Use a fictional source packet: an announcement says a robot assembled 20 modules; a short video shows two successful attempts; a trial table records 18 unassisted completions and two completions requiring human help. No environmental variation is documented.',
      'These statements can all be true. The important work is identifying what each establishes. A selected video shows that those actions happened. The fuller table helps describe the recorded test. Neither, by itself, proves performance across every part variation or a long production shift.'
    ],
    steps: [
      'Write the exact question: how often did this setup finish without human help in the recorded trials?',
      'Use the table’s denominator: 18 unassisted completions / 20 trials = 90% observed unassisted success.',
      'Preserve the distinction between eventual completion and unassisted completion. The headline’s 20 assemblies does not answer both questions.',
      'Name the missing evidence: trial conditions, unsuccessful sequences, selection of examples, and performance under a specified change in part position.'
    ],
    equation: 'observed unassisted success = 18 / 20 = 90% in the recorded test',
    check: {question: 'Which sentence is supported by this fictional packet?', options: ['The table records 18 unassisted completions in 20 trials.', 'The robot can assemble any module.', 'The two video clips prove 100% reliability.'], answer: 0, explanation: 'The first sentence stays within the available record. Universal capability and long-run reliability require evidence beyond these selected demonstrations and twenty trials.'},
    action: 'Take one source from your coursework. Make three short columns: claim, evidence you can inspect, and what remains unknown. Keep its title and link beside the notes.',
    chapter: '13', chapterLabel: 'Intelligence needs an evidence system'
  },
  {
    id: 'history', title: 'Find the people inside the progress story', track: 'general', level: 'Bridge', minutes: 25,
    hook: '“The new machine changed everything” leaves out most of the interesting investigation.',
    skill: 'Build a chronology, consider competing causes, and interpret a source in context.',
    why: 'Historical reasoning shows how tools, institutions, skills, and choices develop together. It reveals supporting work hidden by a story centered on one machine.',
    story: [
      'Practice with a fictional workshop archive. One week, 30 of 50 parts pass inspection. The next week, 40 of 50 pass. During the changeover the workshop receives a new tool, introduces a new fixture, and trains its operators.',
      'A manager credits the new tool alone. A training note emphasizes technique; a fixture sketch emphasizes alignment. These sources may reflect different responsibilities and interests. Compare their evidence before assigning a single cause.'
    ],
    steps: [
      'Calculate the observed pass rates: 30/50 = 60% before and 40/50 = 80% afterward.',
      'Describe the difference accurately: an increase of 20 percentage points. Do not confuse this with a 20% relative increase.',
      'Place the tool, fixture, training, and results on one timeline. Their simultaneous arrival prevents this comparison from isolating one cause.',
      'Write a bounded conclusion: acceptance improved during several changes. Then identify a useful additional record, such as trials separating the fixture change from the tool change.'
    ],
    equation: 'observed change = 80% − 60% = 20 percentage points',
    check: {question: 'Which historical interpretation best fits this limited record?', options: ['The new tool caused the entire improvement.', 'Acceptance improved while several changes occurred; their separate contributions remain unresolved.', 'Training could not have mattered because a machine was purchased.'], answer: 1, explanation: 'Chronology establishes what happened together. Identifying the separate effects requires more evidence, and the different accounts deserve examination rather than automatic acceptance.'},
    action: 'For a historical event in a GE course, draw a timeline with one technology, one institution, and one group of people. Add the evidence behind each connection.',
    chapter: '02', chapterLabel: 'How industry learned to repeat itself'
  },
  {
    id: 'ethics', title: 'Ask who carries the consequence', track: 'general', level: 'Bridge', minutes: 25,
    hook: 'A faster process can move a burden onto someone the stopwatch never counted.',
    skill: 'Identify affected people, preserve inconvenient evidence, and make a bounded decision.',
    why: 'Ethical reasoning helps identify whose experience belongs in the evaluation and which consequences deserve attention.',
    story: [
      'Compare two fictional cardboard layouts. A’s nominal task time averages 40 seconds in ten trials, with one incorrect start. B averages 50 seconds with none observed in ten trials. Recovery time and differences among users are undocumented.',
      'Before choosing the faster layout, consider the beginner doing the task, the person correcting mistakes, and the next person relying on the result. Costs and frustrations may fall on different people.'
    ],
    steps: [
      'Record both performance dimensions: A was 10 s faster on average, and one incorrect start was observed. Keep the trial counts attached.',
      'Project 100 cycles × 10 s = 1,000 s, or 16 min 40 s difference. This excludes recovery and assumes the averages remain representative.',
      'Identify missing consequences: recovery effort, confusing cues, accessibility, and the effect of an undetected error on the next person.',
      'Propose further trials that record those outcomes and vary users. State a provisional choice with conditions instead of claiming that zero observed errors proves zero risk.'
    ],
    equation: 'nominal time difference for 100 cycles = 100 × 10 s = 1,000 s = 16 min 40 s',
    check: {question: 'What is the most defensible next step?', options: ['Delete A’s incorrect start because it slows the comparison.', 'Declare B incapable of error after ten trials.', 'Preserve both results and investigate recovery, access, and who bears mistakes.'], answer: 2, explanation: 'The limited experiment reveals tradeoffs but does not settle them. Including affected people and missing consequences improves the decision without pretending uncertainty has disappeared.'},
    action: 'Choose a design decision. Name three affected people, a benefit, a burden, and evidence that could change your judgment.',
    chapter: '25', chapterLabel: 'The people who make capability repeatable'
  },
  {
    id: 'economics', title: 'Find when the better tool pays back', track: 'general', level: 'Bridge', minutes: 22,
    hook: 'The cheaper fixture can cost more to use. The answer depends on how much work you actually need.',
    skill: 'Compare fixed and variable costs and solve a break-even model.',
    why: 'Economics makes a comparison of alternatives, assumptions, and opportunity costs explicit. Show what your model omits.',
    story: [
      'In a fictional classroom estimate, fixture A costs $20 and takes 6 minutes per part. Fixture B costs $80 and takes 3 minutes per part. Assign time an illustrative value of $12 per hour. These are chosen inputs, not market prices or purchasing advice.',
      'Assume both fixtures produce equally acceptable parts and have no other cost differences. Actual decisions would also examine quality, maintenance, training, and whether saved time can be used productively. The simple model lets you see the volume-dependent trade first.'
    ],
    steps: [
      'Convert the time value: $12/hour ÷ 60 min/hour = $0.20/min.',
      'Compute variable costs: A uses 6 × $0.20 = $1.20 per part; B uses 3 × $0.20 = $0.60 per part.',
      'Set total costs equal: 20 + 1.20n = 80 + 0.60n. Rearranging gives 0.60n = 60, so n = 100 parts.',
      'At 150 parts, A costs $20 + $180 = $200; B costs $80 + $90 = $170. The modeled saving is $30.'
    ],
    equation: 'C_A = $20 + ($1.20/part)n; C_B = $80 + ($0.60/part)n; break-even n = 100 parts',
    check: {question: 'Under the stated assumptions, which option costs less for 150 parts?', options: ['B, by $30', 'A, by $60', 'They cost the same at every volume'], answer: 0, explanation: 'The total costs are $200 and $170. B recovers its higher initial cost after the 100-part break-even point, provided the model’s assumptions hold.'},
    action: 'Sketch both cost lines for 0 to 200 parts. Add one omitted factor that might move their intersection or make the comparison unsuitable.',
    chapter: '12', chapterLabel: 'Why another robot may change nothing'
  },
  {
    id: 'communication', title: 'Help another person make the next decision', track: 'general', level: 'Bridge', minutes: 20,
    hook: 'The same test result needs a different explanation at the bench, in a review, and in a notebook.',
    skill: 'Adapt emphasis to an audience while keeping facts and uncertainty consistent.',
    why: 'Communication connects individual understanding to coordinated work. A useful explanation helps its listener decide what to do or investigate next.',
    story: [
      'Use a fictional record from a cardboard placement task: 11 of 12 trials pass on the first attempt. One requires repositioning. You have a sketch and a photograph of that trial, but no evidence yet establishing its cause.',
      'An analyst needs conditions and raw observations. A classmate repeating the task needs a clear starting procedure and a definition of success. A reviewer deciding on the next revision needs the result, its limitation, and a proposed next test. All three deserve the same underlying facts.'
    ],
    steps: [
      'Write the common factual core: 11/12 ≈ 91.7% first-pass success; one trial required repositioning.',
      'For the analyst, add the trial order, starting conditions, and the unedited record. Label the failure’s cause unresolved.',
      'For the classmate, show the initial placement and explain exactly what counts as help or repositioning, so the procedure can be repeated.',
      'For the reviewer, propose an alignment-cue change and a predefined comparison. Explain which outcome would support keeping it.'
    ],
    equation: 'observed first-pass success = 11 / 12 ≈ 91.7%; one trial required repositioning',
    check: {question: 'Which headline communicates this record most faithfully?', options: ['The design always works because every part eventually fit.', 'Eleven of twelve placements passed first time; one required repositioning.', 'The fixture is unreliable in every situation.'], answer: 1, explanation: 'The middle statement reports both the success count and the exception without extending the claim beyond the observed task.'},
    action: 'Explain one course result for three audiences. Keep the result unchanged; change the detail each person needs to use it.',
    chapter: '24', chapterLabel: 'Twelve projects that earn their complexity'
  }
];

export const pathways = [
  {
    id: 'make-it-legible', title: 'Make the problem legible',
    description: 'Give numbers a scale, give claims a denominator, and give your intentions words another person can test. Start here or revisit a mission whenever a later example feels slippery.',
    missionIds: ['units', 'ratios', 'writing', 'research']
  },
  {
    id: 'describe-the-mechanism', title: 'Describe what the mechanism does',
    description: 'Rearrange a relationship, read a graph, and place motion in space. A sketch and a calculator are enough to begin predicting the behavior of a paper mechanism.',
    missionIds: ['algebra', 'slope', 'trigonometry', 'vectors']
  },
  {
    id: 'reason-through-change', title: 'Reason through change and limits',
    description: 'Connect rate to accumulation, account for variation, and follow a repeated multiplier. Move between tables, sketches, and equations until you can explain the same idea in each form.',
    missionIds: ['derivative', 'integral', 'uncertainty', 'exponential']
  },
  {
    id: 'make-work-useful', title: 'Make the work useful to people',
    description: 'Investigate how change happened, who carries its consequences, what an alternative costs, and how to communicate a result. Use your GE assignments as places to practice these questions in depth.',
    missionIds: ['history', 'ethics', 'economics', 'communication']
  }
];
