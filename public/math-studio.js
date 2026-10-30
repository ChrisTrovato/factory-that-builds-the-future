/* Math becomes machinery: original educational models, with no external dependencies. */
function number(value, name, minimum = -Infinity, inclusive = true) {
  if (!Number.isFinite(value) || (inclusive ? value < minimum : value <= minimum)) {
    throw new RangeError(`${name} is outside its permitted range.`);
  }
  return value;
}

export function armReach({ length = 1.2, angleDegrees = 40 } = {}) {
  number(length, 'Length', 0, false);
  number(angleDegrees, 'Angle');
  const radians = angleDegrees * Math.PI / 180;
  return { x: length * Math.cos(radians), y: length * Math.sin(radians), radians };
}

export function liftingWork({ mass = 20, height = 1.5, seconds = 5, efficiency = .8, gravity = 9.81 } = {}) {
  number(mass, 'Mass', 0, false);
  number(height, 'Height', 0);
  number(seconds, 'Time', 0, false);
  number(efficiency, 'Efficiency', 0, false);
  number(gravity, 'Gravity', 0, false);
  if (efficiency > 1) throw new RangeError('Efficiency cannot exceed 100%.');
  const force = mass * gravity;
  const usefulEnergy = force * height;
  const inputEnergy = usefulEnergy / efficiency;
  return { force, usefulEnergy, inputEnergy, usefulPower: usefulEnergy / seconds,
    inputPower: inputEnergy / seconds, lossEnergy: inputEnergy - usefulEnergy };
}

export function accumulatedMotion({ acceleration = 2, seconds = 4, initialVelocity = 1 } = {}) {
  number(acceleration, 'Acceleration');
  number(seconds, 'Time', 0);
  number(initialVelocity, 'Initial velocity');
  return { velocity: initialVelocity + acceleration * seconds,
    displacement: initialVelocity * seconds + .5 * acceleration * seconds ** 2,
    initialContribution: initialVelocity * seconds,
    accelerationContribution: .5 * acceleration * seconds ** 2 };
}

export function gearRatio({ driverTeeth = 20, drivenTeeth = 40, driverRPM = 120 } = {}) {
  number(driverTeeth, 'Driver teeth', 1);
  number(drivenTeeth, 'Driven teeth', 1);
  number(driverRPM, 'Driver speed', 0);
  if (!Number.isInteger(driverTeeth) || !Number.isInteger(drivenTeeth)) throw new RangeError('Tooth counts must be integers.');
  return { reductionRatio: drivenTeeth / driverTeeth,
    outputRPM: -driverRPM * driverTeeth / drivenTeeth,
    outputTurnsPerDriverTurn: -driverTeeth / drivenTeeth,
    idealTorqueMultiplier: drivenTeeth / driverTeeth };
}

const f = (value, digits = 2) => Number(value).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
const sign = (value, digits = 3) => `${value < -1e-12 ? '−' : ''}${f(Math.abs(value) < 1e-12 ? 0 : Math.abs(value), digits)}`;
const safe = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let studioCount = 0;

const DEFAULTS = {
  reach: { length: 1.2, angleDegrees: 40 },
  work: { mass: 20, height: 1.5, seconds: 5, efficiency: .8 },
  accumulation: { acceleration: 2, seconds: 4, initialVelocity: 1 },
  gears: { driverTeeth: 20, drivenTeeth: 40, driverRPM: 120 }
};

