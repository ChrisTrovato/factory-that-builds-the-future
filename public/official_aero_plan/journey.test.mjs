import test from 'node:test';
import assert from 'node:assert/strict';
import { courses, sources, subjectGroups, getDefaultPlan, defaultPhases, defaultTerms, computeGE, geSlots, collegeScenarios, technicalDirection } from './journey-model.mjs';
import { normalizeCode, earnedUnits, defaultState, validateBackup, validatePlan, parseTerm } from './engine.mjs';

const course = code => courses.find(item => item.code === normalizeCode(code));
const completed = (code, extra = {}) => ({ id: code.replace(/\s+/g, '-'), code, status: 'completed', grade: 'A', term: '2028-spring', verified: true, ...extra });

test('One complete shared journey has real courses across all seven subjects and nine university quarters', () => {
  const plan = getDefaultPlan();
  assert.equal(subjectGroups.length, 7);
  for (const subject of subjectGroups) assert.ok(plan.selectedCodes.some(code => course(code)?.subject === subject.id), `Default plan missing ${subject.title}`);
  assert.equal(plan.terms.filter(term => term.institutionId === 'ucsd').length, 9);
  assert.equal(plan.counts.technicalElectiveSlots, 5);
  for (const code of plan.selectedCodes) assert.ok(course(code), `Missing plan course ${code}`);
  assert.equal(plan.selectedCodes.includes('GE'), false); assert.equal(plan.selectedCodes.includes('TE'), false);
  assert.equal(defaultPhases.flatMap(phase => phase.terms).length, defaultTerms.length);
  assert.equal(plan.validation.valid, true, plan.validation.issues.map(issue => issue.message).join('\n'));
});

test('Route choices replace alternatives instead of adding mandatory courses', () => {
  const split = getDefaultPlan(), combined = getDefaultPlan({ mathRoute: 'combined', diffRoute: 'engr280' });
  assert.ok(split.selectedCodes.includes('MATH 101')); assert.ok(split.selectedCodes.includes('MATH 104')); assert.ok(!split.selectedCodes.includes('MATH 244'));
  assert.ok(combined.selectedCodes.includes('MATH 244')); assert.ok(!combined.selectedCodes.includes('MATH 101')); assert.ok(!combined.selectedCodes.includes('MATH 104'));
  assert.ok(combined.selectedCodes.includes('ENGR 280')); assert.ok(!combined.selectedCodes.includes('MATH 253'));
  assert.equal(split.units.semester + 1, combined.units.semester); // ENGR2804 vs MATH2533; both calculus-entry branches6.
  for (const optional of ['NC 1148', 'NC 283', 'PHYS 271', 'PHYS 275']) assert.ok(!split.selectedCodes.includes(optional), `Optional ${optional} entered the required example`);
});

test('Accepted example articulation prevents repeated university math and mechanics without changing personal state', () => {
  const personal = defaultState(); personal.notes.reminder = 'My actual transcript is still empty.';
  const before = JSON.stringify(personal); const plan = getDefaultPlan(personal.preferences);
  const universityCodes = plan.terms.filter(term => term.institutionId === 'ucsd').flatMap(term => term.courseCodes);
  for (const code of ['MATH 20E', 'MAE 8', 'MAE 30A', 'MAE 30B']) {
    assert.ok(!universityCodes.includes(code)); assert.ok(plan.coveredTargets.some(item => item.code === code));
  }
  assert.equal(JSON.stringify(personal), before); assert.equal(personal.courseRecords.length, 0);
});

test('Noncredit and old course-number aliases never manufacture degree units', () => {
  assert.equal(normalizeCode('NC146'), 'NC 143');
  assert.equal(normalizeCode('ENGL 115'), 'ENGL C1000'); assert.equal(normalizeCode('ENGL 116'), 'ENGL C1001'); assert.equal(normalizeCode('COMM104'), 'COMM C1000');
  const result = earnedUnits([completed('NC 143'), completed('NC 146'), completed('ENGL 115'), completed('ENGL C1000', { id: 'english-repeat' })], courses);
  assert.equal(result.semester, 4); assert.equal(result.quarter, 0); assert.deepEqual(result.noncreditCourses, ['NC 143']);
  assert.equal(course('MATH 104').transferability, 'CSU-only');
});

test('GE counts each selected course once and enforces area and social-discipline restrictions', () => {
  const ge = computeGE(); assert.equal(ge.valid, true, ge.issues.map(issue => issue.message).join('\n'));
  assert.equal(ge.assignments.length, geSlots.length); assert.equal(ge.units.semester, 39);
  assert.equal(ge.selectedCodes.filter(code => code === 'CHEM 200').length, 1);
  const duplicated = computeGE({ '4a': 'MAS 110', '6': 'MAS 110' });
  assert.ok(duplicated.issues.some(issue => issue.type === 'duplicate-ge-use'));
  const sameDiscipline = computeGE({ '4b': 'PSYC C1000' });
  assert.ok(sameDiscipline.issues.some(issue => issue.type === 'social-discipline'));
});

