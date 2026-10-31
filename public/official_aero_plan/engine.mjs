/** Pure, inspectable planning rules. This is a planning aid, not a credit evaluation. */
export const SCHEMA_VERSION = 1;
export const COURSE_STATUSES = Object.freeze(['considering', 'planned', 'enrolled', 'completed', 'withdrawn', 'repeating', 'unknown']);
const plannedStatuses = new Set(['planned', 'enrolled', 'repeating']);
const gradePoints = { 'A+': 4, A: 4, 'A-': 3.7, 'B+': 3.3, B: 3, 'B-': 2.7, 'C+': 2.3, C: 2, 'C-': 1.7, 'D+': 1.3, D: 1, 'D-': 0.7, F: 0, NP: 0, NC: 0, W: 0, I: null, P: null, CR: null };
const aliasMap = new Map([['MATH 250', 'MATH C2210'], ['MATH 251', 'MATH C2220']]);
const seasons = { winter: 0, spring: 1, summer: 2, fall: 3 };

export function normalizeCode(value) {
  if (typeof value !== 'string') return '';
  const code = value.trim().toUpperCase().replace(/[._-]+/g, ' ').replace(/\s+/g, ' ').replace(/^([A-Z]+)\s*(C?\d+[A-Z]*)$/, '$1 $2');
  return aliasMap.get(code) || code;
}

export function parseTerm(term) {
  if (typeof term !== 'string') return null;
  const match = term.trim().toLowerCase().match(/^(\d{4})[- ](winter|spring|summer|fall)$/);
  if (!match || +match[1] < 1900 || +match[1] > 2200) return null;
  return { year: +match[1], season: match[2], ordinal: +match[1] * 4 + seasons[match[2]], label: `${match[2][0].toUpperCase() + match[2].slice(1)} ${match[1]}` };
}

function courseIndex(courses = []) {
  const list = Array.isArray(courses) ? courses : Object.entries(courses).map(([code, course]) => ({ code, ...course }));
  return new Map(list.map(course => [normalizeCode(course.code), course]));
}

function normalizeGrade(grade) { return typeof grade === 'string' ? grade.trim().toUpperCase() : null; }

/** P/CR does not establish a required letter grade; ask for the institution's evaluation. */
export function isVerifiedCompletion(record, minimum = 'C') {
  const grade = normalizeGrade(record?.grade);
  return record?.status === 'completed' && record.verified === true && !!parseTerm(record.term)
    && gradePoints[grade] != null && gradePoints[grade] >= (gradePoints[minimum] ?? 2);
}

function recordState(record, minimum = 'C') {
  if (isVerifiedCompletion(record, minimum)) return 'satisfied';
  if (plannedStatuses.has(record?.status)) return 'planned';
  if (record?.status === 'unknown') return 'unknown';
  if (record?.status === 'completed') {
    const grade = gradePoints[normalizeGrade(record.grade)];
    if (grade != null && grade < (gradePoints[minimum] ?? 2)) return 'incomplete';
    return 'unknown';
  }
  return 'incomplete';
}

function alternatives(value) {
  if (!value) return [];
  if (typeof value === 'string') return [[normalizeCode(value)]];
  if (!Array.isArray(value)) return [];
  // A flat list means AND; nested lists are alternatives, each of which is AND.
  return (value.every(item => typeof item === 'string') ? [value] : value)
    .filter(Array.isArray).map(route => route.map(normalizeCode).filter(Boolean));
}

