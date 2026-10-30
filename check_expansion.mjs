/** Expansion content, link, arithmetic, and field-record validation. No browser writes. */
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {projects} from './public/project-blueprints.js';
import {expeditions} from './public/expeditions-data.js';
import {buildExpeditionRecord, renderExpeditions} from './public/expeditions.js';
import {allMissions} from './public/learning-catalog.js';
import {momentumModel} from './public/lab.js';

const originalIds = ['paper-linkage','measurement','service-module','factory-flow','virtual-rover','sensor-study','orbital-model','design-review'];
const newIds = ['tolerance-stack','paper-beam','lunar-energy','thermal-cooling','sampling-study','gear-trade','quality-gate','fault-tree'];
const projectFields = ['id','title','tag','level','time','cost','hook','question','why','materials','steps','evidence','success','reflection','next','chapter','missionIds','safety'];
const expeditionFields = ['id','title','kicker','world','image','level','pace','hook','why','outcome','needs','prediction','lesson','experiment','build','reflection','debrief','rubric','extension'];
const missions = new Set(allMissions.map(item=>item.id));
const projectIds = new Set(projects.map(item=>item.id));
const chapters = new Set(JSON.parse(readFileSync(new URL('./public/book.json',import.meta.url),'utf8')).chapters.map(item=>item.id));
const text = value => typeof value === 'string' && value.trim().length > 0;
const strings = values => Array.isArray(values) && values.length > 0 && values.every(text);
const keys = (record, fields, name) => assert.deepEqual(Object.keys(record).sort(), [...fields].sort(), name);
const words = value => typeof value === 'string' ? value.split(/\s+/).filter(Boolean).length : Array.isArray(value) ? value.reduce((n,item)=>n+words(item),0) : value && typeof value === 'object' ? Object.values(value).reduce((n,item)=>n+words(item),0) : 0;
const near = (actual, expected, tolerance=1e-10) => assert.ok(Math.abs(actual-expected)<tolerance, actual+' ≠ '+expected);

assert.equal(projects.length,16);
assert.equal(projectIds.size,16);
assert.deepEqual(projects.slice(0,8).map(item=>item.id),originalIds,'Original progress IDs and order must remain stable.');
assert.deepEqual(projects.slice(8).map(item=>item.id),newIds);
for (const project of projects) {
  keys(project,projectFields,project.id);
  for (const name of projectFields.filter(name=>!['materials','steps','evidence','reflection','missionIds'].includes(name))) assert.ok(text(project[name]), project.id+': '+name);
  assert.ok(strings(project.materials) && strings(project.evidence) && strings(project.reflection));
  assert.ok(project.steps.length>=5 && project.steps.every(step=>text(step.title)&&text(step.detail)));
  assert.ok(project.missionIds.length && project.missionIds.every(id=>missions.has(id)),project.id+' mission reference');
  assert.ok(chapters.has(project.chapter),project.id+' chapter reference');
  assert.ok(/self-paced/.test(project.time),project.id+' nonrigid duration');
  assert.ok(words(project)>=300 && words(project)<=550,project.id+' substantive, bounded blueprint length');
}
assert.equal(expeditions.length,6);
assert.equal(new Set(expeditions.map(item=>item.id)).size,6);
const validRoute = route => {
  assert.ok(typeof route==='string' && route.startsWith('#/'), 'Internal route required: '+route);
  const parts=route.slice(2).split('/');
  if(parts[0]==='mission') assert.ok(missions.has(parts[1]),route);
  else if(parts[0]==='project') assert.ok(projectIds.has(parts[1]),route);
  else if(parts[0]==='arcade') assert.ok(['arm','power','rover'].includes(parts[1]),route);
  else assert.ok(['lab','studio','journey','roadmap','expeditions'].includes(parts[0]),route);
};
for (const expedition of expeditions) {
  keys(expedition,expeditionFields,expedition.id);
  for(const name of ['id','title','kicker','world','image','level','pace','hook','why','outcome']) assert.ok(text(expedition[name]),expedition.id+': '+name);
  assert.ok(strings(expedition.needs) && expedition.needs.length>=2);
  assert.ok(/^assets\/[a-z-]+\.png$/.test(expedition.image));
  assert.ok(existsSync(new URL('./public/'+expedition.image,import.meta.url)));
  keys(expedition.prediction,['question','hint'],'Prediction');
  keys(expedition.lesson,['missionIds','task','evidence'],'Lesson');
  keys(expedition.experiment,['href','label','task','record','guardrail'],'Experiment');
  keys(expedition.build,['projectId','task','stretch'],'Build');
  keys(expedition.reflection,['prompts','takeaway'],'Reflection');
  keys(expedition.extension,['href','label','reason'],'Extension');
  assert.ok(expedition.lesson.missionIds.length>=3 && expedition.lesson.missionIds.every(id=>missions.has(id)));
  assert.ok(projectIds.has(expedition.build.projectId));
  assert.ok(strings(expedition.experiment.record) && expedition.experiment.record.length>=3);
  assert.ok(strings(expedition.reflection.prompts) && expedition.reflection.prompts.length>=3);
  assert.ok(strings(expedition.debrief) && expedition.debrief.length>=3);
  assert.ok(expedition.rubric.length>=3 && expedition.rubric.every(item=>text(item.criterion)&&text(item.evidence)));
  for(const record of [expedition.prediction,expedition.lesson,expedition.experiment,expedition.build,expedition.reflection,expedition.extension]) {
    for(const value of Object.values(record)) if(!Array.isArray(value)) assert.ok(text(value));
  }
  validRoute(expedition.experiment.href); validRoute(expedition.extension.href);
  assert.ok(words(expedition)>=400 && words(expedition)<=1000,expedition.id+' substantive guided sequence');
}
assert.deepEqual(new Set(expeditions.filter(item=>item.experiment.href.startsWith('#/arcade/')).map(item=>item.experiment.href)),new Set(['#/arcade/arm','#/arcade/power','#/arcade/rover']));

