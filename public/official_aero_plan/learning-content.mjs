// Original learning activities and editorial guidance. Institutional claims carry
// direct links and a review date; none of these activities grants course credit.
const checked = '2026-10-31';
const link = (title, url) => ({ title, url });

export const foundations = [
  {
    id: 'arithmetic-estimation', title: 'Arithmetic & estimation',
    why: 'A quick estimate gives you an independent way to challenge a calculator, spreadsheet or simulation. Precision is useful only after the answer is in the right neighborhood.',
    example: 'A small assembly contains 8 parts of 0.24 kg each. First estimate 8 × 0.25 ≈ 2 kg; then calculate 1.92 kg. A software result of 19.2 kg should immediately look suspicious.',
    diagnostic: 'Six identical components each have a mass of 0.35 kg. What is the total mass in kg?',
    answer: '2.1', answerDisplay: '2.1 kg',
    explanation: '6 × 0.35 = 2.10. A rough check is 6 × one-third ≈ 2, so the scale is plausible.',
    transferPrompt: 'Without calculating exactly, decide whether 19 parts at 0.098 kg each are closer to 0.2 kg, 2 kg or 20 kg. Explain the estimate.',
    masteryCheck: 'Estimate first, compute second, and explain why the decimal point belongs where it does.'
  },
  {
    id: 'fractions-ratios', title: 'Fractions, ratios & proportions',
    why: 'Ratios describe gear relationships, mixture composition, efficiency and scale. Fractions are ordinary quantities with a numerator and a denominator, not a separate kind of mysterious arithmetic.',
    example: 'A model uses a scale of 1:20. A 0.6 m model dimension represents 12 m at full scale because every model meter corresponds to 20 real meters. Always say which quantity is in the numerator.',
    diagnostic: 'A 3/4 m strip is divided into 3 equal pieces. How long is each piece in meters?',
    answer: '0.25', answerDisplay: '1/4 m = 0.25 m', acceptedAnswers: ['1/4', '0.25'],
    explanation: '(3/4) ÷ 3 = (3/4) × (1/3) = 1/4. Three quarter-meter pieces reconstruct the original length.',
    transferPrompt: 'A drawing is scaled to 1:5. Its area is 40 cm². Does the full-size area become 200 cm² or 1,000 cm²? Draw a small square to justify the scale factor.',
    masteryCheck: 'Name both quantities in a ratio and distinguish length scaling from area or volume scaling.'
  },
  {
    id: 'signed-quantities', title: 'Negative numbers & direction',
    why: 'A negative value often describes direction relative to a chosen axis. Confusing a sign convention with the physical situation can reverse the meaning of a correct-looking calculation.',
    example: 'Choose right as positive. Moving 5 m right and then 8 m left gives displacement 5 + (−8) = −3 m. The distance traveled is 13 m. Those answers describe different things.',
    diagnostic: 'A sensor reads −6 °C and then warms by 9 °C. What is the final temperature in °C?',
    answer: '3', answerDisplay: '3 °C',
    explanation: 'Final temperature = starting temperature + change = −6 + 9 = 3. A positive change can begin below zero.',
    transferPrompt: 'A cart moves at −2 m/s and has acceleration +1 m/s². Is it initially speeding up or slowing down? Describe the motion before it reaches zero velocity.',
    masteryCheck: 'State the positive direction and separate position, displacement, speed and signed velocity.'
  },
  {
    id: 'powers-roots', title: 'Exponents, roots & scientific notation',
    why: 'Engineering spans tiny sensor signals and large orbital distances. Powers make that range manageable; roots and squared quantities appear in geometry, energy and uncertainty.',
    example: '(3 × 10³)(2 × 10⁻²) = 6 × 10¹ = 60. Multiply the leading numbers and add the powers of ten. The exponent is part of the quantity, not decoration.',
    diagnostic: 'A square has an area of 0.81 m². What is its positive side length in meters?',
    answer: '0.9', answerDisplay: '0.9 m',
    explanation: 'The side is √0.81 = 0.9 because 0.9 × 0.9 = 0.81. Taking the square root also changes m² to m.',
    transferPrompt: 'If speed doubles, what happens to a quantity proportional to speed squared? How would your answer differ for a quantity proportional to the square root of speed?',
    masteryCheck: 'Explain the scaling behavior, and check roots by multiplying back.'
  },
  {
    id: 'algebra-expressions', title: 'Algebraic expressions',
    why: 'An expression records structure. Distributing, factoring and collecting terms let you see which parameters actually control a model before inserting numbers.',
    example: 'A repeated assembly costs 3(p + 4) in a simple model. Distributing gives 3p + 12, not 3p + 4. Both forms describe the same relationship, but each highlights something different.',
    diagnostic: 'Simplify 4(x + 2) − 3x, then evaluate the result when x = 5.',
    answer: '13', answerDisplay: 'x + 8; at x = 5, the value is 13',
    explanation: 'Distribute first: 4x + 8 − 3x = x + 8. Substituting into either form gives 13.',
    transferPrompt: 'Explain why (a + b)² differs from a² + b² using a square divided into smaller regions.',
    masteryCheck: 'Show an equivalent form and verify it with one numerical substitution without treating that check as a general proof.'
  },
  {
    id: 'equations-inequalities', title: 'Equations & inequalities',
    why: 'Solving an equation is a way to isolate an unknown while preserving a relationship. Inequalities express constraints such as a maximum mass or a minimum clearance.',
    example: 'From V = IR, divide both sides by R to obtain I = V/R, assuming R ≠ 0. If V is in volts and R in ohms, the result is in amperes. The assumption and units belong with the rearrangement.',
    diagnostic: 'Solve 3x + 7 = 22.',
    answer: '5', answerDisplay: 'x = 5',
    explanation: 'Subtract 7 from both sides to obtain 3x = 15; divide both sides by 3. Check: 3(5) + 7 = 22.',
    transferPrompt: 'A simple mass budget is 2m + 3 ≤ 11 kg. Find the allowed values of nonnegative m and explain what the inequality means physically.',
    masteryCheck: 'Name the operation applied to both sides and check the candidate solution in the original relationship.'
  },
  {
    id: 'functions', title: 'Functions & inputs',
    why: 'A function states how an output depends on an input under specified assumptions. It is the bridge between a physical question, a graph and a piece of code.',
    example: 'For a deliberately simple constant-speed model x(t) = 2 + 3t, time t is measured in seconds and position x in meters. The model starts at 2 m and adds 3 m each second; it is not a rule for every possible motion.',
    diagnostic: 'For f(t) = 2t² + 1, what is f(3)?',
    answer: '19', answerDisplay: '19',
    explanation: 'Replace every t with 3: 2 × 3² + 1 = 2 × 9 + 1 = 19. f(3) is an output, not f multiplied by 3.',
    transferPrompt: 'For a battery-use model E(t) = 100 − 4t Wh, identify a physically sensible time domain and explain why extending the line forever would be misleading.',
    masteryCheck: 'Identify input, output, units, domain and the assumptions that make the relationship useful.'
  },
  {
    id: 'graphs', title: 'Graphs, slope & interpretation',
    why: 'A graph is a compact physical argument. Its axes and units tell you what its slope or area can mean. A dramatic-looking curve with unlabeled axes tells you very little.',
    example: 'Position rises from 2 m to 14 m between t = 1 s and t = 4 s. Average velocity is (14 − 2)/(4 − 1) = 4 m/s. Use differences in both quantities, not a single point divided by another.',
    diagnostic: 'A line passes through (1, 3) and (5, 11). What is its slope?',
    answer: '2', answerDisplay: '2 units of y per unit of x',
    explanation: 'Slope = (11 − 3)/(5 − 1) = 8/4 = 2. Reversing both subtractions gives the same answer.',
    transferPrompt: 'Sketch a temperature that rises quickly and then levels off. Explain why its temperature can remain positive while its rate of change approaches zero.',
    masteryCheck: 'Describe the graph in words, label axes, and distinguish a quantity from its rate of change.'
  },
  {
    id: 'geometry', title: 'Geometry & spatial reasoning',
    why: 'Parts occupy space and must fit together. Geometry connects sketches, dimensions, surface area, volume and clearances before advanced design software enters the picture.',
    example: 'A rectangular box measuring 2 m × 1 m × 0.5 m has volume 1 m³. Its surface area is 2(2 × 1 + 2 × 0.5 + 1 × 0.5) = 7 m². Surface area and volume answer different engineering questions.',
    diagnostic: 'A right triangle has perpendicular legs of 6 cm and 8 cm. What is its hypotenuse in cm?',
    answer: '10', answerDisplay: '10 cm',
    explanation: 'c = √(6² + 8²) = √100 = 10. The hypotenuse must be longer than either leg.',
    transferPrompt: 'If every dimension of a solid model doubles, how do its surface area and volume change? What might that suggest about cooling a larger version?',
    masteryCheck: 'Draw the shape, distinguish area from volume, and test whether the dimension is physically plausible.'
  },
  {
    id: 'trigonometry', title: 'Trigonometry & angles',
    why: 'Trigonometry resolves a direction into components. The same relationships support forces, rotations, waves and geometric measurements.',
    example: 'A 10 N vector is 30° above a positive horizontal axis. Its components are Fx = 10 cos(30°) ≈ 8.66 N and Fy = 10 sin(30°) = 5 N. The angle definition determines which component uses sine.',
    diagnostic: 'A 12 N vector points 30° above the horizontal. What is its upward component in N?',
    answer: '6', answerDisplay: '6 N',
    explanation: 'The upward component is opposite the stated angle: 12 sin(30°) = 12 × 0.5 = 6. Check that your calculator uses degrees.',
    transferPrompt: 'Keep the vector magnitude fixed and rotate it toward 90°. Predict both components before calculating. Then describe the limiting case at 0°.',
    masteryCheck: 'Draw the angle, check degree/radian mode, and verify that component magnitudes make sense.'
  },
  {
    id: 'vectors', title: 'Vectors & coordinate systems',
    why: 'A vector combines size and direction. Components are a representation relative to axes, which makes the choice of coordinate frame part of the explanation.',
    example: 'Adding displacement vectors (3, 1) m and (−1, 4) m gives (2, 5) m. Add matching components; adding their magnitudes would answer a different question.',
    diagnostic: 'What is the magnitude of a vector with components (−3, 4)?',
    answer: '5', answerDisplay: '5',
    explanation: 'Magnitude = √[(−3)² + 4²] = √25 = 5. A negative component does not make the magnitude negative.',
    transferPrompt: 'Two equal forces point in opposite directions. Their magnitudes add to a positive number, so why is their vector sum zero?',
    masteryCheck: 'State the frame and distinguish vector addition from addition of scalar magnitudes.'
  },
  {
    id: 'units-modeling', title: 'Units & turning words into models',
    why: 'A model begins by deciding what quantities matter, how they relate and what you will ignore. Units are a continuous check on whether that relationship is coherent.',
    example: 'If a cart travels 9 m in 3 s, its average speed is 9 m / 3 s = 3 m/s. This does not prove it moved at constant speed. The calculation and the interpretation need separate checks.',
    diagnostic: 'Convert 72 km/h to meters per second.',
    answer: '20', answerDisplay: '20 m/s',
    explanation: '72 × (1,000 m / 1 km) × (1 h / 3,600 s) = 20 m/s. The old units cancel visibly.',
    transferPrompt: 'For a cooling object, list a possible input, an output, one assumption and one measurement that could show the model is inadequate. You do not need a differential equation yet.',
    masteryCheck: 'Define symbols and units, state an assumption, and identify a measurement or limiting case that could challenge the result.'
  }
];