const TOOLS = {
  reach: {
    tab: 'Arm reach', subject: 'Trigonometry', title: 'One link. Two coordinates.',
    subtitle: 'A length and an angle become a location you can measure.',
    fields: [
      { key: 'angleDegrees', name: 'Joint angle', min: 0, max: 150, step: 1, unit: '°', digits: 0 },
      { key: 'length', name: 'Link length', min: .25, max: 2, step: .05, unit: 'm', digits: 2 }
    ],
    question: 'At a fixed length, rotate from 30° to 60°. Which coordinate grows?',
    choices: ['Horizontal x', 'Vertical y', 'Both equally'], answer: 1,
    response: 'Vertical y grows because sin θ rises between 30° and 60°. Horizontal x shrinks because cos θ falls. The tip stays the same distance from the joint.',
    idea: 'Sine and cosine divide a length into perpendicular components. They do not create extra length: x² + y² = L². Here the angle is measured counterclockwise from the positive x axis.',
    useful: 'This is the first step toward robot kinematics: predicting where a tool will be. A real arm adds joints, offsets, deflection, measurement error, and physical limits.',
    boundary: 'Ideal planar link with a fixed pivot. No load, flex, collision, joint limits, or controller dynamics are modeled.'
  },
  work: {
    tab: 'Work & power', subject: 'Units + energy', title: 'Same lift. Different urgency.',
    subtitle: 'Work measures an energy transfer. Power measures how quickly it happens.',
    fields: [
      { key: 'mass', name: 'Lifted mass', min: 1, max: 100, step: 1, unit: 'kg', digits: 0 },
      { key: 'height', name: 'Vertical rise', min: .1, max: 5, step: .1, unit: 'm', digits: 1 },
      { key: 'seconds', name: 'Lift duration', min: .5, max: 20, step: .5, unit: 's', digits: 1 },
      { key: 'efficiency', name: 'Overall efficiency', min: .5, max: 1, step: .05, unit: '%', digits: 0, scale: 100 }
    ],
    question: 'Lift the same mass through the same height in half the time. What doubles?',
    choices: ['Useful work', 'Mean power', 'Both'], answer: 1,
    response: 'Mean power doubles. The increase in gravitational potential energy stays mgh. The shorter time changes E ÷ t, not the height or the mass.',
    idea: 'A force acting through a distance transfers energy. For an ideal vertical lift, the useful energy is mgh. Divide by elapsed time to get mean mechanical power. Divide by efficiency to estimate the required mean input power.',
    useful: 'This distinction connects a mechanism to its energy supply. A task can need little total energy yet demand substantial power when it must happen quickly.',
    boundary: 'Uniform Earth gravity, g = 9.81 m/s². Constant-speed idealization; start/stop dynamics and peak loads are omitted. Efficiency is a single illustrative factor. This does not size a real motor or lifting system.'
  },
  accumulation: {
    tab: 'Accumulation', subject: 'Calculus', title: 'Area becomes distance.',
    subtitle: 'A velocity graph is more than a picture. The area beneath it records motion.',
    fields: [
      { key: 'seconds', name: 'Elapsed time', min: 0, max: 10, step: .25, unit: 's', digits: 2 },
      { key: 'acceleration', name: 'Constant acceleration', min: 0, max: 5, step: .25, unit: 'm/s²', digits: 2 },
      { key: 'initialVelocity', name: 'Starting velocity', min: 0, max: 5, step: .25, unit: 'm/s', digits: 2 }
    ],
    question: 'Start from rest with constant acceleration. Double the elapsed time. Distance becomes…',
    choices: ['Twice as large', 'Four times as large', 'Unchanged'], answer: 1,
    response: 'Four times as large: ½a(2t)² = 4 × ½at². This result assumes you start from rest. A nonzero starting velocity adds a separate v₀t term.',
    idea: 'Velocity tells you the rate of changing position. Accumulating velocity over time gives displacement. With constant acceleration, the graph splits into a rectangle for starting velocity and a triangle for the speed gained.',
    useful: 'The same idea appears in energy (area under a power–time graph), charge (current–time), and production (output rate–time). Always check what units the area creates.',
    boundary: 'One-dimensional motion with constant acceleration. All slider velocities are nonnegative, so displacement equals distance traveled here. Signed velocity in a more general case requires that distinction.'
  },
  gears: {
    tab: 'Gear ratio', subject: 'Ratios + rotation', title: 'Trade speed for torque.',
    subtitle: 'Two tooth counts establish a repeatable relationship between rotations.',
    fields: [
      { key: 'driverTeeth', name: 'Driver teeth', min: 12, max: 48, step: 2, unit: 'teeth', digits: 0 },
      { key: 'drivenTeeth', name: 'Driven teeth', min: 12, max: 80, step: 2, unit: 'teeth', digits: 0 },
      { key: 'driverRPM', name: 'Driver speed', min: 0, max: 240, step: 10, unit: 'rpm', digits: 0 }
    ],
    question: 'Double the driven gear’s tooth count. Keep the driver unchanged. Output speed…',
    choices: ['Doubles', 'Halves', 'Stays the same'], answer: 1,
    response: 'It halves: output speed is proportional to driver teeth divided by driven teeth. In an ideal lossless pair, the torque multiplier doubles. Power is not multiplied.',
    idea: 'At the contact, compatible gear teeth pass at the same rate. A gear with twice as many teeth needs half as many turns to pass that number of teeth. Two external gears rotate in opposite directions.',
    useful: 'Ratios let a designer match a motor’s rotation to a task. Actual gear selection also depends on tooth geometry, strength, lubrication, backlash, losses, noise, and manufacturing accuracy.',
    boundary: 'Ideal compatible external gears, no slip or loss. Tooth profiles and engagement are schematic, not manufacturing geometry. The optional trace shows one driver revolution over an illustrative duration; it is not real-time rpm playback.'
  }
};

