/** One course model drives subject paths, example terms, GE choices and detail views. */
import { academic, courses as baseCourses, sources as baseSources, mappings, degreePlan } from './academic-data.mjs';
import { swcCourseUpdates, swcSources, geSlots, gePolicy } from './swc-journey.mjs';
import { ucsdCourseUpdates, ucsdSources, collegeScenarios, technicalDirection } from './ucsd-journey.mjs';
import { normalizeCode, calculateRequirements, validatePlan } from './engine.mjs';

export { academic, mappings, geSlots, gePolicy, collegeScenarios, technicalDirection };
export const subjectGroups = [
  { id: 'math', title: 'Mathematics', description: 'From arithmetic and algebra to calculus, differential equations, computation and feedback.' },
  { id: 'physics', title: 'Physics', description: 'Motion, fields, waves and experiments become the language of aerospace systems.' },
  { id: 'science', title: 'Chemistry & Biology', description: 'Chemical reasoning for the major, and a chosen biological-science perspective for general education.' },
  { id: 'engineering', title: 'Engineering & Computing', description: 'Mechanics, materials, fluids, controls, laboratories and design bring the disciplines together.' },
  { id: 'writing', title: 'English & Public Speaking', description: 'Build an argument, explain evidence and make a technical idea understandable to another person.' },
  { id: 'humanities', title: 'Arts & Humanities', description: 'Interpret, question, compare and reason about values beyond a single technical answer.' },
  { id: 'society', title: 'Social Sciences & Ethnic Studies', description: 'Understand people, institutions, choices, histories and the context in which engineering happens.' },
];

const sourceMap = new Map([...baseSources, ...swcSources, ...ucsdSources].map(source => [source.id, {
  ...source, checked: source.checked || source.lastChecked || '2026-10-31', lastChecked: source.lastChecked || source.checked || '2026-10-31',
}]));
export const sources = [...sourceMap.values()];
export const sourceById = Object.freeze(Object.fromEntries(sourceMap));
const inheritedSubject = course => course.code.startsWith('MATH') ? 'math' : course.code.startsWith('PHYS') ? 'physics' : course.code.startsWith('CHEM') ? 'science' : 'engineering';
const normalizedRoutes = value => !Array.isArray(value) || !value.length ? [] :
  (value.every(item => typeof item === 'string') ? [value] : value)
    .filter(Array.isArray).map(route => route.map(normalizeCode).filter(Boolean));
const courseMap = new Map();
for (const course of [...baseCourses, ...swcCourseUpdates, ...ucsdCourseUpdates].sort((a, b) => Number(normalizeCode(b.code || b.id) !== (b.code || b.id)) - Number(normalizeCode(a.code || a.id) !== (a.code || a.id)))) {
  const originalCode = course.code || course.id, code = normalizeCode(originalCode);
  const existing = courseMap.get(code) || {};
  const merged = { ...existing, ...course, code, id: code };
  merged.aliases = [...new Set([...(existing.aliases || []), ...(course.aliases || []), ...(originalCode !== code ? [originalCode] : [])])];
  merged.subject ||= inheritedSubject(merged);
  merged.stage ||= merged.institutionId === 'ucsd' ? 'university' : 'transfer';
  merged.routeRole ||= merged.stage === 'preparation' ? 'preparation' : 'required';
  merged.sourceIds ||= merged.source ? [merged.source] : [];
  merged.geAreas ||= [];
  merged.prerequisites = normalizedRoutes(merged.prerequisites);
  merged.corequisites = normalizedRoutes(merged.corequisites);
  merged.reviewed ||= '2026-10-31';
  courseMap.set(code, merged);
}
export const courses = [...courseMap.values()];
export const courseByCode = Object.freeze(Object.fromEntries(courseMap));
export const getCourse = code => courseMap.get(normalizeCode(code));

const unique = values => [...new Set(values)];
const codeOptions = slot => unique([slot.defaultCode, ...(slot.options || slot.alternatives || [])].filter(Boolean).map(normalizeCode));
const canonicalChoice = (choices, slot) => normalizeCode(choices?.[slot.id] || slot.defaultCode);
const termLabel = id => id.replace(/^(\d+)-(\w+)$/, (_, year, season) => `${season[0].toUpperCase()}${season.slice(1)} ${year}`);

