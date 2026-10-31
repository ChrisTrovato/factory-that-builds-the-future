import test from 'node:test';
import assert from 'node:assert/strict';
import { courses, courseByCode, subjectGroups, getDefaultPlan } from './journey-model.mjs';
import { renderJourney, connectionSupplement, explorerState, explorerResults, escapeHTML } from './journey-ui.mjs';
import { defaultState, normalizeCode } from './engine.mjs';
import { projects, frontiers } from './future-data.mjs';

// These manifests come from the requested academic journey, not the renderer.
const core = ['MAE 2', 'MAE 8', 'MAE 11', 'MAE 21', 'MAE 30A', 'MAE 30B', 'MAE 101A', 'MAE 101B', 'MAE 104', 'MAE 105', 'MAE 107', 'MAE 113', 'MAE 131A', 'MAE 142', 'MAE 143A', 'MAE 143B', 'MAE 155A', 'MAE 155B', 'MAE 170', 'MAE 175A', 'SE 160A'];
const specializationChoices = ['MAE 180', 'MAE 108', 'MAE 114', 'MAE 181', 'MAE 182', 'MAE 240', 'MAE 101C', 'MAE 101D', 'MAE 110', 'MAE 184', 'MAE 185', 'MAE 201', 'MAE 202', 'MAE 212', 'MAE 130', 'MAE 144', 'MAE 145', 'MAE 146', 'MAE 148', 'MAE 200'];
const defaultGE = {
  'ENGL C1000': 4, 'ENGL C1001': 4, 'COMM C1000': 3, 'MATH C2210': 5,
  'ART 104': 3, 'PHIL 120': 3, 'PSYC C1000': 3, 'ECON C2001': 3,
  'CHEM 200': 5, 'BIOL 140': 3, 'MAS 110': 3,
};
const page = (route, slug = '', state = defaultState()) => renderJourney(route, slug, state);
const hrefForCourse = code => `#course/${encodeURIComponent(normalizeCode(code))}`;
const rowCodes = html => [...html.matchAll(/class="course-row-code">([^<]+)</g)].map(match => match[1]);
const guide = code => courseByCode[normalizeCode(code)];

test('An empty profile can discover every subject and actual beginner, writing and GE courses immediately', () => {
  const state = defaultState(), snapshot = JSON.stringify(state);
  const home = page('home', '', state);
  for (const subject of subjectGroups) assert.ok(home.includes(`href="#subject/${subject.id}"`), `No direct subject route for ${subject.title}`);
  for (const code of ['NC 1025', 'ENGL C1000', 'COMM C1000', 'ART 104', 'PHIL 120', 'MAS 110']) assert.ok(home.includes(code), `Home hides actual ${code} course identity`);
  for (const route of ['before', 'after', 'journey', 'ge', 'electives']) {
    const html = page(route, '', state);
    assert.ok(html.includes('course-row'), `${route} does not expose actual course rows`);
    assert.ok(!html.includes('Course not found'), `${route} contains a missing course page`);
  }
  assert.equal(JSON.stringify(state), snapshot, 'Exploring the default education must not manufacture personal completion');
  assert.equal(state.courseRecords.length, 0);
});

test('The mathematics subject reaches from real noncredit refreshers through the university methods without repeating covered courses', () => {
  const math = page('subject', 'math');
  for (const code of ['NC 1025', 'NC 143', 'NC 147', 'NC 1148', 'NC 283', 'NC 286', 'NC 287', 'MATH 101', 'MATH 104', 'MATH 244', 'MATH C2210', 'MATH C2220', 'MATH 252', 'MATH 253', 'MATH 254', 'MAE 105', 'MAE 107', 'MAE 143A', 'MAE 143B']) {
    assert.ok(math.includes(hrefForCourse(code)), `Mathematics journey does not lead to ${code}`);
  }
  for (const code of ['MATH 35', 'MATH 45', 'MATH 60', 'MATH 62']) assert.ok(!rowCodes(math).includes(code), `Retired preparation ${code} became a current enrollment rung`);
  const afterMathRows = rowCodes(page('subject', 'math?stage=university'));
  for (const code of ['MATH 18', 'MATH 20A', 'MATH 20B', 'MATH 20C', 'MATH 20D', 'MATH 20E']) assert.ok(!afterMathRows.includes(code), `Covered ${code} appears as another course to take`);
  const afterEngineeringRows = rowCodes(page('subject', 'engineering?stage=university'));
  for (const code of ['MAE 8', 'MAE 30A', 'MAE 30B']) assert.ok(!afterEngineeringRows.includes(code), `Covered ${code} reappears in the university sequence`);
});

test('Optional choices respect the selected subject stage instead of mixing sending-college and university coursework', () => {
  for (const subject of subjectGroups) {
    for (const [stage, institutionId] of [['transfer', 'swc'], ['university', 'ucsd']]) {
      const codes = rowCodes(page('subject', `${subject.id}?stage=${stage}`));
      for (const code of codes) assert.equal(guide(code)?.institutionId, institutionId, `${subject.title} / ${stage} includes an out-of-stage course row: ${code}`);
    }
  }
  const whole = rowCodes(page('subject', 'math'));
  for (const code of ['MATH 101', 'MAE 105', 'MATH 180A']) assert.ok(whole.includes(code), `Whole-subject view lost ${code} while filtering the stage views`);
});