function startSVG(id, title, description, height = 400) {
  return `<svg class="ms-svg" viewBox="0 0 600 ${height}" role="img" aria-labelledby="${id}-title ${id}-desc"><title id="${id}-title">${safe(title)}</title><desc id="${id}-desc">${safe(description)}</desc>`;
}
function stat(label, value, unit) {
  return `<div class="ms-stat"><span>${label}</span><strong>${value}<small>${unit}</small></strong></div>`;
}
function equation(expression, result, annotation = '') {
  return `<div class="ms-equation"><span>${expression}</span><strong>${result}</strong>${annotation ? `<small>${annotation}</small>` : ''}</div>`;
}

function reachView(state, id) {
  const result = armReach(state), px = 280, py = 330, scale = 135;
  const x = px + result.x * scale, y = py - result.y * scale;
  const angle = result.radians, arcR = 48;
  const ax = px + arcR * Math.cos(angle), ay = py - arcR * Math.sin(angle);
  let svg = startSVG(id, 'A planar arm and its horizontal and vertical reach', `A ${f(state.length)} meter link at ${state.angleDegrees} degrees reaches x ${sign(result.x)} meters and y ${sign(result.y)} meters. The dashed projections show its coordinates.`);
  for (let gx = 10; gx < 600; gx += 45) svg += `<line class="ms-grid" x1="${gx}" y1="30" x2="${gx}" y2="370"/>`;
  for (let gy = 60; gy < 375; gy += 45) svg += `<line class="ms-grid" x1="15" y1="${gy}" x2="585" y2="${gy}"/>`;
  svg += `<line class="ms-axis-line" x1="24" y1="${py}" x2="568" y2="${py}"/><path class="ms-axis-arrow" d="M568 330 l-9 -5 v10 Z"/><line class="ms-axis-line" x1="${px}" y1="374" x2="${px}" y2="28"/><path class="ms-axis-arrow" d="M280 28 l-5 9 h10 Z"/><text class="ms-svg-label" x="570" y="359">x</text><text class="ms-svg-label" x="294" y="35">y</text><text class="ms-svg-tick" x="260" y="359">0</text>`;
  svg += `<path class="ms-projection" d="M${px} ${y} H${x} V${py}"/><circle class="ms-tip-projection" cx="${x}" cy="${py}" r="4"/><circle class="ms-tip-projection" cx="${px}" cy="${y}" r="4"/><path class="ms-angle-arc" d="M${px + arcR} ${py} A${arcR} ${arcR} 0 0 0 ${ax} ${ay}"/>`;
  svg += `<line class="ms-link-shadow" x1="${px}" y1="${py}" x2="${x}" y2="${y}"/><line class="ms-arm-link" x1="${px}" y1="${py}" x2="${x}" y2="${y}"/><circle class="ms-pivot" cx="${px}" cy="${py}" r="16"/><circle class="ms-pivot-core" cx="${px}" cy="${py}" r="5"/><circle class="ms-endpoint" cx="${x}" cy="${y}" r="10"/><text class="ms-svg-label ms-orange" x="${px + 76 * Math.cos(angle / 2)}" y="${state.angleDegrees < 30 ? 375 : py - 76 * Math.sin(angle / 2) - 8}" text-anchor="middle">${state.angleDegrees}°</text><text class="ms-svg-label" x="30" y="33">L = ${f(state.length)} m</text></svg>`;
  return {
    svg, stats: stat('Horizontal reach · x', sign(result.x), 'm') + stat('Vertical reach · y', sign(result.y), 'm'),
    caption: 'The dashed lines project the tip onto the axes. Turn past 90° and x becomes negative; the tip has crossed to the other side of the pivot.',
    equations: equation(`x = L cos θ = ${f(state.length)} × cos(${state.angleDegrees}°)`, `${sign(result.x)} m`) + equation(`y = L sin θ = ${f(state.length)} × sin(${state.angleDegrees}°)`, `${sign(result.y)} m`),
    unitNote: 'Cosine and sine are dimensionless. Multiplying either by a length in meters gives a coordinate in meters. Use degrees for the angle shown; the computation converts degrees to radians.'
  };
}

