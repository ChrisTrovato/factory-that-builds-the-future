import assert from 'node:assert/strict';
import {simulateControl} from './public/sandbox.js';
const passive=simulateControl({kp:0,kd:0,mass:1});assert(passive.rows.every(r=>r.x===0&&r.v===0&&r.u===0));assert.equal(passive.settling,null);
const calm=simulateControl(),ring=simulateControl({kp:8,kd:0,mass:1});
assert(calm.overshoot<10&&calm.settling<5);assert(ring.overshoot>calm.overshoot+20);assert(calm.finalError<.001);
const impulse=simulateControl({disturbance:true});assert(Math.abs(impulse.rows[600].v-calm.rows[600].v-1.5)<1e-9);assert(impulse.settling>6);
for(const kp of [0,8,20])for(const kd of [0,5,15])for(const mass of [.5,1,4]){const m=simulateControl({kp,kd,mass,disturbance:true});assert(m.rows.every(r=>Object.values(r).every(Number.isFinite)&&Math.abs(r.u)<=4));assert(m.rows.every((r,i)=>!i||r.work>=m.rows[i-1].work));}
assert.throws(()=>simulateControl({mass:0}),RangeError);assert.throws(()=>simulateControl({kp:NaN}),RangeError);
console.log('PASS control: zero-force equilibrium, force bound, impulse J/m, damping, finite trajectories, work accumulation and challenge feasibility');
