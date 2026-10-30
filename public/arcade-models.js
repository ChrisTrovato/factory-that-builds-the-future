/** Original, deterministic teaching models. All states are session-local values. */
const finite = (value, name) => { if (!Number.isFinite(value)) throw new TypeError(`${name} must be finite`); return value; };
const same = (a, b) => a.x === b.x && a.y === b.y;
const directions = {N:{x:0,y:-1},E:{x:1,y:0},S:{x:0,y:1},W:{x:-1,y:0}};
export const roverDirections = Object.freeze(directions);
export const roverChallenges = [
 {id:'first-traverse',title:'The first traverse',description:'Collect the marked sample, then reach the uplink. A short route and a cheap route are not always the same.',budget:18,start:{x:0,y:5},goal:{x:7,y:1},samples:[{id:'A',x:3,y:3}],map:['........','..##....','..#..~~.','.....~~.','.###....','...~....','........'],lessonId:'coding',projectId:'virtual-rover'},
 {id:'two-samples',title:'Two samples, one battery',description:'Visit both sample sites before the uplink. Plan the order as well as the individual turns.',budget:17,start:{x:0,y:6},goal:{x:7,y:0},samples:[{id:'A',x:2,y:4},{id:'B',x:5,y:2}],map:['........','.##..#..','...~....','.#.~.#..','...~.#..','.#......','.....~..'],lessonId:'vectors',projectId:'virtual-rover'},
 {id:'rough-country',title:'Rough country',description:'The two sample sites pull you toward opposite edges. Find a route that leaves a reserve.',budget:22,start:{x:0,y:3},goal:{x:7,y:3},samples:[{id:'A',x:1,y:0},{id:'B',x:6,y:6}],map:['...~~...','..#~~#..','..#.....','...~~~..','.#...#..','...#....','........'],lessonId:'systems',projectId:'virtual-rover'}
];
export function roverChallenge(id){return roverChallenges.find(c=>c.id===id)||roverChallenges[0];}
export function createRover(id){const c=roverChallenge(id);return {challengeId:c.id,position:{...c.start},energy:c.budget,energySpent:0,plan:[],executed:[],sampleIds:[],history:[{...c.start}],status:'ready',message:'Build a route. Collect every sample, then reach the uplink.'};}
function traverse(state,direction){
 const c=roverChallenge(state.challengeId),d=directions[direction];
 if(!d)return {ok:false,reason:'Choose north, east, south, or west.'};
 const position={x:state.position.x+d.x,y:state.position.y+d.y},cell=c.map[position.y]?.[position.x];
 if(!cell||cell==='#')return {ok:false,reason:!cell?'That move leaves the mapped area.':'A rock barrier blocks that move.'};
 const cost=cell==='~'?2:1;
 if(state.energy<cost)return {ok:false,reason:`That move needs ${cost} Wh; only ${state.energy} Wh remains.`};
 const sampleIds=[...state.sampleIds];for(const sample of c.samples)if(same(sample,position)&&!sampleIds.includes(sample.id))sampleIds.push(sample.id);
 const energy=state.energy-cost,complete=same(position,c.goal)&&sampleIds.length===c.samples.length;
 const status=complete?'complete':energy===0?'stranded':'active';
 let message=complete?`All samples delivered with ${energy} Wh in reserve.`:status==='stranded'?'The battery is empty before the mission is complete. Reset and revise the route.':sampleIds.length>state.sampleIds.length?`Sample ${sampleIds.at(-1)} collected. Keep enough energy for the uplink.`:cell==='~'?'Rough ground used 2 Wh. A detour can sometimes cost less.':'Move complete. Ordinary ground used 1 Wh.';
 if(!complete&&same(position,c.goal))message='At the uplink, but samples are still missing. Visit every marked site first.';
 return {ok:true,state:{...state,position,energy,energySpent:state.energySpent+cost,sampleIds,history:[...state.history,position],status,message}};
}
export function roverPreview(state){
 let projected={...state,history:[{...state.position}]},valid=true,reason='';
 for(const direction of state.plan){if(projected.status==='complete')break;const move=traverse(projected,direction);if(!move.ok){valid=false;reason=move.reason;break;}projected=move.state;}
 return {position:projected.position,energy:projected.energy,spent:projected.energySpent-state.energySpent,sampleIds:projected.sampleIds,path:projected.history,willComplete:projected.status==='complete',valid,reason};
}
export function planRoverStep(state,direction){
 if(['complete','stranded'].includes(state.status))return {...state,message:'Reset the challenge to plan another route.'};
 if(state.plan.length>=64)return {...state,message:'The route is limited to 64 planned moves. Run or clear it first.'};
 const preview=roverPreview(state);if(preview.willComplete)return {...state,message:'This plan reaches the uplink with every sample. Run it to test the result.'};
 const projected={...state,position:preview.position,energy:preview.energy,energySpent:state.energySpent+preview.spent,sampleIds:preview.sampleIds,history:preview.path};
 const move=traverse(projected,direction);if(!move.ok)return {...state,message:move.reason};
 const next={...state,plan:[...state.plan,direction],message:`Move ${state.plan.length+1} planned. The preview shows the route; the rover has not moved yet.`};
 const result=roverPreview(next);if(result.willComplete)next.message=`Plan ready: all samples and the uplink, with ${result.energy} Wh left. Run it when ready.`;
 return next;
}
export function undoRoverPlan(state){return {...state,plan:state.plan.slice(0,-1),message:state.plan.length?'Last planned move removed.':'There are no planned moves to undo.'};}
export function clearRoverPlan(state){return {...state,plan:[],message:'Planned moves cleared. Already executed moves and energy use remain.'};}
export function stepRover(state){
 if(['complete','stranded'].includes(state.status))return state;
 if(!state.plan.length)return {...state,message:'Plan at least one move before stepping.'};
 const [direction,...plan]=state.plan,move=traverse(state,direction);
 if(!move.ok)return {...state,plan:[],message:move.reason};
 return {...move.state,plan:move.state.status==='complete'?[]:plan,executed:[...state.executed,direction]};
}
export function resetRover(state){return createRover(state.challengeId);}