test('A biology course laboratory corequisite survives existing GE lab coverage', () => {
  const ge = computeGE({ '5B': 'BIOL 100' });
  assert.ok(ge.requiredCompanionCodes.includes('BIOL 101'));
  assert.ok(ge.issues.some(issue => issue.type === 'missing-corequisite'));
  const plan = getDefaultPlan({ geChoices: { '5B': 'BIOL 100' } });
  const term = plan.terms.find(item => item.courseCodes.includes('BIOL 100'));
  assert.ok(term.courseCodes.includes('BIOL 101')); assert.equal(plan.ge.valid, true);
  const separateSlot = getDefaultPlan({ geChoices: { '5B': 'BIOL 100', '5C': 'BIOL 101' } });
  const lectureTerm = separateSlot.terms.find(item => item.courseCodes.includes('BIOL 100'));
  assert.ok(lectureTerm.courseCodes.includes('BIOL 101'));
  assert.equal(separateSlot.terms.flatMap(item => item.courseCodes).filter(code => code === 'BIOL 101').length, 1);
  assert.equal(separateSlot.validation.valid, true);
});

test('The default reference college uses sequential linked language pairs without repeating accepted preparation', () => {
  const plan = getDefaultPlan(); assert.equal(plan.college.id, 'revelle-calgetc');
  const languageCodes = ['LISP 1A', 'LISP 1AX', 'LISP 1B', 'LISP 1BX'];
  const records = plan.terms.flatMap(term => term.courseCodes.filter(code => languageCodes.includes(code)).map(code => ({ id: code.replace(/ /g, '-'), code, status: 'planned', term: term.id })));
  assert.equal(records.length, 4);
  assert.equal(validatePlan(records, courses).valid, true);
  const before = plan.terms.findIndex(term => term.courseCodes.includes('LISP 1A'));
  const after = plan.terms.findIndex(term => term.courseCodes.includes('LISP 1B'));
  assert.ok(before < after);
  assert.equal(plan.terms[before].courseCodes.includes('LISP 1AX'), true);
  assert.equal(plan.terms[after].courseCodes.includes('LISP 1BX'), true);
  assert.equal(languageCodes.reduce((sum, code) => sum + course(code).units, 0), 10);
  assert.ok(plan.selectedCodes.includes('HUM 100')); assert.ok(plan.selectedCodes.includes('ANTH 21'));
  const certified = getDefaultPlan({ collegeScenario: 'revelle-calgetc-lote' });
  assert.ok(languageCodes.every(code => !certified.selectedCodes.includes(code)));
  assert.equal(plan.units.quarter - certified.units.quarter, 10);
  for (const item of courses) for (const kind of ['prerequisites', 'corequisites']) for (const route of item[kind]) assert.ok(Array.isArray(route));
});

test('The university illustration respects researched course ordering when its transfer preparation is accepted', () => {
  const plan = getDefaultPlan();
  const accepted = plan.coveredTargets.map((item, index) => completed(item.target, { id: `accepted-${index}`, term: '2030-spring', grade: 'C' }));
  const future = plan.terms.filter(term => term.institutionId === 'ucsd').flatMap(term => term.courseCodes.map((code, index) => ({ id: `${term.id}-${index}`, code, status: 'planned', term: term.id })));
  const validation = validatePlan([...accepted, ...future], courses);
  assert.equal(validation.valid, true, validation.issues.map(issue => issue.message).join('\n'));
  const termOf = code => parseTerm(future.find(record => record.code === code).term).ordinal;
  assert.ok(termOf('MAE 108') < termOf('MAE 145'));
  assert.ok(termOf('MAE 143B') < termOf('MAE 144'));
  assert.equal(plan.terms.find(term => term.id === '2031-spring').units, 12);
  assert.equal(plan.terms.find(term => term.id === '2031-fall').units, 12);
  assert.equal(plan.terms.find(term => term.id === '2031-spring').courseCodes.includes('MAE 107'), true);
  assert.equal(plan.selectedCodes.filter(code => code === 'MAE 107').length, 1);
  assert.ok(plan.terms.find(term => term.id === '2031-spring').notes.some(note => /spring section is not confirmed/.test(note)));
  assert.ok(plan.terms.find(term => term.id === '2033-spring').notes.some(note => /graduating-quarter/.test(note)));
  // Approval, standing, and future availability remain explicit enrollment
  // conditions; a clean course-order result does not approve registration.
  assert.match(course('MAE 148').prerequisiteText || course('MAE 148').enrollmentNote || '', /approval/i);
});

test('Every selected technical option, college course and source link resolves', () => {
  const sourceIds = new Set(sources.map(source => source.id));
  for (const code of technicalDirection.defaultCodes5 || technicalDirection.defaultCodes) assert.ok(course(code), `Unresolved technical option ${code}`);
  for (const college of collegeScenarios) for (const row of college.rows) for (const code of row.courseCodes || []) assert.ok(course(code), `Unresolved college reference ${college.id}: ${code}`);
  for (const item of courses) for (const id of item.sourceIds || []) assert.ok(sourceIds.has(id), `Unresolved source ${item.code}: ${id}`);
});

test('Schema1 backups retain old codes, notes and statuses; new optional preferences validate safely', () => {
  const old = defaultState(); old.courseRecords.push(completed('ENGL 115')); old.notes['course-ENGL 115'] = 'Keep this old note exactly.';
  const restored = validateBackup(JSON.stringify(old)); assert.equal(restored.valid, true); assert.deepEqual(restored.data, old);
  const next = structuredClone(old); next.preferences = { geChoices: { '5B': 'BIOL 140' }, collegeScenario: 'seventh-calgetc', showProgress: false, mathRoute: 'split', diffRoute: 'math253' };
  assert.equal(validateBackup(next).valid, true);
  for (const preferences of [{ geChoices: [] }, { geChoices: { '1A': {} } }, { showProgress: 'false' }, { mathRoute: {} }, { collegeScenario: [] }]) {
    assert.equal(validateBackup({ ...old, preferences }).valid, false);
  }
});
