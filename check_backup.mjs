/** Read-only backup/content audit. Run: node work/factory-site/check_backup.mjs */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {mergeJourney, mergeProjectProgress, mergeBackupRecords, parseBackup, mountBackup} from './public/backup.js';
import {emptyPracticeProgress, recordPracticeAnswer, PRACTICE_CARDS} from './public/practice.js';
import {allMissions, learningStages, curriculumRoutes} from './public/learning-catalog.js';
import {worlds} from './public/world-data.js';
import {projects} from './public/project-blueprints.js';
import {renderProject} from './public/horizon.js';

const results = [];
const test = async (name, work) => {
  try { await work(); results.push({name, status: 'PASS'}); }
  catch (error) { results.push({name, status: 'FAIL', reason: error.message}); }
};
const clone = value => JSON.parse(JSON.stringify(value));
const journeyKey = 'factory-journey-v2';
const baseJourney = () => ({completed: [], notes: {}, northStar: '', entries: [], bookmarks: []});

await test('Journey merge preserves local and incoming work without mutating inputs', () => {
  const local = {completed: ['units'], notes: {units: 'Local observation'}, northStar: 'Local purpose',
    entries: [{at: '2026-10-01T00:00:00.000Z', text: 'A local entry'}], bookmarks: ['one']};
  const incoming = {completed: ['ratios', 'units'], notes: {units: 'Remote observation', ratios: 'A second lesson'}, northStar: 'Remote purpose',
    entries: [...local.entries, {at: '2026-10-02T00:00:00.000Z', text: 'A remote entry'}], bookmarks: ['two', 'one']};
  const localBefore = clone(local), incomingBefore = clone(incoming);
  const merged = mergeJourney(local, incoming);
  assert.deepEqual(local, localBefore); assert.deepEqual(incoming, incomingBefore);
  assert.deepEqual(new Set(merged.completed), new Set(['units', 'ratios']));
  assert.equal(merged.notes.units, 'Local observation'); assert.equal(merged.notes.ratios, 'A second lesson');
  assert.equal(merged.northStar, 'Local purpose');
  assert(merged.entries.some(e => e.text.includes('Remote observation')));
  assert(merged.entries.some(e => e.text.includes('Remote purpose')));
  assert(merged.entries.some(e => e.text === 'A local entry'));
  assert(merged.entries.some(e => e.text === 'A remote entry'));
  assert.equal(merged.entries.filter(e => e.text === 'A local entry').length, 1);
  assert.deepEqual(new Set(merged.bookmarks), new Set(['one', 'two']));
});

await test('Conflicting note imports are idempotent across different import times', async () => {
  const a = {...baseJourney(), notes: {units: 'Local note'}, northStar: 'Local aim'};
  const b = {...baseJourney(), notes: {units: 'Imported note'}, northStar: 'Imported aim'};
  const once = mergeJourney(a, b);
  await new Promise(resolve => setTimeout(resolve, 5));
  const twice = mergeJourney(once, b);
  assert.deepEqual(twice, once);
});

await test('Conflict records receive an actual import timestamp', () => {
  const before = Date.now() - 1000;
  const merged = mergeJourney({...baseJourney(), notes: {units: 'A'}}, {...baseJourney(), notes: {units: 'B'}});
  const conflict = merged.entries.find(e => e.text.includes('B'));
  assert(conflict);
  assert(Date.parse(conflict.at) >= before && Date.parse(conflict.at) <= Date.now() + 1000, `Unexpected conflict timestamp: ${conflict.at}`);
});

await test('Blank local north star accepts incoming text without inventing a conflict', () => {
  const merged = mergeJourney({...baseJourney(), northStar: '   '}, {...baseJourney(), northStar: 'Build useful tools'});
  assert.equal(merged.northStar, 'Build useful tools');
  assert.equal(merged.entries.length, 0);
});

await test('More than 100 historical notes remain preserved', () => {
  const a = {...baseJourney(), entries: Array.from({length: 120}, (_,i) => ({at: '2026-10-01T00:00:00.000Z', text: 'local-' + i}))};
  const b = {...baseJourney(), entries: Array.from({length: 120}, (_,i) => ({at: '2026-10-02T00:00:00.000Z', text: 'remote-' + i}))};
  const merged = mergeJourney(a, b);
  assert.equal(merged.entries.length, 240);
  assert(merged.entries.some(e => e.text === 'local-119') && merged.entries.some(e => e.text === 'remote-119'));
});

