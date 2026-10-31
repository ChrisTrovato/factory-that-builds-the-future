const RAD = Math.PI / 180;
const ARM_DEFAULTS = Object.freeze({ theta1: 35, theta2: 60 });
const CONTROL_DEFAULTS = Object.freeze({ gain: 2, tau: 3 });
const number = (value, digits = 3) => (Math.abs(value) < 0.5 * 10 ** -digits ? 0 : value).toFixed(digits);
const clamp = (value, low, high, fallback) => Number.isFinite(Number(value)) ? Math.min(high, Math.max(low, Number(value))) : fallback;

export function forwardKinematics(theta1, theta2) {
  const a = theta1 * RAD, b = theta2 * RAD;
  const elbow = { x: Math.cos(a), y: Math.sin(a) };
  const tip = { x: elbow.x + 0.7 * Math.cos(a + b), y: elbow.y + 0.7 * Math.sin(a + b) };
  return { elbow, tip, radius: Math.hypot(tip.x, tip.y), minimumRadius: 0.3, maximumRadius: 1.7 };
}

export function firstOrderResponse(time, gain, tau) {
  if (!Number.isFinite(time) || !Number.isFinite(gain) || !Number.isFinite(tau) || time < 0 || gain < 0 || tau <= 0) throw new RangeError('Use time ≥ 0, gain ≥ 0 and a positive time constant.');
  const finalValue = gain / (1 + gain);
  return {
    closedLoop: finalValue * -Math.expm1(-(1 + gain) * time / tau),
    openLoop: -Math.expm1(-time / tau),
    finalValue,
    steadyStateError: 1 / (1 + gain),
    closedLoopTimeConstant: tau / (1 + gain)
  };
}

function armSVG(theta1, theta2) {
  const { elbow, tip } = forwardKinematics(theta1, theta2);
  const scale = 100, px = x => 340 + x * scale, py = y => 230 - y * scale;
  const grid = [-1.5, -1, -0.5, 0.5, 1, 1.5].map(v => `<path d="M${px(v)} 45V415 M155 ${py(v)}H525" stroke="#27454f" stroke-width="1"/>`).join('');
  return `<svg viewBox="0 0 680 460" role="img" aria-labelledby="arm-svg-title arm-svg-description" preserveAspectRatio="xMidYMid meet">
    <title id="arm-svg-title">Two-link planar arm</title><desc id="arm-svg-description">Base at the origin. First link length 1 metre; second link length 0.7 metres. Endpoint x ${number(tip.x)} metres, y ${number(tip.y)} metres. Shaded ring shows possible endpoint distances from 0.3 to 1.7 metres.</desc>
    <circle cx="340" cy="230" r="170" fill="#163c48" stroke="#668c93" stroke-dasharray="5 6"/>
    <circle cx="340" cy="230" r="30" fill="#0a222d" stroke="#668c93" stroke-dasharray="3 4"/>
    ${grid}<path d="M140 230H545 M340 425V30" fill="none" stroke="#a3bfc2" stroke-width="1.5"/>
    <g fill="#d3e2e3" font-family="system-ui,sans-serif" font-size="15"><text x="552" y="235">x (m)</text><text x="350" y="30">y (m)</text><text x="346" y="247">0</text><text x="435" y="250">1</text><text x="229" y="250">−1</text><text x="350" y="135">1</text><text x="350" y="335">−1</text></g>
    <path d="M${px(tip.x)} ${py(tip.y)}V230 M${px(tip.x)} ${py(tip.y)}H340" fill="none" stroke="#a6bbc0" stroke-dasharray="3 5"/>
    <line x1="340" y1="230" x2="${px(elbow.x)}" y2="${py(elbow.y)}" stroke="#e7c182" stroke-width="10" stroke-linecap="round"/>
    <line x1="${px(elbow.x)}" y1="${py(elbow.y)}" x2="${px(tip.x)}" y2="${py(tip.y)}" stroke="#7ed5d2" stroke-width="8" stroke-linecap="round"/>
    <circle cx="340" cy="230" r="8" fill="#f4ead7" stroke="#0a222d" stroke-width="3"/>
    <circle cx="${px(elbow.x)}" cy="${py(elbow.y)}" r="7" fill="#f4ead7" stroke="#0a222d" stroke-width="3"/>
    <circle cx="${px(tip.x)}" cy="${py(tip.y)}" r="7" fill="#7ed5d2" stroke="#0a222d" stroke-width="3"/>
    <g font-family="system-ui,sans-serif" font-size="15"><text x="24" y="27" fill="#e7c182">Link 1 · 1.0 m</text><text x="24" y="51" fill="#7ed5d2">Link 2 · 0.7 m</text><text x="24" y="437" fill="#b9ced0">Each joint turns freely. No obstacles or joint limits.</text></g>
  </svg>`;
}

