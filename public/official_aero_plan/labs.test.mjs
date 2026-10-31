import test from 'node:test';
import assert from 'node:assert/strict';
import { forwardKinematics, firstOrderResponse, renderArmLab, renderControlLab } from './labs.mjs';

const close = (a, b, tolerance = 1e-12) => assert.ok(Math.abs(a - b) < tolerance, `${a} != ${b}`);

test('Arm reaches its outer and inner limits with the declared relative-angle convention', () => {
  close(forwardKinematics(0, 0).tip.x, 1.7);
  close(forwardKinematics(0, 0).tip.y, 0);
  close(forwardKinematics(0, 180).radius, 0.3);
  close(forwardKinematics(90, -90).tip.x, 0.7);
  close(forwardKinematics(90, -90).tip.y, 1);
});

test('Rotating the base preserves radius and all configurations stay within the annular workspace', () => {
  for (let elbow = -180; elbow <= 180; elbow += 15) {
    const radius = forwardKinematics(0, elbow).radius;
    for (let base = -180; base <= 180; base += 30) {
      const point = forwardKinematics(base, elbow);
      close(point.radius, radius);
      assert.ok(point.radius >= 0.3 - 1e-12 && point.radius <= 1.7 + 1e-12);
    }
  }
});

test('Feedback is zero at t=0 and K=0 is distinct from the direct open-loop step', () => {
  close(firstOrderResponse(0, 2, 3).closedLoop, 0);
  const disconnected = firstOrderResponse(3, 0, 3);
  close(disconnected.closedLoop, 0);
  close(disconnected.openLoop, 1 - Math.exp(-1));
  close(disconnected.steadyStateError, 1);
});

test('Known gain-one solution has half final output and time constant tau/2', () => {
  const result = firstOrderResponse(2, 1, 4);
  close(result.closedLoop, 0.5 * (1 - Math.exp(-1)));
  close(result.finalValue, 0.5);
  close(result.closedLoopTimeConstant, 2);
  close(result.steadyStateError, 0.5);
});

test('Nonnegative first-order responses are monotonic and never overshoot their own final value', () => {
  for (const gain of [0, 0.1, 1, 2, 12]) {
    for (const tau of [0.5, 3, 6]) {
      let previous = 0;
      for (let time = 0; time <= 24; time += 0.1) {
        const current = firstOrderResponse(time, gain, tau);
        assert.ok(current.closedLoop >= previous - 1e-12);
        assert.ok(current.closedLoop <= current.finalValue + 1e-12);
        previous = current.closedLoop;
      }
    }
  }
});

test('Doubling tau doubles the response timescale without changing steady-state error', () => {
  close(firstOrderResponse(2, 3, 2).closedLoop, firstOrderResponse(4, 3, 4).closedLoop);
  close(firstOrderResponse(2, 3, 2).steadyStateError, firstOrderResponse(2, 3, 4).steadyStateError);
  assert.throws(() => firstOrderResponse(1, 1, 0), RangeError);
});

test('Rendered labs include equations, accessible controls and reset actions', () => {
  assert.match(renderArmLab(), /id="arm-theta1"/);
  assert.match(renderArmLab(), /x = L₁ cos/);
  assert.match(renderControlLab(), /id="control-gain"/);
  assert.match(renderControlLab(), /no overshoot/);
  for (const markup of [renderArmLab(), renderControlLab()]) {
    assert.match(markup, /data-reset-lab/);
    assert.match(markup, /aria-live="polite"/);
  }
});
