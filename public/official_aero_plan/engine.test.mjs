import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeCode, calculateRequirements, earnedUnits, validatePlan, estimateTimeline, validateBackup, defaultState } from './engine.mjs';

const courses = [
  { code: 'MATH C2210', units: 5 }, { code: 'MATH C2220', units: 4, prerequisites: [['MATH C2210']] },
  { code: 'MATH 252', units: 4, prerequisites: [['MATH C2220']] }, { code: 'MATH 253', units: 3 }, { code: 'ENGR 280', units: 4 },
  { code: 'ENGR 250', units: 3 }, { code: 'ENGR 251', units: 3 },
  { code: 'PHYS 270', units: 4, prerequisites: [['MATH C2210']] },
  { code: 'PHYS 272', units: 4, prerequisites: [['PHYS 270', 'MATH C2220']] },
  { code: 'PHYS 274', units: 4, prerequisites: [['PHYS 272']], corequisites: [['MATH 252']] },
  { code: 'PHYS 273', units: 1, corequisites: [['PHYS 272']] },
  { code: 'MAE 113', units: 4, unitSystem: 'quarter', offerings: { status: 'typical', seasons: ['fall'] } },
  { code: 'MAE 114', units: 4, unitSystem: 'quarter', prerequisites: [['MAE 113']], offerings: { status: 'typical', seasons: ['fall'] } }
];
const mappings = [
  { id: '20a', target: 'MATH 20A', alternatives: [['MATH C2210']] },
  { id: '20c', target: 'MATH 20C', alternatives: [['MATH 252']] },
  { id: '20e', target: 'MATH 20E', alternatives: [['MATH 252']] },
  { id: '20d', target: 'MATH 20D', alternatives: [['MATH 253'], ['ENGR 280']] },
  { id: '30a', target: 'MAE 30A', alternatives: [['ENGR 250', 'ENGR 251']] },
  { id: '30b', target: 'MAE 30B', alternatives: [['ENGR 251']] },
  { id: '2cl', target: 'PHYS 2CL', alternatives: [['PHYS 273']] }
];
const done = (code, extra = {}) => ({ id: code.replace(/\s+/g, '-'), code, status: 'completed', grade: 'A', term: '2027-spring', verified: true, ...extra });
const planned = (code, term) => ({ id: code.replace(/\s+/g, '-'), code, status: 'planned', term, verified: false, grade: null });
const requirement = (records, target) => calculateRequirements(records, mappings).find(row => row.target === target);

test('Aliases preserve one actual course identity', () => {
  assert.equal(normalizeCode('math250'), 'MATH C2210');
  assert.equal(normalizeCode(' MATH 251 '), 'MATH C2220');
  assert.equal(normalizeCode('phys273'), 'PHYS 273');
  assert.equal(requirement([done('MATH 250')], 'MATH 20A').status, 'satisfied');
  assert.equal(earnedUnits([done('MATH 250'), done('MATH C2210', { id: 'second' })], courses).semester, 5);
});

test('One Calculus III completion satisfies two requirements but earns four units', () => {
  const records = [done('MATH 252')];
  assert.equal(requirement(records, 'MATH 20C').status, 'satisfied');
  assert.equal(requirement(records, 'MATH 20E').status, 'satisfied');
  assert.equal(earnedUnits(records, courses).semester, 4);
});

test('Statics articulation requires both courses; dynamics does not duplicate units', () => {
  assert.equal(requirement([done('ENGR 250')], 'MAE 30A').status, 'incomplete');
  assert.equal(requirement([done('ENGR 251')], 'MAE 30A').status, 'incomplete');
  const records = [done('ENGR 250'), done('ENGR 251')];
  assert.equal(requirement(records, 'MAE 30A').status, 'satisfied');
  assert.equal(requirement(records, 'MAE 30B').status, 'satisfied');
  assert.equal(earnedUnits(records, courses).semester, 6);
});

test('Differential equations routes are OR alternatives, not two required enrollments', () => {
  for (const code of ['MATH 253', 'ENGR 280']) assert.equal(requirement([done(code)], 'MATH 20D').status, 'satisfied');
});

test('Completed without grade, term, or verification remains unknown; C-minus does not satisfy C', () => {
  for (const extra of [{ grade: null }, { term: null }, { verified: false }, { grade: 'P' }]) {
    assert.equal(requirement([done('MATH 252', extra)], 'MATH 20C').status, 'unknown');
  }
  assert.equal(requirement([done('MATH 252', { grade: 'C-' })], 'MATH 20C').status, 'incomplete');
});

test('Planned, withdrawn, and pending-petition records never masquerade as credit', () => {
  assert.equal(requirement([planned('MATH 252', '2028-spring')], 'MATH 20C').status, 'planned');
  assert.equal(requirement([done('MATH 252', { status: 'withdrawn' })], 'MATH 20C').status, 'incomplete');
  assert.equal(requirement([done('OTHER 101', { petition: { status: 'pending', targets: ['MATH 20C'] } })], 'MATH 20C').status, 'unknown');
  assert.equal(requirement([done('OTHER 101', { petition: { status: 'approved', targets: ['MATH 20C'] } })], 'MATH 20C').status, 'satisfied');
});

