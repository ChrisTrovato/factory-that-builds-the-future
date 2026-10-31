// Course facts: SWC 2026–2027 catalog and Cal-GETC list, reviewed 2026-10-31.
// Learning previews and numerical examples are original, not official assignments.
// A learning connection is not an enrollment prerequisite or an articulation.
const reviewed = '2026-10-31';
const catalog = 'https://catalog.swccd.edu/';
const geURL = `${catalog}certificates-certifications-degrees-csuuc-requirements/intersegmental-general-education-transfer-curriculum-igetc/`;
const departments = {
  nc: 'Noncredit', math: 'Mathematics', phys: 'Physics', chem: 'Chemistry',
  engr: 'Engineering', engl: 'English', comm: 'Communication', biol: 'Biology',
  art: 'Art', phil: 'Philosophy', psyc: 'Psychology', econ: 'Economics',
  soc: 'Sociology', mas: 'Mexican-American Studies',
};
export const swcSources = [
  ...Object.entries(departments).map(([key, title]) => ({
    id: `swc-journey-${key}`, title: `Southwestern ${title} course descriptions`,
    url: `${catalog}course-descriptions/${key}/`, institution: 'Southwestern College',
    checked: reviewed, status: 'official-search-index-verified', year: '2026–2027',
    use: 'Current course identity, units, enrollment conditions, transfer designation and subject coverage. Official indexed HTML rechecked; direct automated retrieval encountered a JavaScript verification gate. Catalog offering labels are not a published future section schedule.',
  })),
  { id: 'swc-journey-ge', title: 'Southwestern Cal-GETC approved courses and rules', url: geURL,
    institution: 'Southwestern College', checked: reviewed, status: 'official-search-index-verified', year: '2026–2027',
    use: 'Area approvals, one-area restriction, science/laboratory pattern, grades, certification and transfer-credit-limit notices.' },
  { id: 'swc-journey-ccn', title: 'Southwestern Common Course Numbering', url: `${catalog}ccn/`,
    institution: 'Southwestern College', checked: reviewed, status: 'official-search-index-verified', year: '2026–2027',
    use: 'Current and former English, communication, psychology, economics and calculus identities.' },
  { id: 'swc-journey-uc-ge', title: 'UC Admissions: Cal-GETC',
    url: 'https://admission.universityofcalifornia.edu/admission-requirements/transfer-requirements/preparing-to-transfer/general-education-igetc/cal-getc/',
    institution: 'University of California', checked: reviewed, status: 'official-page-verified', year: 'Current page',
    use: 'Subject pattern, two social-science disciplines, laboratory, 34-unit minimum, grades and full certification before transfer.' },
  { id: 'swc-journey-uc-admission', title: 'UC: Presenting Yourself on the Transfer Application',
    url: 'https://admission.universityofcalifornia.edu/counselors/_files/documents/presenting-yourself-on-the-uc-application-transfer.pdf',
    institution: 'University of California', checked: reviewed, status: 'official-search-index-verified', year: 'Fall 2026 presentation',
    use: 'Cal-GETC is not an admission requirement; major preparation remains a separate priority.' },
  { id: 'swc-journey-ucsd-transfer', title: 'UC San Diego transfer application requirements',
    url: 'https://admissions.ucsd.edu/transfer/application-requirements.html',
    institution: 'UC San Diego', checked: reviewed, status: 'official-search-index-verified', year: 'Current page',
    use: '60 UC-transferable semester-unit admission minimum; 70-semester/105-quarter lower-division unit-credit ceiling with possible subject credit beyond it.' },
  { id: 'swc-assist-uc-math', title: 'ASSIST: Southwestern UC Transferable Course Agreement — Mathematics',
    url: 'https://assist.org/transfer/results?year=77&institution=138&type=UCTCA&view=transferability&viewBy=dept&viewSendingAgreements=false&viewByKey=mathematics',
    institution: 'ASSIST / Southwestern College / University of California', checked: reviewed,
    status: 'verified-primary', year: '2026–2027',
    use: 'Live Chrome verification: combined College Algebra/Precalculus credit limited to one course and at most 5 semester/7.5 quarter units. No credit for MATH 101/244 taken after MATH 121,122 or C2210. MATH 104 is absent from the UC-transferable list.' },
];

const resourcesFor = (department, extra = []) => [
  ...extra,
  { title: `Official SWC ${departments[department]} catalog`, url: `${catalog}course-descriptions/${department}/` },
];
const mathPath = (path, title) => ({ title, url: `https://www.christrovato.com/math_prep#path/${path}` });
const learning = (about, ideas, task, solution, buildsOn, opens, use, projectIds = [], frontierIds = [], resources = []) =>
  ({ about, ideas, task, solution, buildsOn, opens, use, projectIds, frontierIds, resources });
function course(code, title, units, subject, routeRole, department, lesson, options = {}) {
  const areas = options.geAreas || [];
  return {
    code, title, units, institution: 'Southwestern College', institutionId: 'swc',
    unitSystem: 'semester', subject, stage: routeRole === 'preparation' ? 'preparation' : 'transfer',
    routeRole, aliases: [], prerequisites: [], corequisites: [],
    prerequisiteText: 'No course prerequisite is listed in the current catalog.',
    transferability: units === 0 ? 'noncredit' : 'UC', geAreas: areas,
    discipline: code.split(' ')[0],
    sourceIds: [`swc-journey-${department}`, ...(areas.length ? ['swc-journey-ge'] : [])],
    reviewed, evidenceStatus: 'official-search-index-verified',
    ...options,
    learning: { ...lesson, resources: resourcesFor(department, lesson.resources) },
  };
}
const algebraEntry = 'Intermediate-algebra proficiency through the college multiple-measures process. The refresher sequence shown here is a learning route, not an official prerequisite ladder.';
const readingRecommendation = 'College-level reading preparation is recommended; the catalog does not make a prior course a prerequisite.';