export const studyGuides = [
  {
    id: 'meaning-of-fundamentals', title: 'Why the apparently tedious work matters',
    dek: 'A fraction, a unit conversion and a clear diagram are pieces of engineering judgment.',
    paragraphs: [
      'The distance between an algebra exercise and a spacecraft can feel enormous. Connect them through an action rather than a slogan. Rearranging an equation lets you ask which parameter controls a design. Trigonometry lets you describe a force in the frame your model uses. Writing a careful paragraph lets another person inspect your assumptions. Each skill removes a specific obstacle between an idea and a defensible result.',
      'You do not need to find every worksheet fascinating. Give a routine exercise a small purpose: become more reliable at handling negative signs, recognize a useful factorization, or estimate an answer before calculating. Reliability frees attention for unfamiliar decisions later. Finishing many questions while repeating the same hidden error is less useful than understanding one error and checking that the repair transfers.',
      'Keep a short connection note beside your work: “Today I practiced ___ so that I can eventually ___.” Make the first blank observable. “I can isolate a variable without changing the equation” is stronger than “I studied engineering math.” The larger ambition provides direction; the small demonstrated ability is the evidence that you are moving.'
    ],
    steps: ['Choose one narrow skill from the current course.', 'Solve a representative problem and explain the check you used.', 'Connect the skill to one project or physical question.', 'Save one clean example and one corrected mistake.'],
    practice: 'Take a unit-conversion problem and write two sentences explaining how an incorrect conversion could change a mass or energy budget.',
    reflection: 'What can you now do without help that you could not do at the start?'
  },
  {
    id: 'worked-example-fading', title: 'Move from a worked example to independent work',
    dek: 'Remove support gradually, then prove the method survives a different problem.',
    paragraphs: [
      'A worked solution is useful when you interrogate it. Before reading the next line, predict what the author is trying to accomplish. Ask why that operation preserves the equation, why a particular diagram was chosen, or why a quantity is treated as constant. Copying the symbols may produce a tidy page without revealing the decisions behind them.',
      'Use the example as temporary support. Start with 3x + 7 = 22: identify the goal, explain subtracting 7, and explain dividing by 3. Next solve 4x + 5 = 21 with the last line hidden. Then solve a similar problem from a blank page. Finally change the structure, for example 3(x + 2) = 21, so you have to choose an approach rather than imitate a pattern.',
      'If the blank-page attempt fails, reveal only the smallest missing piece. A hint that helps you choose the next operation leaves more reasoning for you than a complete answer. Record which decision required help. The aim is not to ban examples; it is to learn when you can leave them behind.'
    ],
    steps: ['Annotate the purpose of each line in one worked example.', 'Cover the final steps and complete them yourself.', 'Solve a fresh version with no solution visible.', 'Change one feature and explain whether the method still applies.'],
    practice: 'Solve 5(x − 2) = 20. Then explain two valid routes: divide first or distribute first.',
    reflection: 'Could you choose the first step without seeing the example?'
  },
  {
    id: 'retrieval-spacing', title: 'Check what remains after the explanation disappears',
    dek: 'Use small closed-note attempts and revisit the material after a gap.',
    paragraphs: [
      'Immediately after watching a clear explanation, the reasoning can feel available even when you cannot reproduce it. Close the material and try a modest task: draw the diagram, state the definition, explain the sign convention, or solve one short problem. Treat the attempt as information about what to practice next.',
      'Revisit important ideas in later sessions, alongside current work. There is no need to impose a fixed calendar that cannot survive your job or classes. Keep a small queue: a recent error, an older useful idea and something needed for the next topic. If an item is consistently easy without prompts, give attention to something less secure; if it has become fragile, return to a simpler example.',
      'A useful check asks for more than a memorized phrase. After recalling v = Δx/Δt, explain what each difference means, include units, and say why average velocity does not describe every moment of the trip. A short explanation plus an application gives you better evidence than recognizing a formula in a list.'
    ],
    steps: ['Choose a small task before opening your notes.', 'Attempt it from memory and mark uncertainty honestly.', 'Compare with a trusted solution and repair the exact gap.', 'Put a new version into a later study session.'],
    practice: 'From a blank page, explain displacement versus distance and construct an example where they differ.',
    reflection: 'Which part was retrievable, and which part only looked familiar?',
    evidenceNote: 'IES recommends spaced study and quizzes that revisit content. Its guide assigns different evidence levels to different recommendations; these concrete routines are original practical adaptations, not guaranteed results.',
    sources: [link('IES: Organizing Instruction and Study', 'https://ies.ed.gov/ncee/wwc/PracticeGuide/1')]
  },
  {
    id: 'choosing-methods', title: 'Practice choosing a method',
    dek: 'Once a technique is familiar, mix questions that require different decisions.',
    paragraphs: [
      'A page of identical exercises tells you which method to use before you begin. Real problems rarely provide that courtesy. After learning a technique with focused practice, include questions that ask you to distinguish it from neighboring ideas. A graph question may require slope, area, a value at a point, or simply a statement that the available information is insufficient.',
      'Mixing unfamiliar methods too early can turn practice into guessing. First establish a basic example of each method, then compare a small set. Write the reason for your choice before calculating. “The question asks for an average rate, so I need a change in output divided by a change in input” exposes more understanding than a correct number with no rationale.',
      'Keep the comparison small enough to inspect. For a geometry session, use one perimeter problem, one area problem and one volume problem. Explain why their answers use different units. When a mistake appears, decide whether you chose the wrong model or executed the right model incorrectly. Those failures need different repairs.'
    ],
    steps: ['Learn a clear example of each candidate method.', 'Choose a small mixed set without labeling the method.', 'Write your selection reason before doing arithmetic.', 'After checking, compare the clues that distinguish the problems.'],
    practice: 'Create three questions about the same rectangular box: one answered in meters, one in square meters and one in cubic meters.',
    reflection: 'Did the difficulty come from choosing the model or carrying it out?'
  },
  {
    id: 'error-log', title: 'Keep an error log that changes your next attempt',
    dek: 'An error becomes useful when it produces a specific correction and a later check.',
    paragraphs: [
      'A useful error log is short enough to maintain. Record the problem, the first incorrect step, what you believed at that moment, and the correction. Avoid labels such as “careless” when a more precise description is available. “I distributed the 3 to x but not to 4” suggests a repair; “I am bad at algebra” does not.',
      'Separate four possibilities: missing concept, wrong method, execution error and interpretation error. You might calculate a vector magnitude correctly and still describe it as a signed velocity. You might know the equation but substitute centimeters into a calculation otherwise using meters. Look for the earliest point where your reasoning stopped matching the problem.',
      'Finish the entry with a changed procedure and a small retest. For the distribution error, circle the grouped expression and write both products before simplifying. Later, solve a fresh problem with a negative multiplier. If the error returns, the procedure needs more work; the log is a tool for adjustment, not a record of personal defects.'
    ],
    steps: ['Preserve the first wrong line instead of erasing all evidence.', 'Classify the failure and explain it in one precise sentence.', 'Write a concrete correction or checking habit.', 'Try a different problem later and record whether the repair held.'],
    practice: 'Diagnose this claim: 2(a + 3) = 2a + 3. Explain the error, repair it and verify with a = 4.',
    reflection: 'What will you do differently before the next mistake happens?'
  },
  {
    id: 'getting-unstuck', title: 'Get unstuck without surrendering the problem',
    dek: 'Turn confusion into a question that a tutor, instructor or future you can answer.',
    paragraphs: [
      'When a problem stops moving, make the blockage visible. Write what is given, what is requested, the units, and the point where you no longer know what to do. Draw a simpler version. Try a limiting case or a smaller number. Often the obstacle is hidden in an undefined quantity, an unfamiliar word or a prerequisite you have not used recently.',
      'Distinguish productive effort from repeating the same failed action. If several attempts add no new information, change the representation or seek a focused hint. Bring your work to office hours or tutoring and ask, “I chose this equation because ___. Which assumption is wrong?” That gives the other person something concrete to diagnose.',
      'After receiving help, close the explanation and reconstruct the solution yourself. Then attempt a nearby problem. A completed homework answer can hide an unresolved gap; a second independent attempt reveals whether the assistance changed your understanding. Keep difficult questions available for later review without allowing one question to consume every remaining study opportunity.'
    ],
    steps: ['Restate the problem in plain language.', 'Draw or tabulate what is known and define the unknown.', 'Name the exact decision that blocks progress.', 'Ask for one hint, reconstruct the reasoning, and try a new version.'],
    practice: 'Write a tutoring question that includes your attempted method and the exact line you cannot justify.',
    reflection: 'What new information did your last attempt produce?'
  },
  {
    id: 'capacity-recovery', title: 'Build a workload that leaves room to recover',
    dek: 'Use observed effort to tune the plan; protect the conditions that let you think.',
    paragraphs: [
      'A course load is a hypothesis about your available time. Listed units do not describe every lab meeting, commute, team discussion or difficult assignment. Begin with the actual scheduled commitments, then estimate independent work and leave room for disruption. A plan that uses every available hour has no capacity for an ordinary bad week.',
      'After a representative period, compare estimates with what happened. Which task took longer, and why? Did work obligations move? Was the problem an unfamiliar prerequisite or an overly ambitious course combination? Use that evidence to adjust the next term instead of treating the original estimate as a promise you must keep at any cost.',
      'Avoid making reduced sleep the recurring answer to an overloaded plan. Protect a workable sleep routine, breaks and basic life responsibilities while adjusting the academic load or seeking support. When tired work becomes repetitive and unproductive, capture a restart note: the known quantities, last valid step and next question. That makes returning easier without pretending persistence must mean continuing indefinitely.'
    ],
    steps: ['List fixed commitments and actual course meeting times.', 'Estimate study, labs, commuting and group work separately.', 'Leave unassigned capacity and observe actual effort.', 'Review workload before adding a course or a large extracurricular project.'],
    practice: 'Compare a 5-unit laboratory course with a 3-unit lecture using their actual contact hours and your own assignment estimates.',
    reflection: 'Which commitment could change before sleep becomes the permanent buffer?'
  },
  {
    id: 'ai-understanding', title: 'Use AI, then test what you understand',
    dek: 'A polished explanation is an input. Your independent reasoning is the outcome.',
    paragraphs: [
      'Use an assistant to generate a hint, compare explanations or pose a new practice question. Ask it to expose assumptions and check units. Then verify important claims against your course materials or an official source. Confident wording is not evidence that an equation, citation or academic requirement is correct.',
      'Make the boundary between assistance and your work visible. If a tool writes a simulation, predict a simple case before running it. Explain every parameter, change one condition and describe the expected effect. Reduce the model to a case you can calculate by hand. If you cannot explain why the result changes, the code is not yet a reliable demonstration of your understanding.',
      'For coursework, follow the instructor’s rules. For a portfolio, record what you designed, what tools helped produce and what you personally verified. A good understanding test has four parts: explain it without the generated prose, reconstruct a small part, apply it in a new context and identify where it fails. Asking for increasingly impressive outputs cannot substitute for those checks.'
    ],
    steps: ['Attempt the problem before requesting help.', 'Ask for a hint or critique of your reasoning.', 'Check the answer with units, a special case or an independent reference.', 'Close the assistant and solve or explain a changed version.'],
    practice: 'Ask for a deliberately flawed unit conversion. Find the error yourself and explain why the corrected units cancel.',
    reflection: 'What evidence shows that you understand the result rather than merely possess it?'
  }
];