export function calculateRequirements(records = [], mappings = []) {
  const byCode = new Map();
  for (const record of records) {
    const code = normalizeCode(record.code);
    if (!byCode.has(code)) byCode.set(code, []);
    byCode.get(code).push(record);
  }
  const rank = { satisfied: 3, planned: 2, unknown: 1, incomplete: 0 };
  return mappings.map(mapping => {
    const target = mapping.target || mapping.id;
    const routes = alternatives(mapping.alternatives || mapping.routes || mapping.courses);
    const evaluated = routes.map(route => {
      const members = route.map(code => {
        const states = (byCode.get(code) || []).map(record => recordState(record, mapping.minimumGrade || 'C'));
        return { code, status: states.sort((a, b) => rank[b] - rank[a])[0] || 'incomplete' };
      });
      const status = members.length && members.every(x => x.status === 'satisfied') ? 'satisfied'
        : members.length && members.every(x => ['satisfied', 'planned'].includes(x.status)) ? 'planned'
          : members.some(x => x.status === 'unknown') && !members.some(x => x.status === 'incomplete') ? 'unknown' : 'incomplete';
      return { route, members, status, routeKind: 'articulation' };
    });
    // A destination course completed at the receiving institution can satisfy
    // its own requirement. Do not put that route into the sending-college
    // articulation alternatives: it is different evidence and different credit.
    const directStates = (byCode.get(normalizeCode(target)) || []).map(record => recordState(record, mapping.directMinimumGrade || mapping.minimumGrade || 'C'));
    if (directStates.length) {
      const directStatus = directStates.sort((a, b) => rank[b] - rank[a])[0];
      evaluated.push({ route: [normalizeCode(target)], members: [{ code: normalizeCode(target), status: directStatus }], status: directStatus, routeKind: 'direct' });
    }
    let chosen = evaluated.sort((a, b) => rank[b.status] - rank[a.status])[0] || { route: [], members: [], status: 'incomplete', routeKind: 'articulation' };
    const petitions = records.filter(record => record.petition?.targets?.includes(target));
    const approved = petitions.find(record => record.petition.status === 'approved' && isVerifiedCompletion(record, mapping.minimumGrade || 'C'));
    if (approved) chosen = { route: [normalizeCode(approved.code)], members: [], status: 'satisfied', petition: true, routeKind: 'petition' };
    else if (petitions.some(record => record.petition.status === 'pending') && rank[chosen.status] < 1) chosen = { ...chosen, status: 'unknown', petition: true };
    const explanations = {
      satisfied: chosen.petition ? 'Recorded approved exception and verified completion. Keep the official evaluation with your records.' : chosen.routeKind === 'direct' ? 'The receiving-institution course itself has a recorded term, verified completion and the required letter grade.' : 'Every course in this route has a recorded term, verified completion, and the required letter grade.',
      planned: 'The full course combination is planned or in progress. Credit is not yet verified.',
      unknown: chosen.petition ? 'A petition is pending; this requirement is not yet satisfied.' : 'A completion record is missing verification, a term, or an acceptable recorded letter grade.',
      incomplete: 'No complete qualifying route is recorded. Alternatives are choices; all courses inside one route are required.'
    };
    return { ...mapping, target, status: chosen.status, route: chosen.route, routeKind: chosen.routeKind, members: chosen.members, explanation: explanations[chosen.status], pendingPetition: petitions.some(record => record.petition.status === 'pending'), alternatives: routes };
  });
}

export function earnedUnits(records = [], courses = []) {
  const catalog = courseIndex(courses);
  const totals = { semester: 0, quarter: 0, unverifiedSemester: 0, unverifiedQuarter: 0, unknownCodes: [], countedCodes: [] };
  const groups = new Map();
  for (const record of records) {
    const code = normalizeCode(record.code);
    if (!groups.has(code)) groups.set(code, []);
    groups.get(code).push(record);
  }
  for (const [code, attempts] of groups) {
    const course = catalog.get(code);
    if (!course || !Number.isFinite(course.units)) { totals.unknownCodes.push(code); continue; }
    const system = course.unitSystem || 'semester';
    if (!['semester', 'quarter'].includes(system)) { totals.unknownCodes.push(code); continue; }
    // Deduplication is by actual course identity, not by destination mappings or attempts.
    if (attempts.some(record => isVerifiedCompletion(record, 'D-'))) {
      totals[system] += course.units;
      totals.countedCodes.push(code);
    } else if (attempts.some(record => record.status === 'completed' && (gradePoints[normalizeGrade(record.grade)] == null || gradePoints[normalizeGrade(record.grade)] > 0))) {
      totals[system === 'semester' ? 'unverifiedSemester' : 'unverifiedQuarter'] += course.units;
    }
  }
  return totals;
}