await test('Project conflict preserves both notes, checklists, and idempotence', () => {
  const a = {projects: {'paper-linkage': {steps: [0, 1], evidence: [0], notes: 'Local result', updatedAt: '2026-10-01'}}};
  const b = {projects: {'paper-linkage': {steps: [1, 2], evidence: [1], notes: 'Imported result', updatedAt: '2026-10-02'}, measurement: {steps: [0], evidence: [], notes: 'Measurement result'}}};
  const beforeA = clone(a), beforeB = clone(b), result = mergeProjectProgress(a, b);
  assert.deepEqual(a, beforeA); assert.deepEqual(b, beforeB);
  assert.deepEqual(result.projects['paper-linkage'].steps, [0, 1, 2]);
  assert.deepEqual(result.projects['paper-linkage'].evidence, [0, 1]);
  assert(result.projects['paper-linkage'].notes.includes('Local result'));
  assert(result.projects['paper-linkage'].notes.includes('Imported result'));
  assert.equal(result.projects.measurement.notes, 'Measurement result');
  assert.deepEqual(mergeProjectProgress(result, b), result);
});

await test('Current export and earlier v2 notebook parse; unknown formats reject', () => {
  const records = {[journeyKey]: baseJourney(), 'factory-reading': {last: '22', completed: ['01'], positions: {'22': .4}}};
  assert.deepEqual(parseBackup(JSON.stringify({format: 'factory-backup-v3', records})), records);
  assert.deepEqual(parseBackup(JSON.stringify({edition: 'Factory learning notebook v2', journey: records[journeyKey], reading: records['factory-reading']})), records);
  assert.throws(() => parseBackup('{}'));
  assert.throws(() => parseBackup('{bad JSON'));
});

await test('Record merge retains unaffected records and reading progress', () => {
  const reading = {last: '22', positions: {'22': .4, '01': .8}, completed: ['01']};
  const current = {[journeyKey]: baseJourney(), 'factory-reading': reading, 'factory-projects-v1': {projects: {}}};
  const incoming = {'factory-reading': {last: '23', positions: {'22': .1, '23': .6}, completed: ['02']}};
  const merged = mergeBackupRecords(current, incoming);
  assert.deepEqual(merged[journeyKey], current[journeyKey]);
  assert.deepEqual(merged['factory-projects-v1'], current['factory-projects-v1']);
  assert.equal(merged['factory-reading'].positions['22'], .4);
  assert.equal(merged['factory-reading'].positions['23'], .6);
  assert.deepEqual(new Set(merged['factory-reading'].completed), new Set(['01', '02']));
  assert.deepEqual(mergeBackupRecords(merged, incoming), merged);
});

await test('Practice backup merge preserves distinct cards and does not double-count repeats', () => {
  const first = PRACTICE_CARDS[0], second = PRACTICE_CARDS[1];
  const a = recordPracticeAnswer(emptyPracticeProgress(), first, first.answer, 1000);
  const b = recordPracticeAnswer(recordPracticeAnswer(a, first, (first.answer + 1) % 4, 2000), second, second.answer, 3000);
  const merged = mergeBackupRecords({'factory-practice-v1': a}, {'factory-practice-v1': b});
  assert.equal(merged['factory-practice-v1'].records[first.id].attempts, 2);
  assert.equal(merged['factory-practice-v1'].records[first.id].correctCount, 1);
  assert.equal(merged['factory-practice-v1'].records[first.id].lastCorrect, false);
  assert.equal(merged['factory-practice-v1'].records[second.id].attempts, 1);
  assert.deepEqual(mergeBackupRecords(merged, {'factory-practice-v1': b}), merged);
});

class FakeElement {
  constructor(tag = 'div') { this.tag = tag; this.children = []; this.nodes = new Map(); this.textContent = ''; this.files = []; this.hidden = false; }
  append(element) { this.children.push(element); }
  querySelector(selector) { if (!this.nodes.has(selector)) this.nodes.set(selector, new FakeElement()); return this.nodes.get(selector); }
  querySelectorAll(selector) { return this.lists?.get(selector) || []; }
}
function fakeBrowser(initial = {}) {
  const map = new Map(Object.entries(initial)); let writes = 0, failWrite = 0;
  const document = {querySelector: () => null, createElement: tag => new FakeElement(tag)};
  const storage = {
    getItem: key => map.get(key) ?? null,
    setItem: (key, value) => { if (++writes === failWrite) throw new Error('Illustrative quota failure'); map.set(key, value); },
    removeItem: key => map.delete(key)
  };
  return {document, storage, map, failAt: count => { writes = 0; failWrite = count; }};
}
async function withBrowser(browser, work) {
  const previous = {document: globalThis.document, localStorage: globalThis.localStorage};
  globalThis.document = browser.document; globalThis.localStorage = browser.storage;
  try { await work(); }
  finally {
    for (const name of Object.keys(previous)) previous[name] === undefined ? delete globalThis[name] : globalThis[name] = previous[name];
  }
}
const backupFile = records => ({size: 100, text: async () => JSON.stringify({format: 'factory-backup-v3', records})});

