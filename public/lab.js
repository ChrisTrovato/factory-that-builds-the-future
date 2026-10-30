/* Engineering Lab: original illustrative models. No libraries or network calls. */
export const STEFAN_BOLTZMANN = 5.670374419e-8;

function finite(value, name, minimum = 0, inclusive = true) {
  if (!Number.isFinite(value) || (inclusive ? value < minimum : value <= minimum)) {
    throw new RangeError(`${name} must be finite and ${inclusive ? 'at least' : 'greater than'} ${minimum}.`);
  }
  return value;
}

/** Serial line: availability constrains input capacity, yield applies once per stage. */
export function stationFlow({ fabricationMinutes = 10, testMinutes = 15 } = {}) {
  finite(fabricationMinutes, 'Fabrication cycle', 0, false);
  finite(testMinutes, 'Test cycle', 0, false);
  const cycles = [fabricationMinutes, 12, testMinutes];
  const availability = [.90, .95, .90];
  const yields = [.96, .98, .95];
  let flow = Infinity;
  const stations = ['Fabrication', 'Assembly', 'Test'].map((name, i) => {
    const inputCapacity = 60 / cycles[i] * availability[i];
    const actualInput = Math.min(flow, inputCapacity);
    flow = actualInput * yields[i];
    return { name, cycleMinutes: cycles[i], availability: availability[i], passFraction: yields[i],
      inputCapacity, actualInput, outputPerHour: flow,
      finalEquivalentCapacity: inputCapacity * yields.slice(i).reduce((a, b) => a * b, 1) };
  });
  const minimum = Math.min(...stations.map(s => s.finalEquivalentCapacity));
  return { stations, finalPerHour: flow, finalPerShift: 8 * flow,
    firstPassFraction: yields.reduce((a, b) => a * b, 1),
    bottlenecks: stations.filter(s => Math.abs(s.finalEquivalentCapacity - minimum) < 1e-9).map(s => s.name) };
}

/** Faithful port of work/calculations.py; period and capacity units are abstract. */
export function growthModel({ periods = 60, power = 12, kits = .8, delay = 4,
  maintenanceFraction = .30, carePerUnit = .15, wear = .01, neglect = .10, shock = false } = {}) {
  for (const [name, value] of Object.entries({ periods, power, kits, delay, maintenanceFraction, carePerUnit, wear, neglect })) finite(value, name);
  if (!Number.isInteger(periods) || !Number.isInteger(delay) || periods > 10000) throw new RangeError('Periods and delay must be integers; periods must not exceed 10000.');
  if (maintenanceFraction > 1) throw new RangeError('Maintenance allocation must not exceed 1.');
  let installed = 4;
  let pipeline = [];
  const rows = [];
  for (let period = 0; period <= periods; period++) {
    installed += pipeline.filter(p => p.due === period).reduce((a, p) => a + p.quantity, 0);
    pipeline = pipeline.filter(p => p.due !== period);
    const active = Math.min(installed, shock && period >= 20 ? 4 : power);
    const currentKits = shock && period >= 20 ? 0 : kits;
    const requiredCare = carePerUnit * installed;
    const care = Math.min(requiredCare, maintenanceFraction * active);
    const unpaid = Math.max(0, requiredCare - care);
    const loss = wear * installed + (carePerUnit ? neglect * unpaid / carePerUnit : 0);
    const available = Math.max(0, active - care);
    const starts = Math.min(.5 * available / 8, currentKits);
    rows.push({ period, installed, active, care, unpaid_care: unpaid, loss, starts,
      pipeline: pipeline.reduce((a, p) => a + p.quantity, 0) });
    if (period === periods) break;
    installed = Math.max(0, installed - loss);
    pipeline.push({ due: period + Math.max(1, delay), quantity: starts });
  }
  return rows;
}

export function radiatorModel({ heatKW = 2, temperatureK = 350, emissivity = .85 } = {}) {
  finite(heatKW, 'Heat load');
  finite(temperatureK, 'Absolute temperature', 0, false);
  finite(emissivity, 'Emissivity', 0, false);
  if (emissivity > 1) throw new RangeError('Emissivity cannot exceed 1.');
  const fluxWm2 = emissivity * STEFAN_BOLTZMANN * temperatureK ** 4;
  return { areaM2: heatKW * 1000 / fluxWm2, fluxWm2, temperatureC: temperatureK - 273.15 };
}