// Independent arithmetic checkpoints from the new blueprints.
assert.deepEqual([59-57,61-55],[2,6]);
function energyBudget(supply,demand) {
  let stored=60, unmet=0, curtailed=0;const history=[];
  for(let i=0;i<supply.length;i++){
    const next=stored+supply[i]-demand[i];
    unmet+=Math.max(0,-next);curtailed+=Math.max(0,next-100);
    stored=Math.min(100,Math.max(0,next));history.push(stored);
  }
  near(60+supply.reduce((a,b)=>a+b,0),stored+demand.reduce((a,b)=>a+b,0)-unmet+curtailed);
  return {stored,unmet,curtailed,history};
}
assert.deepEqual(energyBudget([30,30,0,0],[20,40,20,20]).history,[70,60,40,20]);
const disrupted=energyBudget([30,0,0,0],[20,40,20,20]);
assert.deepEqual(disrupted.history,[70,30,10,0]);assert.equal(disrupted.unmet,10);
const exact=20+60*Math.exp(-1);
near(exact,42.07276647028654);
function euler(step) {let t=80;for(let n=0;n<Math.round(10/step);n++)t-=(t-20)*step/10;return t;}
near(euler(5),35);
assert.ok(Math.abs(euler(.5)-exact)<Math.abs(euler(1)-exact));
assert.ok(Math.abs(euler(1)-exact)<Math.abs(euler(5)-exact));
assert.ok(80-(80-20)*15/10<20);
for(let n=0;n<=10;n++)near(Math.sin(2*Math.PI*7*n/10),-Math.sin(2*Math.PI*3*n/10));
assert.ok(Math.abs(Math.sin(2*Math.PI*7/40)+Math.sin(2*Math.PI*3/40))>1);
near(120*20/60,40);near(.2*60/20*.8,.48);
const inputPower=.2*120*2*Math.PI/60, outputPower=.48*40*2*Math.PI/60;
near(inputPower,2.5132741228718345);near(outputPower/inputPower,.8);
near(4/5,.8);near(4/8,.5);near((4+11)/20,.75);near((5+8)/20,.65);
near(1-.97*.98*.99,.058906);
const momentum=momentumModel({baseMass:1000,payloadMass:100,relativeVelocity:.1});
near(momentum.baseVelocity,-.00909090909090909);near(momentum.totalMomentum,0);

// Field export must preserve the learner's wording, sanitize rubric indices, and not mutate content or draft.
assert.equal(typeof renderExpeditions,'function');
const expedition=expeditions[0], draft={prediction:'My prediction <with a symbol>',observations:'Measured 12 mm\nThen 9 mm',reflection:'The first guess failed.',criteria:[0,0,99,-1,'1']};
const before=JSON.stringify({expedition,draft});
const record=buildExpeditionRecord(expedition,draft);
assert.ok(record.includes(draft.prediction) && record.includes(draft.observations) && record.includes(draft.reflection));
assert.equal((record.match(/^\[x\]/gm)||[]).length,1);
assert.equal((record.match(/^\[ \]/gm)||[]).length,2);
assert.equal(JSON.stringify({expedition,draft}),before);
assert.ok(buildExpeditionRecord(expedition).includes('(not recorded)'));
console.log(JSON.stringify({status:'PASS',projects:projects.length,newProjects:projects.slice(8).map(item=>({id:item.id,words:words(item)})),expeditions:expeditions.length,checks:['stable original project IDs/schema','mission/project/chapter/image references','six complete prediction-to-reflection sequences','three real arcade route IDs','energy, thermal, sampling, gearing, inspection, reliability and momentum arithmetic','nonmutating field-record export'],storage:'No additional persistent storage key'},null,2));
