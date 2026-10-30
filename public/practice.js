import { PRACTICE_CARDS, PRACTICE_SUBJECTS, PRACTICE_MISSIONS } from './practice-data.js';
export { PRACTICE_CARDS, PRACTICE_SUBJECTS } from './practice-data.js';
export const PRACTICE_STORAGE_KEY = 'factory-practice-v1';
const DAY = 86400000;
const INTERVALS = [1, 3, 7, 14, 30];
const cardMap = new Map(PRACTICE_CARDS.map(card => [card.id, card]));
const subjectMap = new Map(PRACTICE_SUBJECTS.map(subject => [subject.id, subject]));
const object = value => value && typeof value === 'object' && !Array.isArray(value);
const integer = (value, fallback = 0) => Number.isSafeInteger(value) && value >= 0 ? value : fallback;
const timestamp = value => Number.isFinite(value) && value >= 0 ? value : 0;
const unique = values => [...new Set(values)];
const validAnswer = value => Number.isInteger(value) && value >= 0 && value < 4;
const html = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function validatePracticeCards(cards = PRACTICE_CARDS) {
  const errors = [], ids = new Set();
  for (const card of cards) {
    if (!card || typeof card.id !== 'string' || ids.has(card.id)) errors.push('A card ID is missing or duplicated.');
    ids.add(card?.id);
    if (!subjectMap.has(card?.subject)) errors.push(`Unknown subject: ${card?.id}`);
    if (!['Foundation', 'Bridge', 'Stretch'].includes(card?.difficulty)) errors.push(`Invalid difficulty: ${card?.id}`);
    if (!Array.isArray(card?.options) || card.options.length !== 4 || card.options.some(option => typeof option !== 'string' || !option.trim()) || new Set(card.options).size !== 4) errors.push(`Four distinct choices required: ${card?.id}`);
    if (!validAnswer(card?.answer)) errors.push(`Invalid answer index: ${card?.id}`);
    if (typeof card?.prompt !== 'string' || card.prompt.length < 20 || typeof card.explanation !== 'string' || card.explanation.length < 50 || typeof card.connection !== 'string' || card.connection.length < 20) errors.push(`Incomplete teaching content: ${card?.id}`);
    if (!Object.hasOwn(PRACTICE_MISSIONS, card?.missionId)) errors.push(`Unknown mission: ${card?.id}`);
  }
  return errors;
}

export function emptyPracticeProgress() {
  return { version: 1, updatedAt: 0, settings: { subject: 'all', length: 5 }, records: {}, activeSession: null, recentSessions: [] };
}

function cleanRecord(record) {
  if (!object(record)) return null;
  const attempts = integer(record.attempts);
  const correctCount = Math.min(attempts, integer(record.correctCount));
  return { attempts, correctCount, wrongCount: attempts - correctCount,
    lastCorrect: attempts > 0 && typeof record.lastCorrect === 'boolean' ? record.lastCorrect : null,
    lastAnswer: validAnswer(record.lastAnswer) ? record.lastAnswer : null,
    lastAnsweredAt: timestamp(record.lastAnsweredAt), lastWrongAt: timestamp(record.lastWrongAt),
    successfulReviews: Math.min(5, integer(record.successfulReviews)),
    intervalDays: INTERVALS.includes(record.intervalDays) ? record.intervalDays : 0,
    dueAt: timestamp(record.dueAt) };
}

function cleanSession(session) {
  if (!object(session) || typeof session.id !== 'string' || !Array.isArray(session.cardIds)) return null;
  const cardIds = unique(session.cardIds.filter(id => cardMap.has(id)));
  if (!cardIds.length) return null;
  const answers = {};
  if (object(session.answers)) for (const id of cardIds) if (validAnswer(session.answers[id])) answers[id] = session.answers[id];
  return { id: session.id.slice(0, 100), mode: ['practice', 'missed', 'due'].includes(session.mode) ? session.mode : 'practice',
    subject: subjectMap.has(session.subject) ? session.subject : 'all', requestedLength: [5, 10, 'all'].includes(session.requestedLength) ? session.requestedLength : 5,
    cardIds, answers, startedAt: timestamp(session.startedAt), updatedAt: timestamp(session.updatedAt), status: session.status === 'complete' ? 'complete' : 'active' };
}