export const startTasks = [
  { id:'student-status', title:'Confirm your Southwestern student status', why:'An old application or welcome email does not establish current registration eligibility.', doneCriterion:'You can access the correct MySWC account and know whether a new or returning-student application is needed.', url:'https://www.swccd.edu/classes-and-registration/class-schedule/' },
  { id:'credit-record', title:'Establish the actual starting record', why:'Existing credit, placement and current confidence are different inputs to the plan.', doneCriterion:'You have reviewed any unofficial transcript and recorded only courses actually earned; missing records remain unknown.', url:'https://www.swccd.edu/admissions-and-financial-aid/tuition-and-fees/' },
  { id:'placement', title:'Confirm math placement and readiness', why:'Choose an eligible starting course while deliberately repairing any skills that would make it difficult.', doneCriterion:'The college confirms your enrollment route, and a short diagnostic identifies the next skills to practice.', url:'https://catalog.swccd.edu/student-success-support-program/steps-success-applying-registering/placement/' },
  { id:'prereq-clearance', title:'Resolve chemistry and prerequisite clearance', why:'Equivalent prior preparation may change which preparatory courses are necessary.', doneCriterion:'You know whether CHEM 170 or another accepted route is needed for CHEM 200, and any clearance process is documented.', url:'https://catalog.swccd.edu/course-descriptions/chem/' },
  { id:'counseling-plan', title:'Bring a focused plan to counseling', why:'A shared course list and a few precise questions make an advising appointment productive.', doneCriterion:'An appointment is scheduled or completed, with UCSD aerospace as the primary goal and SDSU questions listed separately.', url:'https://www.swccd.edu/classes-and-registration/class-schedule/' },
  { id:'spring-sections', title:'Inspect real spring sections', why:'A course in a catalog is not a section that fits your life or has an available seat.', doneCriterion:'You have checked your appointment, holds, actual meeting times, modality and one backup option for a manageable spring 2027 load.', url:'https://www.swccd.edu/classes-and-registration/class-schedule/' },
  { id:'capacity-trial', title:'Test a realistic study capacity', why:'A sustainable workload should be based on observed effort alongside work and other obligations.', doneCriterion:'You have compared planned and actual study time across representative weeks and identified what can flex without relying on repeated sleep loss.' },
  { id:'cost-aid', title:'Build a private cost and aid checklist', why:'Enrollment fees, total costs and awarded financial aid are different things.', doneCriterion:'You have checked application and aid status through official channels and estimated tuition, fees, materials and transport without assuming an award.', url:'https://www.swccd.edu/admissions-and-financial-aid/tuition-and-fees/' },
  { id:'support-network', title:'Identify one practical source of support', why:'Knowing where to ask early is easier than searching for help after several missed assignments.', doneCriterion:'You know a current tutoring or office-hours option and have checked MESA eligibility if interested.', url:'https://www.swccd.edu/student-support/mesa-program/' },
  { id:'first-artifact', title:'Start an engineering notebook', why:'Small, well-explained results become evidence of growing capability.', doneCriterion:'You have one dated entry with a question, sketch or model, units, a check and one limitation; it can be a simple measurement exercise.' }
];