export function validatePlan(records = [], courses = []) {
  const catalog = courseIndex(courses);
  const issues = [], assumptions = [];
  const active = records.filter(record => ['planned', 'enrolled', 'repeating', 'completed'].includes(record.status));
  const add = (record, type, severity, message) => issues.push({ code: normalizeCode(record.code), recordId: record.id || null, type, severity, message });
  for (const record of active) {
    const code = normalizeCode(record.code), course = catalog.get(code), term = parseTerm(record.term);
    if (!course) { add(record, 'unknown-course', 'warning', `${code}: no course data is available. Confirm its units, prerequisites, and equivalency.`); continue; }
    if (!term) { add(record, 'unknown-term', 'warning', `${code}: add an academic term to check ordering.`); continue; }
    // An actual verified completion is evidence of history, not a future enrollment
    // proposal. Missing older transcript rows must not invent a registration error.
    if (isVerifiedCompletion(record, 'D-')) continue;
    for (const [kind, concurrent] of [['prerequisites', false], ['corequisites', true]]) {
      const routes = alternatives(course[kind]);
      if (!routes.length) continue;
      const evaluated = routes.map(route => route.map(dependency => {
        const candidates = active.filter(other => normalizeCode(other.code) === dependency && other !== record);
        const eligible = candidates.filter(other => {
          const priorTerm = parseTerm(other.term), state = recordState(other);
          return priorTerm && ['satisfied', 'planned'].includes(state) && (concurrent ? priorTerm.ordinal <= term.ordinal : priorTerm.ordinal < term.ordinal);
        });
        return { dependency, met: eligible.length > 0, verified: eligible.some(other => isVerifiedCompletion(other)), candidates };
      }));
      const met = evaluated.find(route => route.every(dependency => dependency.met));
      if (!met) {
        const routeText = routes.map(route => route.join(' AND ')).join(' OR ');
        add(record, concurrent ? 'corequisite-conflict' : 'prerequisite-conflict', 'error', `${code} requires ${routeText} ${concurrent ? 'before or in the same term' : 'in an earlier term'}. No qualifying route is recorded for ${term.label}.`);
      } else if (met.some(dependency => !dependency.verified)) {
        assumptions.push({ code, type: 'planned-dependency', message: `${code} assumes successful completion of ${met.filter(x => !x.verified).map(x => x.dependency).join(', ')}.` });
      }
    }
    const offerings = course.offerings;
    if (record.status !== 'completed') {
      if (!offerings || offerings.status === 'unknown') assumptions.push({ code, type: 'future-offering', message: `${code} in ${term.label} is an assumption; a future section and usable meeting time are not confirmed.` });
      else if (offerings.status === 'confirmed') {
        const relevantYear = offerings.academicYear;
        const listed = (offerings.terms || []).includes(record.term);
        const confirmedYears = new Set((offerings.terms || []).map(value => parseTerm(value)?.year).filter(Boolean));
        const withinCoverage = relevantYear ? term.year === Number(String(relevantYear).slice(0, 4)) || term.year === Number(String(relevantYear).slice(0, 4)) + 1 : confirmedYears.has(term.year);
        if (!listed && withinCoverage) add(record, 'unavailable-offering', 'error', `${code} is not in the confirmed offering list for ${term.label}. Check the department before relying on this term.`);
        else if (!listed) assumptions.push({ code, type: 'future-offering', message: `${code}: the published offering list does not cover ${term.label}.` });
      } else if (offerings.status === 'typical') {
        if (offerings.seasons?.length && !offerings.seasons.includes(term.season)) add(record, 'annual-offering', 'warning', `${code} is typically offered in ${offerings.seasons.join(' / ')}, not ${term.season}. A special offering is unconfirmed.`);
        assumptions.push({ code, type: 'typical-offering', message: `${code}: a typical offering pattern is not a confirmed future section.` });
      }
    }
  }
  const duplicateTerms = new Set();
  for (const record of active) {
    const key = `${normalizeCode(record.code)}|${record.term}`;
    if (duplicateTerms.has(key)) add(record, 'duplicate-course', 'warning', `${normalizeCode(record.code)} appears more than once in ${record.term}; units are counted once.`);
    duplicateTerms.add(key);
  }
  return { valid: !issues.some(issue => issue.severity === 'error'), issues, assumptions };
}