function controlSVG(gain, tau) {
  const left = 72, right = 648, top = 32, bottom = 350, horizon = 24;
  const px = t => left + t / horizon * (right - left), py = y => bottom - y / 1.1 * (bottom - top);
  const path = key => Array.from({ length: 241 }, (_, i) => {
    const time = horizon * i / 240;
    return `${i === 0 ? 'M' : 'L'}${number(px(time), 2)} ${number(py(firstOrderResponse(time, gain, tau)[key]), 2)}`;
  }).join(' ');
  const ticks = [0, 0.25, 0.5, 0.75, 1].map(y => `<path d="M${left} ${py(y)}H${right}" stroke="#2f4d57"/><text x="61" y="${py(y) + 5}" text-anchor="end">${number(y, 2)}</text>`).join('');
  const times = [0, 6, 12, 18, 24].map(t => `<path d="M${px(t)} ${bottom}v6" stroke="#a3bfc2"/><text x="${px(t)}" y="375" text-anchor="middle">${t}</text>`).join('');
  return `<svg viewBox="0 0 700 430" role="img" aria-labelledby="control-svg-title control-svg-description" preserveAspectRatio="xMidYMid meet">
    <title id="control-svg-title">Unit-step responses over 24 seconds</title><desc id="control-svg-description">Solid gold line: proportional-feedback response, approaching ${number(gain / (1 + gain))}. Dashed teal line: the unit-gain plant driven directly by a unit step, approaching 1. Dotted gray line: reference 1. Both curves start at zero and rise without overshoot; at zero controller gain the feedback response stays at zero.</desc>
    <g fill="#d3e2e3" font-family="system-ui,sans-serif" font-size="15">${ticks}${times}<text x="360" y="411" text-anchor="middle">Time, t (s)</text><text x="73" y="20">Output, y (normalized)</text></g>
    <path d="M${left} ${top}V${bottom}H${right}" fill="none" stroke="#a3bfc2" stroke-width="1.5"/>
    <path d="M${left} ${py(1)}H${right}" stroke="#e1e7e5" stroke-width="1.5" stroke-dasharray="2 5"/>
    <path d="${path('openLoop')}" fill="none" stroke="#7ed5d2" stroke-width="3" stroke-dasharray="8 5"/>
    <path d="${path('closedLoop')}" fill="none" stroke="#e7c182" stroke-width="4"/>
  </svg>`;
}