await test('A failed multi-record restore rolls every original record back', async () => {
  const initial = {[journeyKey]: JSON.stringify({...baseJourney(), notes: {units: 'Keep this'}}), 'factory-reading': JSON.stringify({last: '01', positions: {}, completed: []}), unrelated: 'untouched'};
  const browser = fakeBrowser(initial);
  await withBrowser(browser, async () => {
    const container = new FakeElement(); mountBackup(container); const box = container.children[0];
    const input = box.querySelector('input'), preview = box.querySelector('.backup-preview'), button = box.querySelector('button');
    input.files = [backupFile({[journeyKey]: {...baseJourney(), completed: ['ratios']}, 'factory-reading': {last: '22', positions: {}, completed: ['22']}})];
    await input.onchange(); browser.failAt(2); button.onclick();
    assert.deepEqual(Object.fromEntries(browser.map), initial);
    assert.match(preview.textContent, /original records were kept/);
  });
});

await test('The most recently chosen backup wins when file reads finish out of order', async () => {
  const browser = fakeBrowser();
  await withBrowser(browser, async () => {
    const container = new FakeElement(); mountBackup(container); const box = container.children[0], input = box.querySelector('input'), button = box.querySelector('button');
    let finishA;
    input.files = [{size: 100, text: () => new Promise(resolve => { finishA = resolve; })}];
    const readingA = input.onchange();
    input.files = [backupFile({[journeyKey]: {...baseJourney(), completed: ['ratios']}})];
    await input.onchange();
    finishA(JSON.stringify({format: 'factory-backup-v3', records: {[journeyKey]: {...baseJourney(), completed: ['units']}}}));
    await readingA; button.onclick();
    assert.deepEqual(JSON.parse(browser.map.get(journeyKey)).completed, ['ratios']);
  });
});

await test('Checking a project step preserves notes saved from another open page', async () => {
  const key = 'factory-projects-v1', id = 'paper-linkage';
  const browser = fakeBrowser({[key]: JSON.stringify({projects: {[id]: {steps: [], evidence: [], notes: 'Earlier note'}}})});
  await withBrowser(browser, async () => {
    const root = new FakeElement(), checkbox = new FakeElement('input');
    checkbox.dataset = {projectStep: '0'}; checkbox.checked = false;
    root.lists = new Map([['[data-project-step],[data-project-evidence]', [checkbox]]]);
    renderProject(root, id);
    browser.storage.setItem(key, JSON.stringify({projects: {[id]: {steps: [], evidence: [], notes: 'New result saved in another tab'}}}));
    checkbox.checked = true; checkbox.onchange();
    const saved = JSON.parse(browser.storage.getItem(key)).projects[id];
    assert.equal(saved.notes, 'New result saved in another tab');
    assert(saved.steps.includes(0));
  });
});

await test('Atlas, catalog, project references, and displayed content counts agree', () => {
  const lessonIds = new Set(allMissions.map(m => m.id)), projectIds = new Set(projects.map(p => p.id));
  const chapterIds = new Set(JSON.parse(readFileSync(new URL('./public/book.json', import.meta.url), 'utf8')).chapters.map(c => c.id));
  assert.equal(lessonIds.size, 34); assert.equal(projectIds.size, 16); assert.equal(worlds.length, 5); assert.equal(PRACTICE_CARDS.length, 36);
  let systems = 0;
  for (const world of worlds) {
    assert(chapterIds.has(world.chapter)); assert.equal(world.systems.length, 4);
    for (const system of world.systems) {
      systems++;
      assert(projectIds.has(system.project), `Unknown project ${system.project}`);
      for (const id of system.missions) assert(lessonIds.has(id), `Unknown world lesson ${id}`);
    }
  }
  assert.equal(systems, 20);
  for (const project of projects) {
    assert(chapterIds.has(project.chapter));
    for (const id of project.missionIds) assert(lessonIds.has(id), `Unknown project lesson ${id}`);
  }
  const staged = learningStages.flatMap(s => s.missionIds);
  assert.equal(staged.length, 34); assert.equal(new Set(staged).size, 34);
  for (const id of staged) assert(lessonIds.has(id));
  assert.equal(curriculumRoutes.length, 5);
});

const failures = results.filter(result => result.status === 'FAIL');
console.log(JSON.stringify({status: failures.length ? 'ISSUES FOUND' : 'PASS', passed: results.length - failures.length, failed: failures.length, results}, null, 2));
if (failures.length) process.exitCode = 1;
