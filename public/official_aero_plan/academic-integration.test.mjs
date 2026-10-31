import test from 'node:test';
import assert from 'node:assert/strict';
import { academic, courses, mappings, sources, sourceById, degreePlan, scenarios, screeningTargets } from './academic-data.mjs';
import { calculateRequirements, earnedUnits, validatePlan } from './engine.mjs';

const complete = (code, extra = {}) => ({ id: code.replace(/\s+/g, '-'), code, status: 'completed', grade: 'A', term: '2028-spring', verified: true, ...extra });
const requirement = (records, target) => calculateRequirements(records, mappings).find(row => row.target === target);
const byCode = code => courses.find(course => course.code === code);

test('Normalized academic data preserves provenance and explicit unit systems', () => {
  assert.equal(new Set(courses.map(course => course.code)).size, courses.length);
  assert.equal(byCode('MATH 252').unitSystem, 'semester');
  assert.equal(byCode('MATH 20E').unitSystem, 'quarter');
  for (const course of courses) {
    assert.ok(Number.isFinite(course.units)); assert.ok(course.title); assert.ok(course.sourceIds.length);
    for (const id of course.sourceIds) assert.ok(sourceById[id], `${course.code} source ${id}`);
  }
  for (const source of sources) { assert.match(source.url, /^https:\/\//); assert.equal(source.lastChecked, '2026-10-31'); }
  assert.equal(sourceById['assist-aero'].status, 'verified-primary');
  assert.equal(academic.articulation.status, 'verified-primary');
});

test('Real ASSIST rules preserve one-to-many, AND, and OR without duplicate credits', () => {
  assert.equal(requirement([complete('MATH 252')], 'MATH 20C').status, 'satisfied');
  assert.equal(requirement([complete('MATH 252')], 'MATH 20E').status, 'satisfied');
  assert.equal(earnedUnits([complete('MATH 252')], courses).semester, 4);
  assert.equal(requirement([complete('ENGR 250')], 'MAE 30A').status, 'incomplete');
  const mechanics = [complete('ENGR 250'), complete('ENGR 251')];
  assert.equal(requirement(mechanics, 'MAE 30A').status, 'satisfied');
  assert.equal(requirement(mechanics, 'MAE 30B').status, 'satisfied');
  assert.equal(earnedUnits(mechanics, courses).semester, 6);
  for (const code of ['MATH 253', 'ENGR 280']) assert.equal(requirement([complete(code)], 'MATH 20D').status, 'satisfied');
});

test('Screening stays separate from recommended and degree-only requirements', () => {
  assert.equal(screeningTargets.length, 10);
  assert.equal(mappings.find(row => row.target === 'PHYS 2CL').role, 'screening');
  assert.equal(mappings.find(row => row.target === 'MAE 8').role, 'recommended');
  assert.equal(mappings.find(row => row.target === 'MATH 20E').role, 'degree');
  assert.equal(requirement([complete('PHYS 270'), complete('PHYS 272'), complete('PHYS 274')], 'PHYS 2CL').status, 'incomplete');
  assert.equal(mappings.some(row => row.target === 'MAE 11'), false);
});

test('Catalog alternatives remain alternatives and approval routes remain visible', () => {
  assert.deepEqual(byCode('MATH C2210').prerequisites, [['MATH 244'], ['MATH 101', 'MATH 104']]);
  assert.match(byCode('MATH C2210').approvalRoutes.join(' '), /placement/);
  assert.deepEqual(byCode('PHYS 274').prerequisites, [['PHYS 272']]);
  assert.deepEqual(byCode('PHYS 274').corequisites, [['MATH 252']]);
  assert.equal(validatePlan([complete('PHYS 272'), complete('MATH C2220'), { id: 'calc', code: 'MATH 252', status: 'planned', term: '2029-spring' }, { id: 'physics', code: 'PHYS 274', status: 'planned', term: '2029-spring' }], courses).valid, true);
});

test('Common-route lists are not silently promoted into authoritative prerequisites', () => {
  const course = byCode('MAE 155B');
  assert.deepEqual(course.prerequisites, []);
  assert.deepEqual(course.indicativePrerequisites, [['MAE 113', 'MAE 142', 'MAE 155A', 'MAE 170']]);
  assert.equal(course.prerequisiteScope, 'illustrative-common-route-only');
  assert.match(course.prerequisiteWarning, /not.*exact enrollment/);
  assert.ok(byCode('MATH 20D').prerequisiteNote.includes('C–'));
});

test('Published sequence preserves nine quarters and scenarios remain conditional', () => {
  assert.equal(degreePlan.length, 3);
  for (const year of degreePlan) for (const term of ['fall', 'winter', 'spring']) assert.ok(year[term].length);
  assert.equal(degreePlan[2].spring.includes('MAE 155B'), true);
  for (const scenario of scenarios) { assert.equal(scenario.graduateSpring - scenario.transferFall, 3); assert.ok(scenario.conditions); assert.ok(scenario.calculationNote); }
});