export function renderArmLab() {
  return `<section class="lab" data-lab="arm" aria-labelledby="arm-heading">
    <span class="eyebrow">A small model. A useful habit.</span><h2 id="arm-heading">Give every angle a meaning.</h2>
    <p>Move the joints and predict the endpoint. θ₁ is measured from the positive x-axis. θ₂ is the second link’s angle relative to the first link. Positive angles turn counterclockwise.</p>
    <div data-lab-visual>${armSVG(ARM_DEFAULTS.theta1, ARM_DEFAULTS.theta2)}</div>
    <div class="form-grid" style="margin-top:24px">
      <div><label for="arm-theta1">Base angle θ₁ · <output data-angle1 for="arm-theta1">35°</output></label><input id="arm-theta1" data-theta1 type="range" min="-180" max="180" step="1" value="35" aria-describedby="arm-input-help"></div>
      <div><label for="arm-theta2">Relative elbow angle θ₂ · <output data-angle2 for="arm-theta2">60°</output></label><input id="arm-theta2" data-theta2 type="range" min="-180" max="180" step="1" value="60" aria-describedby="arm-input-help"></div>
      <div><button class="button light" type="button" data-reset-lab>Reset angles</button></div>
    </div><p id="arm-input-help">Use the arrow keys on either slider to adjust one degree at a time. Home and End move to the limits. Link lengths remain 1.0 m and 0.7 m.</p>
    <div class="readout" data-lab-readout role="status" aria-live="polite" aria-atomic="true"></div>
    <details><summary>Read the model</summary>
      <p><b>Forward kinematics</b></p><p class="mono">x = L₁ cos(θ₁) + L₂ cos(θ₁ + θ₂)<br>y = L₁ sin(θ₁) + L₂ sin(θ₁ + θ₂)</p>
      <p>L₁ = 1.0 m and L₂ = 0.7 m. Slider angles are in degrees; the calculation converts them to radians. The first link’s endpoint is (L₁ cos θ₁, L₁ sin θ₁).</p>
      <p><b>Reachable distance:</b> |L₁ − L₂| ≤ √(x² + y²) ≤ L₁ + L₂, so the endpoint lies between 0.3 m and 1.7 m from the base. The inner disk cannot be reached with these link lengths.</p>
      <p><b>Assumptions:</b> two rigid, zero-thickness links moving in one plane, freely rotating ideal joints, no obstacles, no elasticity and no collision checks. This is geometry, not a model of force, torque or motor capability.</p>
    </details>
    <div style="border-top:1px solid #46616b;margin-top:22px;padding-top:22px"><h3>Try before you move.</h3><p>Set θ₂ to 0°. Predict the distance from the base while changing θ₁. Then set θ₂ to 180°. What changes, and why? Explain your answer with the triangle formed by the two links.</p></div>
  </section>`;
}

export function renderControlLab() {
  return `<section class="lab" data-lab="control" aria-labelledby="control-heading">
    <span class="eyebrow">Feedback without the black box</span><h2 id="control-heading">Faster is only one part of better.</h2>
    <p>Compare an ideal first-order plant driven directly by a unit step with the same plant under proportional feedback. Increase K and watch the final tracking error as well as the response speed.</p>
    <div data-lab-visual>${controlSVG(CONTROL_DEFAULTS.gain, CONTROL_DEFAULTS.tau)}</div>
    <p style="margin-top:14px"><span style="color:#e7c182">━━ Solid gold: proportional feedback</span><br><span style="color:#7ed5d2">┄┄ Dashed teal: direct open-loop unit step</span><br><span style="color:#e1e7e5">···· Dotted gray: reference r = 1</span></p>
    <div class="form-grid" style="margin-top:24px">
      <div><label for="control-gain">Controller gain K · <output data-gain-output for="control-gain">2.0</output></label><input id="control-gain" data-gain type="range" min="0" max="12" step="0.1" value="2" aria-describedby="control-input-help"></div>
      <div><label for="control-tau">Plant time constant τ · <output data-tau-output for="control-tau">3.0 s</output></label><input id="control-tau" data-tau type="range" min="0.5" max="6" step="0.1" value="3" aria-describedby="control-input-help"></div>
      <div><button class="button light" type="button" data-reset-lab>Reset model</button></div>
    </div><p id="control-input-help">Use arrow keys to change a slider by 0.1. K is dimensionless. τ is measured in seconds. Both responses start at y = 0; the plot always spans 24 seconds.</p>
    <div class="readout" data-lab-readout role="status" aria-live="polite" aria-atomic="true"></div>
    <details><summary>Read the model and the comparison</summary>
      <p><b>Plant:</b> τ dy/dt + y = u, with unit steady-state plant gain. <b>Controller:</b> u = K(r − y), where the reference steps from 0 to r = 1 at t = 0.</p>
      <p class="mono">y(t) = [K / (1 + K)] · [1 − exp(−(1 + K)t / τ)]</p>
      <p>The closed-loop final value is K/(1 + K), steady-state tracking error is 1/(1 + K), and the effective time constant is τ/(1 + K). Each time constant brings the output about 63% of the way toward its own final value.</p>
      <p><b>The separate open-loop curve</b> uses u = 1 with no feedback: y(t) = 1 − exp(−t/τ). In this perfectly known unit-gain model it reaches 1. It is not the K = 0 feedback case: at K = 0, u = 0 and the feedback output stays at zero.</p>
      <p><b>What this demonstrates:</b> proportional feedback changes response speed and leaves a finite tracking error in this configuration. A larger K also demands a larger initial input u(0) = K, which this simple model does not limit.</p>
      <p><b>Limits:</b> no sensor noise, delay, actuator saturation, disturbance or uncertain plant gain; one linear first-order state; nonnegative K. The responses are monotonic with no overshoot. Real systems may behave very differently, so this plot does not establish a safe controller or prove feedback always beats open-loop operation.</p>
    </details>
    <div style="border-top:1px solid #46616b;margin-top:22px;padding-top:22px"><h3>Predict the tradeoff.</h3><p>At K = 1, predict the final output before moving the slider. Then double τ while holding K fixed. Which quantity changes: the final error, the time to approach it, or both?</p></div>
  </section>`;
}