function workView(state, id) {
  const result = liftingWork(state);
  const centerY = 304 - state.height / 5 * 210;
  let svg = startSVG(id, 'A mass raised above a reference level', `Raising ${state.mass} kilograms through ${f(state.height, 1)} meters transfers ${f(result.usefulEnergy, 1)} joules of useful energy. Over ${f(state.seconds, 1)} seconds at ${f(state.efficiency * 100, 0)} percent efficiency, mean input power is ${f(result.inputPower, 1)} watts.`);
  svg += `<line class="ms-floor" x1="215" y1="334" x2="520" y2="334"/><text class="ms-svg-tick" x="320" y="377" text-anchor="middle">Starting position</text><rect class="ms-ghost-load" x="233" y="274" width="134" height="60" rx="7"/><line class="ms-guide" x1="300" y1="45" x2="300" y2="333"/>`;
  for (let i = 0; i <= 5; i++) {
    const y = 304 - i / 5 * 210;
    svg += `<line class="ms-ruler-tick" x1="446" y1="${y}" x2="${i % 1 ? 454 : 462}" y2="${y}"/><text class="ms-svg-tick" x="472" y="${y + 5}">${i}</text>`;
  }
  svg += `<text class="ms-svg-label" x="439" y="61">Rise / m</text><line class="ms-rise-line" x1="423" y1="304" x2="423" y2="${centerY}"/><circle class="ms-rise-dot" cx="423" cy="${centerY}" r="5"/><line class="ms-projection" x1="367" y1="${centerY}" x2="423" y2="${centerY}"/><rect class="ms-load" x="233" y="${centerY - 30}" width="134" height="60" rx="7"/><path class="ms-load-top" d="M233 ${centerY - 30} l16 -13 h134 l-16 13 Z"/><path class="ms-load-side" d="M367 ${centerY - 30} l16 -13 v60 l-16 13 Z"/><text class="ms-load-label" x="300" y="${centerY + 7}" text-anchor="middle">${state.mass} kg</text><line class="ms-force-up" x1="183" y1="${centerY - 5}" x2="183" y2="${centerY - 58}"/><path class="ms-force-tip" d="M183 ${centerY - 65} l-6 11 h12 Z"/><text class="ms-svg-label" x="158" y="${centerY - 31}" text-anchor="end">Lift</text><line class="ms-force-down" x1="183" y1="${centerY + 5}" x2="183" y2="${centerY + 58}"/><path class="ms-weight-tip" d="M183 ${centerY + 65} l-6 -11 h12 Z"/><text class="ms-svg-label ms-orange" x="158" y="${centerY + 31}" text-anchor="end">mg</text></svg>`;
  return {
    svg, stats: stat('Useful work', f(result.usefulEnergy >= 1000 ? result.usefulEnergy / 1000 : result.usefulEnergy, result.usefulEnergy >= 1000 ? 2 : 1), result.usefulEnergy >= 1000 ? 'kJ' : 'J') + stat('Mean input power', f(result.inputPower >= 1000 ? result.inputPower / 1000 : result.inputPower, result.inputPower >= 1000 ? 2 : 1), result.inputPower >= 1000 ? 'kW' : 'W'),
    caption: `Rise is measured from the ghosted starting position. At constant speed the ideal lift balances the ${f(result.force, 1)} N weight; start and stop transients are omitted.`,
    equations: equation(`E = mgh = ${state.mass} × 9.81 × ${f(state.height, 1)}`, `${f(result.usefulEnergy, 1)} J`, 'Useful gain in gravitational potential energy') + equation(`P useful = E / t = ${f(result.usefulEnergy, 1)} / ${f(state.seconds, 1)}`, `${f(result.usefulPower, 1)} W`, 'Mean mechanical power') + equation(`P input = P useful / η = ${f(result.usefulPower, 1)} / ${f(state.efficiency)}`, `${f(result.inputPower, 1)} W`, `${f(result.lossEnergy, 1)} J of the modeled input energy does not become useful lifting work.`),
    unitNote: 'kg × m/s² gives newtons of force. Newtons × meters gives joules of energy. Joules ÷ seconds gives watts of power. Efficiency has no units.'
  };
}