export function momentumModel({ baseMass = 1000, payloadMass = 100, relativeVelocity = .10 } = {}) {
  finite(baseMass, 'Base mass', 0, false);
  finite(payloadMass, 'Payload mass', 0, false);
  if (!Number.isFinite(relativeVelocity)) throw new RangeError('Relative velocity must be finite.');
  const baseVelocity = -payloadMass / (baseMass + payloadMass) * relativeVelocity;
  const payloadVelocity = baseVelocity + relativeVelocity;
  return { baseVelocity, payloadVelocity,
    totalMomentum: baseMass * baseVelocity + payloadMass * payloadVelocity,
    centerOfMassVelocity: (baseMass * baseVelocity + payloadMass * payloadVelocity) / (baseMass + payloadMass) };
}

export function growthCSV(rows, parameters = {}) {
  const columns = ['period', 'installed', 'active', 'care', 'unpaid_care', 'loss', 'starts', 'pipeline'];
  const parameterColumns = ['power_cap', 'kit_limit', 'maintenance_fraction', 'build_delay', 'care_per_unit', 'wear_fraction', 'neglect_factor'];
  const values = [parameters.power ?? 12, parameters.kits ?? .8, parameters.maintenanceFraction ?? .30, 4, .15, .01, .10];
  return [...[columns.concat(parameterColumns).join(',')], ...rows.map(row => columns.map(key => row[key]).concat(values).join(','))].join('\r\n');
}

let instanceNumber = 0;
const fmt = (value, decimals = 2) => Number(value).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
const signed = (value, decimals = 4) => `${value > 0 ? '+' : value < 0 ? '−' : ''}${fmt(Math.abs(value), decimals)}`;
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const DEFAULTS = {
  throughput: { fabricationMinutes: 10, testMinutes: 15 },
  growth: { power: 12, kits: .8, maintenanceFraction: .30 },
  radiator: { heatKW: 2, temperatureK: 350, emissivity: .85 },
  momentum: { baseMass: 1000, payloadMass: 100, relativeVelocity: .10 }
};
const TOOLS = {
  throughput: { name: 'Throughput', title: 'Find the slowest useful flow.',
    description: 'Change two cycle times. Watch the constraint move through a serial production line.',
    fields: [
      { key: 'fabricationMinutes', label: 'Fabrication cycle', min: 8, max: 18, step: .5, unit: 'min / part', digits: 1 },
      { key: 'testMinutes', label: 'Test cycle', min: 8, max: 25, step: .5, unit: 'min / part', digits: 1 }
    ] },
  growth: { name: 'Growth', title: 'Expansion needs a support system.',
    description: 'Give a small industrial system power, imported kits, and time for maintenance. See what remains productive.',
    fields: [
      { key: 'power', label: 'Power-supported capacity', min: 4, max: 24, step: 1, unit: 'active units', digits: 0 },
      { key: 'kits', label: 'Imported component kits', min: 0, max: .8, step: .02, unit: 'kits / period', digits: 2 },
      { key: 'maintenanceFraction', label: 'Maximum maintenance allocation', min: .03, max: .30, step: .01, unit: '% of gross output', digits: 0, scale: 100 }
    ] },
  radiator: { name: 'Radiator', title: 'Heat must have somewhere to go.',
    description: 'Explore the strong effect of temperature on an ideal radiator rejecting heat to cold space.',
    fields: [
      { key: 'heatKW', label: 'Heat to reject', min: 1, max: 10, step: .25, unit: 'kW', digits: 2 },
      { key: 'temperatureK', label: 'Radiator temperature', min: 250, max: 450, step: 5, unit: 'K', digits: 0 },
      { key: 'emissivity', label: 'Surface emissivity', min: .50, max: .95, step: .01, unit: 'dimensionless', digits: 2 }
    ] },
  momentum: { name: 'Orbit momentum', title: 'The arm moves its own world.',
    description: 'Move a payload relative to a free-floating base. Both bodies move while their combined momentum stays constant.',
    fields: [
      { key: 'baseMass', label: 'Base mass', min: 100, max: 5000, step: 100, unit: 'kg', digits: 0 },
      { key: 'payloadMass', label: 'Payload mass', min: 10, max: 1000, step: 10, unit: 'kg', digits: 0 },
      { key: 'relativeVelocity', label: 'Payload speed relative to base', min: 0, max: 1, step: .01, unit: 'm / s', digits: 2 }
    ] }
};

