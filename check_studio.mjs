import assert from 'node:assert/strict';
import { armReach, liftingWork, accumulatedMotion, gearRatio } from './public/math-studio.js';
const close = (actual, expected, tolerance = 1e-10) => assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)), `${actual} does not match ${expected}`);

for (const length of [.25, 1.2, 2]) for (const angleDegrees of [0, 30, 40, 60, 90, 150]) {
  const result = armReach({ length, angleDegrees });
  close(result.x ** 2 + result.y ** 2, length ** 2);
}
close(armReach({ length: 2, angleDegrees: 90 }).x, 0);
close(armReach({ length: 2, angleDegrees: 90 }).y, 2);
assert.ok(armReach({ angleDegrees: 150 }).x < 0);
close(armReach({ length: 1.2, angleDegrees: 30 }).y, .6);

const work = liftingWork();
close(work.usefulEnergy, 294.3);
close(work.usefulPower, 58.86);
close(work.inputPower, 73.575);
close(work.inputEnergy, work.usefulEnergy + work.lossEnergy);
close(liftingWork({ seconds: 2.5 }).inputPower, work.inputPower * 2);
close(liftingWork({ seconds: 2.5 }).usefulEnergy, work.usefulEnergy);
close(liftingWork({ efficiency: 1 }).lossEnergy, 0);
close(liftingWork({ height: 0 }).inputPower, 0);
assert.throws(() => liftingWork({ seconds: 0 }), RangeError);
assert.throws(() => liftingWork({ efficiency: 1.1 }), RangeError);

const motion = accumulatedMotion();
close(motion.velocity, 9);
close(motion.displacement, 20);
close(motion.displacement, motion.initialContribution + motion.accelerationContribution);
close(accumulatedMotion({ initialVelocity: 0, seconds: 8 }).displacement, 4 * accumulatedMotion({ initialVelocity: 0, seconds: 4 }).displacement);
close(accumulatedMotion({ acceleration: 0, initialVelocity: 3, seconds: 4 }).displacement, 12);
close(accumulatedMotion({ seconds: 0 }).displacement, 0);
// Signed velocities are supported by the pure model; the UI uses nonnegative motion.
close(accumulatedMotion({ initialVelocity: -2, acceleration: 0, seconds: 3 }).displacement, -6);

const gear = gearRatio();
close(gear.outputRPM, -60);
close(gear.outputTurnsPerDriverTurn, -.5);
close(gear.reductionRatio, 2);
for (const driverTeeth of [12, 20, 48]) for (const drivenTeeth of [12, 40, 80]) for (const driverRPM of [0, 120, 240]) {
  const result = gearRatio({ driverTeeth, drivenTeeth, driverRPM });
  close(Math.abs(result.outputRPM) * drivenTeeth, driverRPM * driverTeeth);
  close(Math.abs(result.outputRPM) * result.idealTorqueMultiplier, driverRPM);
}
assert.throws(() => gearRatio({ drivenTeeth: 12.5 }), RangeError);
assert.throws(() => armReach({ length: 0 }), RangeError);
console.log('PASS: reach geometry; work, efficiency and power; accumulated motion; gear speed/torque trade; boundary inputs.');
