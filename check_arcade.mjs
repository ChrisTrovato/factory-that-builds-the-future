/** Run with node check_arcade.mjs. Models use original illustrative inputs. */
import assert from 'node:assert/strict';
import {roverChallenges,createRover,planRoverStep,undoRoverPlan,clearRoverPlan,stepRover,roverPreview,powerChallenges,createPower,stepPower,powerConservationError,armChallenges,forwardArm,targetDistance,inverseArm} from './public/arcade-models.js';
import {allMissions} from './public/learning-catalog.js';
import {projects} from './public/project-blueprints.js';
import {renderArcade} from './public/arcade.js';
const checks=[];
const check=(name,fn)=>{fn();checks.push(name)};
const near=(a,b,epsilon=1e-9)=>assert(Math.abs(a-b)<epsilon,`${a} differs from ${b}`);
const copy=x=>JSON.parse(JSON.stringify(x));

// Independent Dijkstra solver on (cell, sample-mask), not the UI preview algorithm.
function solveRover(c){
 const queue=[{x:c.start.x,y:c.start.y,mask:0,cost:0,route:[]}],best=new Map();
 while(queue.length){queue.sort((a,b)=>a.cost-b.cost);const s=queue.shift(),key=`${s.x}/${s.y}/${s.mask}`;
  if((best.get(key)??Infinity)<=s.cost)continue;best.set(key,s.cost);
  if(s.x===c.goal.x&&s.y===c.goal.y&&s.mask===(1<<c.samples.length)-1)return s;
  for(const [dir,dx,dy] of [['N',0,-1],['E',1,0],['S',0,1],['W',-1,0]]){
   const x=s.x+dx,y=s.y+dy,tile=c.map[y]?.[x];if(!tile||tile==='#')continue;
   let mask=s.mask;for(let i=0;i<c.samples.length;i++)if(c.samples[i].x===x&&c.samples[i].y===y)mask|=1<<i;
   queue.push({x,y,mask,cost:s.cost+(tile==='~'?2:1),route:[...s.route,dir]});
  }
 }
 throw new Error(`No route for ${c.id}`);
}
const routeResults=[];
check('Every rover challenge has a feasible sample-and-uplink route within its battery budget',()=>{
 for(const c of roverChallenges){
  assert.equal(c.map.length,7);assert(c.map.every(row=>row.length===8));
  const solution=solveRover(c);assert(solution.cost<=c.budget);let state=createRover(c.id);
  for(const dir of solution.route){const before=copy(state);const next=planRoverStep(state,dir);assert.deepEqual(state,before);assert.equal(next.plan.length,state.plan.length+1);state=next;}
  const preview=roverPreview(state);assert(preview.willComplete);assert.equal(preview.energy,c.budget-solution.cost);assert.equal(state.energy,c.budget);
  while(state.plan.length){const old=copy(state);state=stepRover(state);assert(state.energy>=0);assert.equal(state.energy+state.energySpent,c.budget);assert.notDeepEqual(state.position,old.position);}
  assert.equal(state.status,'complete');assert.equal(state.sampleIds.length,c.samples.length);assert.deepEqual(state.position,c.goal);assert.equal(state.energy,c.budget-solution.cost);
  assert.deepEqual(stepRover(state),state);routeResults.push({id:c.id,moves:solution.route.length,costWh:solution.cost,reserveWh:state.energy});
 }
});
check('Rover obstacles and map boundaries reject plans without spending energy',()=>{
 const start=createRover();let s=planRoverStep(start,'W');assert.equal(s.plan.length,0);assert.equal(s.energy,start.energy);
 s={...start,position:{x:1,y:1},history:[{x:1,y:1}]};const blocked=planRoverStep(s,'E');assert.equal(blocked.plan.length,0);assert.equal(blocked.energy,s.energy);assert.match(blocked.message,/barrier/);
 assert.equal(planRoverStep(start,'invalid').plan.length,0);
});
check('Rover rough terrain, insufficient battery, undo and clear have distinct consequences',()=>{
 let s=createRover();s={...s,position:{x:2,y:5},history:[{x:2,y:5}]};s=planRoverStep(s,'E');assert.equal(roverPreview(s).spent,2);s=stepRover(s);assert.equal(s.energySpent,2);assert.equal(s.energy,16);
 const planned=planRoverStep(s,'S');assert.equal(undoRoverPlan(planned).plan.length,0);assert.equal(clearRoverPlan(planned).energy,16);
 const low={...createRover(),energy:1,position:{x:2,y:5},history:[{x:2,y:5}]};assert.equal(planRoverStep(low,'E').plan.length,0);assert.equal(low.energy,1);
});
check('Reaching the uplink without the required sample does not finish the mission',()=>{
 const c=roverChallenges[0],s={...createRover(),position:{x:c.goal.x-1,y:c.goal.y},plan:['E']};const next=stepRover(s);assert.notEqual(next.status,'complete');assert.match(next.message,/samples.*missing/);
});
check('Rover depletion is finite and zero-energy success is allowed when the task is complete',()=>{
 const c=roverChallenges[0];const s={...createRover(),energy:1,energySpent:c.budget-1,position:{x:c.goal.x-1,y:c.goal.y},sampleIds:['A'],plan:['E']};const done=stepRover(s);assert.equal(done.energy,0);assert.equal(done.status,'complete');
 const stranded=stepRover({...createRover(),energy:1,plan:['S']});assert.equal(stranded.energy,0);assert.equal(stranded.status,'stranded');
});