/** Coarse scenario bounds, deliberately separate from the actual prerequisite checker. */
export function estimateTimeline(input = {}) {
  const number = (value, fallback, low, high) => value !== null && value !== '' && Number.isFinite(Number(value)) ? Math.min(high, Math.max(low, Number(value))) : fallback;
  const startYear = Math.round(number(input.startYear, 2027, 2020, 2190));
  const transferYear = Math.round(number(input.transferYear, 2030, startYear, 2195));
  const startSeason = input.startSeason === 'fall' ? 'fall' : 'spring';
  const unitsPerTerm = number(input.unitsPerTerm, 10, 0, 24);
  const summerUnits = input.summer === true ? number(input.summerUnits, 3, 0, 18) : 0;
  const completedUnits = number(input.completedUnits, 0, 0, 300);
  const remainingUnits = Math.max(0, 60 - completedUnits);
  const foundationalTerms = ({ calculus: 0, precalculus: 1, algebra: 2 })[input.mathEntry] ?? 1;
  const requiredSemesters = Math.ceil(number(input.requiredSemesters, 4 + foundationalTerms, 0, 30));
  const firstYearTerms = startSeason === 'spring' ? 1 : 0;
  const termsBefore = year => Math.max(0, (year - startYear) * 2 + firstYearTerms);
  const unitsBefore = year => termsBefore(year) * unitsPerTerm + Math.max(0, year - startYear) * summerUnits;
  let earliestTransferYear = startYear;
  while (earliestTransferYear <= 2195 && (termsBefore(earliestTransferYear) < requiredSemesters || unitsBefore(earliestTransferYear) < remainingUnits)) earliestTransferYear++;
  const prerequisiteReadyYear = input.prerequisiteReadyYear == null ? null : Math.round(number(input.prerequisiteReadyYear, startYear, startYear, 2195));
  if (prerequisiteReadyYear) earliestTransferYear = Math.max(earliestTransferYear, prerequisiteReadyYear);
  if (earliestTransferYear > 2195) earliestTransferYear = null;
  const universityYears = Math.max(3, Math.ceil(number(input.universityYears, 3, 3, 10)));
  const weeklyCapacity = input.weeklyCapacity == null ? null : number(input.weeklyCapacity, 20, 0, 168);
  const weeklyHours = number(input.weeklyHours, unitsPerTerm * 3, 0, 168);
  const capacityExceeded = weeklyCapacity != null && weeklyHours > weeklyCapacity;
  const bottlenecks = [];
  if (termsBefore(transferYear) < requiredSemesters) bottlenecks.push(`Only ${termsBefore(transferYear)} regular semesters fit before fall ${transferYear}; this scenario assumes ${requiredSemesters} for the technical sequence.`);
  if (unitsBefore(transferYear) < remainingUnits) bottlenecks.push(`The unit assumption produces ${unitsBefore(transferYear)} new semester units by spring ${transferYear}, below the ${remainingUnits} still needed for the 60-unit threshold.`);
  if (prerequisiteReadyYear && prerequisiteReadyYear > transferYear) bottlenecks.push(`The entered prerequisite completion year is ${prerequisiteReadyYear}, after the requested transfer year.`);
  if (capacityExceeded) bottlenecks.push(`The estimated ${weeklyHours} course hours per week exceed the ${weeklyCapacity} hours entered as available. Reduce the load or change the capacity assumption.`);
  if (input.postTransferPartTime === true) bottlenecks.push('Reduced university enrollment may extend the published three-year transfer sequence. No shorter graduation date is inferred.');
  const feasible = earliestTransferYear != null && earliestTransferYear <= transferYear && !capacityExceeded;
  return {
    transferYear, graduationYear: transferYear + universityYears,
    earliestTransferYear, earliestGraduationYear: earliestTransferYear == null ? null : earliestTransferYear + universityYears,
    targetFeasible: feasible, capacityExceeded, bottlenecks,
    unitsByTarget: unitsBefore(transferYear), remainingUnits, regularTermsByTarget: termsBefore(transferYear),
    assumptions: [
      'Scenario bounds only: admission, grades, articulation, GE, course availability, placement, and meeting times remain separate checks.',
      `${unitsPerTerm} transferable semester units per regular term; ${summerUnits} in each eligible summer before the transfer year. The summer immediately before fall transfer does not repair missing spring preparation.`,
      `${requiredSemesters} regular terms assumed for technical preparation. Placement readiness is not an official enrollment requirement.`,
      `${universityYears} university years, preserving the published three-year UCSD aerospace transfer baseline.`,
      'Weekly hours are editable workload assumptions, not an institutional rule per unit.'
    ]
  };
}