export const powerChallenges = [
 {id:'first-night',title:'Keep the first night alive',description:'Use the light for science, but save enough energy for six dark intervals.',capacityWh:500,initialWh:180,essentialW:60,scienceW:100,scienceTarget:6,solarW:[160,240,280,280,240,160,0,0,0,0,0,0],lessonId:'integral',projectId:'factory-flow'},
 {id:'thin-sun',title:'A smaller solar margin',description:'Reduced generation makes every optional experiment a decision. Deliver four science hours without an essential outage.',capacityWh:400,initialWh:180,essentialW:60,scienceW:100,scienceTarget:4,solarW:[100,160,210,250,180,100,0,0,0,0,0,0],lessonId:'thermal',projectId:'factory-flow'},
 {id:'long-shadow',title:'The long shadow',description:'Only four lit intervals precede eight dark ones. Protect the night reserve while collecting three science hours.',capacityWh:520,initialWh:260,essentialW:60,scienceW:100,scienceTarget:3,solarW:[220,320,260,100,0,0,0,0,0,0,0,0],lessonId:'systems',projectId:'design-review'}
];
export function powerChallenge(id){return powerChallenges.find(c=>c.id===id)||powerChallenges[0];}
export function createPower(id){const c=powerChallenge(id);return {challengeId:c.id,hour:0,energyWh:c.initialWh,generatedWh:0,usedWh:0,curtailedWh:0,essentialDeficitWh:0,scienceHours:0,history:[],finished:false,success:false,message:'Inspect the forecast. Choose whether to run science during the next one-hour interval.'};}
export function stepPower(state,scienceOn=false){
 if(state.finished)return state;
 const c=powerChallenge(state.challengeId),solarWh=c.solarW[state.hour],available=state.energyWh+solarWh;
 const essentialWh=Math.min(available,c.essentialW),shortfallWh=c.essentialW-essentialWh;
 const afterEssential=available-essentialWh,scienceWh=scienceOn&&afterEssential>=c.scienceW?c.scienceW:0;
 const remaining=afterEssential-scienceWh,energyWh=Math.min(c.capacityWh,remaining),curtailedWh=Math.max(0,remaining-c.capacityWh);
 const hour=state.hour+1,scienceHours=state.scienceHours+(scienceWh>0?1:0),essentialDeficitWh=state.essentialDeficitWh+shortfallWh,finished=hour===c.solarW.length;
 const success=finished&&essentialDeficitWh===0&&scienceHours>=c.scienceTarget;
 const row={hour:state.hour,solarWh,essentialWh,scienceWh,energyWh,curtailedWh,shortfallWh,requestedScience:Boolean(scienceOn)};
 let message=shortfallWh?`Essential service lost ${shortfallWh} Wh this interval. The outage remains in the mission record even if power returns.`:scienceOn&&!scienceWh?'Science was skipped: a full experiment needs 100 Wh after essential loads.':'Interval complete. Energy in equals useful consumption, stored energy, and curtailed surplus.';
 if(curtailedWh>0)message+=` Battery full: ${curtailedWh} Wh was curtailed.`;
 if(finished)message=success?`Mission achieved: ${scienceHours} science hours, no essential outages, ${energyWh} Wh left.`:essentialDeficitWh?`Mission ended with ${essentialDeficitWh} Wh of unmet essential demand. Revisit when science used the night reserve.`:`Essential service survived, but only ${scienceHours} of ${c.scienceTarget} target science hours were delivered. Try moving science into the daylight.`;
 return {...state,hour,energyWh,generatedWh:state.generatedWh+solarWh,usedWh:state.usedWh+essentialWh+scienceWh,curtailedWh:state.curtailedWh+curtailedWh,essentialDeficitWh,scienceHours,history:[...state.history,row],finished,success,message};
}
export function resetPower(state){return createPower(state.challengeId);}
export function powerConservationError(state){const c=powerChallenge(state.challengeId);return c.initialWh+state.generatedWh-state.usedWh-state.energyWh-state.curtailedWh;}