function metric(label, value, unit = '', accent = false) {
  return `<div class="lab-metric${accent ? ' lab-metric-accent' : ''}${/[a-z]/i.test(value) ? ' lab-metric-text' : ''}"><span class="lab-metric-label">${label}</span><strong>${value}</strong><span class="lab-metric-unit">${unit}</span></div>`;
}

function svgStart(id, title, description, height = 300) {
  return `<svg class="lab-chart-svg" viewBox="0 0 600 ${height}" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${escape(title)}</title><desc id="${id}-desc">${escape(description)}</desc>`;
}
function grid(maximum, xMax = 60, label = 'Period') {
  let out = '';
  for (let i = 0; i <= 4; i++) {
    const y = 246 - i * 53;
    out += `<line class="lab-gridline" x1="68" y1="${y}" x2="574" y2="${y}"/><text class="lab-axis" text-anchor="end" x="57" y="${y + 4}">${fmt(maximum * i / 4, maximum < 2 ? 2 : 1)}</text>`;
  }
  for (let i = 0; i <= 4; i++) out += `<text class="lab-axis" text-anchor="middle" x="${68 + i * 126.5}" y="269">${fmt(xMax * i / 4, 0)}</text>`;
  return out + `<text class="lab-axis" text-anchor="middle" x="321" y="293">${label}</text>`;
}
function pathFor(rows, field, maximum) {
  return rows.map((row, index) => `${index ? 'L' : 'M'}${(68 + index / Math.max(1, rows.length - 1) * 506).toFixed(2)},${(246 - row[field] / maximum * 212).toFixed(2)}`).join(' ');
}

function throughputView(state, id) {
  const result = stationFlow(state);
  const maximum = Math.max(5, Math.ceil(Math.max(...result.stations.map(s => s.finalEquivalentCapacity))));
  const chartX = 135, chartWidth = 390;
  const targetX = chartX + 3.75 / maximum * chartWidth;
  let svg = svgStart(id, 'Equivalent final output capacity by station', `${result.bottlenecks.join(' and ')} limits the line to ${fmt(result.finalPerShift)} accepted units per eight-hour shift. All bars include the downstream yield needed to express capacity in the same final-output units.`, 272);
  svg += `<text class="lab-axis" x="135" y="24">Accepted final units / scheduled hour</text>`;
  result.stations.forEach((station, index) => {
    const y = 49 + index * 61;
    const limiting = result.bottlenecks.includes(station.name);
    svg += `<text class="lab-chart-label" x="14" y="${y + 24}">${station.name}</text><rect class="${limiting ? 'lab-fill-copper' : 'lab-fill-teal'}" x="${chartX}" y="${y}" width="${station.finalEquivalentCapacity / maximum * chartWidth}" height="37" rx="3"/><text class="lab-chart-label" x="${chartX + station.finalEquivalentCapacity / maximum * chartWidth + 8}" y="${y + 24}">${fmt(station.finalEquivalentCapacity, 2)}</text>`;
  });
  svg += `<line class="lab-target" x1="${targetX}" y1="42" x2="${targetX}" y2="214"/><text class="lab-axis" x="${targetX}" y="236" text-anchor="middle">Target 3.75 / hr</text></svg>`;
  const deficit = result.finalPerShift - 30;
  const rows = result.stations.map(s => `<tr><th scope="row">${s.name}</th><td>${fmt(s.inputCapacity, 3)}</td><td>${fmt(s.actualInput, 3)}</td><td>${fmt(s.passFraction * 100, 0)}%</td><td>${fmt(s.outputPerHour, 3)}</td></tr>`).join('');
  return {
    metrics: metric('Accepted per 8-hour shift', fmt(result.finalPerShift), 'target: 30 units', true) + metric('Limiting stage', result.bottlenecks.join(' + '), `${deficit >= 0 ? '+' : '−'}${fmt(Math.abs(deficit))} units versus target`),
    chart: svg,
    insight: `The ${result.bottlenecks.join(' and ').toLowerCase()} ${result.bottlenecks.length > 1 ? 'stages set' : 'stage sets'} the useful flow. A faster machine elsewhere cannot overcome this limit.`,
    details: `<p>Each stage accepts the lesser of incoming flow and its available input capacity, then applies its own yield once. The chart converts each station's capacity to equivalent final output by including its own and all downstream yields.</p><code>input capacity = 60 / cycle minutes × availability<br>output = min(incoming flow, input capacity) × yield</code><p>Fixed assumptions: assembly cycle 12 minutes; availability 90%, 95%, 90%; pass fractions 96%, 98%, 95%; shift 8 hours. No rework, finite buffers, correlated downtime, or startup losses are modeled.</p><div class="lab-table-scroll"><table><caption>Sequential flow, units per scheduled hour</caption><thead><tr><th>Stage</th><th>Input capacity</th><th>Actual input</th><th>Yield</th><th>Actual output</th></tr></thead><tbody>${rows}</tbody></table></div>`
  };
}