function accumulationView(state, id) {
  const result = accumulatedMotion(state);
  const maximum = Math.max(10, Math.ceil((state.initialVelocity + state.acceleration * 10) / 10) * 10);
  const x0 = 76, y0 = 324, width = 478, height = 250;
  const x = x0 + state.seconds / 10 * width;
  const yStart = y0 - state.initialVelocity / maximum * height;
  const yEnd = y0 - result.velocity / maximum * height;
  const yFuture = y0 - (state.initialVelocity + state.acceleration * 10) / maximum * height;
  let svg = startSVG(id, 'Velocity versus time, with accumulated displacement shaded', `At ${f(state.seconds)} seconds the velocity is ${f(result.velocity)} meters per second. The orange rectangle contributes ${f(result.initialContribution)} meters, and the green triangle contributes ${f(result.accelerationContribution)} meters, totaling ${f(result.displacement)} meters of displacement.`);
  for (let i = 0; i <= 4; i++) {
    const gy = y0 - i / 4 * height;
    svg += `<line class="ms-grid" x1="${x0}" y1="${gy}" x2="${x0 + width}" y2="${gy}"/><text class="ms-svg-tick" x="61" y="${gy + 5}" text-anchor="end">${f(maximum * i / 4, 1)}</text>`;
  }
  for (let i = 0; i <= 5; i++) svg += `<text class="ms-svg-tick" x="${x0 + i / 5 * width}" y="352" text-anchor="middle">${i * 2}</text>`;
  svg += `<text class="ms-svg-label" x="76" y="39">Velocity / m·s⁻¹</text><text class="ms-svg-label" x="315" y="387" text-anchor="middle">Time / s</text><path class="ms-future-line" d="M${x0} ${yStart} L${x0 + width} ${yFuture}"/><rect class="ms-rectangle-area" x="${x0}" y="${yStart}" width="${x - x0}" height="${y0 - yStart}"/><path class="ms-triangle-area" d="M${x0} ${yStart} L${x} ${yEnd} L${x} ${yStart} Z"/><path class="ms-velocity-line" d="M${x0} ${yStart} L${x} ${yEnd}"/><line class="ms-time-marker" x1="${x}" y1="${yEnd}" x2="${x}" y2="${y0}"/><circle class="ms-motion-dot" cx="${x}" cy="${yEnd}" r="7"/></svg>`;
  return {
    svg, stats: stat('Velocity now', f(result.velocity), 'm/s') + stat('Distance traveled', f(result.displacement), 'm'),
    caption: `<span class="ms-area-key"><i class="ms-key-orange"></i>Rectangle: starting velocity</span><span class="ms-area-key"><i class="ms-key-lime"></i>Triangle: gained velocity</span>`,
    equations: equation(`v = v₀ + at = ${f(state.initialVelocity)} + ${f(state.acceleration)} × ${f(state.seconds)}`, `${f(result.velocity)} m/s`) + equation(`s = v₀t + ½at²`, `${f(result.displacement)} m`, `${f(state.initialVelocity)} × ${f(state.seconds)} + ½ × ${f(state.acceleration)} × ${f(state.seconds)}² = ${f(result.initialContribution)} + ${f(result.accelerationContribution)}`),
    unitNote: 'An area on this graph has units (meters / second) × seconds = meters. The triangle supplies the factor ½; it occupies half the matching rectangle.'
  };
}

function gearPoints(teeth, radius) {
  const depth = Math.min(5, radius * .14);
  const values = [];
  for (let tooth = 0; tooth < teeth; tooth++) {
    for (const [fraction, r] of [[0, radius - depth], [.20, radius + depth], [.55, radius + depth], [.80, radius - depth]]) {
      const angle = (tooth + fraction) / teeth * 2 * Math.PI;
      values.push(`${(Math.cos(angle) * r).toFixed(3)},${(Math.sin(angle) * r).toFixed(3)}`);
    }
  }
  return values.join(' ');
}