test('GE alternatives use companion courses already present in the whole plan without falsely demanding another change', () => {
  for (const choices of [{ '5B': 'BIOL 100' }, { '5C': 'PHYS 273' }]) {
    const state = defaultState(); state.preferences.geChoices = choices;
    const plan = getDefaultPlan({ geChoices: choices });
    assert.equal(plan.ge.valid, true);
    const html = page('ge', '', state);
    assert.ok(!html.includes('This combination needs one change.'), `GE page contradicts the valid plan for ${JSON.stringify(choices)}`);
    if (choices['5B']) {
      const term = plan.terms.find(item => item.courseCodes.includes('BIOL 100'));
      assert.ok(term.courseCodes.includes('BIOL 101'), 'Removing the warning must not remove the required biology companion');
      assert.ok(html.includes(hrefForCourse('BIOL 101')), 'The selected biology course still needs to explain its companion');
    }
  }
  const invalid = defaultState(); invalid.preferences.geChoices = { '4a': 'ECON C2002', '4b': 'ECON C2001' };
  assert.ok(page('ge', '', invalid).includes('This combination needs one change.'), 'Plan-aware validation must retain the two-discipline restriction');
});

test('Every requested core, specialization choice and default GE course has a usable guide with real units and a worked preview', () => {
  for (const code of new Set([...core, ...specializationChoices, ...Object.keys(defaultGE)])) {
    const course = guide(code);
    assert.ok(course, `Missing requested course ${code}`);
    assert.ok(course.title && Number.isFinite(course.units) && course.units > 0, `Missing course identity for ${code}`);
    for (const field of ['about', 'task', 'solution', 'use']) assert.ok(course.learning?.[field], `${code} lacks ${field}`);
    assert.ok(course.learning.ideas.length >= 3, `${code} lacks substantive idea coverage`);
    const html = page('course', code);
    assert.ok(html.includes(escapeHTML(course.title)), `${code} title is not visible`);
    assert.ok(html.includes(escapeHTML(course.learning.task)), `${code} task is not visible`);
    assert.ok(html.includes(escapeHTML(course.learning.solution)), `${code} solution is not available`);
  }
  for (const [code, units] of Object.entries(defaultGE)) {
    assert.equal(guide(code).units, units, `${code} must use its actual units, not its GE heading minimum`);
    assert.equal(guide(code).unitSystem, 'semester');
  }
  const electiveHTML = page('electives');
  for (const code of specializationChoices) assert.ok(electiveHTML.includes(hrefForCourse(code)), `Elective chooser still exposes an unexplained ${code}`);
});

test('Ordinary language and former course numbers find the actual writing, speech and preparation records', () => {
  const original = { ...explorerState };
  try {
    for (const [query, code] of [['public speaking', 'COMM C1000'], ['speech', 'COMM C1000'], ['ENGL 115', 'ENGL C1000'], ['ENGL 116', 'ENGL C1001'], ['COMM 104', 'COMM C1000'], ['MATH 250', 'MATH C2210'], ['MATH 251', 'MATH C2220'], ['NC 146', 'NC 143'], ['beginner math', 'NC 1025'], ['biology', 'BIOL 140']]) {
      Object.assign(explorerState, { query, school: 'all', subject: 'all', stage: 'all', role: 'all', optional: false });
      assert.ok(explorerResults().includes(hrefForCourse(code)), `Search '${query}' cannot find ${code}`);
    }
  } finally { Object.assign(explorerState, original); }
  const writing = page('subject', 'writing?stage=transfer');
  for (const code of ['ENGL C1000', 'ENGL C1001', 'COMM C1000']) assert.ok(writing.includes(hrefForCourse(code)));
  assert.ok(writing.includes('Area 1C'), 'Public speaking has no explicit formal category explanation');
});

test('Course dependency links either open a guide or deliberately identify the official external catalog alternative', () => {
  const missing = [];
  for (const course of courses) {
    const codes = new Set([...(course.prerequisites || []).flat(), ...(course.corequisites || []).flat()]);
    for (const code of codes) {
      if (guide(code)) continue;
      const external = course.externalPrerequisites?.find(item => normalizeCode(item.code) === normalizeCode(code));
      if (!external?.url || !(external.title || external.note)) { missing.push(`${course.code} → ${code}`); continue; }
      const url = new URL(external.url);
      assert.ok(url.protocol === 'https:' && /(^|\.)(ucsd|swccd)\.edu$/.test(url.hostname), `External ${code} is not an official academic source`);
      assert.ok(page('course', course.code).includes(`href="${escapeHTML(external.url)}"`), `${course.code} does not expose the external ${code} link`);
    }
  }
  assert.deepEqual(missing, [], `Undeclared external prerequisite alternatives:\n${missing.join('\n')}`);
});