function growthView(state, id) {
  const rows = growthModel(state);
  const last = rows.at(-1);
  const maximum = Math.max(5, Math.ceil(Math.max(...rows.map(r => r.installed)) / 5) * 5);
  let svg = svgStart(id, 'Installed and active capacity over 60 abstract periods', `At period 60, installed capacity is ${fmt(last.installed)} and active capacity is ${fmt(last.active)}. Active capacity cannot exceed the power cap of ${state.power}.`);
  svg += `<text class="lab-axis" x="68" y="18">Capacity units</text>${grid(maximum)}<path class="lab-series-installed" d="${pathFor(rows, 'installed', maximum)}"/><path class="lab-series-active" d="${pathFor(rows, 'active', maximum)}"/></svg>`;
  let insight = last.active < 4 ? 'The system ends with less active capacity than it started with. Reinvestment cannot keep up with the modeled losses.' : last.installed > last.active + .01 ? 'Installed capacity exceeds what power can activate. More hardware still requires maintenance, even when it cannot contribute output.' : 'Capacity remains within the available power. Component supply, build delay, and maintenance still shape expansion.';
  return {
    metrics: metric('Active at period 60', fmt(last.active), 'abstract capacity units', true) + metric('Installed at period 60', fmt(last.installed), `${fmt(last.unpaid_care, 3)} unmet care credits / period`),
    chart: svg + '<div class="lab-legend"><span><i class="lab-swatch-installed"></i>Installed</span><span><i class="lab-swatch-active"></i>Active · dashed</span></div>',
    insight,
    details: `<p>This toy model starts with four installed capacity units. Power caps active capacity. Each active unit provides one gross output credit per period. Required care is 0.15 credits per installed unit; the slider limits the fraction of gross output allocated to that care.</p><code>active = min(installed, power cap)<br>care = min(0.15 × installed, allocation × active)<br>loss = 0.01 × installed + 0.10 × unmet care / 0.15<br>starts = min(0.5 × (active − care) / 8, kit limit)</code><p>Half of the output remaining after care funds construction at eight credits per new unit. Completed units arrive after four periods. Losses reduce the installed stock; delayed completions are then added at the next relevant boundary. Fractional units represent aggregate capacity, not partial physical robots. Periods have no assigned calendar duration. No shock is applied in this interactive case.</p><button class="lab-button lab-export" type="button">Export this run as CSV</button><div class="lab-table-scroll lab-table-tall"><table><caption>Exact trajectory, rounded for display</caption><thead><tr><th>Period</th><th>Installed</th><th>Active</th><th>Care</th><th>Unmet care</th></tr></thead><tbody>${rows.map(r => `<tr><th scope="row">${r.period}</th><td>${fmt(r.installed, 3)}</td><td>${fmt(r.active, 3)}</td><td>${fmt(r.care, 3)}</td><td>${fmt(r.unpaid_care, 3)}</td></tr>`).join('')}</tbody></table></div>`
  };
}