function gearGroup(kind, cx, cy, teeth, radius) {
  let body = `<g class="ms-${kind}-gear" data-cx="${cx}" data-cy="${cy}" transform="translate(${cx} ${cy})"><polygon class="ms-gear-${kind}" points="${gearPoints(teeth, radius)}"/>`;
  for (let spoke = 0; spoke < 3; spoke++) {
    const angle = spoke / 3 * 2 * Math.PI;
    body += `<line class="ms-gear-spoke" x1="0" y1="0" x2="${Math.cos(angle) * radius * .66}" y2="${Math.sin(angle) * radius * .66}"/>`;
  }
  return body + `<circle class="ms-gear-hub" r="${Math.min(13, radius * .28)}"/><circle class="ms-gear-reference" cx="${radius * .7}" cy="0" r="5"/></g>`;
}

function gearsView(state, id) {
  const result = gearRatio(state), combined = state.driverTeeth + state.drivenTeeth;
  const r1 = 160 * state.driverTeeth / combined, r2 = 160 * state.drivenTeeth / combined;
  const x1 = 140 + r1, x2 = x1 + 160, y = 180;
  let svg = startSVG(id, 'Schematic pair of external gears', `A ${state.driverTeeth}-tooth driver at ${state.driverRPM} revolutions per minute drives a ${state.drivenTeeth}-tooth gear at ${f(Math.abs(result.outputRPM), 1)} revolutions per minute in the opposite direction. Tooth profiles are illustrative, not exact meshing geometry.`);
  svg += `<line class="ms-gear-centerline" x1="90" y1="${y}" x2="535" y2="${y}"/>${gearGroup('driver', x1, y, state.driverTeeth, r1)}${gearGroup('driven', x2, y, state.drivenTeeth, r2)}<text class="ms-svg-label ms-lime" x="${x1}" y="356" text-anchor="middle">Driver</text><text class="ms-svg-tick" x="${x1}" y="381" text-anchor="middle">${state.driverTeeth} teeth</text><text class="ms-svg-label ms-orange" x="${x2}" y="356" text-anchor="middle">Driven</text><text class="ms-svg-tick" x="${x2}" y="381" text-anchor="middle">${state.drivenTeeth} teeth</text></svg>`;
  return {
    svg, stats: stat('Output speed', f(Math.abs(result.outputRPM), 1), 'rpm') + stat('Driven / driver teeth', `${f(result.reductionRatio)}:1`, ''),
    caption: `<button class="ms-trace" type="button"${state.driverRPM === 0 ? ' disabled' : ''}>Trace one driver turn <span aria-hidden="true">↻</span></button><span class="ms-trace-status" aria-live="polite">${state.driverRPM === 0 ? 'Raise the driver speed to enable the trace.' : 'Opposite rotation. Playback duration is illustrative.'}</span>`,
    equations: equation(`n out = −n in × N driver / N driven`, `${sign(result.outputRPM, 1)} rpm`, `−${state.driverRPM} × ${state.driverTeeth} / ${state.drivenTeeth}; the negative sign indicates opposite rotation.`) + equation(`One driver turn × ${state.driverTeeth} / ${state.drivenTeeth}`, `${f(Math.abs(result.outputTurnsPerDriverTurn), 3)} output turns`, 'In the opposite direction') + equation(`Ideal torque multiplier = ${state.drivenTeeth} / ${state.driverTeeth}`, `${f(result.idealTorqueMultiplier)}×`, 'Lossless steady transmission. Faster output trades away torque; slower output trades for it.'),
    unitNote: 'A ratio of tooth counts is dimensionless. Multiplying rpm by that ratio gives rpm. In an ideal lossless pair, torque × angular speed is conserved; a gear pair cannot multiply power.'
  };
}

const VIEWS = { reach: reachView, work: workView, accumulation: accumulationView, gears: gearsView };

