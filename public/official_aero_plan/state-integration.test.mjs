import test from 'node:test';
import assert from 'node:assert/strict';
import { courses, mappings, scenarios } from './academic-data.mjs';
import { defaultState, validateBackup, calculateRequirements, earnedUnits, validatePlan } from './engine.mjs';

const complete = (code, extra = {}) => ({ id: code.replace(/\s+/g, '-'), code, status: 'completed', grade: 'A', term: '2028-spring', verified: true, ...extra });
const requirement = (records, target) => calculateRequirements(records, mappings).find(row => row.target === target);

test('Direct UCSD completion satisfies its own target without altering SWC articulation', () => {
  const result = requirement([complete('MATH 20C')], 'MATH 20C');
  assert.equal(result.status, 'satisfied'); assert.equal(result.routeKind, 'direct');
  assert.deepEqual(result.route, ['MATH 20C']); assert.deepEqual(result.alternatives, [['MATH 252']]);
  assert.equal(requirement([complete('MATH 20C')], 'MATH 20E').status, 'incomplete');
  const units = earnedUnits([complete('MATH 20C')], courses);
  assert.equal(units.semester, 0); assert.equal(units.quarter, 4);
});

test('Direct target records preserve unknown, planned, and inadequate-grade states', () => {
  for (const extra of [{ grade: null }, { verified: false }, { term: null }]) assert.equal(requirement([complete('MATH 20C', extra)], 'MATH 20C').status, 'unknown');
  assert.equal(requirement([complete('MATH 20C', { status: 'planned' })], 'MATH 20C').status, 'planned');
  assert.equal(requirement([complete('MATH 20C', { grade: 'C-' })], 'MATH 20C').status, 'incomplete');
  assert.equal(requirement([complete('MATH 20C', { status: 'withdrawn' })], 'MATH 20C').status, 'incomplete');
});

test('Backup preserves the whole working notebook and named scenario without implicit verification', () => {
  const state = defaultState();
  state.courseRecords = [complete('MATH 250'), complete('MATH C2220', { status: 'enrolled', grade: null, verified: false, term: '2028-fall' })];
  state.scenarios = [{ id: 'my-route', name: 'A manageable route', inputs: scenarios[1].inputs, courseRecords: structuredClone(state.courseRecords) }];
  state.tasks = { placement: true, advising: false };
  state.projects = { 'measurement-notebook': { status: 'Building', budget: 25 } };
  state.skills = { fractions: 'practicing', vectors: 'introduced' };
  state.notes = { 'course-MATH C2220': 'Ask whether the evening section will run.', weekly: 'Two hours longer than expected.' };
  state.preferences = { fontSize: 19, savedFrontiers: ['orbital-servicing'], interests: { robotics: 'Curious' }, plan: { weeklyCapacity: 20, weeklyHours: 24, restHours: 56 } };
  state.exportedAt = '2026-10-31T16:00:00.000Z';
  const restored = validateBackup(JSON.stringify(state));
  assert.equal(restored.valid, true, restored.errors.join('\n')); assert.deepEqual(restored.data, state);
  assert.equal(requirement(restored.data.courseRecords, 'MATH 20A').status, 'satisfied');
  assert.equal(requirement(restored.data.courseRecords, 'MATH 20B').status, 'planned');
  restored.data.scenarios[0].courseRecords[0].grade = 'F';
  assert.equal(restored.data.courseRecords[0].grade, 'A');
});

test('Failed import returns no replacement and leaves the caller state untouched', () => {
  const current = { ...defaultState(), courseRecords: [complete('PHYS 273')], notes: { reminder: 'Keep this.' } };
  const original = JSON.stringify(current);
  for (const invalid of [
    { ...current, scenarios: [null] },
    { ...current, scenarios: [{ id: 'a', name: 'Bad shape', inputs: [] }] },
    { ...current, scenarios: [{ id: 'a', name: 'Duplicate', inputs: {} }, { id: 'a', name: 'Duplicate again', inputs: {} }] },
    { ...current, scenarios: [{ id: 'a', name: 'Bad course snapshot', inputs: {}, courseRecords: [{ id: 'x', code: 'PHYS 273', status: 'accepted' }] }] },
    { ...current, courseRecords: [complete('PHYS 273'), complete('PHYS 273')] },
  ]) {
    const result = validateBackup(invalid); assert.equal(result.valid, false); assert.equal(result.data, null);
    assert.equal(JSON.stringify(current), original);
  }
});