export const swcCourseUpdates = [
  course('NC 1025', 'Arithmetic Refresher', 0, 'math', 'preparation', 'nc', learning(
    'Make quantities feel manageable: whole numbers, fractions, decimals, percentages, ratios and rates. An individualized refresher can target a gap without making every topic a separate semester.',
    ['A fraction is a number and a proportion, not two unrelated integers.', 'Percent means per hundred; units give a rate its meaning.', 'Estimate first, calculate, then ask whether the result fits.'],
    'A 2.4 m strip is divided into pieces 0.30 m long. How many whole pieces fit, ignoring cutting loss?',
    '2.4 ÷ 0.30 = 8. The metres cancel, leaving a count. Check: 8 × 0.30 m = 2.4 m.',
    [], ['NC 143'], 'Reliable measurements, budgets and conversions begin here. Speed matters less than knowing what the numbers represent.', ['p01'], [], [mathPath('arithmetic', 'Arithmetic: quantities, fractions and percentages')]
  ), { prerequisiteText: 'No prerequisite listed. Zero-unit, noncredit preparation; take only the refresher you need.' }),
  course('NC 143', 'Algebra Skills', 0, 'math', 'preparation', 'nc', learning(
    'Move from numerical calculations to unknown quantities. Elementary algebra gives you a language for describing a relationship and finding the value that makes it true.',
    ['Signed numbers describe direction and changes.', 'An equation stays balanced when the same operation is applied to both sides.', 'Substitution checks a proposed answer.'],
    'A simple cost model is C = 12 + 4n. If C = 40, how many identical parts were purchased?',
    'Subtract 12: 28 = 4n. Divide by 4: n = 7. Substitution gives 12 + 4(7) = 40.',
    ['NC 1025'], ['NC 147'], 'Rearrange formulas instead of memorizing a separate version for every unknown.', ['p01'], [], [mathPath('prealgebra', 'Prealgebra: signed numbers and equations'), mathPath('algebra', 'Algebra: expressions, equations and graphs')]
  ), { aliases: ['NC 146'], aliasTitles: ['Algebra Refresher Level 1'],
    prerequisiteText: 'No prerequisite listed. NC 143 and NC 146 are identified as the same course in the catalog; do not stack them as separate required rungs.',
    courseNote: 'The catalog lists different instructional-hour formats for NC 143 and NC 146. Choose the available format appropriate to your needs; both earn zero units.' }),
  course('NC 147', 'Algebra Refresher Level 2', 0, 'math', 'preparation', 'nc', learning(
    'Refresh intermediate algebra selectively: work with more involved expressions, functions and equations until the operations have a reason you can explain.',
    ['Factoring reverses multiplication.', 'Equivalent expressions describe the same value where both are defined.', 'A graph and an equation are two views of one relationship.'],
    'Solve x² − 5x + 6 = 0, then check both results.',
    'Factor to (x − 2)(x − 3) = 0. A product is zero when a factor is zero, so x = 2 or 3. Both give zero in the original expression.',
    ['NC 143'], ['MATH 101', 'MATH 104', 'MATH 244'], 'Algebra fluency leaves more attention for the new ideas in chemistry, functions and calculus.', ['p01'], [], [mathPath('algebra2', 'Algebra II: functions and symbolic fluency')]
  ), { prerequisiteText: 'No prerequisite listed. The earlier arithmetic/algebra courses are suggested learning connections, not required prior enrollments.' }),
  course('NC 1148', 'Elementary and Intermediate Algebra Refresher', 0, 'math', 'preparation', 'nc', learning(
    'Use a combined, individualized algebra review when your needs span elementary and intermediate topics. This overlaps the level-one and level-two refreshers; it is another route through the bridge.',
    ['Diagnose the specific operation that causes difficulty.', 'Practice both solving equations and interpreting the answer.', 'Move between tables, graphs and formulas.'],
    'For y = 3x − 2, find y at x = 4 and then find x when y = 7.',
    'At x = 4, y = 10. With y = 7, add 2 to get 9 = 3x, so x = 3. Evaluating a function and solving an equation ask different questions.',
    ['NC 1025'], ['MATH 101', 'MATH 104', 'MATH 244'], 'A focused repair of weak skills can make the next credit course more understandable.', ['p01'], [], [mathPath('algebra', 'Algebra practice'), mathPath('algebra2', 'Intermediate algebra practice')]
  ), { prerequisiteText: 'No prerequisite listed. An overlapping alternative to separate algebra refreshers, not an additional required step.' }),
  course('NC 283', 'Support for College Algebra', 0, 'math', 'preparation', 'nc', learning(
    'A support class alongside College Algebra gives extra practice and instructor feedback on the algebra used in the main class.',
    ['Simplify expressions while preserving equality.', 'Identify a graph’s slope and intercept.', 'Use feedback to correct a recurring error pattern.'],
    'Simplify 2(x + 3) − x and evaluate the result at x = 4.',
    'Distribute first: 2x + 6 − x = x + 6. At x = 4 the value is 10. The original expression also gives 2(7) − 4 = 10.',
    ['NC 143'], ['MATH 101'], 'Support happens beside the credit course, so practice addresses the ideas you are using that week.', ['p01'], [], [mathPath('algebra', 'Algebra support practice')]
  ), { corequisites: [['MATH 101']], equivalentAlternatives: ['MATH 83'],
    prerequisiteText: 'Corequisite: MATH 101. The catalog lists credit MATH 83 as the equivalent support option; do not take both versions for the same support need.' }),
  course('NC 286', 'Support for Trigonometry and Precalculus', 0, 'math', 'preparation', 'nc', learning(
    'Revisit ratios, right triangles, graphs and equations alongside Trigonometry or Precalculus. Geometry is a skill bridge here, not an invented extra course requirement.',
    ['Draw the triangle before selecting a ratio.', 'Translate angle units deliberately.', 'Connect a graph’s features to the expression that creates them.'],
    'A right triangle has opposite side 3 and adjacent side 4. Find its hypotenuse and the sine of the marked angle.',
    'The hypotenuse is √(3² + 4²) = 5. Sine is opposite/hypotenuse, so sin θ = 3/5 = 0.6.',
    ['NC 147'], ['MATH 104', 'MATH 244'], 'A clean sketch can remove an algebra struggle before it starts.', ['p02'], ['repair'], [mathPath('geometry', 'Geometry bridge: triangles and measurement'), mathPath('precalculus', 'Trigonometry and precalculus practice')]
  ), { corequisites: [['MATH 104'], ['MATH 244']], equivalentAlternatives: ['MATH 86'],
    prerequisiteText: 'Corequisite: MATH 104 or MATH 244. Credit MATH 86 is the equivalent support alternative.' }),
  course('NC 287', 'Support for Calculus', 0, 'math', 'preparation', 'nc', learning(
    'Keep algebra and functions from obscuring the calculus idea. Extra guided practice accompanies Calculus I rather than delaying it with another compulsory rung.',
    ['Simplify a difference quotient before taking a limit.', 'Track parentheses and signs.', 'Explain each symbolic step in words.'],
    'For f(x) = x², simplify [f(x + h) − f(x)]/h when h ≠ 0.',
    'Expand (x + h)² = x² + 2xh + h². Subtract x² and divide by h to obtain 2x + h. The cancellation is valid for h ≠ 0; its limit is 2x.',
    ['MATH 101', 'MATH 104'], ['MATH C2210'], 'Recognizing the algebra underneath a new concept helps you ask a precise question when you get stuck.', ['p03'], [], [mathPath('algebra2', 'Algebra fluency for calculus'), mathPath('precalculus', 'Functions before calculus')]
  ), { corequisites: [['MATH C2210']], equivalentAlternatives: ['MATH 87'],
    prerequisiteText: 'Corequisite: MATH C2210. Credit MATH 87 is the equivalent support alternative. The catalog’s descriptive prose says applied calculus, but its explicit corequisite identifies C2210.' }),

  course('MATH 101', 'College Algebra', 3, 'math', 'preparation', 'math', learning(
    'Study functions as reusable relationships. Polynomial, rational, exponential and logarithmic models let you describe a system before calculus tells you how it changes.',
    ['A function maps an input to an output within a domain.', 'Inverse operations isolate an unknown.', 'Zeros, growth and graph shape reveal behavior.'],
    'Rearrange F = ma for m. If F = 18 N and a = 3 m/s², find the mass.',
    'Divide by a: m = F/a = 6 kg, since N = kg·m/s². This rearrangement assumes a is nonzero. Check: 6 × 3 = 18.',
    ['NC 147'], ['MATH C2210', 'CHEM 200'], 'You will isolate unknowns and examine functional relationships throughout mechanics, laboratory analysis and numerical modeling.', ['p01', 'p05'], ['heat'], [mathPath('algebra2', 'Functions and college-algebra foundations')]
  ), { geAreas: ['2'], prerequisiteText: `${algebraEntry} Placement may require MATH 83 or NC 283 support.`,
    sourceIds: ['swc-journey-math', 'swc-journey-ge', 'swc-assist-uc-math'],
    ucTransferUnits: 3, ucCreditGroup: 'college-algebra-precalculus',
    creditNote: 'UC awards credit for only one College Algebra/Precalculus course, capped at 5 semester units across the group. This course is 3 units. No UC credit if taken after MATH 121,122 or C2210. The separate SWC catalog cap is 6 earned units across 101/104/244; it is not the UC limit.' }),
  course('MATH 104', 'Trigonometry', 3, 'math', 'preparation', 'math', learning(
    'Translate between angles, lengths and repeating motion. The same sine and cosine that describe a triangle also describe rotation and oscillation.',
    ['Resolve a vector into perpendicular components.', 'Radians measure angle through arc length.', 'Trigonometric identities connect different descriptions of a motion.'],
    'A 10 N force points 30° above the positive horizontal axis. Find its horizontal and vertical components.',
    'Fx = 10 cos 30° ≈ 8.66 N and Fy = 10 sin 30° = 5 N. The vector magnitude check gives √(8.66² + 5²) ≈ 10 N.',
    ['NC 147'], ['MATH C2210', 'PHYS 270'], 'Link positions, flight-path angles and force diagrams become quantities you can calculate.', ['p02'], ['repair', 'assembly'], [mathPath('geometry', 'Geometry for components and angles'), mathPath('precalculus', 'Trigonometry: triangles, circles and functions')]
  ), { transferability: 'CSU-only', prerequisiteText: `${algebraEntry} Placement may require MATH 86 or NC 286 support. College Algebra is not a listed prerequisite.`,
    creditNote: 'The current catalog designates this course CSU-transferable, not UC-transferable. It supports calculus entry but does not contribute to the UC-transferable-unit subtotal.' }),
  course('MATH 244', 'Pre-Calculus with Trigonometry', 6, 'math', 'preparation', 'math', learning(
    'Combine college algebra and trigonometry in one six-unit course. It is the compact alternative to the 101-plus-104 route, with a larger amount of material in one term.',
    ['Read functions through formulas and graphs.', 'Relate angles to circular and periodic motion.', 'Choose a model and check its domain.'],
    'For h(t) = 2 + 0.5 sin(πt/3), identify the midline, amplitude and period.',
    'The midline is 2, amplitude 0.5 and period 2π/(π/3) = 6 time units. Values range from 1.5 to 2.5.',
    ['NC 147'], ['MATH C2210'], 'This route builds the same calculus-entry foundation in a single integrated class.', ['p02', 'p03'], ['repair'], [mathPath('precalculus', 'Integrated precalculus foundations')]
  ), { geAreas: ['2'], prerequisiteText: algebraEntry,
    sourceIds: ['swc-journey-math', 'swc-journey-ge', 'swc-assist-uc-math'],
    ucTransferUnits: 5, ucCreditGroup: 'college-algebra-precalculus',
    creditNote: 'An alternative to MATH 101 plus 104. The course earns 6 SWC semester units, but UC credit is limited to 5 semester/7.5 quarter units and only one College Algebra/Precalculus course. No UC credit if taken after MATH 121,122 or C2210. The SWC six-unit overlap cap is a different rule.' }),
  course('MATH C2210', 'Calculus I: Early Transcendentals', 5, 'math', 'required', 'math', learning(
    'Connect instantaneous change with accumulated change. A derivative describes local behavior; an integral adds small contributions to obtain a total.',
    ['Limits make instantaneous rates precise.', 'Derivatives support sensitivity and optimization.', 'The Fundamental Theorem links derivatives and integrals.'],
    'A position model is x(t) = 2t² metres, with t in seconds. Find velocity at t = 3 s and displacement from 0 to 3 s.',
    'v(t) = dx/dt = 4t m/s, so v(3) = 12 m/s. Displacement is x(3) − x(0) = 18 m; integrating 4t over the same interval also gives 18 m.',
    ['MATH 101', 'MATH 104', 'MATH 244'], ['MATH C2220', 'PHYS 270'], 'Motion data, changing loads and optimization begin to share one mathematical language.', ['p03'], ['orbits'], [mathPath('precalculus', 'Refresh functions before Calculus I')]
  ), { aliases: ['MATH 250'], geAreas: ['2'], prerequisites: [['MATH 244'], ['MATH 101', 'MATH 104']],
    prerequisiteText: 'MATH 244 OR both MATH 101 and 104; equivalent preparation or college multiple-measures placement is also accepted. The two precalculus paths rejoin here.' }),
  course('MATH C2220', 'Calculus II: Early Transcendentals', 4, 'math', 'required', 'math', learning(
    'Extend integration and learn to represent complicated functions with simpler pieces. Series, parametric curves and polar coordinates broaden the models you can analyze.',
    ['Choose integration techniques from the structure of a problem.', 'A series requires a convergence question, not just a sum.', 'Parameterization describes a path through space.'],
    'A varying force F(x) = 3x N acts from x = 0 to 2 m. How much work does it do?',
    'Work is the integral of force over displacement: ∫₀²3x dx = [1.5x²]₀² = 6 J. The triangular area under the force graph gives the same result.',
    ['MATH C2210'], ['MATH 252', 'MATH 253', 'MATH 254', 'PHYS 272', 'ENGR 221', 'ENGR 250', 'ENGR 280'], 'After this course, multivariable calculus, differential equations and linear algebra branch rather than forming one compulsory serial chain.', ['p05', 'p07'], ['orbits']
  ), { aliases: ['MATH 251'], geAreas: ['2'], prerequisites: [['MATH C2210']],
    prerequisiteText: 'MATH C2210, equivalent preparation, or college multiple-measures placement.' }),
  course('MATH 252', 'Analytic Geometry and Calculus III', 4, 'math', 'required', 'math', learning(
    'Extend calculus to quantities that depend on several coordinates. You can describe temperature over a surface, velocity through a volume and the flow across a boundary.',
    ['Partial derivatives change one input while holding others fixed.', 'Multiple integrals accumulate over areas and volumes.', 'Gradient, flux and circulation connect local fields to boundaries.'],
    'For T(x,y) = 20 + 2x + 3y °C with coordinates in metres, find the gradient and the temperature at (1,2).',
    '∇T = (2,3) °C/m; it points toward the steepest increase. T(1,2) = 28°C. A small displacement (dx,dy) changes temperature by about 2dx + 3dy.',
    ['MATH C2220'], ['PHYS 274', 'MAE 101A', 'MAE 105'], 'Fields and surfaces become calculable objects in fluid flow, heat transfer and electromagnetism.', ['p08'], ['heat', 'habitable']
  ), { geAreas: ['2'], prerequisites: [['MATH C2220']], prerequisiteText: 'MATH C2220 or equivalent.',
    creditNote: 'The verified articulation can satisfy both UCSD MATH 20C and 20E. You still earn this one four-semester-unit course once.' }),
  course('MATH 253', 'Introduction to Differential Equations', 3, 'math', 'choice', 'math', learning(
    'Start with a rule for how a system changes and solve for its behavior over time. Initial conditions select one motion or temperature history from a family of possible solutions.',
    ['A differential equation relates a quantity to its derivatives.', 'Initial conditions encode the starting state.', 'Exponential modes, forcing and Laplace transforms help explain system response.'],
    'A temperature difference θ follows dθ/dt = −0.2θ per minute, with θ(0) = 10°C. Find θ after 5 minutes.',
    'The solution is θ(t) = 10e^(−0.2t). At 5 minutes, θ ≈3.68°C. Differentiate the solution to check the equation and substitute t =0 to check the initial condition.',
    ['MATH C2220'], ['MAE 105', 'MAE 143A', 'MAE 143B'], 'You can reason about transients and stability instead of only comparing start and finish.', ['p06', 'p08'], ['heat', 'caretaker']
  ), { geAreas: ['2'], prerequisites: [['MATH C2220']], prerequisiteText: 'MATH C2220 or equivalent. MATH 254 is not a listed prerequisite.',
    creditNote: 'The default route to UCSD MATH 20D. ENGR 280 is the documented alternative, not another mandatory requirement.' }),
  course('MATH 254', 'Introduction to Linear Algebra', 3, 'math', 'required', 'math', learning(
    'Handle interacting quantities together. Vectors and matrices describe coordinate changes, simultaneous equations and directions that a system treats in a special way.',
    ['A matrix represents a linear transformation.', 'Linear systems distinguish unique, multiple and impossible solutions.', 'Eigenvectors identify directions preserved by a transformation.'],
    'Rotate the vector(2,1) by 90° counterclockwise using R = [[0,−1],[1,0]].',
    'Multiply rows by the vector: R(2,1) = (−1,2). Its length remains√5, so the rotation has changed direction without stretching it.',
    ['MATH C2220'], ['MAE 105', 'MAE 107', 'MAE 143A'], 'Coordinate frames, robot motion, state-space control and data fitting all rely on this structure.', ['p02', 'p06'], ['repair', 'caretaker']
  ), { geAreas: ['2'], prerequisites: [['MATH C2220']], prerequisiteText: 'MATH C2220 or equivalent. Differential Equations is not a listed prerequisite.' }),

  course('PHYS 270', 'Principles of Physics I', 4, 'physics', 'required', 'phys', learning(
    'Use calculus to connect motion, forces, energy and momentum. The central habit is choosing the system and drawing what acts on it before calculating.',
    ['A net force changes momentum.', 'Energy methods can avoid solving every moment of a motion.', 'Rotational motion has its own geometry and inertia.'],
    'A 2 kg cart on a horizontal surface has a 10 N pull and 2 N opposing resistance. Find acceleration.',
    'The horizontal net force is 10 −2 =8 N. Newton’s law gives a =8/2 =4 m/s² in the pull direction. Weight and support force balance vertically in this model.',
    ['MATH C2210', 'MATH 104'], ['PHYS 272', 'PHYS 271', 'ENGR 250'], 'A free-body diagram becomes the bridge from a real mechanism to a defensible mathematical model.', ['p03', 'p04'], ['assembly', 'repair']
  ), { geAreas: ['5A'], prerequisites: [['MATH C2210']], prerequisiteText: 'MATH C2210, equivalent preparation, or college multiple-measures placement.' }),
  course('PHYS 271', 'Principles of Physics Laboratory I', 1, 'physics', 'optional', 'phys', learning(
    'Test mechanics with measurements and learn how apparatus, uncertainty and modeling choices influence a conclusion.',
    ['Repeatability differs from accuracy.', 'A graph can test a physical model.', 'Report assumptions with measured results.'],
    'Five length readings are 20.1,20.0,20.2,20.1 and 20.1 cm. Find the mean and describe one limitation.',
    'The mean is 20.1 cm; the range is 0.2 cm. Repeating readings helps reveal scatter, but a miscalibrated ruler could bias every value together.',
    ['PHYS 270'], ['MAE 170'], 'Optional mechanics-laboratory practice strengthens the prediction-versus-measurement habit.', ['p01', 'p04'], ['assembly']
  ), { geAreas: ['5C'], prerequisites: [['PHYS 270']], prerequisiteText: 'PHYS 270 or equivalent is a prerequisite, not a concurrent-enrollment rule in the current entry.',
    creditNote: 'Optional for this UCSD preparation example; it does not replace the documented PHYS 273→PHYS 2CL mapping.' }),
  course('PHYS 272', 'Principles of Physics II', 4, 'physics', 'required', 'phys', learning(
    'Study electric and magnetic fields, circuits and fluid mechanics. A field describes an influence throughout space; a circuit concentrates that reasoning into connected components.',
    ['Potential differences can drive electric current.', 'Electric and magnetic fields store energy.', 'Conservation relationships help model fluid flow.'],
    'An ideal 12 V source drives a 6 Ω resistor. Find current and power dissipated in the resistor.',
    'Ohm’s law gives I =V/R =2 A. Power is P =VI =24 W. The model assumes a constant resistance and an ideal source.',
    ['PHYS 270', 'MATH C2220'], ['PHYS 273', 'PHYS 274', 'MAE 101A'], 'Sensors, actuators, power budgets and fluid systems become less mysterious when you can track energy and flow.', ['p08', 'p11'], ['habitable', 'heat']
  ), { geAreas: ['5A'], prerequisites: [['PHYS 270', 'MATH C2220']], prerequisiteText: 'PHYS 270 or equivalent AND MATH C2220/equivalent or accepted college placement.' }),
  course('PHYS 273', 'Principles of Physics Laboratory II', 1, 'physics', 'required', 'phys', learning(
    'Compare electricity and magnetism models with laboratory evidence. Careful measurements and uncertainty statements matter as much as obtaining the expected value.',
    ['An instrument becomes part of the experimental system.', 'Fit a relationship across several measurements.', 'Explain disagreement before discarding inconvenient data.'],
    'A resistor produces currents 0.10,0.20 and 0.30 A at voltages 1,2 and 3 V. Estimate its resistance.',
    'The slope of V against I is(3−1)/(0.30−0.10) =10 Ω. All three pairs give V/I =10 Ω. Real measurements would also need uncertainty and instrument-limit checks.',
    ['PHYS 272'], ['MAE 170', 'MAE 175A'], 'This laboratory is part of the documented UCSD aerospace transfer preparation and prepares you to defend test results.', ['p01', 'p12'], ['caretaker']
  ), { geAreas: ['5C'], corequisites: [['PHYS 272']], prerequisiteText: 'Corequisite PHYS 272; it may have been completed previously.', corequisitesMayBePrior: true }),
  course('PHYS 274', 'Principles of Physics III', 4, 'physics', 'required', 'phys', learning(
    'Connect thermodynamics, waves, optics and introductory modern physics. These topics explain how energy spreads, how signals propagate and where classical models reach their limits.',
    ['Energy conservation does not by itself determine which processes occur.', 'Waves connect frequency, wavelength and propagation speed.', 'Optical and atomic models are useful within stated assumptions.'],
    'A wave travels at 340 m/s with frequency 170 Hz. What is its wavelength?',
    'Use v = fλ: λ =340/170 =2 m. Hertz means cycles per second; dividing speed by frequency gives length per cycle.',
    ['PHYS 272', 'MATH 252'], ['PHYS 275', 'MAE 11', 'MAE 101B'], 'Thermal budgets, vibration, sensing and optics extend the same physics into engineering subsystems.', ['p08'], ['heat', 'extremes']
  ), { geAreas: ['5A'], prerequisites: [['PHYS 272']], corequisites: [['MATH 252']], corequisitesMayBePrior: true,
    prerequisiteText: 'PHYS 272 or equivalent; MATH 252 must be taken concurrently or already completed.' }),
  course('PHYS 275', 'Principles of Physics Laboratory III', 1, 'physics', 'optional', 'phys', learning(
    'Explore thermal, wave and optical behavior through experiments. Turn an observed pattern into an estimated physical quantity and a statement of how much to trust it.',
    ['Geometry connects a measurement to a model parameter.', 'Repeated observations reveal variation.', 'Calibration and simplifying assumptions affect the result.'],
    'For a thin converging lens, an object is 30 cm away and its image 60 cm away. Estimate focal length.',
    'The thin-lens relation is 1/f =1/30 +1/60 =1/20, so f =20 cm. This uses the stated real-object/real-image distances and the thin-lens approximation.',
    ['PHYS 274'], ['MAE 170', 'MAE 175A'], 'Optional experimental depth for optical and thermal reasoning; useful without being a universal additional transfer requirement.', ['p01', 'p12'], ['heat', 'extremes']
  ), { geAreas: ['5C'], corequisites: [['PHYS 274']], corequisitesMayBePrior: true,
    prerequisiteText: 'Corequisite PHYS 274; it may have been completed previously. Catalog normally lists spring; consult the actual published schedule.',
    creditNote: 'Optional in the default UCSD route. The catalog description has a self-reference typo; the explicit corequisite is PHYS 274.' }),

  course('CHEM 170', 'Preparation for General Chemistry', 4, 'science', 'preparation', 'chem', learning(
    'Build the vocabulary, quantitative habits and laboratory foundations needed for the faster general-chemistry course. It is conditional preparation; accepted equivalent chemistry background can satisfy the entry rule.',
    ['Atoms and molecules connect formulas to matter.', 'The mole links particle counts to measurable mass.', 'Dimensional analysis guides a multistep calculation.'],
    'A sample has mass 9 g and molar mass 18 g/mol. How many moles are present?',
    'n = mass/molar mass =9/(18) =0.50 mol. Units g divided by g/mol leave mol. The result is a quantity of substance, not a volume.',
    ['NC 147'], ['CHEM 200'], 'A clear unit trail and accurate measurements make quantitative chemistry more dependable.', ['p01'], ['habitable']
  ), { geAreas: ['5A', '5C'], prerequisiteText: algebraEntry,
    creditNote: 'UC-transferable with laboratory, but taken only if needed for CHEM 200 entry. Applicable UC chemistry credit limitations require the current transfer agreement.' }),
  course('CHEM 200', 'General Chemistry I', 5, 'science', 'required', 'chem', learning(
    'Relate the structure of matter to reactions, energy and measurable chemical quantities. The laboratory is a substantial part of the course: quantitative conclusions must survive contact with real measurements.',
    ['Balanced equations conserve atoms.', 'Bonding and molecular structure affect properties.', 'Thermochemistry and equilibrium describe energy and reaction behavior.'],
    'For 2H₂ + O₂ →2H₂O, how many moles of water can form from 3 mol H₂ and 1 mol O₂?',
    'One mole O₂ consumes 2 mol H₂ and produces 2 mol H₂O. Oxygen is limiting;1 mol H₂ remains. The theoretical water yield is 2 mol, before losses or incomplete reaction.',
    ['CHEM 170'], ['MAE 11', 'MAE 113'], 'Material behavior, energy accounting and measurement quality become part of how you evaluate an engineering system.', ['p08', 'p11'], ['habitable', 'heat']
  ), { geAreas: ['5A', '5C'], prerequisites: [['CHEM 170']],
    prerequisiteText: 'CHEM 170 or accepted equivalent AND intermediate-algebra proficiency through multiple measures. MATH 101/121/244 are recommended preparation, not additional compulsory prerequisites.',
    creditNote: 'Maps to UCSD CHEM 6A. The same five-unit course can supply Cal-GETC physical science and its associated laboratory; count the earned units once.' }),

  course('ENGR 221', 'Computer Programming and Applications — MATLAB', 3, 'engineering', 'required', 'engr', learning(
    'Turn a mathematical model into a program you can inspect and test. Arrays, functions and numerical methods help solve problems whose answers are impractical to obtain by hand.',
    ['Choose variables, units and data structures deliberately.', 'A numerical method introduces approximation error.', 'Test a program against a case with a known answer.'],
    'Estimate ∫₀²x² dx with the trapezoidal rule using x =0,1,2, then compare with the exact integral.',
    'Values are 0,1,4. With step 1, the estimate is½(0+1)+½(1+4) =3. The exact value is 8/3 ≈2.667, so the estimate is high by about 0.333. More intervals test convergence.',
    ['MATH C2220'], ['MAE 107', 'MAE 143B'], 'A plot becomes evidence only when you know what the program computes and how you checked it.', ['p05', 'p07'], ['orbits', 'caretaker']
  ), { prerequisites: [['MATH C2220']], prerequisiteText: 'MATH C2220/equivalent or accepted college multiple-measures placement.', creditNote: 'Documented preparation for UCSD MAE 8.' }),
  course('ENGR 250', 'Engineering Statics', 3, 'engineering', 'required', 'engr', learning(
    'Analyze objects in equilibrium. Forces and moments connect supports and loads to the internal demands on a structure or mechanism.',
    ['Isolate the body and show every external force.', 'Moment depends on force and perpendicular lever arm.', 'Equilibrium equations must match the chosen geometry.'],
    'A 4 m simply supported beam carries a 100 N load 1 m from the left support. Find the two vertical reactions.',
    'Taking moments about the left:4RB −100(1) =0, so RB =25 N. Vertical force balance gives RA +25 −100 =0, so RA =75 N. Beam weight is neglected.',
    ['PHYS 270', 'MATH C2220'], ['ENGR 251', 'SE 160A'], 'Supports, joints and load paths become quantities you can calculate and challenge with a test.', ['p04', 'p09'], ['assembly', 'repair']
  ), { prerequisites: [['MATH C2220', 'PHYS 270']], prerequisiteText: 'MATH C2220/equivalent AND PHYS 270/equivalent.',
    creditNote: 'The UCSD MAE 30A articulation requires BOTH ENGR 250 and 251; statics alone does not satisfy that combined rule.' }),
  course('ENGR 251', 'Engineering Dynamics', 3, 'engineering', 'required', 'engr', learning(
    'Let the mechanism move. Kinematics describes motion; kinetics asks what forces and moments produce it. Energy and momentum offer alternative ways to solve the same physical problem.',
    ['Separate describing motion from explaining its cause.', 'Rigid-body rotation couples geometry and inertia.', 'Select Newton, energy or momentum methods to fit the unknown.'],
    'An ideal wheel has inertia 0.20 kg·m² and a constant net torque 0.60 N·m. Starting from rest, find angular speed after 2 s.',
    'α =τ/I =3 rad/s². Then ω =ω₀ +αt =6 rad/s. This assumes constant inertia and that the stated torque already includes all opposing torques.',
    ['ENGR 250'], ['MAE 142', 'MAE 143B'], 'A moving robot or spacecraft mechanism needs forces, timing and motion to agree.', ['p02', 'p09'], ['repair', 'caretaker']
  ), { prerequisites: [['ENGR 250']], prerequisiteText: 'ENGR 250 or equivalent.',
    creditNote: 'With ENGR 250, satisfies the combined MAE 30A rule; also maps to MAE 30B. Count this actual three-unit course once.' }),
  course('ENGR 280', 'Methods of Analysis', 4, 'engineering', 'choice', 'engr', learning(
    'Explore differential equations and related mathematical tools through engineering applications. Transforms, matrices and series give several useful views of a changing system.',
    ['Differential equations describe evolution.', 'Laplace and Fourier methods transform the representation of a problem.', 'Matrix methods connect coupled quantities.'],
    'A model satisfies y′ +2y =6 with y(0) =0. Find the steady value and a time-dependent solution.',
    'At steady state y′ =0, so y =3. The solution y(t) =3(1−e^(−2t)) starts at 0 and tends to 3. Substitution verifies y′ +2y =6.',
    ['MATH C2220'], ['MAE 105', 'MAE 143A'], 'Choose a mathematical representation that makes the engineering question easier to solve and verify.', ['p05', 'p06'], ['heat', 'caretaker']
  ), { prerequisites: [['MATH C2220']], prerequisiteText: 'MATH C2220 or equivalent. Catalog normally lists fall; future sections are not guaranteed.',
    creditNote: 'Documented alternative to MATH 253 for UCSD MATH 20D. Taking both is not required for that single destination requirement.' }),

  course('ENGL C1000', 'Academic Reading and Writing', 4, 'writing', 'required', 'engl', learning(
    'Learn to read an argument carefully, form a focused claim and support it with evidence. Drafting and revision make your reasoning visible to someone who does not already know what you mean.',
    ['A paragraph needs a claim and a purposeful evidence sequence.', 'Summarizing a source differs from evaluating it.', 'Citations let a reader trace borrowed ideas.'],
    'Revise “The new design is better because it is lighter” using an explicitly hypothetical test result of 1.8 kg versus 2.0 kg at the same test load.',
    'One clearer version: “In this comparison, the revised frame reduced mass from 2.0 to 1.8 kg, a 10% reduction, while meeting the same stated test load. Fatigue performance was not evaluated.” The limitation keeps a narrow result from becoming an unsupported universal claim.',
    [], ['ENGL C1001', 'PHIL 103'], 'Lab reports, scholarship essays and design decisions become easier to follow when each claim has a clear evidential basis.', ['p12'], ['assembly', 'caretaker']
  ), { aliases: ['ENGL 115'], geAreas: ['1A'], prerequisiteText: 'Entry through college multiple-measures placement. Students needing support may enroll in the C1000+ learning community with ENGL 45 or NC 165; support is conditional, not automatic.' }),
  course('ENGL C1001', 'Critical Thinking and Writing', 4, 'writing', 'choice', 'engl', learning(
    'Move beyond presenting information to evaluating and constructing arguments. You examine assumptions, counterarguments and the quality of evidence before defending a conclusion.',
    ['A valid inference and a true premise are different questions.', 'A fair counterargument can improve a claim.', 'Research needs context, evaluation and accurate documentation.'],
    'Evaluate the claim: “This prototype passed five tests, so it cannot fail.” Rewrite it to fit the evidence.',
    'Five successful tests do not establish impossibility of failure. A defensible version is: “The prototype passed these five specified test conditions; performance outside those conditions remains untested.” A next step identifies which untested condition matters most.',
    ['ENGL C1000'], ['MAE 155A', 'MAE 155B'], 'Engineering decisions depend on distinguishing a supported conclusion from a persuasive overstatement.', ['p12'], ['repair', 'caretaker']
  ), { aliases: ['ENGL 116'], geAreas: ['1B'], prerequisites: [['ENGL C1000']],
    prerequisiteText: 'ENGL C1000/equivalent or accepted college multiple-measures placement.', creditNote: 'Default Area 1B choice. Approved PHIL 103 can replace it for this category; do not add both as mandatory writing requirements.' }),
  course('COMM C1000', 'Introduction to Public Speaking', 3, 'writing', 'required', 'comm', learning(
    'Organize and deliver an explanation to a live audience, then evaluate how effectively it communicated. Public speaking belongs to communication/general education in this route.',
    ['Choose a purpose and adapt to the audience’s starting knowledge.', 'Organize evidence into a short, audible structure.', 'Delivery, listening and evaluation are skills you can practice.'],
    'Outline a two-minute explanation of why your team chose a heavier but more reliable connector.',
    'Start with the decision. Give the two criteria—mass and tested reliability—then one comparison with labeled evidence. Explain the tradeoff, state one limitation and finish with the action you recommend. Rehearse aloud and remove details the audience cannot use.',
    [], ['MAE 155A', 'MAE 155B'], 'Design reviews and team discussions require someone else to understand the decision well enough to question it.', ['p12'], ['assembly', 'habitable']
  ), { aliases: ['COMM 104'], geAreas: ['1C'], prerequisiteText: readingRecommendation,
    creditNote: 'Area 1C Oral Communication in the selected Cal-GETC route. It is not a physics course or an aerospace admission-screening course.' }),
  course('PHIL 103', 'Logic and Critical Thinking', 3, 'writing', 'choice', 'phil', learning(
    'Study the structure of arguments while practicing analytical writing. This is the approved alternative to the default second writing course for Area 1B.',
    ['Deduction asks whether a conclusion follows necessarily.', 'Induction evaluates the support evidence gives a conclusion.', 'Fallacies reveal where a persuasive argument takes an unjustified step.'],
    'If all valid sensor readings pass a check, and a reading passes the check, must it be valid?',
    'No. “Valid implies passes” does not imply “passes implies valid.” An invalid reading might also pass. A test’s false-positive behavior matters.',
    ['ENGL C1000'], ['MAE 155A'], 'A precise argument helps separate a useful test from a claim that the test cannot establish.', ['p10', 'p12'], ['caretaker']
  ), { geAreas: ['1B'], prerequisites: [['ENGL C1000'], ['ENGL 115H']],
    externalPrerequisites: [{ code: 'ENGL 115H', title: 'Honors College Composition: Reading and Writing Analytically — approved honors alternative', url: `${catalog}course-descriptions/engl/` }],
    prerequisiteText: 'ENGL C1000, ENGL 115H, equivalent preparation, or college multiple-measures placement.' }),

  course('ART 104', 'Introduction to Art', 3, 'humanities', 'choice', 'art', learning(
    'Learn to look closely and explain what you see. Visual form, materials, cultural context and interpretation help you move from “I like it” to a reasoned reading of an artwork.',
    ['Composition directs attention.', 'Materials and techniques shape what an image can express.', 'An interpretation should be grounded in visible and contextual evidence.'],
    'Choose one image. Describe three visible features before proposing what they communicate.',
    'A useful response separates observation (“a small figure stands below a large dark shape”) from interpretation (“the scale difference may convey vulnerability”). Support the interpretation with placement, contrast and context; another supported reading may also be possible.',
    [], ['MAE 155A'], 'Careful observation and visual communication are useful beyond engineering; they also improve diagrams and presentations.', ['p12'], []
  ), { geAreas: ['3A'] }),
  course('ART 112', 'Arts of Africa, Oceania, and Indigenous North Americas', 3, 'humanities', 'choice', 'art', learning(
    'Study artistic traditions in their own cultural, environmental and historical settings. Context changes what an object means and how it should be interpreted.',
    ['Function and setting shape an artwork’s meaning.', 'A museum presentation may omit an object’s original relationships.', 'Avoid treating distinct peoples and periods as one tradition.'],
    'Compare an object’s museum label with information about its original use. What question does the label leave unanswered?',
    'Identify the maker or community, time, material and known use separately. If the original use is not established, state that gap rather than filling it with a guess. Explain how the missing context limits your interpretation.',
    [], [], 'Develop more careful habits of observation and interpretation across unfamiliar contexts.', ['p12'], []
  ), { geAreas: ['3A'] }),
  course('ART 156', 'History of Photography', 3, 'humanities', 'choice', 'art', learning(
    'Explore photography as art, communication and a historical practice. A photograph records light, but framing, selection and presentation also shape the story it tells.',
    ['Technology changes what can be photographed.', 'A frame includes some evidence and excludes other evidence.', 'Captions and circulation affect interpretation.'],
    'Describe how cropping a photograph could change its apparent meaning without altering any included pixel.',
    'A crop can remove the wider setting, another person’s response or a scale reference. State what remains visible and what the crop prevents you from evaluating; do not infer the missing scene as fact.',
    [], [], 'Images can communicate powerfully while still requiring context and careful interpretation.', ['p12'], []
  ), { geAreas: ['3A'] }),
  course('PHIL 120', 'Ethics: Theory and Practice', 3, 'humanities', 'choice', 'phil', learning(
    'Examine how moral claims are justified and how competing ethical theories approach a difficult choice. The work is to make the reasons explicit, not simply choose the answer that sounds kindest.',
    ['Consequences, duties and character emphasize different features of a decision.', 'Stakeholders can bear unequal costs and benefits.', 'A defensible judgment acknowledges a serious objection.'],
    'A team can meet a deadline by omitting a nonrequired but informative test. Identify two ethical questions before deciding.',
    'Ask who bears the risk of uncertainty and what the team has promised to disclose. Then compare the consequences of delay with the duty to report evidence honestly. The exercise has no universal numerical answer; a strong response states the facts, affected people, principle and unresolved tradeoff.',
    [], ['MAE 155A', 'MAE 155B'], 'Ethical reasoning supports responsible decisions when technical feasibility alone cannot determine what ought to be done.', ['p12'], ['repair', 'orbits']
  ), { geAreas: ['3B'], prerequisiteText: 'PHIL 101 and 103, plus college-level reading preparation, are recommended. They are not listed prerequisites for enrollment.' }),
  course('PHIL 101', 'Introduction to Philosophy', 3, 'humanities', 'choice', 'phil', learning(
    'Investigate questions about knowledge, reality and values through primary arguments. You learn to state a position clearly enough to test it against objections.',
    ['A definition can carry hidden assumptions.', 'A reason supports a claim differently from a personal preference.', 'A counterexample tests the scope of a general statement.'],
    'Test the statement “Seeing something always proves it exists exactly as it appears.”',
    'An optical illusion is a counterexample to the word “always.” It does not prove vision is useless; it shows why perception may need interpretation and independent checks. Refine the original claim to fit what the example establishes.',
    [], ['PHIL 120'], 'Practice asking what a claim means and what would count as a reason to accept it.', ['p12'], []
  ), { geAreas: ['3B'], prerequisiteText: readingRecommendation }),
  course('PHIL 106', 'World Religions', 3, 'humanities', 'choice', 'phil', learning(
    'Compare major religious philosophies and their historical contexts. Careful comparison requires understanding a tradition’s own questions before measuring it against another tradition.',
    ['Separate description from evaluation.', 'Similar words may have different meanings across traditions.', 'Historical context helps explain a philosophical question.'],
    'Create a comparison of how two assigned primary texts discuss obligation, using one passage from each.',
    'Name each text’s context, explain its concept in its own terms, then identify a specific similarity or difference. A sound comparison does not assume all members of a tradition interpret the text identically.',
    [], [], 'Learn to discuss unfamiliar beliefs with specificity, intellectual care and awareness of context.', ['p12'], []
  ), { geAreas: ['3B'], prerequisiteText: readingRecommendation }),

  course('PSYC C1000', 'Introduction to Psychology', 3, 'society', 'choice', 'psyc', learning(
    'Study mind and behavior through scientific questions and evidence. Learning, memory, perception, development and social influences help explain why an intuitive story is not always a reliable explanation.',
    ['Operational definitions make a question testable.', 'Correlation alone does not establish causation.', 'Biological, cognitive and social explanations can address different levels of a problem.'],
    'Students who sleep more score higher in a survey. Does the survey prove that extra sleep caused the score difference?',
    'No. The association may involve other factors, such as study conditions or health. Describe the measured association, identify plausible confounders and propose a stronger design before making a causal claim.',
    [], [], 'Understanding evidence about people can improve collaboration, learning choices and interpretation of human performance data.', ['p12'], ['caretaker']
  ), { aliases: ['PSYC 101'], geAreas: ['4'], prerequisiteText: readingRecommendation }),
  course('ECON C2001', 'Principles of Microeconomics', 3, 'society', 'choice', 'econ', learning(
    'Study choices made under scarcity by individuals and firms, and how those choices interact in markets. Models help clarify incentives, costs, tradeoffs and market failures.',
    ['Opportunity cost is the best alternative given up.', 'Marginal reasoning compares the next benefit with the next cost.', 'Prices and incentives do not capture every social consequence.'],
    'A workshop has 8 hours. A model takes 2 hours and a report takes 4. What is the opportunity cost of one report in this simplified capacity model?',
    'One report uses time that could produce two models. Its opportunity cost is two models. That capacity calculation does not establish that models are more valuable; value is a separate judgment.',
    ['MATH 101'], [], 'Technical projects compete for limited resources. Economic reasoning makes the assumptions behind a tradeoff easier to discuss.', ['p11', 'p12'], ['repair', 'assembly']
  ), { aliases: ['ECON 102'], geAreas: ['4'], prerequisiteText: 'Intermediate-algebra proficiency through college multiple measures. Macroeconomics, statistics, applied calculus and reading preparation are recommended, not prerequisites.' }),
  course('ECON C2002', 'Principles of Macroeconomics', 3, 'society', 'choice', 'econ', learning(
    'Examine an economy at the aggregate level: production, employment, inflation, monetary policy and international relationships. Models help distinguish quantities that sound similar but answer different questions.',
    ['Nominal and real values separate money changes from price-level changes.', 'An aggregate can hide important differences among people.', 'A model’s assumptions determine which policy conclusions it can support.'],
    'Nominal output rises 10% while the price level rises 5%. Approximately how much does real output rise?',
    'The exact ratio is 1.10/1.05 ≈1.0476, or about 4.76%. Subtracting the percentage changes gives a rough 5% approximation, not the exact result.',
    ['MATH 101'], [], 'A broader economic view helps interpret changing budgets and institutions without mistaking a single indicator for the entire picture.', ['p12'], []
  ), { aliases: ['ECON 101'], geAreas: ['4'], prerequisiteText: 'Intermediate-algebra proficiency through college multiple measures. Statistics, applied calculus and reading preparation are recommendations.' }),
  course('SOC 101', 'Introduction to Sociology', 3, 'society', 'choice', 'soc', learning(
    'Look at how institutions, groups and social structures influence individual experience. Sociological questions often connect a personal observation to a wider pattern and its evidence.',
    ['A social explanation can differ from an individual explanation.', 'Sampling affects what a study can conclude.', 'Institutions distribute opportunities and constraints.'],
    'An online survey of one student club finds that everyone has a laptop. Can it estimate laptop access across the college?',
    'The sample may not represent the college. Club membership and online participation both select respondents. Define the target population and use a sampling strategy that can reach students outside the club.',
    [], [], 'Recognizing how a sample and institution shape an outcome strengthens community research and team decision-making.', ['p12'], []
  ), { geAreas: ['4'], prerequisiteText: readingRecommendation }),

  course('BIOL 140', 'Environmental Biology', 3, 'science', 'choice', 'biol', learning(
    'Study living systems and the environmental consequences of human activity. Population, biodiversity, resources and ecosystem interactions form a broader biological view of the world around engineering.',
    ['Matter moves through connected living and nonliving systems.', 'Population changes depend on gains and losses.', 'An environmental claim needs a stated scale and evidence.'],
    'A simplified population begins at 100. During an interval there are 12 births,5 deaths,3 arrivals and 2 departures. Find the next population.',
    '100 +12 −5 +3 −2 =108. This bookkeeping model identifies the flows; it does not predict future birth or migration rates without further assumptions.',
    [], [], 'The selected biological-science GE course develops environmental reasoning. It is not an aerospace admission-screening class or specialist life-support qualification.', ['p11'], ['habitable']
  ), { geAreas: ['5B'], prerequisiteText: 'ENGL C1000/equivalent and reading preparation are recommended; no prerequisite or laboratory corequisite is listed. Field trips may be required.' }),
  course('BIOL 100', 'Principles of Biology', 3, 'science', 'choice', 'biol', learning(
    'Survey the shared processes of living things, from cells and inheritance to evolution and ecology. This alternative emphasizes broad biological foundations and comes with a required companion laboratory.',
    ['Cells organize chemical processes.', 'Inheritance and evolution operate at different scales.', 'A biological explanation can be tested against observations.'],
    'In a simplified single-gene model, two heterozygous parents are Aa × Aa. List the possible offspring genotypes and expected proportions.',
    'The four equally likely combinations are AA,Aa,aA,aa, giving¼AA,½Aa and¼aa. These are probabilities under the model, not a guarantee for four actual offspring.',
    [], ['BIOL 101'], 'A general biological framework helps you read evidence about living systems with more precision.', ['p12'], ['habitable']
  ), { geAreas: ['5B'], corequisites: [['BIOL 101']], prerequisiteText: 'BIOL 101 is a required corequisite. ENGL C1000/equivalent and reading preparation are recommended.',
    creditNote: 'Choosing this Area 5B alternative also adds BIOL 101 for enrollment, even if CHEM 200 already supplies the GE laboratory category.' }),
  course('BIOL 101', 'Principles of Biology Laboratory', 1, 'science', 'choice', 'biol', learning(
    'Use observations, controlled comparisons and recorded data to investigate biological questions alongside the lecture course.',
    ['A control makes an experimental comparison interpretable.', 'Replication reveals variability.', 'A result and an explanation should be recorded separately.'],
    'Plan a paper experiment comparing germination under two light conditions. Name one variable to hold constant and the outcome to measure.',
    'Keep seed type, number, water, temperature and observation duration consistent; vary the light condition. Record the proportion germinated in each group and replicate the comparison. Differences still need interpretation within those conditions.',
    ['BIOL 100'], [], 'Laboratory practice makes the difference between a plausible explanation and an observable test concrete.', ['p01', 'p12'], ['habitable']
  ), { geAreas: ['5C'], corequisites: [['BIOL 100']], prerequisiteText: 'BIOL 100 is a required corequisite. Reading and writing preparation are recommended.' }),
  course('BIOL 160', 'Marine Biology', 3, 'science', 'choice', 'biol', learning(
    'Explore marine organisms and ecosystems alongside the physical and chemical conditions that shape them. It offers a coastal biological-science alternative to Environmental Biology.',
    ['Adaptations make sense in relation to an environment.', 'Organisms interact within food webs and habitats.', 'Ocean conditions and biological observations need to be considered together.'],
    'A survey finds fewer organisms in a shallow site than a deeper one. Name two measurements needed before attributing the difference to depth alone.',
    'Temperature, salinity, light, substrate or sampling effort could differ with depth. Choose relevant measurements and comparable sampling before treating depth as the cause. A single comparison cannot isolate all influences.',
    [], [], 'Biological context helps you understand what an ocean instrument or robot is being built to observe.', ['p12'], ['extremes']
  ), { geAreas: ['5B'], prerequisiteText: 'Reading and ENGL C1000/equivalent are recommended. BIOL 161 is recommended concurrent enrollment, not a required corequisite. Catalog normally lists spring.' }),

  course('MAS 110', 'Introduction to Chicana and Chicano Studies', 3, 'society', 'choice', 'mas', learning(
    'Study the development of Chicana and Chicano Studies and the histories, identities, cultural work and social questions it investigates. The course develops a grounded way to read institutions and lived experience.',
    ['Historical context changes how a source should be read.', 'Identity, culture and power intersect without being interchangeable.', 'Different kinds of evidence answer different questions.'],
    'Compare an oral-history account with a policy document about the same event. What does each help you understand?',
    'The account can illuminate remembered experience and interpretation; the document can establish formal wording and stated intent. Neither alone describes every person’s experience or proves every consequence. Explain the scope and limits of each.',
    [], [], 'Ethnic studies provides a substantive historical and social education, with its own questions and methods.', ['p12'], []
  ), { geAreas: ['4', '6'], prerequisiteText: readingRecommendation,
    creditNote: 'Selected for Area 6 in this example. Although approved in Area 4 too, the same course cannot clear both GE areas.' }),
  course('MAS 100', 'Chicana and Chicano Heritage', 3, 'society', 'choice', 'mas', learning(
    'Explore cultural achievements and philosophical, ethical and aesthetic traditions connected to Chicana and Chicano heritage and Indigenous North America.',
    ['Cultural expression has a history and a setting.', 'A primary source can support more than one carefully argued interpretation.', 'Avoid replacing a diverse tradition with a single generalization.'],
    'Choose a cultural work discussed in class and connect one visible or textual feature to its historical context.',
    'Name the feature precisely, identify the contextual evidence and explain the connection. Label any interpretation as an interpretation rather than assigning an unsupported belief to every member of a community.',
    [], [], 'A heritage-focused alternative develops cultural and historical understanding through close reading and discussion.', ['p12'], []
  ), { geAreas: ['6'], prerequisiteText: readingRecommendation,
    creditNote: 'Included here as a verified Area 6 alternative. This module lists the approved role used by this plan, not every possible application of a course.' }),
  course('MAS 170', 'Critical Issues in Chicana/Latina Studies', 3, 'society', 'choice', 'mas', learning(
    'Examine Chicana and Latina histories, feminist thought, social contributions and questions of power and resistance in U.S.–Mexico borderlands and transnational contexts.',
    ['Social categories can interact rather than act independently.', 'A movement includes internal debates and changing priorities.', 'Evidence should establish whose experience a claim describes.'],
    'Revise the claim “The movement wanted X” after reading two participants who describe different priorities.',
    'Identify the participants and their contexts, then write a narrower claim: “These sources describe X and Y as priorities among these participants.” Explain the disagreement rather than erasing it to create a single voice.',
    [], [], 'This alternative deepens analysis of gender, culture and social change within ethnic studies.', ['p12'], []
  ), { aliases: ['SOC 170'], geAreas: ['4', '6'], prerequisiteText: readingRecommendation,
    creditNote: 'Use in Area 4 or 6, not both. Former SOC 170 resolves to the same course identity for this catalog record.' }),
];