export const armChallenges = [
 {id:'bench-reach',title:'Three points, two joints',description:'Place the tool inside each target. Notice that the elbow angle is measured relative to the first link.',l1:1.2,l2:.8,tolerance:.08,initial:{q1:5,q2:25},targets:[{x:1.2,y:.8},{x:.4,y:1.4},{x:-.8,y:1}],lessonId:'trigonometry',projectId:'paper-linkage'},
 {id:'fine-placement',title:'The precision pass',description:'A smaller target asks for smaller corrections. Work near the target, then adjust one joint at a time.',l1:1,l2:.7,tolerance:.04,initial:{q1:15,q2:-35},targets:[{x:1.3,y:.4},{x:.2,y:1.4},{x:-1,y:.8},{x:.6,y:-.9}],lessonId:'frames',projectId:'measurement'},
 {id:'edge-of-reach',title:'Near the workspace edge',description:'Compare a nearly straight arm with a folded one. The same angle change can have a different effect on tool position.',l1:1.2,l2:.8,tolerance:.05,initial:{q1:45,q2:70},targets:[{x:1.85,y:.1},{x:.48,y:.15},{x:-.2,y:1.92}],lessonId:'feedback',projectId:'paper-linkage'}
];
export function armChallenge(id){return armChallenges.find(c=>c.id===id)||armChallenges[0];}
export function forwardArm({l1,l2,q1,q2}){
 [l1,l2,q1,q2].forEach((v,i)=>finite(v,['l1','l2','q1','q2'][i]));if(l1<=0||l2<=0)throw new RangeError('Link lengths must be positive');
 const a=q1*Math.PI/180,b=(q1+q2)*Math.PI/180,joint={x:l1*Math.cos(a),y:l1*Math.sin(a)};
 return {joint,tip:{x:joint.x+l2*Math.cos(b),y:joint.y+l2*Math.sin(b)}};
}
export function targetDistance(point,target){return Math.hypot(finite(point.x,'point.x')-finite(target.x,'target.x'),finite(point.y,'point.y')-finite(target.y,'target.y'));}
const wrapDegrees=x=>((x+180)%360+360)%360-180;
export function inverseArm(target,l1,l2){
 [target.x,target.y,l1,l2].forEach((v,i)=>finite(v,['x','y','l1','l2'][i]));if(l1<=0||l2<=0)throw new RangeError('Link lengths must be positive');
 const raw=(target.x**2+target.y**2-l1**2-l2**2)/(2*l1*l2);if(raw>1+1e-12||raw< -1-1e-12)return null;
 const elbow=Math.acos(Math.max(-1,Math.min(1,raw)));
 return [elbow,-elbow].map(b=>({q1:wrapDegrees((Math.atan2(target.y,target.x)-Math.atan2(l2*Math.sin(b),l1+l2*Math.cos(b)))*180/Math.PI),q2:wrapDegrees(b*180/Math.PI)}));
}