const powerResults=[];
check('All 4,096 science schedules per power challenge conserve energy and remain bounded',()=>{
 for(const c of powerChallenges){let successful=0,maxScience=0;for(let mask=0;mask<4096;mask++){
   let state=createPower(c.id);for(let hour=0;hour<12;hour++){
    const previous=state,before=copy(state);state=stepPower(state,Boolean(mask&(1<<hour)));assert.deepEqual(previous,before);
    near(powerConservationError(state),0);assert(state.energyWh>=0&&state.energyWh<=c.capacityWh);assert(state.curtailedWh>=0);assert(state.essentialDeficitWh>=0);
    const row=state.history.at(-1);assert([0,c.scienceW].includes(row.scienceWh));assert(row.essentialWh<=c.essentialW);assert.equal(row.essentialWh+row.shortfallWh,c.essentialW);
    if(row.scienceWh)assert.equal(row.essentialWh,c.essentialW);
   }
   assert(state.finished);assert.equal(state.hour,12);assert.deepEqual(stepPower(state,true),state);
   if(state.success){successful++;maxScience=Math.max(maxScience,state.scienceHours);assert.equal(state.essentialDeficitWh,0);assert(state.scienceHours>=c.scienceTarget)}
  }
  assert(successful>0,`No successful dispatch for ${c.id}`);powerResults.push({id:c.id,successfulSchedules:successful,maxScienceHoursWithoutOutage:maxScience});
 }
});
check('Known dispatches achieve all power goals; all-off and all-on expose different failures',()=>{
 const schedules=[[1,1,1,1,1,1,0,0,0,0,0,0],[0,1,1,1,1,0,0,0,0,0,0,0],[1,1,1,0,0,0,0,0,0,0,0,0]];
 powerChallenges.forEach((c,i)=>{let safe=createPower(c.id),off=createPower(c.id),on=createPower(c.id);for(let h=0;h<12;h++){safe=stepPower(safe,Boolean(schedules[i][h]));off=stepPower(off,false);on=stepPower(on,true)}assert(safe.success);assert.equal(off.essentialDeficitWh,0);assert(!off.success);assert(on.essentialDeficitWh>0);});
});
check('Power model prioritizes essential loads, skips partial science, and curtails overflow',()=>{
 const low={...createPower(),hour:6,energyWh:120};const s=stepPower(low,true);assert.equal(s.history.at(-1).essentialWh,60);assert.equal(s.history.at(-1).scienceWh,0);assert.equal(s.energyWh,60);
 const outage=stepPower({...createPower(),hour:6,energyWh:30},true);assert.equal(outage.history.at(-1).shortfallWh,30);assert.equal(outage.energyWh,0);assert.equal(outage.scienceHours,0);
 const full=stepPower({...createPower(),energyWh:500},false);assert.equal(full.energyWh,500);assert.equal(full.curtailedWh,100);
});