const slot = (id, area, title, defaultCode, alternatives, rationale) => ({
  id, area, title, defaultCode, alternatives, options: [defaultCode, ...alternatives], rationale,
  sourceIds: ['swc-journey-ge'], reviewed,
});
export const geSlots = [
  slot('1A', '1A', 'English composition', 'ENGL C1000', [], 'Academic reading, evidence and clear writing; four actual semester units.'),
  slot('1B', '1B', 'Critical thinking and composition', 'ENGL C1001', ['PHIL 103'], 'Continue the writing sequence. Logic and Critical Thinking is an approved substitution, not another compulsory class.'),
  slot('1C', '1C', 'Oral communication', 'COMM C1000', [], 'Practice public speaking and audience-aware explanations in the selected Cal-GETC route.'),
  slot('2', '2', 'Mathematical concepts and quantitative reasoning', 'MATH C2210', ['MATH C2220', 'MATH 252', 'MATH 254'], 'Use required major mathematics for GE too; no extra general-math class is needed.'),
  slot('3A', '3A', 'Arts', 'ART 104', ['ART 112', 'ART 156'], 'A broad introduction to observing and interpreting visual art; cultural art history and photography offer focused alternatives.'),
  slot('3B', '3B', 'Humanities', 'PHIL 120', ['PHIL 101', 'PHIL 106'], 'Ethical reasoning offers a useful default. Philosophy or World Religions can replace it within this approved category.'),
  slot('4a', '4', 'Social and behavioral science — first discipline', 'PSYC C1000', ['SOC 101', 'ECON C2002'], 'Psychology examines mind and behavior. Choose a discipline different from the second social-science selection.'),
  slot('4b', '4', 'Social and behavioral science — second discipline', 'ECON C2001', ['SOC 101', 'ECON C2002'], 'Economics adds choices, incentives and resource tradeoffs; the two Area 4 courses must come from different disciplines.'),
  slot('5A', '5A', 'Physical science', 'CHEM 200', ['PHYS 270', 'PHYS 272', 'PHYS 274'], 'Use the chemistry or physics already required in the technical route.'),
  slot('5B', '5B', 'Biological science', 'BIOL 140', ['BIOL 100', 'BIOL 160'], 'Environmental Biology adds living-system context. BIOL 100 requires its companion BIOL 101 even when another class supplies the GE lab.'),
  slot('5C', '5C', 'Laboratory associated with science', 'CHEM 200', ['PHYS 273', 'BIOL 101'], 'CHEM 200 already includes an approved lab. This is a requirement marker, not a second five-unit enrollment.'),
  slot('6', '6', 'Ethnic studies', 'MAS 110', ['MAS 100', 'MAS 170'], 'A concrete ethnic-studies choice with approved alternatives; one selected course fills one GE area.'),
];