/** Checks a proposed GE selection, never personal completion or certification. */
export function computeGE(choices = {}, extraCodes = []) {
  const issues = [], assignments = geSlots.map(slot => {
    const code = canonicalChoice(choices, slot), course = getCourse(code);
    if (!course) issues.push({ type: 'unknown-course', slotId: slot.id, code, message: `${slot.title}: ${code || 'no course'} is not a verified course record.` });
    else if (!codeOptions(slot).includes(code) || !course.geAreas.includes(slot.area)) issues.push({ type: 'unapproved-area', slotId: slot.id, code, message: `${code} is not a listed option for ${slot.title} in this researched selection.` });
    return { ...slot, code, course };
  });
  const byCourse = new Map();
  for (const assignment of assignments) {
    const values = byCourse.get(assignment.code) || []; values.push(assignment); byCourse.set(assignment.code, values);
  }
  for (const [code, slots] of byCourse) {
    const areas = unique(slots.map(slot => slot.area));
    const labComponent = areas.length === 2 && areas.includes('5C') && (areas.includes('5A') || areas.includes('5B'));
    if ((areas.length > 1 && !labComponent) || slots.length > areas.length) issues.push({ type: 'duplicate-ge-use', code, message: `${code} cannot fill these separate GE slots at the same time. A physical/biological science with its laboratory component is the limited exception.` });
  }
  const socials = assignments.filter(slot => slot.area === '4');
  if (socials.length >= 2) {
    const disciplines = socials.map(slot => slot.course?.discipline || slot.code.split(' ')[0]);
    if (new Set(disciplines).size < socials.length) issues.push({ type: 'social-discipline', message: 'The two social-science selections must come from two different disciplines.' });
  }
  const selectedCodes = unique(assignments.map(slot => slot.code));
  const included = new Set([...selectedCodes, ...extraCodes.map(normalizeCode)]);
  const requiredCompanionCodes = [];
  for (const code of selectedCodes) {
    const course = getCourse(code);
    const routes = course?.corequisites || [];
    if (routes.length && !routes.some(route => route.every(member => included.has(normalizeCode(member))))) {
      const missing = (routes[0] || []).map(normalizeCode).filter(member => !included.has(member));
      requiredCompanionCodes.push(...missing);
      issues.push({ type: 'missing-corequisite', code, missing, message: `${code} still requires ${missing.join(' AND ')} under the selected course route. Another GE lab does not remove this enrollment rule.` });
    }
  }
  const units = { semester: 0, quarter: 0 };
  for (const code of selectedCodes) {
    const course = getCourse(code);
    if (course && ['semester', 'quarter'].includes(course.unitSystem) && Number.isFinite(course.units)) units[course.unitSystem] += course.units;
  }
  return { valid: issues.length === 0, completeExample: issues.length === 0, assignments, selectedCodes, requiredCompanionCodes: unique(requiredCompanionCodes), units, issues, errors: issues,
    note: 'This checks the example selection and counts each selected course once. It does not mark a course completed, establish grades or issue GE certification.' };
}

const phaseDefinitions = [
  { id: 'preparation', stage: 'preparation', title: 'Make the beginning solid', description: 'Arithmetic and algebra refreshers can support readiness. This is a flexible learning bridge, not an additional credit ladder everyone must complete.' },
  { id: 'swc-foundations', stage: 'transfer', title: 'Southwestern foundations', description: 'Build algebra and trigonometry, start writing, and prepare chemistry alongside selected general education.' },
  { id: 'swc-sequence', stage: 'transfer', title: 'The calculus-to-engineering sequence', description: 'Calculus, physics, laboratory work and mechanics grow together; summer GE keeps space in the longer technical chain.' },
  { id: 'ucsd-foundations', stage: 'university', title: 'Cross the transfer boundary', description: 'Accepted preparation covers lower-division mathematics and several engineering requirements. Begin the remaining UCSD courses.' },
  { id: 'ucsd-core', stage: 'university', title: 'Make the disciplines work together', description: 'Fluids, computation, structures, signals and experiments form a demanding engineering year.' },
  { id: 'ucsd-design', stage: 'university', title: 'Design, test and explain', description: 'Complete aerospace design and laboratory work, with a coherent set of technical-elective choices.' },
];

function countUnits(codes) {
  const result = { semester: 0, quarter: 0, noncredit: 0 };
  for (const code of unique(codes.map(normalizeCode))) {
    const course = getCourse(code);
    if (!course || !Number.isFinite(course.units) || /^NC\s/.test(code)) continue;
    if (course.unitSystem in result) result[course.unitSystem] += course.units;
  }
  return result;
}

