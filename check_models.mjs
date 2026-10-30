import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
// Import as an ES module even before the site's package.json has been created.
const source = await readFile(new URL('./public/lab.js', import.meta.url), 'utf8');
const { stationFlow, growthModel, radiatorModel, momentumModel, growthCSV } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const near = (actual, expected, tolerance = 1e-10) => assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)), `${actual} != ${expected}`);

near(stationFlow().finalPerShift, 27.36);
near(stationFlow({ testMinutes: 12 }).finalPerShift, 34.2);
assert.deepEqual(stationFlow({ testMinutes: 8 }).bottlenecks, ['Assembly']);
assert.deepEqual(stationFlow({ fabricationMinutes: 18, testMinutes: 8 }).bottlenecks, ['Fabrication']);
for (const fabricationMinutes of [8, 10, 18]) for (const testMinutes of [8, 15, 25]) {
  const flow = stationFlow({ fabricationMinutes, testMinutes });
  near(flow.finalPerHour, Math.min(...flow.stations.map(s => s.finalEquivalentCapacity)));
  assert.ok(flow.stations.every(s => s.actualInput <= s.inputCapacity && s.outputPerHour <= s.actualInput));
}

const ordinary = growthModel();
assert.equal(ordinary.length, 61);
near(ordinary[0].installed, 4);
near(ordinary[0].starts, .2125);
near(ordinary[1].installed, 3.96);
near(ordinary[4].installed, 4 * .99 ** 4 + .2125);
const ideal = growthModel({ power: 1e9, kits: 1e9, delay: 0, carePerUnit: 0, wear: 0, neglect: 0 });
near(ideal[60].installed, 4 * 1.0625 ** 60);
for (const power of [4, 12, 24]) for (const kits of [0, .08, .8]) for (const maintenanceFraction of [.03, .15, .30]) {
  const rows = growthModel({ power, kits, maintenanceFraction });
  assert.ok(rows.every(r => r.installed >= 0 && r.active <= r.installed && r.active <= power && r.starts <= kits && r.care <= maintenanceFraction * r.active + 1e-12));
  if (kits === 0) assert.ok(rows.at(-1).installed < 4);
}
near(radiatorModel({ heatKW: 1, temperatureK: 300 }).areaM2, 1000 / (.85 * 5.670374419e-8 * 300 ** 4));
near(radiatorModel({ heatKW: 4 }).areaM2, 2 * radiatorModel({ heatKW: 2 }).areaM2);
near(radiatorModel({ temperatureK: 300 }).areaM2 / radiatorModel({ temperatureK: 400 }).areaM2, (400 / 300) ** 4);
const orbit = momentumModel();
near(orbit.baseVelocity, -.009090909090909092);
near(orbit.payloadVelocity, .09090909090909091);
for (const baseMass of [100, 1000, 5000]) for (const payloadMass of [10, 100, 1000]) for (const relativeVelocity of [0, .1, 1]) {
  const result = momentumModel({ baseMass, payloadMass, relativeVelocity });
  near(result.totalMomentum, 0);
  near(result.payloadVelocity - result.baseVelocity, relativeVelocity);
}
assert.throws(() => momentumModel({ baseMass: 0 }), RangeError);
assert.throws(() => radiatorModel({ emissivity: 1.1 }), RangeError);
assert.throws(() => stationFlow({ testMinutes: 0 }), RangeError);
const csv = growthCSV(ordinary, { power: 12, kits: .8, maintenanceFraction: .3 });
assert.equal(csv.split('\r\n').length, 62);
assert.equal(csv.split('\r\n')[0].split(',').length, 15);
assert.ok(csv.split('\r\n').every(line => line.split(',').length === 15));
console.log('PASS: serial bottlenecks, 60-period growth, conservation, thermal scaling, parameter bounds, and CSV.');