export const gePolicy = {
  id: 'swc-calgetc-2026', title: 'A complete Cal-GETC example, alongside the major',
  text: 'The default is a complete, named Cal-GETC selection for a new community-college student. It is one general-education route, not a universal UCSD admission requirement. Take the technical sequence and GE alongside one another; do not postpone calculus or physics until every GE class is finished.',
  year: '2026–2027', reviewed, sourceIds: ['swc-journey-ge', 'swc-journey-uc-ge', 'swc-journey-uc-admission'],
  minimumSemesterUnits: 34, minimumCourses: 11, defaultUniqueSemesterUnits: 39,
  defaultDistinctCourses: 11, selectedRoute: 'Full Cal-GETC',
  area4DifferentDisciplines: true,
  singleAreaRule: 'A course approved in more than one Cal-GETC area can be applied to only one area in the same certification. MAS 110 cannot satisfy both Area 4 and 6.',
  sharedLabException: { areas: ['5A', '5B', '5C'], allowedPairs: [['5A', '5C'], ['5B', '5C']],
    text: 'An approved lecture-and-lab course may supply its science category and the associated laboratory. CHEM 200 supplies 5A and 5C; record one five-unit course.' },
  majorOverlap: 'A course may satisfy an appropriate major-preparation requirement and one GE category. Requirement coverage does not create extra units.',
  corequisiteRule: 'Enrollment requirements remain in force when a GE slot is already covered. BIOL 100 and BIOL 101 require concurrent enrollment in each other.',
  gradeRule: 'Courses require C or better; Pass/Credit is usable when it represents at least C. Approval must apply to the academic year in which the course was taken.',
  certificationRule: 'Only full Cal-GETC certification is available. This example does not assert certification, admission, completed coursework or automatic completion of every UCSD college/university requirement.',
  unitsText: 'The actual default selections total 39 distinct semester units. Calculus and chemistry already belong to the technical route; do not add 39 again to an overlapping technical subtotal. Noncredit preparation earns 0 degree units, and MATH 104 is CSU-only.',
  mathCreditLimit: {
    codes: ['MATH 101', 'MATH 104', 'MATH 244'], catalogMaximumUnits: 6,
    ucGroup: 'college-algebra-precalculus', ucGroupCodes: ['MATH 101', 'MATH 244'], ucMaximumCourses: 1, ucMaximumSemesterUnits: 5, ucMaximumQuarterUnits: 7.5,
    ucNoCreditIfTakenAfter: ['MATH 121', 'MATH 122', 'MATH C2210'],
    text: 'Two different limits apply. SWC caps earned credit at 6 units across the overlapping 101/104/244 routes. The 2026–2027 ASSIST UC agreement allows only one College Algebra/Precalculus course, at most 5 semester/7.5 quarter units. MATH 244 therefore earns 6 SWC units but at most 5 UC-transferable units; MATH 101 earns 3. No UC credit for 101/244 taken after MATH 121,122 or C2210. MATH 104 is CSU-only.',
    ucSpecificLimitStatus: 'verified-primary-live-browser', sourceIds: ['swc-journey-math', 'swc-journey-ge', 'swc-assist-uc-math'],
  },
  lowerDivisionTransferCap: {
    semesterUnits: 70, quarterUnits: 105, sourceIds: ['swc-journey-ucsd-transfer'],
    text: 'UCSD grants at most 70 semester / 105 quarter units for lower-division coursework. Appropriate courses beyond the ceiling can still receive subject credit toward requirements. A planned course subtotal is therefore not the same as awarded UC degree units. Community-college-only coursework does not create senior standing; other university or upper-division history requires a separate review.',
  },
  beginningMath: 'NC 1025 → NC 143/NC 146 → NC 147 is a suggested progression of topics, not an official sequence of prerequisites. NC 1148 is an overlapping algebra refresher; NC 283/286/287 support their parent classes alongside them. MATH 35,45,60 and 62 are not offered in the 2026–2027 catalog year.',
  availability: 'Catalog inclusion is not a seat or section guarantee. Check Southwestern’s published schedule when selecting a real term.',
  scheduleURL: 'https://www.swccd.edu/classes-and-registration/class-schedule/',
};
