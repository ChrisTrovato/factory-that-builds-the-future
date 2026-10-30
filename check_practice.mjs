import assert from 'node:assert/strict';
import { PRACTICE_CARDS, PRACTICE_SUBJECTS, validatePracticeCards, emptyPracticeProgress,
  normalizePracticeProgress, recordPracticeAnswer, selectPracticeCards, scorePracticeSession,
  mergePracticeProgress, PRACTICE_STORAGE_KEY } from './public/practice.js';
import { missions } from './public/learning-data.js';

const near = (actual, expected, tolerance = 1e-9) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} does not match ${expected}`);
const card = id => PRACTICE_CARDS.find(item => item.id === id);
const answer = id => card(id).options[card(id).answer];
const numeric = id => Number(answer(id).match(/^[−-]?[\d,]+(?:\.\d+)?/)[0].replaceAll(',', '').replace('−', '-'));

assert.equal(PRACTICE_STORAGE_KEY, 'factory-practice-v1');
assert.deepEqual(validatePracticeCards(), []);
assert.equal(PRACTICE_CARDS.length, 36);
for (const subject of PRACTICE_SUBJECTS) assert.equal(PRACTICE_CARDS.filter(c => c.subject === subject.id).length, 6);
for (let index = 0; index < 4; index++) assert.equal(PRACTICE_CARDS.filter(c => c.answer === index).length, 9);
for (const c of PRACTICE_CARDS) assert.ok(missions.some(m => m.id === c.missionId), `${c.id} links to a missing mission`);
assert.ok(validatePracticeCards([{ ...PRACTICE_CARDS[0], options: ['same', 'same'], answer: 4 }]).length >= 2);

// Independent calculations validate the numeric correct options, not just the answer-index schema.
const expectations = {
  'units-01': 375 / 1000, 'units-02': (20 / 1000) ** 2,
  'units-03': 90 / 60 * 5, 'units-05': 250 * 4 * 60, 'units-06': 1.5 + 25 / 1000,
  'algebra-02': 40 * .25, 'algebra-03': (17 - 2) / 3,
  'algebra-04': .000020 * 2 * 50, 'algebra-05': 72 / .9, 'algebra-06': 60 / (7 - 4),
  'geometry-01': Math.hypot(.3, .4), 'geometry-02': 2 * Math.cos(Math.PI / 3),
  'geometry-05': 10 + .02,
  'motion-01': (14 - 2) / (4 - 1), 'motion-02': 3 * 4,
  'motion-03': 2 * 5, 'motion-04': .5 * 4 * 8, 'motion-05': 2 * 3 + .5 * 1 * 3 ** 2,
  'energy-01': 10 * 9.81 * 2, 'energy-02': 6000 / 20, 'energy-03': 400 / .8,
  'energy-04': 2 ** 2, 'energy-05': 12 * 5
};
for (const [id, expected] of Object.entries(expectations)) near(numeric(id), expected);
near(numeric('geometry-06'), Math.PI * .1 ** 2 * .5, .00001);
assert.equal(answer('units-04'), 'kg·m/s²');
assert.equal(answer('algebra-01'), 't = d/v');
assert.match(answer('geometry-03'), /four/);
assert.equal(answer('geometry-04'), '(−1, 2) cm');
assert.match(answer('energy-06'), /work is unchanged; mean power doubles/);
near(90 / 95 * 100, 94.73684210526315);
assert.match(answer('judgment-04'), /94\.7%/);

const original = emptyPracticeProgress();
const firstCard = card('units-01'), secondCard = card('energy-01');
let state = recordPracticeAnswer(original, firstCard, 1, 1000);
assert.equal(original.records[firstCard.id], undefined, 'Answer updates must not mutate the input record');
assert.equal(state.records[firstCard.id].lastCorrect, false);
assert.equal(state.records[firstCard.id].dueAt, 1000);
assert.equal(selectPracticeCards({ mode: 'missed', records: state.records }).length, 1);
assert.equal(selectPracticeCards({ mode: 'due', records: state.records, now: 1000 }).length, 1);
state = recordPracticeAnswer(state, firstCard, firstCard.answer, 2000);
assert.equal(state.records[firstCard.id].attempts, 2);
assert.equal(state.records[firstCard.id].correctCount, 1);
assert.equal(state.records[firstCard.id].wrongCount, 1);
assert.equal(state.records[firstCard.id].lastWrongAt, 1000);
assert.equal(state.records[firstCard.id].intervalDays, 1);
assert.equal(selectPracticeCards({ mode: 'missed', records: state.records }).length, 0);
assert.equal(selectPracticeCards({ mode: 'due', records: state.records, now: 2001 }).length, 0);
assert.equal(selectPracticeCards({ mode: 'due', records: state.records, now: 2000 + 86400000 }).length, 1);
state = recordPracticeAnswer(state, firstCard, firstCard.answer, 2000 + 86400000);
assert.equal(state.records[firstCard.id].intervalDays, 3);
state = recordPracticeAnswer(state, secondCard, 2, 2000 + 86400001);
assert.equal(selectPracticeCards({ mode: 'practice', records: state.records, length: 5, now: 2000 + 86400002, random: () => .5 })[0].id, secondCard.id);
assert.equal(selectPracticeCards({ mode: 'missed', subject: 'units', records: state.records }).length, 0);
assert.equal(selectPracticeCards({ mode: 'missed', subject: 'energy', records: state.records })[0].id, secondCard.id);
assert.equal(selectPracticeCards({ subject: 'units', length: 10 }).length, 6);
const all = selectPracticeCards({ length: 'all', random: () => 0 });
assert.equal(all.length, 36);
assert.equal(new Set(all.map(c => c.id)).size, 36);
assert.throws(() => selectPracticeCards({ length: 7 }), RangeError);
assert.throws(() => recordPracticeAnswer(state, firstCard, 4), RangeError);

const scoring = scorePracticeSession({ cardIds: ['units-01', 'units-01', 'energy-01', 'missing', 'motion-01'], answers: { 'units-01': 0, 'energy-01': 2 } });
assert.deepEqual(scoring, { total: 3, answered: 2, correct: 1, missedIds: ['energy-01'], unansweredIds: ['motion-01'] });
const perfect = scorePracticeSession({ cardIds: PRACTICE_CARDS.map(c => c.id), answers: Object.fromEntries(PRACTICE_CARDS.map(c => [c.id, c.answer])) });
assert.equal(perfect.correct, 36);
assert.equal(perfect.answered, 36);

const incoming = recordPracticeAnswer(state, firstCard, 2, 500000000);
const merged = mergePracticeProgress(state, incoming);
assert.equal(merged.records[firstCard.id].lastCorrect, false);
assert.equal(merged.records[firstCard.id].lastAnsweredAt, 500000000);
assert.equal(merged.records[firstCard.id].attempts, 4);
assert.deepEqual(mergePracticeProgress(merged, incoming), merged, 'Repeated restores must be idempotent');
assert.deepEqual(mergePracticeProgress(incoming, state), merged, 'An older backup must not replace a newer outcome');
const divergent = structuredClone(incoming);
divergent.records[firstCard.id].attempts = 9;
divergent.records[firstCard.id].correctCount = 8;
divergent.records[firstCard.id].wrongCount = 1;
divergent.records[firstCard.id].lastAnsweredAt = 100;
const preserved = mergePracticeProgress(divergent, incoming).records[firstCard.id];
assert.equal(preserved.attempts, 9);
assert.equal(preserved.correctCount + preserved.wrongCount, preserved.attempts);
assert.equal(preserved.lastCorrect, false);
assert.equal(preserved.lastAnsweredAt, 500000000);
const withSummary = structuredClone(incoming);
withSummary.recentSessions = [{ id: 'same-session', endedAt: 42, total: 5, correct: 3, missedIds: ['units-01'] }];
assert.equal(mergePracticeProgress(withSummary, withSummary).recentSessions.length, 1);
assert.throws(() => normalizePracticeProgress({ version: 2 }), TypeError);
assert.throws(() => normalizePracticeProgress({ version: 1, records: [] }), TypeError);
assert.deepEqual(normalizePracticeProgress(JSON.parse(JSON.stringify(merged))), merged);
console.log('PASS: 36-card schema and mission links; independent arithmetic; filtered/revisit selection; scoring; scheduling; nonmutating updates; idempotent backup merge.');