test('Generic physics completion does not hide the screening lab', () => {
  assert.equal(requirement([done('PHYS 270'), done('PHYS 272'), done('PHYS 274')], 'PHYS 2CL').status, 'incomplete');
});

test('Unit totals separate verified, unverified, semester, and quarter records', () => {
  const total = earnedUnits([done('MATH 252'), done('MAE 113'), done('ENGR 251', { verified: false }), done('PHYS 270', { grade: 'F' })], courses);
  assert.deepEqual([total.semester, total.quarter, total.unverifiedSemester], [4, 4, 3]);
});

test('Prerequisites must precede; corequisites may be concurrent; AND remains AND', () => {
  let result = validatePlan([planned('PHYS 272', '2028-fall'), done('PHYS 270'), planned('MATH C2220', '2028-fall')], courses);
  assert.ok(result.issues.some(issue => issue.code === 'PHYS 272' && issue.type === 'prerequisite-conflict'));
  result = validatePlan([done('PHYS 272'), planned('MATH 252', '2028-fall'), planned('PHYS 274', '2028-fall')], courses);
  assert.ok(!result.issues.some(issue => issue.code === 'PHYS 274'));
  assert.ok(result.assumptions.some(item => item.code === 'PHYS 274' && item.type === 'planned-dependency'));
});

test('Delayed calculus propagates a visible physics dependency conflict', () => {
  const result = validatePlan([planned('MATH C2210', '2028-fall'), planned('PHYS 270', '2028-spring')], courses);
  assert.equal(result.valid, false);
  assert.match(result.issues.find(item => item.code === 'PHYS 270').message, /earlier term/);
});

test('Verified history does not invent missing-prerequisite enrollment errors', () => {
  assert.equal(validatePlan([done('MATH 252')], courses).valid, true);
  const orCourses = [...courses, { code: 'ENGR 999', units: 3, prerequisites: [['MATH 253'], ['ENGR 280']] }];
  assert.equal(validatePlan([done('ENGR 280'), planned('ENGR 999', '2028-spring')], orCourses).valid, true);
});

test('Annual offering and unknown future sections are distinct', () => {
  let result = validatePlan([done('MAE 113', { term: '2032-fall' }), planned('MAE 114', '2033-spring')], courses);
  assert.ok(result.issues.some(issue => issue.type === 'annual-offering'));
  result = validatePlan([planned('MATH C2210', '2030-spring')], courses);
  assert.ok(result.assumptions.some(item => item.type === 'future-offering'));
  const annual = [{ code: 'MAE 182', units: 4, offerings: { status: 'confirmed', academicYear: '2026-2027', terms: [] } }];
  assert.ok(validatePlan([planned('MAE 182', '2027-spring')], annual).issues.some(item => item.type === 'unavailable-offering'));
});

test('Timeline retains three university years and flags workload and unit limits', () => {
  const target = estimateTimeline({ transferYear: 2030, unitsPerTerm: 10, mathEntry: 'calculus', universityYears: 2 });
  assert.equal(target.graduationYear, 2033);
  assert.equal(target.targetFeasible, true);
  assert.equal(estimateTimeline({ transferYear: 2030, unitsPerTerm: 4 }).targetFeasible, false);
  assert.equal(estimateTimeline({ weeklyHours: 30, weeklyCapacity: 20 }).targetFeasible, false);
  assert.equal(estimateTimeline({ unitsPerTerm: 0 }).earliestTransferYear, null);
});

test('Valid backups round-trip without mutating their source', () => {
  const state = defaultState(); state.courseRecords.push(done('MATH 250')); state.notes.reflection = 'I can explain the coordinate axes.';
  const result = validateBackup(JSON.stringify({ ...state, exportedAt: '2026-10-31T12:00:00Z' }));
  assert.equal(result.valid, true);
  result.data.notes.reflection = 'changed';
  assert.equal(state.notes.reflection, 'I can explain the coordinate axes.');
});

test('Malformed, incompatible, dangerous, and oversized backups fail without replacement data', () => {
  for (const value of ['{', { ...defaultState(), schemaVersion: 5 }, { ...defaultState(), surprise: 1 }, JSON.parse('{"__proto__":{"polluted":true}}'), { ...defaultState(), notes: { huge: 'x'.repeat(100001) } }, { ...defaultState(), courseRecords: [done('MATH 252', { status: 'accepted' })] }]) {
    const result = validateBackup(value); assert.equal(result.valid, false); assert.equal(result.data, null); assert.ok(result.errors.length);
  }
  assert.equal({}.polluted, undefined);
});