test('Prototype keys at arbitrary depth are rejected and note text stays inert data', () => {
  const valid = defaultState(); valid.notes.test = '<img src=x onerror=alert(1)>';
  assert.equal(validateBackup(valid).data.notes.test, valid.notes.test);
  const polluted = JSON.stringify(valid).replace('"preferences":{}', '"preferences":{"nested":{"constructor":{"prototype":{"polluted":true}}}}');
  assert.equal(validateBackup(polluted).valid, false);
  assert.equal({}.polluted, undefined);
});

test('A restored unknown completion does not unlock a later physics course', () => {
  const state = defaultState();
  state.courseRecords = [complete('MATH C2210', { grade: null }), { id: 'physics', code: 'PHYS 270', status: 'planned', term: '2028-fall', grade: null, verified: false }];
  const restored = validateBackup(JSON.stringify(state)); assert.equal(restored.valid, true);
  const plan = validatePlan(restored.data.courseRecords, courses);
  assert.equal(plan.valid, false); assert.ok(plan.issues.some(issue => issue.code === 'PHYS 270' && issue.type === 'prerequisite-conflict'));
});

test('Unsafe imported identifiers cannot enter generated attributes', () => {
  for (const id of ['record" onclick="alert(1)', '<img>', 'with spaces', '', 'a'.repeat(201)]) {
    assert.equal(validateBackup({ ...defaultState(), courseRecords: [complete('PHYS 273', { id })] }).valid, false);
  }
  for (const id of ['record_1', '1a62f280-7ee9-4801-a375-5750481a952f']) {
    assert.equal(validateBackup({ ...defaultState(), courseRecords: [complete('PHYS 273', { id })] }).valid, true);
  }
});

test('Malformed UI maps are rejected before they can break includes, assignments or text rendering', () => {
  const invalid = [
    { notes: { entry: {} } }, { skills: { algebra: [] } }, { tasks: { advising: 'true' } },
    { projects: { first: 'Building' } }, { projects: { first: { status: {} } } },
    { projects: { first: { budget: -1 } } }, { projects: { first: { budget: '20' } } },
    { preferences: { savedFrontiers: {} } }, { preferences: { savedFrontiers: [7] } },
    { preferences: { interests: [] } }, { preferences: { interests: { controls: {} } } },
    { preferences: { fontSize: '19px' } }, { preferences: { plan: [] } },
  ];
  for (const patch of invalid) {
    const result = validateBackup({ ...defaultState(), ...patch });
    assert.equal(result.valid, false, JSON.stringify(patch)); assert.equal(result.data, null);
  }
});

test('Both current and saved scenario inputs reject injected types and support recovery reserve', () => {
  for (const inputs of [{ transferYear: '2030" autofocus onfocus="alert(1)' }, { restHours: {} }, { summer: 'false' }, { postTransferPartTime: 1 }, { name: {} }, { startSeason: [] }, { mathEntry: {} }, { unknownNumericField: 5 }]) {
    assert.equal(validateBackup({ ...defaultState(), preferences: { plan: inputs } }).valid, false);
    assert.equal(validateBackup({ ...defaultState(), scenarios: [{ id: 'safe', name: 'Scenario', inputs }] }).valid, false);
  }
  const plan = { name: 'Balanced', startYear: 2027, startSeason: 'spring', transferYear: 2030, mathEntry: 'precalculus', unitsPerTerm: 9, summer: false, summerUnits: 3, completedUnits: 0, universityYears: 3, weeklyCapacity: 24, weeklyHours: 27, classHours: 9, labHours: 3, practiceHours: 12, travelHours: 3, workHours: 40, otherHours: 15, restHours: 56, unitFee: 46, books: 250, transport: 300, fees: 100, postTransferPartTime: false };
  assert.equal(validateBackup({ ...defaultState(), preferences: { plan }, scenarios: [{ id: 'safe', name: plan.name, inputs: plan }] }).valid, true);
});