function radiatorView(state, id) {
  const result = radiatorModel(state);
  const samples = Array.from({ length: 41 }, (_, i) => ({ temperature: 250 + 5 * i, area: radiatorModel({ ...state, temperatureK: 250 + 5 * i }).areaM2 }));
  const maximum = Math.ceil(samples[0].area * 1.08);
  let svg = svgStart(id, 'Ideal radiator area versus temperature', `For ${state.heatKW} kilowatts and emissivity ${state.emissivity}, the ideal effective radiating area at ${state.temperatureK} kelvin is ${fmt(result.areaM2)} square meters.`);
  for (let i = 0; i <= 4; i++) {
    const y = 246 - i * 53;
    svg += `<line class="lab-gridline" x1="68" y1="${y}" x2="574" y2="${y}"/><text class="lab-axis" text-anchor="end" x="57" y="${y + 4}">${fmt(maximum * i / 4, 1)}</text><text class="lab-axis" text-anchor="middle" x="${68 + 126.5 * i}" y="269">${250 + i * 50}</text>`;
  }
  const x = 68 + (state.temperatureK - 250) / 200 * 506, y = 246 - result.areaM2 / maximum * 212;
  svg += `<text class="lab-axis" x="68" y="18">Effective radiating area · m²</text><text class="lab-axis" text-anchor="middle" x="321" y="293">Temperature · K</text><path class="lab-series-installed" d="${pathFor(samples, 'area', maximum)}"/><line class="lab-target" x1="${x}" y1="${y}" x2="${x}" y2="246"/><circle class="lab-marker" cx="${x}" cy="${y}" r="6"/></svg>`;
  return {
    metrics: metric('Ideal radiating area', fmt(result.areaM2), 'm² · effective emitting surface', true) + metric('Emitted heat flux', fmt(result.fluxWm2, 0), `W / m² at ${fmt(result.temperatureC, 1)} °C`),
    chart: svg,
    insight: 'At a fixed heat load, hotter surfaces need less radiating area. The material, equipment, and thermal interfaces must still tolerate that temperature.',
    details: `<p>Stefan–Boltzmann radiation to an ideal cold sink:</p><code>A = Q / (ε σ T⁴)<br>σ = 5.670374419 × 10⁻⁸ W m⁻² K⁻⁴</code><p>Q is waste heat, not electrical generation. Temperature is absolute kelvin. This model assumes uniform temperature and emissivity, negligible background radiation, an unobstructed view to cold space, and no absorbed sunlight, albedo, or nearby spacecraft radiation. It omits transport losses, fin efficiency, degradation, plumbing, mass, and redundancy.</p><p>The result is effective emitting surface area, not automatically panel footprint; two-sided emission requires appropriate thermal geometry. This is a physical scaling exercise, not a flight radiator design.</p><div class="lab-table-scroll"><table><caption>Selected temperatures at the current heat load and emissivity</caption><thead><tr><th>Temperature</th><th>Area</th></tr></thead><tbody>${[250, 300, 350, 400, 450].map(t => `<tr><th scope="row">${t} K</th><td>${fmt(radiatorModel({ ...state, temperatureK: t }).areaM2)} m²</td></tr>`).join('')}</tbody></table></div>`
  };
}