export function wireLabs(root = document) {
  const labs = [...root.querySelectorAll('[data-lab]')];
  if (root.matches?.('[data-lab]')) labs.unshift(root);
  for (const lab of labs) {
    if (lab.dataset.labWired === 'true') continue;
    lab.dataset.labWired = 'true';
    const visual = lab.querySelector('[data-lab-visual]'), readout = lab.querySelector('[data-lab-readout]');
    if (!visual || !readout) continue;
    if (lab.dataset.lab === 'arm') {
      const a = lab.querySelector('[data-theta1]'), b = lab.querySelector('[data-theta2]');
      const update = () => {
        const theta1 = clamp(a.value, -180, 180, ARM_DEFAULTS.theta1), theta2 = clamp(b.value, -180, 180, ARM_DEFAULTS.theta2);
        const { tip, radius } = forwardKinematics(theta1, theta2);
        lab.querySelector('[data-angle1]').textContent = `${theta1}°`;
        lab.querySelector('[data-angle2]').textContent = `${theta2}°`;
        a.setAttribute('aria-valuetext', `${theta1} degrees from positive x`);
        b.setAttribute('aria-valuetext', `${theta2} degrees relative to the first link`);
        visual.innerHTML = armSVG(theta1, theta2);
        readout.textContent = `Endpoint: x = ${number(tip.x)} m, y = ${number(tip.y)} m. Distance from base = ${number(radius)} m. Reachable range: 0.300–1.700 m.`;
      };
      a.addEventListener('input', update); b.addEventListener('input', update);
      lab.querySelector('[data-reset-lab]').addEventListener('click', () => { a.value = ARM_DEFAULTS.theta1; b.value = ARM_DEFAULTS.theta2; update(); });
      update();
    } else if (lab.dataset.lab === 'control') {
      const k = lab.querySelector('[data-gain]'), t = lab.querySelector('[data-tau]');
      const update = () => {
        const gain = clamp(k.value, 0, 12, CONTROL_DEFAULTS.gain), tau = clamp(t.value, 0.5, 6, CONTROL_DEFAULTS.tau);
        const result = firstOrderResponse(24, gain, tau);
        lab.querySelector('[data-gain-output]').textContent = number(gain, 1);
        lab.querySelector('[data-tau-output]').textContent = `${number(tau, 1)} s`;
        k.setAttribute('aria-valuetext', `Gain ${number(gain, 1)}`);
        t.setAttribute('aria-valuetext', `${number(tau, 1)} seconds`);
        visual.innerHTML = controlSVG(gain, tau);
        readout.textContent = `Feedback final output = ${number(result.finalValue)}. Final error = ${number(100 * result.steadyStateError, 1)}% of reference. Effective time constant = ${number(result.closedLoopTimeConstant)} s. At 24 s: feedback ${number(result.closedLoop)}, open loop ${number(result.openLoop)}.`;
      };
      k.addEventListener('input', update); t.addEventListener('input', update);
      lab.querySelector('[data-reset-lab]').addEventListener('click', () => { k.value = CONTROL_DEFAULTS.gain; t.value = CONTROL_DEFAULTS.tau; update(); });
      update();
    }
  }
}