export const advisingQuestions = [
  {id:'agreement-year', title:'Which agreement year governs each course?', question:'For my actual attendance and transfer years, which Southwestern–UCSD ASSIST agreement applies, and how will any course taken at another college be evaluated?', why:'The 2026–27 snapshot is not a permanent guarantee for a later transfer.', sources:[link('ASSIST', 'https://assist.org/')]},
  {id:'math-credit', title:'Confirm the mathematics routes and credit', question:'Does my applicable agreement give MATH 252 both MATH 20C and 20E, and should I choose MATH 253 or ENGR 280 for MATH 20D? How will my actual record be credited?', why:'A single earned course must not be counted twice, and alternatives should not silently become extra requirements.', sources:[link('UCSD transfer math equivalencies', 'https://math.ucsd.edu/students/undergraduate/transfer-equivalencies'),link('ASSIST', 'https://assist.org/')]},
  {id:'mechanics-credit', title:'Confirm the statics and dynamics combination', question:'Does ENGR 250 together with ENGR 251 satisfy MAE 30A for my agreement year, with ENGR 251 also satisfying MAE 30B? Is a departmental petition required after transfer?', why:'An AND relationship cannot be replaced with a one-course shortcut.', sources:[link('ASSIST', 'https://assist.org/'),link('UCSD MAE catalog', 'https://catalog.ucsd.edu/curric/MAE-ug.html')]},
  {id:'screening-conflict', title:'Resolve the screening wording', question:'For my application cycle, confirm PHYS 2CL and the programming requirement or recommendation. Central admissions, the department template and generic catalog prose differ.', why:'Plan against the current central screening list while obtaining a clear answer about conflicting wording.', sources:[link('UCSD screening requirements', 'https://admissions.ucsd.edu/transfer/transfer-major-preparation.html'),link('UCSD MAE catalog', 'https://catalog.ucsd.edu/curric/MAE-ug.html')]},
  {id:'placement-chemistry', title:'Choose preparation without unnecessary repetition', question:'What math placement and prerequisite-clearance routes apply to me, and what accepted preparation can satisfy CHEM 200 entry?', why:'A skill gap may need practice or support without requiring every possible preparatory course.', sources:[link('Southwestern mathematics', 'https://catalog.swccd.edu/course-descriptions/math/'),link('Southwestern chemistry', 'https://catalog.swccd.edu/course-descriptions/chem/')]},
  {id:'elective-sequence', title:'Fit the specialization into the degree', question:'Which approved electives will actually run, how can MAE 113 precede MAE 114 given current fall offerings, and is MAE 184 accepted for Astrodynamics under my catalog year?', why:'An attractive elective list can become an extra year if prerequisites and offerings are ignored.', sources:[link('Specialization policy', 'https://mae.ucsd.edu/undergrad/aero-eng-specializations'),link('MAE offerings', 'https://mae.ucsd.edu/courses')]},
  {id:'college-workload', title:'Check remaining GE and work compatibility', question:'Given my eventual UCSD college and certification, which college and university requirements remain? What actual class/lab schedule and part-time rules would apply to my employment situation?', why:'Generic GE placeholders and conditional part-time status are not a personalized completion plan.', sources:[link('UCSD college requirements', 'https://catalog.ucsd.edu/undergraduate/colleges/index.html'),link('Part-time study', 'https://students.ucsd.edu/academics/enroll/special-enrollment/parttime-halftime-study/part-time-study.html')]},
  {id:'sdsu-pathway', title:'Evaluate SDSU with its own rules', question:'Which Southwestern-to-SDSU aerospace preparation and local transfer pathway applies to my full course history, and what remaining university sequence would that leave?', why:'UCSD mappings and the separate SDCCD City/Mesa/Miramar agreement cannot be assumed to apply.', sources:[link('SDSU transfer pathways', 'https://admissions.sdsu.edu/transfers/transfer-pathways'),link('SDSU minimum transfer requirements', 'https://admissions.sdsu.edu/transfers/minimum-requirements')]}
];