function momentumView(state, id) {
  const result = momentumModel(state);
  const maximum = Math.max(.01, Math.abs(result.baseVelocity), Math.abs(result.payloadVelocity));
  const scale = 178 / maximum;
  let svg = svgStart(id, 'Base and payload velocities in a local inertial frame', `Base velocity ${signed(result.baseVelocity)} meters per second; payload velocity ${signed(result.payloadVelocity)} meters per second. Their relative speed is ${fmt(state.relativeVelocity)} meters per second. Total momentum is zero to floating-point precision.`, 280);
  svg += '<text class="lab-axis" x="145" y="22">Local inertial velocity · m / s</text><line class="lab-target" x1="330" y1="40" x2="330" y2="226"/>';
  [{ label: 'Base', value: result.baseVelocity, y: 72, color: 'lab-fill-teal' }, { label: 'Payload', value: result.payloadVelocity, y: 157, color: 'lab-fill-copper' }].forEach(item => {
    const width = Math.abs(item.value) * scale;
    svg += `<text class="lab-chart-label" x="18" y="${item.y + 15}">${item.label}</text><text class="lab-axis" x="18" y="${item.y + 36}">${signed(item.value)} m/s</text><rect class="${item.color}" x="${item.value < 0 ? 330 - width : 330}" y="${item.y}" width="${width}" height="35" rx="3"/>`;
  });
  svg += `<text class="lab-axis" x="152" y="249" text-anchor="middle">−${fmt(maximum, 3)}</text><text class="lab-axis" x="330" y="249" text-anchor="middle">0</text><text class="lab-axis" x="508" y="249" text-anchor="middle">+${fmt(maximum, 3)}</text><text class="lab-axis" x="330" y="275" text-anchor="middle">Equal scale for both bodies</text></svg>`;
  return {
    metrics: metric('Base velocity', signed(result.baseVelocity), 'm / s · local inertial frame', true) + metric('Payload velocity', signed(result.payloadVelocity), 'm / s · same frame'),
    chart: svg,
    insight: `The center of mass stays at rest. The smaller body moves faster in magnitude; relative speed is the difference between the two signed velocities.`,
    details: `<p>Starting from zero total momentum, let M be base mass, m payload mass, and vᵣ the payload velocity relative to the base.</p><code>v_base = −m / (M + m) × vᵣ<br>v_payload = v_base + vᵣ<br>M × v_base + m × v_payload = 0</code><p>Assumptions: two bodies with fixed masses, a local inertial frame, no external impulse, and no rotation or arm mass. The example isolates linear momentum; it does not model a complete orbital manipulator, orbit, attitude system, or flexible structure.</p><div class="lab-table-scroll"><table><caption>Momentum balance for the selected state</caption><thead><tr><th>Body</th><th>Mass</th><th>Velocity</th><th>Momentum</th></tr></thead><tbody><tr><th scope="row">Base</th><td>${fmt(state.baseMass, 0)} kg</td><td>${signed(result.baseVelocity, 6)} m/s</td><td>${signed(state.baseMass * result.baseVelocity, 6)} kg·m/s</td></tr><tr><th scope="row">Payload</th><td>${fmt(state.payloadMass, 0)} kg</td><td>${signed(result.payloadVelocity, 6)} m/s</td><td>${signed(state.payloadMass * result.payloadVelocity, 6)} kg·m/s</td></tr><tr><th scope="row">Combined</th><td>${fmt(state.baseMass + state.payloadMass, 0)} kg</td><td>Center of mass: 0 m/s</td><td>0 kg·m/s, within numerical precision</td></tr></tbody></table></div>`
  };
}

const VIEWS = { throughput: throughputView, growth: growthView, radiator: radiatorView, momentum: momentumView };