export function normalizePracticeProgress(raw) {
  if (raw == null) return emptyPracticeProgress();
  if (!object(raw) || (raw.version != null && raw.version !== 1)) throw new TypeError('This practice record uses an unsupported or invalid format.');
  if ((raw.records != null && !object(raw.records)) || (raw.recentSessions != null && !Array.isArray(raw.recentSessions))) throw new TypeError('The saved practice record has an invalid structure.');
  const result = emptyPracticeProgress();
  result.updatedAt = timestamp(raw.updatedAt);
  if (object(raw.settings)) result.settings = { subject: subjectMap.has(raw.settings.subject) ? raw.settings.subject : 'all', length: [5, 10, 'all'].includes(raw.settings.length) ? raw.settings.length : 5 };
  if (object(raw.records)) for (const [id, record] of Object.entries(raw.records)) {
    // Preserve well-formed records for additional future cards without exposing them in this deck.
    if (!/^[a-z][a-z0-9-]{0,79}$/.test(id)) continue;
    const clean = cleanRecord(record);
    if (clean) result.records[id] = clean;
  }
  result.activeSession = cleanSession(raw.activeSession);
  if (Array.isArray(raw.recentSessions)) result.recentSessions = raw.recentSessions.filter(s => object(s) && typeof s.id === 'string').map(s => ({
    id: s.id.slice(0, 100), endedAt: timestamp(s.endedAt), total: Math.min(36, integer(s.total)),
    correct: Math.min(36, integer(s.total), integer(s.correct)), missedIds: unique(Array.isArray(s.missedIds) ? s.missedIds.filter(id => cardMap.has(id)) : [])
  })).slice(0, 30);
  return result;
}

/** Backup merge: latest outcome by timestamp; keep one coherent counter set, never add duplicate histories. */
export function mergePracticeProgress(current, incoming) {
  const a = normalizePracticeProgress(current), b = normalizePracticeProgress(incoming);
  const latest = b.updatedAt > a.updatedAt ? b : a;
  const result = { ...latest, updatedAt: Math.max(a.updatedAt, b.updatedAt), records: {}, recentSessions: [] };
  for (const id of unique([...Object.keys(a.records), ...Object.keys(b.records)])) {
    const ar = a.records[id], br = b.records[id];
    if (!ar || !br) { result.records[id] = { ...(ar || br) }; continue; }
    const outcome = br.lastAnsweredAt > ar.lastAnsweredAt ? br : ar;
    const counters = br.attempts > ar.attempts ? br : ar.attempts > br.attempts ? ar : outcome;
    result.records[id] = { ...outcome, attempts: counters.attempts, correctCount: counters.correctCount,
      wrongCount: counters.wrongCount, lastWrongAt: Math.max(ar.lastWrongAt, br.lastWrongAt) };
  }
  const sessions = new Map();
  for (const session of [...a.recentSessions, ...b.recentSessions]) {
    if (!sessions.has(session.id) || session.endedAt > sessions.get(session.id).endedAt) sessions.set(session.id, { ...session });
  }
  result.recentSessions = [...sessions.values()].sort((x, y) => y.endedAt - x.endedAt).slice(0, 30);
  return result;
}

export function recordPracticeAnswer(progress, card, chosen, now = Date.now()) {
  if (!card || !validAnswer(card.answer) || !validAnswer(chosen)) throw new RangeError('A valid card and answer index are required.');
  if (!Number.isFinite(now) || now < 0) throw new RangeError('A valid timestamp is required.');
  const before = normalizePracticeProgress(progress);
  const old = cleanRecord(before.records[card.id]) || cleanRecord({});
  const correct = chosen === card.answer;
  const successfulReviews = correct ? Math.min(5, old.lastCorrect ? old.successfulReviews + 1 : 1) : 0;
  const intervalDays = correct ? INTERVALS[Math.max(0, successfulReviews - 1)] : 0;
  const record = { attempts: old.attempts + 1, correctCount: old.correctCount + Number(correct),
    wrongCount: old.wrongCount + Number(!correct), lastCorrect: correct, lastAnswer: chosen,
    lastAnsweredAt: now, lastWrongAt: correct ? old.lastWrongAt : now,
    successfulReviews, intervalDays, dueAt: now + intervalDays * DAY };
  return { ...before, updatedAt: now, records: { ...before.records, [card.id]: record } };
}