export function defaultState() {
  return { schemaVersion: SCHEMA_VERSION, courseRecords: [], scenarios: [], tasks: {}, projects: {}, skills: {}, notes: {}, preferences: {} };
}

const plainObject = value => value !== null && typeof value === 'object' && !Array.isArray(value) && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
const forbiddenKeys = new Set(['__proto__', 'prototype', 'constructor']);
const safeId = value => typeof value === 'string' && value.length <= 200 && /^[A-Za-z0-9_-]+$/.test(value);
const planNumbers = new Set(['startYear', 'transferYear', 'unitsPerTerm', 'summerUnits', 'completedUnits', 'universityYears', 'weeklyCapacity', 'weeklyHours', 'classHours', 'labHours', 'practiceHours', 'travelHours', 'workHours', 'otherHours', 'restHours', 'unitFee', 'books', 'transport', 'fees', 'requiredSemesters', 'prerequisiteReadyYear']);
const planBooleans = new Set(['summer', 'postTransferPartTime']);
function validatePlanInputShape(input, label, errors) {
  if (!plainObject(input)) { errors.push(`${label} must be an object.`); return; }
  for (const [key, value] of Object.entries(input)) {
    if (planNumbers.has(key)) {
      if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) errors.push(`${label}.${key} must be a finite nonnegative number.`);
    } else if (planBooleans.has(key)) {
      if (typeof value !== 'boolean') errors.push(`${label}.${key} must be true or false.`);
    } else if (key === 'name') {
      if (typeof value !== 'string' || value.length > 200) errors.push(`${label}.name must be text of at most 200 characters.`);
    } else if (key === 'startSeason') {
      if (!['spring', 'fall'].includes(value)) errors.push(`${label}.startSeason must be spring or fall.`);
    } else if (key === 'mathEntry') {
      if (!['calculus', 'precalculus', 'algebra'].includes(value)) errors.push(`${label}.mathEntry has an unsupported value.`);
    } else errors.push(`${label} has an unsupported field: ${key}.`);
  }
}