/** Mount one complete lab. Return { destroy(), setTab(name) }. Does not add global listeners. */
export function renderLab(container) {
  if (!container || typeof container.replaceChildren !== 'function') throw new TypeError('renderLab requires a DOM element.');
  const id = `engineering-lab-${++instanceNumber}`;
  const root = document.createElement('section');
  root.className = 'lab';
  root.setAttribute('aria-label', 'Interactive engineering lab');
  root.innerHTML = `<div class="lab-intro"><p class="lab-eyebrow">Engineering lab / change an assumption</p><h2>Make the constraints visible.</h2><p>Four small models for asking better questions. Every input is illustrative. These are experiments in reasoning, not predictions or validated hardware designs.</p></div><div class="lab-tabs" role="tablist" aria-label="Engineering models">${Object.entries(TOOLS).map(([key, tool], i) => `<button class="lab-tab" role="tab" type="button" id="${id}-tab-${key}" aria-controls="${id}-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-tab="${key}"><span class="lab-tab-index">0${i + 1}</span>${tool.name}</button>`).join('')}</div><div id="${id}-panel" class="lab-panel" role="tabpanel" aria-labelledby="${id}-tab-throughput"></div><p class="lab-footnote">Original educational models · Explicit boundaries · Reproducible arithmetic</p>`;
  container.replaceChildren(root);
  const panel = root.querySelector('.lab-panel');
  const states = Object.fromEntries(Object.entries(DEFAULTS).map(([key, value]) => [key, { ...value }]));
  let active = 'throughput';
  let destroyed = false;
  const downloads = new Set();

  function update() {
    if (destroyed) return;
    const state = states[active], tool = TOOLS[active];
    tool.fields.forEach(field => {
      const input = panel.querySelector(`[data-field="${field.key}"]`);
      const display = `${fmt(state[field.key] * (field.scale || 1), field.digits)} ${field.unit}`;
      input.setAttribute('aria-valuetext', display);
      input.style.setProperty('--lab-range-progress', `${(state[field.key] - field.min) / (field.max - field.min) * 100}%`);
      panel.querySelector(`[data-value="${field.key}"]`).textContent = display;
    });
    const detailsWasOpen = panel.querySelector('.lab-model-details')?.open || false;
    const view = VIEWS[active](state, `${id}-${active}-chart`);
    panel.querySelector('.lab-results').innerHTML = `<div class="lab-metrics" aria-live="polite" aria-atomic="true">${view.metrics}</div><div class="lab-chart-wrap" tabindex="0" aria-label="Chart. Scroll horizontally on narrow screens.">${view.chart}</div><p class="lab-insight">${view.insight}</p><details class="lab-model-details"${detailsWasOpen ? ' open' : ''}><summary>Equations, assumptions &amp; exact values</summary><div class="lab-model-body">${view.details}</div></details>`;
  }

  function mountPanel() {
    const tool = TOOLS[active];
    panel.innerHTML = `<div class="lab-tool-heading"><div><h3>${tool.title}</h3><p>${tool.description}</p></div><button class="lab-button lab-reset" type="button">Reset inputs</button></div><div class="lab-workspace"><form class="lab-controls" aria-label="${tool.name} assumptions"><p class="lab-control-heading">Your assumptions</p>${tool.fields.map(field => {
      const fieldId = `${id}-${field.key}`;
      return `<div class="lab-control"><label for="${fieldId}">${field.label}</label><output for="${fieldId}" data-value="${field.key}"></output><input type="range" id="${fieldId}" data-field="${field.key}" min="${field.min}" max="${field.max}" step="${field.step}" value="${states[active][field.key]}"><div class="lab-range-bounds" aria-hidden="true"><span>${fmt(field.min * (field.scale || 1), field.digits)}</span><span>${fmt(field.max * (field.scale || 1), field.digits)}</span></div></div>`;
    }).join('')}<p class="lab-controls-note">Drag a slider or use its arrow keys. Read the assumptions before interpreting the result.</p></form><div class="lab-results"></div></div>`;
    panel.setAttribute('aria-labelledby', `${id}-tab-${active}`);
    update();
  }

  function setTab(name, focus = false) {
    if (destroyed) return;
    if (!TOOLS[name]) throw new RangeError(`Unknown lab tab: ${name}`);
    active = name;
    root.querySelectorAll('[role="tab"]').forEach(button => {
      const selected = button.dataset.tab === name;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
      if (selected && focus) button.focus();
    });
    mountPanel();
  }

  function onInput(event) {
    const key = event.target.dataset.field;
    if (!key) return;
    states[active][key] = Number(event.target.value);
    update();
  }

  function onClick(event) {
    const tab = event.target.closest('[data-tab]');
    if (tab) { setTab(tab.dataset.tab); return; }
    if (event.target.closest('.lab-reset')) {
      states[active] = { ...DEFAULTS[active] };
      TOOLS[active].fields.forEach(field => { panel.querySelector(`[data-field="${field.key}"]`).value = states[active][field.key]; });
      update();
      return;
    }
    if (event.target.closest('.lab-export')) {
      const csv = growthCSV(growthModel(states.growth), states.growth);
      const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
      downloads.add(url);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'factory-lab-illustrative-growth.csv';
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => { URL.revokeObjectURL(url); downloads.delete(url); }, 1000);
    }
  }

  function onKey(event) {
    if (!event.target.matches('[role="tab"]')) return;
    const keys = Object.keys(TOOLS), current = keys.indexOf(event.target.dataset.tab);
    let next;
    if (event.key === 'ArrowRight') next = (current + 1) % keys.length;
    if (event.key === 'ArrowLeft') next = (current + keys.length - 1) % keys.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = keys.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setTab(keys[next], true);
  }

  root.addEventListener('input', onInput);
  root.addEventListener('click', onClick);
  root.addEventListener('keydown', onKey);
  mountPanel();
  return { setTab: name => setTab(name), destroy() {
    destroyed = true;
    root.removeEventListener('input', onInput);
    root.removeEventListener('click', onClick);
    root.removeEventListener('keydown', onKey);
    downloads.forEach(url => URL.revokeObjectURL(url));
    downloads.clear();
    root.remove();
  } };
}