/** Mount an independent Math Studio. Return { setTab(name), destroy() }. */
export function renderMathStudio(container) {
  if (!container || typeof container.replaceChildren !== 'function') throw new TypeError('renderMathStudio needs a DOM element.');
  const id = `math-studio-${++studioCount}`;
  const root = document.createElement('section');
  root.className = 'ms-studio';
  root.setAttribute('aria-label', 'Math becomes machinery interactive studio');
  root.innerHTML = `<header class="ms-intro"><div><p class="ms-kicker"><span aria-hidden="true">↗</span> Math becomes machinery</p><h2>See what the <em>symbols move.</em></h2><p>Start with a mechanism. Change a number. Connect what you see to the math underneath.</p></div><div class="ms-intro-note"><span>4 experiments</span><span>No prerequisites to explore</span><span>All values are illustrative</span></div></header><div class="ms-tabs" role="tablist" aria-label="Math experiments">${Object.entries(TOOLS).map(([key, tool], index) => `<button type="button" class="ms-tab" role="tab" id="${id}-tab-${key}" aria-controls="${id}-panel" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}" data-tab="${key}"><span>0${index + 1}</span><strong>${tool.tab}</strong><small>${tool.subject}</small></button>`).join('')}</div><div class="ms-panel" id="${id}-panel" role="tabpanel" aria-labelledby="${id}-tab-reach"></div><footer class="ms-footer">A model is a question with its assumptions made visible. These experiments explain relationships; they do not certify hardware.</footer>`;
  container.replaceChildren(root);
  const panel = root.querySelector('.ms-panel');
  const states = Object.fromEntries(Object.entries(DEFAULTS).map(([key, state]) => [key, { ...state }]));
  let active = 'reach';
  let frame = null;
  let destroyed = false;

  function stopAnimation() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
  }

  function update() {
    if (destroyed) return;
    stopAnimation();
    const state = states[active], tool = TOOLS[active];
    tool.fields.forEach(field => {
      const value = `${f(state[field.key] * (field.scale || 1), field.digits)} ${field.unit}`;
      const input = panel.querySelector(`[data-field="${field.key}"]`);
      input.setAttribute('aria-valuetext', value);
      input.style.setProperty('--ms-progress', `${(state[field.key] - field.min) / (field.max - field.min) * 100}%`);
      panel.querySelector(`[data-value="${field.key}"]`).textContent = value;
    });
    const view = VIEWS[active](state, `${id}-${active}`);
    panel.querySelector('.ms-visual').innerHTML = `<div class="ms-canvas-label"><span>Live model</span><span>${active === 'gears' ? 'Schematic tooth geometry' : 'Illustrative assumptions'}</span></div>${view.svg}<div class="ms-stats" aria-live="polite" aria-atomic="true">${view.stats}</div><div class="ms-visual-caption">${view.caption}</div>`;
    panel.querySelector('.ms-equations').innerHTML = view.equations;
    panel.querySelector('.ms-unit-note').textContent = view.unitNote;
  }

  function mount() {
    const tool = TOOLS[active];
    panel.setAttribute('aria-labelledby', `${id}-tab-${active}`);
    panel.innerHTML = `<div class="ms-experiment-header"><div><p>${tool.subject}</p><h3>${tool.title}</h3><span>${tool.subtitle}</span></div><button class="ms-reset" type="button">Reset experiment <span aria-hidden="true">↺</span></button></div><div class="ms-workspace"><div class="ms-visual"></div><div class="ms-sidebar"><form class="ms-controls" aria-label="${tool.tab} inputs"><h4>Move the inputs</h4>${tool.fields.map(field => {
      const fieldId = `${id}-${active}-${field.key}`;
      return `<div class="ms-control"><div><label for="${fieldId}">${field.name}</label><output for="${fieldId}" data-value="${field.key}"></output></div><input type="range" id="${fieldId}" data-field="${field.key}" min="${field.min}" max="${field.max}" step="${field.step}" value="${states[active][field.key]}"><div class="ms-bounds" aria-hidden="true"><span>${f(field.min * (field.scale || 1), field.digits)}</span><span>${f(field.max * (field.scale || 1), field.digits)}</span></div></div>`;
    }).join('')}<p class="ms-control-help">Drag, or focus a slider and use the arrow keys.</p></form><aside class="ms-predict"><p class="ms-predict-eyebrow">Predict before you slide</p><h4>${tool.question}</h4><div class="ms-answers" role="group" aria-label="Prediction choices">${tool.choices.map((choice, index) => `<button type="button" data-answer="${index}" aria-pressed="false">${choice}</button>`).join('')}</div><p class="ms-feedback" aria-live="polite"></p></aside></div></div><div class="ms-learning"><article class="ms-principle"><p class="ms-section-label">01 / The idea</p><h4>${active === 'reach' ? 'A diagonal has two components.' : active === 'work' ? 'Energy and power answer different questions.' : active === 'accumulation' ? 'Add up a changing rate.' : 'Count teeth, then count turns.'}</h4><p>${tool.idea}</p><p class="ms-useful">${tool.useful}</p><a class="ms-chapter-link" href="#/read/22">Continue with the mathematics chapter <span aria-hidden="true">↗</span></a></article><article class="ms-worked"><p class="ms-section-label">02 / Your numbers, worked through</p><div class="ms-equations"></div><p class="ms-unit-note"></p></article></div><details class="ms-boundary"><summary>What this model assumes</summary><p>${tool.boundary}</p></details>`;
    update();
  }

  function setTab(name, focus = false) {
    if (destroyed) return;
    if (!TOOLS[name]) throw new RangeError(`Unknown studio experiment: ${name}`);
    stopAnimation();
    active = name;
    root.querySelectorAll('[role="tab"]').forEach(tab => {
      const selected = tab.dataset.tab === name;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    mount();
  }

  function traceGearTurn() {
    if (active !== 'gears' || states.gears.driverRPM === 0 || frame !== null) return;
    const driver = panel.querySelector('.ms-driver-gear');
    const driven = panel.querySelector('.ms-driven-gear');
    const button = panel.querySelector('.ms-trace');
    const status = panel.querySelector('.ms-trace-status');
    const ratio = gearRatio(states.gears).outputTurnsPerDriverTurn;
    const transform = (element, degrees) => element.setAttribute('transform', `translate(${element.dataset.cx} ${element.dataset.cy}) rotate(${degrees})`);
    function finish() {
      frame = null;
      button.disabled = false;
      status.textContent = `One driver turn → ${f(Math.abs(ratio), 3)} output turns, opposite direction.`;
    }
    button.disabled = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      transform(driver, 360);
      transform(driven, 360 * ratio);
      finish();
      return;
    }
    status.textContent = 'Tracing one turn. Duration is illustrative, not real-time rpm.';
    let start = null;
    function step(timestamp) {
      if (destroyed || active !== 'gears') return;
      if (start === null) start = timestamp;
      const progress = Math.min(1, (timestamp - start) / 2800);
      transform(driver, progress * 360);
      transform(driven, progress * 360 * ratio);
      if (progress < 1) frame = requestAnimationFrame(step);
      else finish();
    }
    frame = requestAnimationFrame(step);
  }

  function click(event) {
    const tab = event.target.closest('[data-tab]');
    if (tab) { setTab(tab.dataset.tab); return; }
    if (event.target.closest('.ms-reset')) {
      states[active] = { ...DEFAULTS[active] };
      TOOLS[active].fields.forEach(field => { panel.querySelector(`[data-field="${field.key}"]`).value = states[active][field.key]; });
      panel.querySelectorAll('[data-answer]').forEach(button => { button.setAttribute('aria-pressed', 'false'); button.classList.remove('ms-answer-selected', 'ms-answer-correct'); });
      panel.querySelector('.ms-feedback').textContent = '';
      update();
      return;
    }
    const answer = event.target.closest('[data-answer]');
    if (answer) {
      const tool = TOOLS[active], chosen = Number(answer.dataset.answer);
      panel.querySelectorAll('[data-answer]').forEach(button => {
        const selected = button === answer;
        button.setAttribute('aria-pressed', String(selected));
        button.classList.toggle('ms-answer-selected', selected);
        button.classList.toggle('ms-answer-correct', Number(button.dataset.answer) === tool.answer);
      });
      panel.querySelector('.ms-feedback').textContent = `${chosen === tool.answer ? 'Yes. ' : 'Try the relationship: '}${tool.response}`;
      return;
    }
    if (event.target.closest('.ms-trace')) traceGearTurn();
  }

  function input(event) {
    const field = event.target.dataset.field;
    if (!field) return;
    states[active][field] = Number(event.target.value);
    update();
  }

  function keydown(event) {
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

  root.addEventListener('click', click);
  root.addEventListener('input', input);
  root.addEventListener('keydown', keydown);
  mount();
  return { setTab: name => setTab(name), destroy() {
    destroyed = true;
    stopAnimation();
    root.removeEventListener('click', click);
    root.removeEventListener('input', input);
    root.removeEventListener('keydown', keydown);
    root.remove();
  } };
}