function shuffle(items, random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const value = random();
    if (!Number.isFinite(value) || value < 0 || value >= 1) throw new RangeError('Random source must return a number from 0 inclusive to 1 exclusive.');
    const j = Math.floor(value * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function selectPracticeCards({ cards = PRACTICE_CARDS, subject = 'all', length = 5, mode = 'practice', records = {}, now = Date.now(), random = Math.random } = {}) {
  if (![5, 10, 'all'].includes(length)) throw new RangeError('Session length must be 5, 10, or all.');
  if (!['practice', 'missed', 'due'].includes(mode)) throw new RangeError('Unknown practice mode.');
  let pool = cards.filter(card => subject === 'all' || card.subject === subject);
  if (mode === 'missed') pool = pool.filter(card => records[card.id]?.lastCorrect === false);
  if (mode === 'due') pool = pool.filter(card => records[card.id]?.attempts > 0 && records[card.id]?.dueAt <= now);
  const priority = card => {
    const record = records[card.id];
    if (record?.lastCorrect === false) return 0;
    if (record?.attempts > 0 && record.dueAt <= now) return 1;
    if (!record?.attempts) return 2;
    return 3;
  };
  const ordered = mode === 'practice' ? [0, 1, 2, 3].flatMap(bucket => shuffle(pool.filter(card => priority(card) === bucket), random)) : shuffle(pool, random);
  return ordered.slice(0, length === 'all' ? ordered.length : length);
}

export function scorePracticeSession(session, cards = PRACTICE_CARDS) {
  const lookup = new Map(cards.map(card => [card.id, card]));
  const ids = unique((session?.cardIds || []).filter(id => lookup.has(id)));
  let answered = 0, correct = 0;
  const missedIds = [], unansweredIds = [];
  for (const id of ids) {
    const answer = session?.answers?.[id];
    if (!validAnswer(answer)) { unansweredIds.push(id); continue; }
    answered++;
    if (answer === lookup.get(id).answer) correct++;
    else missedIds.push(id);
  }
  return { total: ids.length, answered, correct, missedIds, unansweredIds };
}

let practiceInstance = 0;

/** Standalone practice deck. Returns { destroy() }; uses only factory-practice-v1 storage. */
export function renderPractice(container) {
  if (!container || typeof container.replaceChildren !== 'function') throw new TypeError('renderPractice requires a DOM element.');
  const schemaErrors = validatePracticeCards();
  if (schemaErrors.length) throw new Error(schemaErrors.join(' '));
  const id = `practice-${++practiceInstance}`;
  const root = document.createElement('section');
  root.className = 'pr-practice';
  root.setAttribute('aria-label', 'Engineering practice deck');
  root.innerHTML = `<header class="pr-heading"><div><p class="pr-kicker">The practice bench / 36 original cards</p><h2>Make the connection.<br><em>Then make it stick.</em></h2><p>A few questions, a physical example, and an explanation you can use. No timer or streak. Come back to the ideas that need another look.</p></div><div class="pr-heading-mark" aria-hidden="true"><span>TRY</span><i>↗</i><span>EXPLAIN</span><i>↗</i><span>RETURN</span></div></header><div class="pr-storage" aria-live="polite"><span></span><button type="button" data-action="retry-save" hidden>Retry saving</button><button type="button" data-action="export">Export practice record ↓</button></div><div class="pr-view"></div>`;
  container.replaceChildren(root);
  const view = root.querySelector('.pr-view');
  let progress = emptyPracticeProgress(), blockWrites = false, storageMessage = '', failedSave = false;
  let currentSession = null, currentIndex = 0, screen = 'dashboard', destroyed = false;
  const downloadURLs = new Set();

  try {
    const stored = localStorage.getItem(PRACTICE_STORAGE_KEY);
    if (stored != null) {
      try { progress = normalizePracticeProgress(JSON.parse(stored)); }
      catch { blockWrites = true; storageMessage = 'Your saved practice entry could not be read. It has been left untouched. This visit will run in memory; export it before leaving.'; }
    }
  } catch {
    failedSave = true;
    storageMessage = 'Browser storage is unavailable. Practice still works, but this visit may be lost when you leave. You can export a copy.';
  }

  function storageStatus() {
    root.querySelector('.pr-storage').classList.toggle('pr-storage-error', Boolean(storageMessage));
    root.querySelector('.pr-storage>span').textContent = storageMessage || 'Practice progress stays in this browser. A correct revisit clears a card from “Review missed.”';
    root.querySelector('[data-action="retry-save"]').hidden = !failedSave || blockWrites;
  }

  function touch() { progress.updatedAt = Math.max(Date.now(), progress.updatedAt + 1); return progress.updatedAt; }

  function persist() {
    if (blockWrites) { storageStatus(); return false; }
    try {
      const existing = localStorage.getItem(PRACTICE_STORAGE_KEY);
      const merged = mergePracticeProgress(existing == null ? null : JSON.parse(existing), progress);
      localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify(merged));
      progress = merged;
      storageMessage = ''; failedSave = false;
      storageStatus(); return true;
    } catch {
      storageMessage = 'Progress could not be saved. This session still works in memory. Retry saving or export a copy before leaving.';
      failedSave = true; storageStatus(); return false;
    }
  }

  function focus(selector) {
    const element = view.querySelector(selector);
    if (element) element.focus();
  }

  function selectedPool() { return PRACTICE_CARDS.filter(card => progress.settings.subject === 'all' || card.subject === progress.settings.subject); }
  function reviewCount(mode, cards = selectedPool()) { return selectPracticeCards({ cards, mode, length: 'all', records: progress.records }).length; }
  function missionLink(card) { return `<a class="pr-mission-link" href="#/mission/${encodeURIComponent(card.missionId)}">${html(PRACTICE_MISSIONS[card.missionId])}<span aria-hidden="true">↗</span></a>`; }

  function dashboard(focusSelector) {
    screen = 'dashboard';
    const pool = selectedPool(), settings = progress.settings;
    const size = settings.length === 'all' ? pool.length : Math.min(settings.length, pool.length);
    const explored = PRACTICE_CARDS.filter(card => progress.records[card.id]?.attempts > 0).length;
    const missed = reviewCount('missed'), due = reviewCount('due');
    const pending = progress.activeSession && progress.activeSession.status === 'active' ? progress.activeSession : null;
    const pendingScore = pending ? scorePracticeSession(pending) : null;
    const last = progress.recentSessions[0];
    view.innerHTML = `<div class="pr-overview"><div><strong>${explored}<span>/36</span></strong><p>distinct cards explored</p></div><div><strong>${PRACTICE_CARDS.filter(card => progress.records[card.id]?.lastCorrect === false).length}</strong><p>latest answers to revisit</p></div><div><strong>${last ? `${last.correct}/${last.total}` : '—'}</strong><p>${last ? 'correct on your last completed pass' : 'your first pass starts here'}</p></div></div>${pending ? `<div class="pr-resume"><div><span>YOU HAVE A SESSION IN PROGRESS</span><p>${pendingScore.answered} of ${pendingScore.total} cards answered. Your choices and explanations are still here.</p></div><button class="pr-button pr-button-lime" type="button" data-action="resume">Resume session →</button></div>` : ''}<div class="pr-launch-layout"><section class="pr-launch"><p class="pr-section-tag">Build a small session</p><h3>Choose what to work on.</h3><label class="pr-field-label" for="${id}-subject">Subject</label><select id="${id}-subject" data-setting="subject"><option value="all">All six subjects</option>${PRACTICE_SUBJECTS.map(subject => `<option value="${subject.id}"${settings.subject === subject.id ? ' selected' : ''}>${subject.title}</option>`).join('')}</select><span class="pr-field-label">Session length</span><div class="pr-lengths" role="group" aria-label="Session length">${[5, 10, 'all'].map(length => `<button type="button" data-length="${length}" aria-pressed="${settings.length === length}">${length === 'all' ? 'All available' : `${length} cards`}</button>`).join('')}</div><p class="pr-pool-note">${pool.length} cards in this selection. ${settings.length !== 'all' && settings.length > pool.length ? `This session will use all ${pool.length}.` : 'Review-ready cards come first, then new ideas.'}</p><button class="pr-button pr-button-dark pr-start" type="button" data-action="start">Start ${size} cards <span aria-hidden="true">→</span></button><div class="pr-review-actions"><button type="button" data-action="missed"${missed === 0 ? ' disabled' : ''}>Review missed <span>${missed}</span></button><button type="button" data-action="due"${due === 0 ? ' disabled' : ''}>Due for another look <span>${due}</span></button></div><p class="pr-launch-note">Review lists respect your subject filter and session length. Starting a new pass replaces the paused session, while keeping your saved card progress.</p></section><div class="pr-subject-grid">${PRACTICE_SUBJECTS.map(subject => {
      const cards = PRACTICE_CARDS.filter(card => card.subject === subject.id);
      const seen = cards.filter(card => progress.records[card.id]?.attempts > 0).length;
      return `<button class="pr-subject-card${settings.subject === subject.id ? ' pr-subject-selected' : ''}" type="button" data-subject="${subject.id}" aria-label="Filter ${html(subject.title)}, ${seen} of 6 cards explored"><span class="pr-subject-symbol" aria-hidden="true">${subject.symbol}</span><h3>${subject.title}</h3><p>${subject.description}</p><div class="pr-subject-bottom"><span>${seen}/6 explored</span><span class="pr-card-dots" aria-hidden="true">${cards.map(card => `<i class="${progress.records[card.id]?.lastCorrect === true ? 'pr-dot-correct' : progress.records[card.id]?.lastCorrect === false ? 'pr-dot-missed' : ''}"></i>`).join('')}</span></div></button>`;
    }).join('')}</div></div><details class="pr-review-explainer"><summary>How the revisit queue works</summary><p>“Review missed” contains cards whose most recent answer was incorrect. A correct revisit removes that card from this list. Correct answers schedule another look after 1, 3, 7, 14, then 30 days as successful revisits accumulate; a miss makes the card ready immediately. “Due for another look” includes previously attempted cards whose scheduled time has arrived.</p><p>These are simple practice intervals, not a validated assessment of mastery. There is no penalty for returning late. Mixed sessions prioritize review-ready cards and then unseen cards; you may revisit any selected card when you choose “All available.”</p></details>`;
    storageStatus();
    if (focusSelector) focus(focusSelector);
  }

  function startSession(mode = 'practice', restrictIds = null) {
    const pool = restrictIds ? PRACTICE_CARDS.filter(card => restrictIds.includes(card.id)) : PRACTICE_CARDS;
    const requestedLength = restrictIds ? 'all' : progress.settings.length;
    const cards = selectPracticeCards({ cards: pool, mode, records: progress.records,
      subject: restrictIds ? 'all' : progress.settings.subject, length: requestedLength });
    if (!cards.length) { dashboard(); return; }
    const now = touch();
    currentSession = { id: `session-${now}-${Math.random().toString(36).slice(2, 9)}`, mode,
      subject: restrictIds ? 'all' : progress.settings.subject, requestedLength,
      cardIds: cards.map(card => card.id), answers: {}, startedAt: now, updatedAt: now, status: 'active' };
    currentIndex = 0;
    progress.activeSession = currentSession;
    persist();
    question();
    focus('.pr-question-title');
  }

  function question(focusSelector) {
    screen = 'question';
    const card = cardMap.get(currentSession.cardIds[currentIndex]);
    const selected = currentSession.answers[card.id], answered = validAnswer(selected), correct = answered && selected === card.answer;
    const score = scorePracticeSession(currentSession);
    const subject = subjectMap.get(card.subject);
    view.innerHTML = `<div class="pr-session-top"><button class="pr-text-button" type="button" data-action="pause">← Pause & choose a session</button><span>${currentSession.mode === 'practice' ? 'Mixed practice' : currentSession.mode === 'missed' ? 'Revisit missed ideas' : 'A spaced revisit'}</span></div><div class="pr-session-progress"><div><span>Card ${currentIndex + 1} of ${score.total}</span><span>${score.answered} answered</span></div><div class="pr-progress-track" role="progressbar" aria-label="Session answers recorded" aria-valuemin="0" aria-valuemax="${score.total}" aria-valuenow="${score.answered}"><i style="width:${score.answered / score.total * 100}%"></i></div></div><div class="pr-question-layout"><article class="pr-question-card"><div class="pr-card-meta"><span>${subject.title}</span><span>${card.difficulty}</span></div><h3 class="pr-question-title" tabindex="-1">${html(card.prompt)}</h3><div class="pr-options" role="group" aria-label="Answer choices">${card.options.map((option, index) => `<button type="button" data-answer="${index}" class="pr-option${answered && index === card.answer ? ' pr-option-correct' : answered && index === selected ? ' pr-option-missed' : ''}"${answered ? ' disabled' : ''}><span class="pr-letter" aria-hidden="true">${String.fromCharCode(65 + index)}</span><span>${html(option)}</span>${answered && index === card.answer ? '<span class="pr-choice-label">Correct answer</span>' : answered && index === selected ? '<span class="pr-choice-label">Your choice</span>' : ''}</button>`).join('')}</div>${answered ? `<section class="pr-feedback ${correct ? 'pr-feedback-correct' : 'pr-feedback-revisit'}"><p class="pr-feedback-title" tabindex="-1">${correct ? 'That matches the relationship.' : 'Here is the connection to keep.'}</p><p>${html(card.explanation)}</p><div class="pr-connection"><span>FROM THE QUESTION TO THE MACHINE</span><p>${html(card.connection)}</p>${missionLink(card)}</div></section>` : '<p class="pr-answer-note">Choose one answer to reveal the explanation. Your first choice is recorded for this pass.</p>'}<div class="pr-question-footer"><span>${answered ? ((failedSave || blockWrites) ? 'Kept for this visit. Export to preserve it.' : correct ? 'A later revisit is scheduled.' : 'Ready in your missed-card review list.') : 'No timer. Work it through.'}</span><button class="pr-button pr-button-dark" type="button" data-action="next"${!answered ? ' disabled' : ''}>${currentIndex === score.total - 1 ? 'See this pass' : 'Next card'} <span aria-hidden="true">→</span></button></div></article><aside class="pr-thinking"><span class="pr-thinking-symbol" aria-hidden="true">${subject.symbol}</span><p class="pr-section-tag">A useful way to think</p><h3>Make the reasoning visible.</h3><ol><li>Name what is known and what is being asked.</li><li>Keep the units beside the numbers.</li><li>Ask whether the result makes physical sense.</li></ol><p>A missed answer is a place to look again. Read why, then return to it in another pass.</p><a href="#/studio">Try the ideas in the Math Studio ↗</a></aside></div>`;
    storageStatus();
    if (focusSelector) focus(focusSelector);
  }

  function answer(chosen) {
    if (screen !== 'question' || !currentSession) return;
    const card = cardMap.get(currentSession.cardIds[currentIndex]);
    if (validAnswer(currentSession.answers[card.id])) return;
    const now = Math.max(Date.now(), progress.updatedAt + 1);
    currentSession.answers[card.id] = chosen;
    currentSession.updatedAt = now;
    progress = recordPracticeAnswer(progress, card, chosen, now);
    progress.activeSession = currentSession;
    persist();
    question('.pr-feedback-title');
  }

  function complete() {
    const score = scorePracticeSession(currentSession);
    if (score.answered !== score.total) return;
    currentSession.status = 'complete';
    currentSession.updatedAt = touch();
    progress.activeSession = null;
    progress.recentSessions = [{ id: currentSession.id, endedAt: currentSession.updatedAt,
      total: score.total, correct: score.correct, missedIds: score.missedIds }, ...progress.recentSessions.filter(item => item.id !== currentSession.id)].slice(0, 30);
    persist();
    completion();
    focus('.pr-complete-heading');
  }

  function completion() {
    screen = 'complete';
    const score = scorePracticeSession(currentSession);
    const ratio = score.total ? score.correct / score.total * 100 : 0;
    const orderedIds = [...score.missedIds, ...currentSession.cardIds.filter(id => !score.missedIds.includes(id))];
    const related = unique(orderedIds.map(id => cardMap.get(id).missionId)).slice(0, 6);
    view.innerHTML = `<section class="pr-complete"><div class="pr-score-ring"><svg viewBox="0 0 200 200" role="img" aria-label="${score.correct} of ${score.total} first answers correct in this session"><circle class="pr-ring-background" cx="100" cy="100" r="82"/><circle class="pr-ring-value" cx="100" cy="100" r="82" pathLength="100" stroke-dasharray="${ratio} 100" transform="rotate(-90 100 100)"/></svg><div><strong>${score.correct}<span>/${score.total}</span></strong><small>CORRECT THIS PASS</small></div></div><div><p class="pr-section-tag">A session you can build on</p><h3 class="pr-complete-heading" tabindex="-1">Keep the useful part.</h3><p>${score.missedIds.length ? `${score.missedIds.length} ${score.missedIds.length === 1 ? 'card gives' : 'cards give'} you a specific place to return. Read the explanation, follow a mission, or try those cards again.` : 'Every first choice matched the explanation on this pass. Explore another subject or return when these cards are due again.'}</p><p class="pr-complete-note">A snapshot of this pass. Explanations and revisits are part of the work.</p><div class="pr-complete-actions">${score.missedIds.length ? `<button class="pr-button pr-button-lime" type="button" data-action="review-pass">Revisit these ${score.missedIds.length} cards →</button>` : ''}<button class="pr-button pr-button-outline" type="button" data-action="restart">Choose another session →</button></div></div></section>${score.missedIds.length ? `<section class="pr-missed-review"><p class="pr-section-tag">Review this pass</p><h3>Make each miss useful.</h3>${score.missedIds.map((id, index) => {
      const card = cardMap.get(id);
      return `<details class="pr-review-card"${index === 0 ? ' open' : ''}><summary><span>${html(subjectMap.get(card.subject).title)}</span>${html(card.prompt)}</summary><div class="pr-review-body"><p class="pr-your-choice">Your choice: ${html(card.options[currentSession.answers[id]])}</p><p class="pr-right-choice">Correct answer: ${html(card.options[card.answer])}</p><p>${html(card.explanation)}</p><p>${html(card.connection)}</p>${missionLink(card)}</div></details>`;
    }).join('')}</section>` : ''}<section class="pr-related"><p class="pr-section-tag">Give the explanation somewhere to go</p><h3>Follow a connected mission.</h3><div>${related.map(missionId => `<a href="#/mission/${encodeURIComponent(missionId)}"><span>LEARN · TRY · EXPLAIN</span><strong>${html(PRACTICE_MISSIONS[missionId])}</strong><b aria-hidden="true">↗</b></a>`).join('')}</div></section>`;
    storageStatus();
  }

  function exportProgress() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(progress, null, 2)], { type: 'application/json' }));
    downloadURLs.add(url);
    const a = document.createElement('a');
    a.href = url; a.download = 'factory-practice-record.json'; document.body.append(a); a.click(); a.remove();
    setTimeout(() => { URL.revokeObjectURL(url); downloadURLs.delete(url); }, 1000);
  }

  function click(event) {
    const option = event.target.closest('[data-answer]');
    if (option) { answer(Number(option.dataset.answer)); return; }
    const length = event.target.closest('[data-length]');
    if (length) {
      progress.settings.length = length.dataset.length === 'all' ? 'all' : Number(length.dataset.length);
      touch(); persist(); dashboard(`[data-length="${length.dataset.length}"]`); return;
    }
    const subject = event.target.closest('[data-subject]');
    if (subject) {
      progress.settings.subject = subject.dataset.subject; touch(); persist(); dashboard(`[data-subject="${subject.dataset.subject}"]`); return;
    }
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'start') startSession('practice');
    if (action === 'missed') startSession('missed');
    if (action === 'due') startSession('due');
    if (action === 'resume' && progress.activeSession) {
      currentSession = cleanSession(progress.activeSession);
      const firstUnanswered = currentSession.cardIds.findIndex(id => !validAnswer(currentSession.answers[id]));
      currentIndex = firstUnanswered < 0 ? currentSession.cardIds.length - 1 : firstUnanswered;
      question('.pr-question-title');
    }
    if (action === 'pause') { dashboard(); focus('.pr-start'); }
    if (action === 'next' && currentSession && validAnswer(currentSession.answers[currentSession.cardIds[currentIndex]])) {
      if (currentIndex < currentSession.cardIds.length - 1) { currentIndex++; question('.pr-question-title'); }
      else complete();
    }
    if (action === 'review-pass') startSession('missed', scorePracticeSession(currentSession).missedIds);
    if (action === 'restart') { dashboard(); focus('.pr-start'); }
    if (action === 'retry-save') persist();
    if (action === 'export') exportProgress();
  }

  function change(event) {
    if (event.target.dataset.setting === 'subject') {
      progress.settings.subject = event.target.value; touch(); persist(); dashboard('[data-setting="subject"]');
    }
  }

  root.addEventListener('click', click);
  root.addEventListener('change', change);
  dashboard();
  return { destroy() {
    if (destroyed) return;
    destroyed = true;
    root.removeEventListener('click', click); root.removeEventListener('change', change);
    downloadURLs.forEach(url => URL.revokeObjectURL(url)); downloadURLs.clear(); root.remove();
  } };
}