check('Forward arm kinematics use a relative elbow angle and correct units',()=>{
 let p=forwardArm({l1:1.2,l2:.8,q1:0,q2:0});near(p.tip.x,2);near(p.tip.y,0);
 p=forwardArm({l1:1.2,l2:.8,q1:90,q2:-90});near(p.joint.x,0);near(p.joint.y,1.2);near(p.tip.x,.8);near(p.tip.y,1.2);
 near(targetDistance({x:0,y:0},{x:3,y:4}),5);
});
check('Both inverse-arm solutions hit every target, including rounded displayed hints',()=>{
 for(const c of armChallenges)for(const target of c.targets){const solutions=inverseArm(target,c.l1,c.l2);assert.equal(solutions.length,2);for(const s of solutions){near(targetDistance(forwardArm({...c,...s}).tip,target),0);const rounded={q1:Number(s.q1.toFixed(1)),q2:Number(s.q2.toFixed(1))};assert(targetDistance(forwardArm({...c,...rounded}).tip,target)<c.tolerance)}}
});
check('Inverse and forward maps agree across the workspace; unreachable targets reject',()=>{
 for(let q1=-180;q1<=180;q1+=30)for(let q2=-180;q2<=180;q2+=30){const tip=forwardArm({l1:1.2,l2:.8,q1,q2}).tip;const solutions=inverseArm(tip,1.2,.8);assert(solutions);for(const solution of solutions)assert(targetDistance(forwardArm({l1:1.2,l2:.8,...solution}).tip,tip)<1e-7);}
 assert.equal(inverseArm({x:2.01,y:0},1.2,.8),null);assert.equal(inverseArm({x:.39,y:0},1.2,.8),null);assert(inverseArm({x:.4,y:0},1.2,.8));
 assert.throws(()=>forwardArm({l1:0,l2:1,q1:0,q2:0}));assert.throws(()=>inverseArm({x:NaN,y:0},1,1));assert.throws(()=>targetDistance({x:Infinity,y:0},{x:0,y:0}));
});
check('All challenge connections resolve and the UI module imports without browser globals',()=>{
 const lessons=new Set(allMissions.map(m=>m.id)),blueprints=new Set(projects.map(p=>p.id));
 assert.equal(typeof renderArcade,'function');for(const c of [...roverChallenges,...powerChallenges,...armChallenges]){assert(lessons.has(c.lessonId),c.lessonId);assert(blueprints.has(c.projectId),c.projectId)}
 assert.equal(roverChallenges.length,3);assert.equal(powerChallenges.length,3);assert.equal(armChallenges.length,3);
});