export const campusOpportunities = [
  {id:'swc-mesa', title:'Southwestern MESA', stage:'Before transfer', status:'Eligibility check', checked, summary:'A local STEM support community with tutoring, advising, mentorship and opportunities to investigate.', access:'MESA has eligibility criteria; interest does not establish membership or an internship award.', action:'Read the current page, check eligibility and use its interest process if appropriate. Bring your actual course plan to the conversation.', sources:[link('Southwestern MESA program', 'https://www.swccd.edu/student-support/mesa-program/')]},
  {id:'ncas', title:'NASA Community College Aerospace Scholars', stage:'During community college', status:'Current rules; cycle check required', checked, summary:'A structured virtual challenge connecting community-college learning with aerospace work and career exploration.', access:'Current rules include age 18+, U.S. citizenship, enrollment at an eligible accredited community college, and enrollment in or completion of at least six credit hours of relevant STEM/technical coursework. Check all rules; personal eligibility is unknown.', action:'Inspect the current student rules and timeline once your coursework qualifies. Use the redesigned program rules instead of older three-mission descriptions; participation is not a NASA job offer.', sources:[link('NCAS student rules', 'https://nasa-ncas.org/student-rules/'),link('NASA program redesign', 'https://www.nasa.gov/learning-resources/linking-community-college-studies-to-aerospace-careers/')]},
  {id:'transfer-prep', title:'Jacobs Transfer Prep', stage:'After admission, before university classes', status:'2026 cycle closed; future cycle unknown', checked, summary:'The published program introduces incoming engineering transfers to campus, peers, mentoring and engineering-study expectations.', access:'The current page requires accepted admission to Jacobs; places are limited. Its 2026 four-day program and application are already closed.', action:'Return to the page after admission and verify the relevant year, application window, travel arrangements and availability. Do not treat an old deadline as a future opportunity.', sources:[link('Jacobs Transfer Prep', 'https://jacobsschool.ucsd.edu/idea/admitted-undergraduates/transfer-summer-prep')]},
  {id:'envision', title:'EnVision maker studio', stage:'After UCSD enrollment', status:'Access and training required', checked, summary:'A place to connect a modest CAD model, prototype and test plan with fabrication tools.', access:'UCSD undergraduate engineering students are among the listed eligible groups. The studio requires its responsibility contract and access confirmation, with training for specific machines. Community-college attendance alone does not grant access.', action:'After eligibility is established, complete the portal process and machine training. Bring a small, testable part rather than an oversized first build.', sources:[link('EnVision access instructions', 'https://jacobsschool.ucsd.edu/envision')]},
  {id:'ucsd-teams', title:'Engineering student organizations and project teams', stage:'Explore now; join when eligible', status:'Current activity and membership to confirm', checked, summary:'Teams can turn a small individual skill into work that another subsystem depends on. The useful question is what contribution you can reliably own.', access:'MAE links to engineering organizations and campus directories. Membership, recruiting periods, shop access and time commitments differ by group.', action:'Use the official directory to find current groups. Ask about onboarding, beginner tasks and weekly expectations; choose a bounded task that fits your academic load.', sources:[link('MAE involvement directory', 'https://mae.ucsd.edu/undergrad/get-involved')]},
  {id:'arc-research', title:'Advanced Robotics and Controls Lab', stage:'After relevant coursework and a documented project', status:'Research lead; no placement guaranteed', checked, summary:'A concrete example of the bridge from dynamics, programming and experiments to robotics research.', access:'The lab publishes separate undergraduate/MS inquiry instructions, including a CV and university transcripts, with a portfolio encouraged. Its PhD expectations should not be mistaken for undergraduate entry requirements.', action:'Read the lab’s work, identify one precise technical connection, and prepare an honest project summary before considering an inquiry. Verify current openings and eligibility; the site does not send an application.', sources:[link('ARCLAB opportunities', 'https://ucsdarclab.com/opportunities/')]}
];

