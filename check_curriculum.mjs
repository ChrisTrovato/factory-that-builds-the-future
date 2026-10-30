/** Content QA: run `node work/factory-site/check_curriculum.mjs` from the workspace. */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {missions} from './public/learning-data.js';
import {explorations, curriculumRoutes} from './public/journey-curriculum.js';

const chapterTitles = new Map(JSON.parse(readFileSync(new URL('./public/book.json', import.meta.url), 'utf8')).chapters.map(c => [c.id, c.title]));
const records = new Map([...missions, ...explorations].map(m => [m.id, m]));
const fields = ['id', 'title', 'subject', 'level', 'minutes', 'prerequisites', 'hook', 'why', 'story', 'equation', 'steps', 'check', 'action', 'chapter', 'chapterLabel'];
const wordCounts = [];
assert.equal(explorations.length, 18);
assert.equal(records.size, missions.length + explorations.length, 'IDs must be unique across both modules');

for (const m of explorations) {
  assert.deepEqual(Object.keys(m).sort(), [...fields].sort(), `Schema: ${m.id}`);
  for (const name of ['id', 'title', 'subject', 'level', 'hook', 'why', 'equation', 'action', 'chapter', 'chapterLabel']) {
    assert.equal(typeof m[name], 'string');
    assert(m[name].trim(), `Empty ${name}: ${m.id}`);
  }
  assert(Number.isInteger(m.minutes) && m.minutes > 0);
  assert.equal(m.story.length, 2);
  assert.equal(m.steps.length, 4);
  assert.equal(m.check.options.length, 3);
  assert(Number.isInteger(m.check.answer) && m.check.answer >= 0 && m.check.answer < 3);
  assert(m.check.explanation.trim());
  assert.equal(chapterTitles.get(m.chapter), m.chapterLabel, `Chapter reference: ${m.id}`);
  assert(Array.isArray(m.prerequisites) && m.prerequisites.length > 0);
  for (const prerequisite of m.prerequisites) assert(records.has(prerequisite), `Missing prerequisite: ${prerequisite}`);
  const text = [m.title, m.subject, m.hook, m.why, ...m.story, m.equation, ...m.steps, m.check.question, ...m.check.options, m.check.explanation, m.action].join(' ');
  const words = text.trim().split(/\s+/).length;
  assert(words >= 220 && words <= 350, `Word range: ${m.id} (${words})`);
  wordCounts.push({id: m.id, words});
}

const visiting = new Set(), visited = new Set();
function visit(id) {
  assert(!visiting.has(id), `Prerequisite cycle at ${id}`);
  if (visited.has(id)) return;
  visiting.add(id);
  for (const before of records.get(id).prerequisites || []) visit(before);
  visiting.delete(id);
  visited.add(id);
}
for (const id of records.keys()) visit(id);

assert.equal(curriculumRoutes.length, 5);
assert.equal(new Set(curriculumRoutes.map(r => r.id)).size, 5);
const covered = new Set();
for (const route of curriculumRoutes) {
  assert.deepEqual(Object.keys(route).sort(), ['id', 'title', 'description', 'missionIds'].sort());
  assert(route.description.trim());
  const seen = new Set();
  for (const id of route.missionIds) {
    assert(records.has(id), `Unknown route item: ${id}`);
    assert(!seen.has(id), `Repeated item inside route ${route.id}: ${id}`);
    for (const before of records.get(id).prerequisites || []) {
      assert(seen.has(before), `${route.id}: prerequisite ${before} must precede ${id}`);
    }
    seen.add(id);
    covered.add(id);
  }
  assert(route.missionIds.some(id => missions.some(m => m.id === id)), 'Route needs a foundation');
  assert(route.missionIds.some(id => explorations.some(m => m.id === id)), 'Route needs an exploration');
}
assert.equal(covered.size, records.size, 'The five routes must cover all lessons');

// Independent recomputation of each worked example and its check question.
const close = (actual, expected, tolerance = 1e-9) => assert(Math.abs(actual - expected) <= Math.max(tolerance, Math.abs(expected) * Number.EPSILON * 8), `${actual} != ${expected}`);
const answer = (id, expected) => assert.equal(records.get(id).check.answer, expected, `Answer index: ${id}`);

const positions = [0, 50, 120, 200], times = [0, 1, 2, 3];
assert.deepEqual(positions.slice(1).map((x, i) => (x - positions[i]) / (times[i + 1] - times[i])), [50, 70, 80]);
close(.20 / 4, .050); answer('coding', 1);