test('Learning links have live course, project and frontier targets throughout the merged inventory', () => {
  const projectIds = new Set(projects.map(item => item.id)), frontierIds = new Set(frontiers.map(item => item.id));
  for (const course of courses) {
    for (const code of [...(course.learning?.buildsOn || []), ...(course.learning?.opens || [])]) assert.ok(guide(code), `${course.code} learning link has no guide: ${code}`);
    for (const id of course.learning?.projectIds || []) assert.ok(projectIds.has(id), `${course.code} has a missing project ${id}`);
    for (const id of course.learning?.frontierIds || []) assert.ok(frontierIds.has(id), `${course.code} has a missing future topic ${id}`);
  }
});

test('Concrete course-to-project-to-future chains include early mathematics, writing and advanced controls in both directions', () => {
  for (const [code, projectId, frontierId] of [['MATH 104', 'p02', 'repair'], ['MATH 253', 'p08', 'heat'], ['ENGL C1000', 'p12', 'assembly'], ['MAE 143B', 'p06', 'caretaker']]) {
    assert.ok(page('course', code).includes(`href="#project/${projectId}"`), `${code} cannot open its project`);
    const projectPage = connectionSupplement('project', projectId);
    assert.ok(projectPage.includes(hrefForCourse(code)), `${projectId} cannot return to ${code}`);
    assert.ok(projectPage.includes(`href="#frontier/${frontierId}"`), `${projectId} cannot continue to ${frontierId}`);
    assert.ok(connectionSupplement('frontier', frontierId).includes(hrefForCourse(code)), `${frontierId} cannot reconnect to ${code}`);
  }
});

test('Every project gives a bounded effort estimate for its smallest version with explicit planning assumptions', () => {
  for (let number = 1; number <= 12; number++) {
    const id = `p${String(number).padStart(2, '0')}`, project = projects.find(item => item.id === id);
    assert.ok(project, `The existing learning project ${id} disappeared`);
    assert.equal(typeof project.effortEstimate, 'string', `${id} has no readable effort estimate`);
    assert.ok(project.effortEstimate.trim(), `${id} has an empty effort estimate`);
    const range = project.smallestVersionHours;
    assert.ok(Array.isArray(range) && range.length === 2, `${id} must give a lower and upper hour estimate`);
    assert.ok(range.every(Number.isFinite) && range[0] > 0 && range[1] >= range[0], `${id} has an invalid hour range`);
    assert.match(project.effortEstimate, /estimate/i, `${id} presents a forecast as a promise`);
    assert.match(project.effortEstimate, /smallest version/i, `${id} does not identify which project scope the range covers`);
    assert.match(project.effortEstimate, /first attempts may take longer/i, `${id} omits the beginner planning assumption`);
  }
});

test('College scenarios and UC transfer limits remain concrete without presenting local units as awarded university credit', () => {
  const state = defaultState(); state.preferences.collegeScenario = 'revelle-calgetc';
  const revelle = page('after', '', state);
  for (const code of ['HUM 100', 'LISP 1A', 'LISP 1AX', 'LISP 1B', 'LISP 1BX']) assert.ok(revelle.includes(hrefForCourse(code)), `Revelle scenario hides ${code}`);
  state.preferences.collegeScenario = 'seventh-calgetc';
  const seventh = page('after', '', state);
  assert.ok(seventh.includes(hrefForCourse('SYN 100')));
  assert.ok(seventh.includes(hrefForCourse('MAE 155A')));
  assert.ok(/exempt/i.test(seventh), 'The transfer climate exemption disappeared');
  assert.equal(guide('MATH 244').units, 6);
  assert.equal(guide('MATH 244').ucTransferUnits, 5);
  assert.ok(page('course', 'MATH 244').includes('7.5 quarter'), 'The separate UC transfer cap is hidden from the course guide');
  assert.equal(guide('MATH 104').transferability, 'CSU-only');
  assert.ok(getDefaultPlan().terms.every(term => ['semester', 'quarter'].includes(term.unitSystem)));
});

test('Course reflections and searches render untrusted saved text as text and preserve old note aliases', () => {
  const attack = '</textarea><img src=x onerror="alert(1)"><script>bad()</script>';
  const state = defaultState(); state.notes['course-ENGL 115'] = attack;
  const snapshot = JSON.stringify(state), html = page('course', 'ENGL C1000?from=subject/writing', state);
  assert.ok(html.includes(escapeHTML(attack)), 'Old course-note identity was not preserved or escaped');
  assert.ok(!html.includes(attack), 'Saved reflection escaped its textarea');
  assert.ok(html.includes('#subject/writing'), 'Returning from a writing course loses its subject context');
  assert.equal(JSON.stringify(state), snapshot);
  const original = { ...explorerState };
  try {
    explorerState.query = '" autofocus onfocus="alert(1)';
    const search = page('courses');
    assert.ok(search.includes(escapeHTML(explorerState.query)));
    assert.ok(!search.includes('value="" autofocus'));
  } finally { Object.assign(explorerState, original); }
});