export const resources = [
  {id:'existing-math', title:'Your Math Prep environment', stage:'Foundation through calculus readiness', type:'Existing personal learning site', url:'https://www.christrovato.com/math_prep', why:'Return to the established lessons and practice system for sustained work. Use this roadmap to decide what matters next, then practice there.', use:'Pick one relevant skill, produce a written attempt and bring the resulting question back to your course or tutor.'},
  {id:'openstax-prealgebra', title:'OpenStax — Prealgebra 2e', stage:'Arithmetic, fractions, ratios and signed numbers', type:'Open textbook', url:'https://openstax.org/details/books/prealgebra-2e', why:'A reference for rebuilding the operations that later algebra assumes.', use:'Select the section matching an actual error; solve several exercises before moving to a new topic. Reading the whole book first is not an enrollment requirement.'},
  {id:'openstax-algebra-trig', title:'OpenStax — Algebra and Trigonometry 2e', stage:'Algebra, functions and trigonometry', type:'Open textbook', url:'https://openstax.org/details/books/algebra-and-trigonometry-2e', why:'A source of explanations and exercises for the language used in calculus and mechanics.', use:'Match the material to your current course or placement preparation. Explain an example, solve a new one and revisit a missed prerequisite.'},
  {id:'mit-calculus', title:'MIT OCW — Single Variable Calculus', stage:'After suitable algebra and trigonometry preparation', type:'University course materials', url:'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/', why:'A structured calculus course with notes, worked examples, problem sets and exams for independent study.', use:'Use a selected unit alongside your course; attempt the problems before reading solutions. This is college-level material, not a substitute for prerequisites.'},
  {id:'ies-study', title:'IES — Organizing Instruction and Study', stage:'Throughout the journey', type:'Research practice guide', url:'https://ies.ed.gov/ncee/wwc/PracticeGuide/1', why:'Evidence-informed guidance on spaced practice, worked examples, quizzes and explanatory questions.', use:'Read the stated evidence levels and adapt one practice to your situation. The original guide dates to 2007; it does not prescribe a universal schedule or guarantee an outcome.'},
  {id:'nasa-systems', title:'NASA — Systems Engineering Fundamentals', stage:'From a first small project onward', type:'Engineering reference', url:'https://www.nasa.gov/reference/2-0-fundamentals-of-systems-engineering/', why:'A vocabulary for requirements, interfaces, verification and the purpose a system serves.', use:'Borrow a small useful idea, such as a measurable requirement and a corresponding test. Do not impose a large aerospace organization’s entire process on a tabletop project.'},
  {id:'official-articulation', title:'ASSIST', stage:'Before course decisions and transfer review', type:'Official articulation system', url:'https://assist.org/', why:'The correct agreement connects a particular college, university, academic year and major.', use:'Confirm all four selectors. Read AND/OR relationships carefully and preserve the agreement year with the plan.'},
  {id:'ucsd-official', title:'UCSD MAE course offerings', stage:'Planning the university sequence', type:'Annual department schedule', url:'https://mae.ucsd.edu/courses', why:'A degree plan only works if its prerequisite courses and electives are offered in usable terms.', use:'Recheck each academic year. Distinguish confirmed current offerings from a future assumption and use the catalog for course descriptions.'}
];

export const learningReviewDate = checked;