const transform = ([x, y]) => [.30 - y, .20 + x];
transform([.10, .05]).forEach((n, i) => close(n, [.25, .30][i]));
transform([.20, 0]).forEach((n, i) => close(n, [.30, .40][i])); answer('frames', 0);

const coolingRate = temperature => -.10 * (temperature - 20);
const t1 = 60 + coolingRate(60), t2 = t1 + coolingRate(t1);
close(t1, 56); close(t2, 52.4); close(20 + 40 * Math.exp(-1), 34.7, .05);
close(coolingRate(40), -2); answer('odes', 2);

close(20 * .30 / .50, 12); close(20 - 12, 8); close(20 * .25 / .50, 10); answer('statics', 1);
const acceleration = (6 - 2) / 2;
close(acceleration, 2); close(1 + acceleration * 2, 5); close(1 * 2 + .5 * acceleration * 2 ** 2, 6);
close((6 - 2) / 4, 1); answer('dynamics', 0);

const area = 10e-6, length = .20;
close(70e9 * area / length, 3.5e6); close(200e9 * area / length, 10e6);
close(2700 * area * length, .0054); close(7800 * area * length, .0156);
assert(3.5e6 < 6e6 && 10e6 >= 6e6); answer('materials', 2);

const stress = 1000 / 20e-6, strain = stress / 100e9;
close(stress, 50e6); close(strain, .0005); close(strain * 200, .10);
close((1000 / 40e-6) / 100e9 * 200, .05); answer('stress', 1);

close(Math.sqrt(100 / 1), 10); close(10 / (2 * Math.PI), 1.59, .005);
close(2 * Math.PI / 10, .628, .001); close(100 * .010, 1);
close(Math.sqrt(100 / 4) / (2 * Math.PI), .796, .001); answer('vibrations', 0);

const error = .100 - .080, command = 2 * error, updated = .080 + command * .10;
close(error, .020); close(command, .040); close(updated, .084); close(.100 - updated, .016);
close(2 * (.100 - .110), -.020); answer('feedback', 2);

const sensor = count => (count - 100) * .10;
close(sensor(350), 25); close(sensor(405) - 30, .5); close(sensor(250), 15); answer('sensors', 1);
close(5 / 1000, .005); close(5 * .005, .025); close(.025 * 60, 1.5);
close(5 / 2000, .0025); answer('circuits', 0);

close(49.9 - 10.1, 39.8); close(50.1 - 9.9, 40.2);
assert(50.1 - 9.9 > 40.1); answer('cad', 2);
close(100 * 60, 6000); close(.50 * 900, 450);
close(6000 / 450, 13.3, .05); close(.8 * 6000 / 450, 10.7, .05);
close(200 * 30 / 450, 100 * 60 / 450); answer('thermal', 1);

const conduction = (thickness, area) => 2 * area * 10 / thickness;
close(conduction(.005, .010), 40); close(.005 / (2 * .010), .25);
close(conduction(.010, .010), 20); close(conduction(.005, .020), 80); answer('heat', 0);
const flow = .002 / 60;
close(flow / 100e-6, .333, .001); close(flow / 50e-6, .667, .001);
close(flow / 200e-6, .167, .001); answer('fluids', 2);

const mu = 3.986e14, radius = 7e6, speed = Math.sqrt(mu / radius), period = 2 * Math.PI * radius / speed;
close(speed, 7546, 1); close(period, 5829, 1); close(period / 60, 97.1, .05);
close(Math.sqrt(mu / (4 * radius)) / speed, .5); answer('orbits', 1);
close(1000 * .98, 980); close(1000 * .98 * .95, 931); close(980 * .05, 49);
close(.80 * .90, .72); answer('quality', 0);

const baseline = 1.2 + 1.8 + .5 + .5;
close(baseline, 4); close(5 - baseline, 1); close(1 / 5, .2); close(1 / 4, .25);
close(baseline + .4 + .3, 4.7); close(4.7 + .4 - 5, .1); answer('systems', 2);

console.log(JSON.stringify({
  status: 'PASS', explorations: explorations.length, routes: curriculumRoutes.length,
  totalLessonsCovered: covered.size, words: wordCounts.reduce((sum, item) => sum + item.words, 0),
  wordRange: [Math.min(...wordCounts.map(x => x.words)), Math.max(...wordCounts.map(x => x.words))],
  checks: ['exact schema', 'word limits', '18 worked examples and answer indices', 'chapter IDs and labels', 'acyclic prerequisites', 'prerequisite order within each route', 'all 34 lessons covered'],
  wordCounts
}, null, 2));