export function validateBackup(payload) {
  const errors = [];
  let value;
  try {
    if (typeof payload === 'string') {
      if (payload.length > 2_000_000) return { valid: false, errors: ['Backup exceeds the 2 MB safety limit.'], data: null };
      value = JSON.parse(payload);
    } else value = payload;
    const seen = new Set();
    let nodes = 0;
    const inspect = (node, depth = 0) => {
      if (++nodes > 50_000 || depth > 15) throw new Error('Backup is too complex.');
      if (typeof node === 'string' && node.length > 100_000) throw new Error('A text field is too long.');
      if (typeof node === 'number' && !Number.isFinite(node)) throw new Error('Numbers must be finite.');
      if (node === null || ['string', 'number', 'boolean'].includes(typeof node)) return;
      if (typeof node !== 'object') throw new Error('Unsupported data value.');
      if (seen.has(node)) throw new Error('Circular data is not supported.');
      seen.add(node);
      if (!Array.isArray(node) && !plainObject(node)) throw new Error('Only plain JSON objects are supported.');
      for (const [key, item] of Object.entries(node)) { if (forbiddenKeys.has(key)) throw new Error('Unsafe object key in backup.'); inspect(item, depth + 1); }
      seen.delete(node);
    };
    inspect(value);
    if (!plainObject(value)) throw new Error('The backup must be an object.');
    if (JSON.stringify(value).length > 2_000_000) throw new Error('Backup exceeds the 2 MB safety limit.');
    const allowed = new Set(['schemaVersion', 'exportedAt', 'courseRecords', 'scenarios', 'tasks', 'projects', 'skills', 'notes', 'preferences']);
    for (const key of Object.keys(value)) if (!allowed.has(key)) errors.push(`Unsupported backup field: ${key}.`);
    if (value.schemaVersion !== SCHEMA_VERSION) errors.push('Unsupported backup version. Export a version 1 backup from this application.');
    for (const key of ['courseRecords', 'scenarios']) if (!Array.isArray(value[key])) errors.push(`${key} must be an array.`);
    for (const key of ['tasks', 'projects', 'skills', 'notes', 'preferences']) if (!plainObject(value[key])) errors.push(`${key} must be an object.`);
    for (const key of ['notes', 'skills']) if (plainObject(value[key])) {
      for (const [id, item] of Object.entries(value[key])) if (typeof item !== 'string') errors.push(`${key}.${id} must be text.`);
    }
    if (plainObject(value.tasks)) for (const [id, item] of Object.entries(value.tasks)) if (typeof item !== 'boolean') errors.push(`tasks.${id} must be true or false.`);
    if (plainObject(value.projects)) for (const [id, project] of Object.entries(value.projects)) {
      if (!plainObject(project)) { errors.push(`projects.${id} must be an object.`); continue; }
      for (const key of Object.keys(project)) if (!['status', 'budget'].includes(key)) errors.push(`projects.${id} has an unsupported field: ${key}.`);
      if (project.status !== undefined && (typeof project.status !== 'string' || project.status.length > 200)) errors.push(`projects.${id}.status must be text of at most 200 characters.`);
      if (project.budget !== undefined && (typeof project.budget !== 'number' || !Number.isFinite(project.budget) || project.budget < 0)) errors.push(`projects.${id}.budget must be a finite nonnegative number.`);
    }
    if (plainObject(value.preferences)) {
      const prefs = value.preferences;
      if (prefs.savedFrontiers !== undefined && (!Array.isArray(prefs.savedFrontiers) || prefs.savedFrontiers.some(item => typeof item !== 'string'))) errors.push('preferences.savedFrontiers must be an array of strings.');
      if (prefs.interests !== undefined && (!plainObject(prefs.interests) || Object.values(prefs.interests).some(item => typeof item !== 'string'))) errors.push('preferences.interests must be an object of text values.');
      if (prefs.plan !== undefined) validatePlanInputShape(prefs.plan, 'preferences.plan', errors);
      if (prefs.fontSize !== undefined && (typeof prefs.fontSize !== 'number' || !Number.isFinite(prefs.fontSize))) errors.push('preferences.fontSize must be a finite number.');
    }
    if (value.exportedAt !== undefined && (typeof value.exportedAt !== 'string' || !Number.isFinite(Date.parse(value.exportedAt)))) errors.push('exportedAt must be a valid date string.');
    if (Array.isArray(value.courseRecords)) {
      if (value.courseRecords.length > 1000) errors.push('Too many course records.');
      const recordKeys = new Set(['id', 'code', 'status', 'term', 'grade', 'verified', 'petition', 'note', 'scenarioId']);
      const ids = new Set();
      value.courseRecords.forEach((record, index) => {
        const label = `Course record ${index + 1}`;
        if (!plainObject(record)) { errors.push(`${label} must be an object.`); return; }
        for (const key of Object.keys(record)) if (!recordKeys.has(key)) errors.push(`${label}: unsupported field ${key}.`);
        if (!safeId(record.id) || ids.has(record.id)) errors.push(`${label} needs a unique id containing only letters, digits, underscores and hyphens.`);
        ids.add(record.id);
        if (typeof record.code !== 'string' || !/^[A-Za-z]+[ ._-]*C?\d+[A-Za-z]*$/.test(record.code.trim()) || record.code.length > 40) errors.push(`${label} has an invalid course code.`);
        if (!COURSE_STATUSES.includes(record.status)) errors.push(`${label} has an unsupported status.`);
        if (record.term != null && record.term !== '' && !parseTerm(record.term)) errors.push(`${label} has an invalid academic term.`);
        if (record.grade != null && record.grade !== '' && !Object.hasOwn(gradePoints, normalizeGrade(record.grade))) errors.push(`${label} has an unsupported grade.`);
        if (record.verified !== undefined && typeof record.verified !== 'boolean') errors.push(`${label}: verified must be true or false.`);
        if (record.note !== undefined && typeof record.note !== 'string') errors.push(`${label}: note must be text.`);
        if (record.petition !== undefined) {
          const p = record.petition;
          if (!plainObject(p) || !['pending', 'approved', 'denied'].includes(p.status) || !Array.isArray(p.targets) || p.targets.some(target => typeof target !== 'string' || target.length > 60)) errors.push(`${label} has an invalid petition.`);
          else for (const key of Object.keys(p)) if (!['status', 'targets', 'date', 'note'].includes(key)) errors.push(`${label}: unsupported petition field ${key}.`);
        }
      });
    }
    if (Array.isArray(value.scenarios)) {
      if (value.scenarios.length > 30) errors.push('At most 30 saved scenarios are supported.');
      const scenarioIds = new Set();
      value.scenarios.forEach((scenario, index) => {
        const label = `Scenario ${index + 1}`;
        if (!plainObject(scenario)) { errors.push(`${label} must be an object.`); return; }
        if (!safeId(scenario.id) || scenarioIds.has(scenario.id)) errors.push(`${label} needs a unique id containing only letters, digits, underscores and hyphens.`);
        scenarioIds.add(scenario.id);
        if (typeof scenario.name !== 'string' || !scenario.name.trim() || scenario.name.length > 200) errors.push(`${label} needs a name of 1–200 characters.`);
        validatePlanInputShape(scenario.inputs, `${label} inputs`, errors);
        if (scenario.courseRecords !== undefined) {
          if (!Array.isArray(scenario.courseRecords)) errors.push(`${label} courseRecords must be an array.`);
          else {
            const nested = validateBackup({ ...defaultState(), courseRecords: scenario.courseRecords });
            if (!nested.valid) errors.push(...nested.errors.map(error => `${label}: ${error}`));
          }
        }
      });
    }
    if (errors.length) return { valid: false, errors, data: null };
    return { valid: true, errors: [], data: JSON.parse(JSON.stringify(value)) };
  } catch (error) { return { valid: false, errors: [error instanceof SyntaxError ? 'This file is not valid JSON.' : error.message || 'Invalid backup.'], data: null }; }
}