/** Immediately useful example. It never reads or writes personal records or localStorage. */
export function getDefaultPlan(options = {}) {
  const mathRoute = ['combined', 'precalc'].includes(options.mathRoute) ? 'combined' : 'split';
  const diffRoute = options.diffRoute === 'engr280' ? 'engr280' : 'math253';
  const transferYear = Number.isInteger(options.transferYear) && options.transferYear >= 2030 && options.transferYear <= 2060 ? options.transferYear : 2030;
  const yearShift = transferYear - 2030;
  const college = collegeScenarios.find(item => item.id === options.collegeScenario) || collegeScenarios.find(item => item.id === 'revelle-calgetc') || collegeScenarios[0];
  const choices = Object.fromEntries(geSlots.map(slot => {
    const requested = canonicalChoice(options.geChoices, slot);
    return [slot.id, codeOptions(slot).includes(requested) ? requested : normalizeCode(slot.defaultCode)];
  }));
  const terms = [], seen = new Set();
  const makeTerm = (id, phaseId, institutionId, notes = []) => {
    const term = { id, label: id === 'preparation' ? 'Before or alongside early enrollment' : termLabel(id), phaseId, institutionId, unitSystem: institutionId === 'ucsd' ? 'quarter' : 'semester', entries: [], courseCodes: [], notes };
    terms.push(term); return term;
  };
  const add = (term, code, role, note = '') => {
    code = normalizeCode(code);
    if (seen.has(code)) return;
    seen.add(code);
    term.entries.push({ code, role: role || getCourse(code)?.routeRole || 'required', note });
    term.courseCodes.push(code);
  };
  const prep = makeTerm('preparation', 'preparation', 'swc', ['These are zero-unit noncredit learning options, not required degree credit. NC 146 is the same course as NC 143; NC 1148 is an alternative refresher, not an extra mandatory rung.']);
  for (const code of ['NC 1025', 'NC 143', 'NC 147']) add(prep, code, 'preparation', 'If this skill needs rebuilding; sequence shown for learning, not as a catalog prerequisite chain.');
  const swcTemplate = [
    ['2027-spring', 'swc-foundations', [mathRoute === 'combined' ? 'MATH 244' : 'MATH 101', 'CHEM 170']],
    ['2027-summer', 'swc-foundations', []],
    ['2027-fall', 'swc-foundations', [...(mathRoute === 'split' ? ['MATH 104'] : []), 'CHEM 200']],
    ['2028-spring', 'swc-foundations', ['MATH C2210']],
    ['2028-summer', 'swc-sequence', []],
    ['2028-fall', 'swc-sequence', ['MATH C2220', 'PHYS 270']],
    ['2029-spring', 'swc-sequence', ['MATH 252', 'PHYS 272', 'PHYS 273']],
    ['2029-summer', 'swc-sequence', []],
    ['2029-fall', 'swc-sequence', ['ENGR 250', 'ENGR 221', diffRoute === 'engr280' ? 'ENGR 280' : 'MATH 253']],
    ['2030-spring', 'swc-sequence', ['MATH 254', 'PHYS 274', 'ENGR 251']],
  ];
  const shiftedId = id => id.replace(/^\d{4}/, year => String(+year + yearShift));
  const swcTerms = new Map();
  for (const [originalId, phaseId, codes] of swcTemplate) {
    const term = makeTerm(shiftedId(originalId), phaseId, 'swc', originalId.endsWith('summer') ? ['Illustrative GE summer; sections, compressed workload and usable meeting times must be checked for that future summer.'] : []);
    swcTerms.set(originalId, term);
    for (const code of codes) add(term, code, ['MATH 101', 'MATH 104', 'MATH 244', 'CHEM 170'].includes(code) ? 'preparation' : code === 'MATH 253' || code === 'ENGR 280' ? 'choice' : 'required');
  }
  const gePlacement = { '1A': '2027-summer', '1B': '2028-spring', '1C': '2028-summer', '2': '2029-summer', '3A': '2027-summer', '3B': '2029-summer', '4a': '2028-summer', '4b': '2029-summer', '5A': '2029-summer', '5B': '2028-fall', '5C': '2029-summer', '6': '2027-fall' };
  for (const slot of geSlots) add(swcTerms.get(gePlacement[slot.id] || '2029-summer'), choices[slot.id], 'choice', `Selected for ${slot.title}; another researched approved option can replace it.`);
  // Course enrollment corequisites survive even when GE laboratory credit is
  // already supplied elsewhere. Add the selected biology lab beside its parent.
  const swcTermList = [...swcTerms.values()];
  for (const term of swcTermList) for (const entry of [...term.entries]) {
    const course = getCourse(entry.code), routes = course?.corequisites || [];
    const currentIndex = swcTermList.indexOf(term);
    const satisfied = code => swcTermList.some((candidate, index) => index <= currentIndex && candidate.courseCodes.includes(normalizeCode(code)));
    if (routes.length && !routes.some(route => route.every(satisfied))) {
      for (const member of routes[0]) {
        const code = normalizeCode(member);
        if (satisfied(code)) continue;
        // A separately selected laboratory can already appear in a later GE
        // slot. Move that one enrollment beside its parent, rather than count
        // it twice or silently accept a corequisite taken too late.
        for (const later of swcTermList.slice(currentIndex + 1)) {
          later.entries = later.entries.filter(item => item.code !== code);
          later.courseCodes = later.courseCodes.filter(item => item !== code);
        }
        seen.delete(code);
        add(term, code, 'required', `Corequisite for ${entry.code}; separate from whether another course supplies the GE laboratory category.`);
      }
    }
  }
  const swcCodes = [...swcTerms.values()].flatMap(term => term.courseCodes);
  const illustrativeCompletions = swcCodes.map((code, index) => ({ id: `example-${index}`, code, status: 'completed', verified: true, grade: 'C', term: shiftedId('2030-spring') }));
  // This local calculation describes the example route only. It is never
  // exported as a student's record and never writes a completion to state.
  const coveredTargets = calculateRequirements(illustrativeCompletions, mappings).filter(item => item.status === 'satisfied').map(item => ({ code: item.target, target: item.target, sourceCodes: item.route, label: 'Covered by accepted example preparation', note: 'Conditional on accepted credit; this does not say you have completed it.' }));
  const covered = new Set(coveredTargets.map(item => item.code));
  const technicalCodes = technicalDirection.defaultCodes5 || technicalDirection.defaultCodes || ['MAE 184', 'MAE 108', 'MAE 144', 'MAE 145', 'MAE 148'];
  // Fits catalog preparation: 108 before145, 143B before144, senior standing
  // for145, and explicit department approval remains necessary for148.
  const technicalOrder = ['MAE 108', 'MAE 184', 'MAE 144', 'MAE 145', 'MAE 148'].filter(code => technicalCodes.includes(code));
  technicalOrder.push(...technicalCodes.filter(code => !technicalOrder.includes(code)));
  let technicalIndex = 0;
  const universityTerms = new Map();
  for (const year of degreePlan) for (const season of ['fall', 'winter', 'spring']) {
    const actualYear = transferYear + year.year - 1 + (season === 'fall' ? 0 : 1);
    const term = makeTerm(`${actualYear}-${season}`, ['ucsd-foundations', 'ucsd-core', 'ucsd-design'][year.year - 1], 'ucsd', ['Future course offerings and elective access are assumptions, not confirmed sections.']);
    universityTerms.set(`${year.year}-${season}`, term);
    for (const code of year[season]) {
      if (code === 'GE' || covered.has(code)) continue;
      if (code === 'TE') add(term, technicalOrder[technicalIndex++], 'choice', 'One of five required approved technical-elective slots. This is the controls/robotics example choice, not an extra optional requirement.');
      else add(term, code, 'required');
    }
  }
  // The department's template is a sequence reference, not a fixed promise of
  // future offerings. Accepted MAE 8 and MATH 18 already meet the ordinary
  // MAE 107 course prerequisites, so a spring section can balance years 1/2.
  const computationalSource = universityTerms.get('2-fall');
  const computationalTarget = universityTerms.get('1-spring');
  const computationalEntry = computationalSource.entries.find(entry => entry.code === 'MAE 107');
  if (computationalEntry) {
    computationalSource.entries = computationalSource.entries.filter(entry => entry.code !== 'MAE 107');
    computationalSource.courseCodes = computationalSource.courseCodes.filter(code => code !== 'MAE 107');
    computationalTarget.entries.push({ ...computationalEntry, note: 'Moved earlier to balance the example load after accepted MAE 8 and MATH 18 preparation. This depends on a spring offering; return it to the later term or revise the sequence if no suitable section is available.' });
    computationalTarget.courseCodes.push('MAE 107');
    computationalTarget.notes.push('The balanced spring load assumes MAE 107 is available this quarter. Its course prerequisites are covered by the accepted example transfer route; a future spring section is not confirmed.');
  }
  const collegeRows = (college?.rows || []).map(row => ({ ...row }));
  for (const row of collegeRows) {
    const planCodes = row.planCodes || (row.type === 'required' ? row.courseCodes : []);
    // The beginner language examples are linked conversation/analysis pairs.
    // Each pair is one language level, and the second follows the first.
    const termKey = row.id === 'language-one' ? '1-fall' : '1-winter';
    for (const code of planCodes) add(universityTerms.get(termKey), code, row.type === 'required' ? 'required' : 'choice', `Reference college scenario: ${row.title}. ${row.description || ''}`);
  }
  // DEI is not inferred from Southwestern ethnic studies. When a researched
  // named choice is provided, show that explicit choice under its condition.
  const deiRow = collegeRows.find(row => /\bDEI\b|diversity/i.test(`${row.id} ${row.title}`));
  if (deiRow && !(deiRow.planCodes?.length) && deiRow.courseCodes?.includes('ANTH 21')) add(universityTerms.get('1-winter'), 'ANTH 21', 'choice', 'Named DEI example if the separate UCSD requirement is not already satisfied by accepted transfer credit.');
  for (const term of terms) {
    term.units = countUnits(term.courseCodes)[term.unitSystem];
    term.hasLab = term.courseCodes.some(code => /laboratory/i.test(getCourse(code)?.title || '') || ['CHEM 170', 'CHEM 200'].includes(code));
    if (term.institutionId === 'swc' && term.units >= 11) term.notes.push('This is one of the heavier example semesters; reassess actual meeting/lab hours and paid-work capacity.');
    if (term.institutionId === 'ucsd' && term.units >= 12) term.notes.push('A full university course load with laboratory/team work where applicable; do not assume an unchanged full-time workweek will fit.');
    if (term.institutionId === 'ucsd' && term.units < 12) term.notes.push(term === universityTerms.get('3-spring')
      ? 'This final-quarter example has fewer than 12 units. Confirm the applicable graduating-quarter enrollment status and any required approval before relying on the reduced load.'
      : 'This reference college/credit scenario leaves fewer than 12 units in this quarter. Review enrollment status and any required approval; a light example term is not an approved part-time arrangement.');
  }
  const phases = phaseDefinitions.map(phase => {
    const phaseTerms = terms.filter(term => term.phaseId === phase.id);
    return { ...phase, terms: phaseTerms, courseCodes: unique(phaseTerms.flatMap(term => term.courseCodes)), units: countUnits(phaseTerms.flatMap(term => term.courseCodes)) };
  });
  const ge = computeGE(choices, swcCodes);
  const selectedCodes = unique(terms.flatMap(term => term.courseCodes));
  const planRecords = [...swcTerms.values()].flatMap(term => term.courseCodes.map((code, index) => ({ id: `${term.id}-${index}`, code, status: 'planned', term: term.id, verified: false, grade: null })));
  const validation = validatePlan(planRecords, courses);
  const courseCounts = { academic: selectedCodes.filter(code => !/^NC\s/.test(code)).length, noncreditPreparation: selectedCodes.filter(code => /^NC\s/.test(code)).length, technicalElectiveSlots: technicalIndex };
  return { phases, terms, selectedCodes, coveredTargets, ge, choices, college, collegeRows, mathRoute, diffRoute, transferYear, graduationYear: transferYear + 3,
    counts: courseCounts, units: countUnits(selectedCodes), validation,
    assumptions: [
      'An immediately readable example, separate from your personal record. No course is marked completed by viewing or changing this route.',
      `The illustration starts college in spring ${2027 + yearShift}, with enough arithmetic/algebra readiness for the selected entry course. Slower foundation rebuilding can move the calendar; noncredit learning need not occupy one semester per topic.`,
      'The split-route example uses 7–11 regular Southwestern semester units and 6–7 summer GE units. Some laboratory semesters will still be demanding alongside substantial employment.',
      'MATH 101 plus MATH 104 and MATH 244 are alternative routes, not cumulative requirements. MATH 253 and ENGR 280 are also alternatives.',
      'MATH 104 is CSU-only and noncredit preparation earns zero units. The verified UC college-algebra/precalculus limit is one course, at most 5 semester units (7.5 quarter units); MATH 244 still has a 6-unit SWC workload. MATH 101/244 earn no UC credit if taken after MATH 121, 122 or C2210. Course subtotals are not an individual UC transferable-unit evaluation.',
      'Future summer sections, course times and university electives are not confirmed. Lowering the workload or losing a necessary section can move the target beyond 2033.',
      'Accepted transfer preparation removes repeated lower-division requirements in this example. Actual acceptance and the future catalog must be checked separately.',
      'University laboratory, team and design work require daytime flexibility and a fresh employment plan. The lighter first university year does not establish an approved part-time arrangement.',
      'The college selector is a reference scenario, not a claim that a college has been chosen. The default Revelle/Cal-GETC example assumes no optional LOTE certification, no prior Spanish, and a separate DEI course still needed; accepted prior work can remove those conditional choices. Conditions and overlaps remain in the concrete requirement rows.',
    ] };
}

const initialPlan = getDefaultPlan();
export const defaultPhases = initialPlan.phases;
export const defaultTerms = initialPlan.terms;