// A small DOM/event harness exercises the real UI handlers without a browser.
// It models node identity, focus, input values, listeners, and timer ownership.
class FakeNode {
 constructor(root,attrs={}){this.root=root;this.attrs=attrs;this.dataset={};for(const [k,v]of Object.entries(attrs))if(k.startsWith('data-'))this.dataset[k.slice(5).replace(/-([a-z])/g,(_,x)=>x.toUpperCase())]=v;this.value=attrs.value??'';this.checked=false;this.disabled=false;this.textContent='';this.listeners=new Map();this.classList={toggle(){}};}
 set innerHTML(text){this.html=text;const pattern=/<([a-z][a-z0-9-]*)\b([^>]*)>/gi;for(const [,tag,raw]of text.matchAll(pattern)){const attrs={};for(const [,key,value]of raw.matchAll(/([\w-]+)="([^"]*)"/g))attrs[key]=value;const node=new FakeNode(this.root,attrs);node.tag=tag;this.root.nodes.push(node);}}
 get innerHTML(){return this.html||''}
 get valueAsNumber(){return this.value===''?NaN:Number(this.value)}
 querySelector(s){return this.root.querySelector(s)}
 addEventListener(type,handler){this.listeners.set(type,[...(this.listeners.get(type)||[]),handler])}
 removeEventListener(type,handler){this.listeners.set(type,(this.listeners.get(type)||[]).filter(x=>x!==handler))}
 fire(type,extra={}){if(type==='click'&&this.disabled)return;const event={target:this,preventDefault(){this.prevented=true},...extra};for(const fn of this.listeners.get(type)||[])fn(event);return event}
 focus(){globalThis.document.activeElement=this}
 closest(){return this}
}
class FakeRoot extends FakeNode {
 constructor(){super(null);this.root=this;this.nodes=[];this.composites=new Map()}
 querySelector(selector){if(selector.includes(' ')){if(!this.composites.has(selector))this.composites.set(selector,new FakeNode(this));return this.composites.get(selector)}
  const node=this.nodes.find(n=>selector[0]==='#'?n.attrs.id===selector.slice(1):selector[0]==='.'?(n.attrs.class||'').split(' ').includes(selector.slice(1)):(()=>{const m=selector.match(/^\[([\w-]+)(?:="([^"]*)")?\]$/);return m&&Object.hasOwn(n.attrs,m[1])&&(m[2]===undefined||n.attrs[m[1]]===m[2])})());
  assert(node,`Missing DOM node ${selector}`);return node;
 }
 querySelectorAll(selector){if(selector==='[data-direction]')return this.nodes.filter(n=>n.dataset.direction);return []}
 suffix(value){const node=this.nodes.find(n=>n.attrs.id?.endsWith(value));assert(node,`Missing ID suffix ${value}`);return node}
}
function withUI(game,work){const saved={document:globalThis.document,setTimeout:globalThis.setTimeout,clearTimeout:globalThis.clearTimeout};const timers=new Map();let next=1;
 globalThis.document={activeElement:null,title:''};globalThis.setTimeout=fn=>{const id=next++;timers.set(id,fn);return id};globalThis.clearTimeout=id=>timers.delete(id);
 const root=new FakeRoot();let controller;
 try{controller=renderArcade(root,game);work({root,controller,timers});}
 finally{controller?.destroy();Object.assign(globalThis,saved)}
}
check('Rover keyboard repetition retains board focus and a disabled Step returns focus to the board',()=>withUI('rover',({root})=>{
 const board=root.querySelector('.arc-grid-board');board.focus();assert(board.fire('keydown',{key:'ArrowRight'}).prevented);board.fire('keydown',{key:'Enter'});assert.equal(root.suffix('-energy').textContent,17);assert.equal(document.activeElement,board);
 board.fire('keydown',{key:'ArrowRight'});board.fire('keydown',{key:'Enter'});assert.equal(root.suffix('-energy').textContent,16);assert.equal(document.activeElement,board);
 board.fire('keydown',{key:'ArrowDown'});const step=root.querySelector('[data-action="step"]');step.focus();step.fire('click');assert.equal(document.activeElement,board);assert.equal(root.suffix('-energy').textContent,15);
}));
check('Rover reset cancels auto-run; destroy cancels callbacks and removes event handlers',()=>withUI('rover',({root,controller,timers})=>{
 const board=root.querySelector('.arc-grid-board');board.fire('keydown',{key:'ArrowRight'});board.fire('keydown',{key:'ArrowRight'});root.querySelector('[data-action="run"]').fire('click');assert.equal(timers.size,1);assert.equal(root.suffix('-energy').textContent,17);
 root.querySelector('[data-action="reset"]').fire('click');assert.equal(timers.size,0);assert.equal(root.suffix('-energy').textContent,18);assert.equal(root.suffix('-moves').textContent,0);
 board.fire('keydown',{key:'ArrowRight'});board.fire('keydown',{key:'ArrowRight'});root.querySelector('[data-action="run"]').fire('click');const stale=[...timers.values()][0];controller.destroy();assert.equal(timers.size,0);const energy=root.suffix('-energy').textContent;stale();assert.equal(root.suffix('-energy').textContent,energy);assert((board.listeners.get('keydown')||[]).length===0);
}));
check('Power completion and reset do not retain an obsolete mission state',()=>withUI('power',({root})=>{
 root.querySelector('[data-action="coast"]').fire('click');assert(root.querySelector('[data-action="advance"]').disabled);assert.match(root.querySelector('.arc-feedback').textContent,/only 0/);
 root.querySelector('[data-action="reset"]').fire('click');assert.equal(root.suffix('-battery').textContent,180);assert(!root.querySelector('[data-action="advance"]').disabled);assert.equal(root.suffix('-science-choice').checked,false);
 const select=root.suffix('-challenge');select.value='long-shadow';select.fire('change');assert.equal(root.suffix('-battery').textContent,260);root.querySelector('[data-action="advance"]').fire('click');assert.equal(root.suffix('-battery').textContent,420);
}));
check('Arm precise typing preserves focus, solved targets advance, and restart clears progress',()=>withUI('arm',({root})=>{
 const c=armChallenges[0],solution=inverseArm(c.targets[0],c.l1,c.l2)[0],q1=root.suffix('-q1-number'),q2=root.suffix('-q2-number');
 q1.focus();q1.value='1';q1.fire('input');assert.equal(q1.value,'1');assert.equal(document.activeElement,q1);
 q1.value=String(solution.q1);q1.fire('input');q2.value=String(solution.q2);q2.fire('input');root.querySelector('[data-action="capture"]').fire('click');assert.match(root.suffix('-arm-state').textContent,/02 \/ 03/);
 root.querySelector('[data-action="reset"]').fire('click');assert.match(root.suffix('-arm-state').textContent,/01 \/ 03/);assert.equal(Number(root.suffix('-q2-number').value),25);
}));
console.log(JSON.stringify({status:'PASS',checks:checks.length,roverRoutes:routeResults,powerSchedules:powerResults,checkedScienceSchedules:12288,armTargets:armChallenges.reduce((n,c)=>n+c.targets.length,0)},null,2));
