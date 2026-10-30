// Curated primary sources, checked 2026-10-29. Editorial prompts are original,
// not quotations. Dates identify the recorded event, not present-day readiness.
// The application deliberately does not request remote posters or metadata.
export const signalSourcesChecked = '2026-10-29';
export const signalCategories = [
  {id:'all', label:'All signals'},
  {id:'robotics', label:'Robots & computation'},
  {id:'space', label:'Space & infrastructure'},
  {id:'mindset', label:'Engineering mindset'}
];

export const reels = [
  {
    id:'raibert-mobility', category:'robotics', motif:'robot', color:'lime',
    speaker:'Marc Raibert', role:'Boston Dynamics founder', year:2017,
    title:'Meet Spot, the robot dog that can run, hop and open doors',
    publisher:'TED', videoId:'AO4In7d6X-c',
    sourceUrl:'https://www.ted.com/talks/marc_raibert_meet_spot_the_robot_dog_that_can_run_hop_and_open_doors',
    sourceLabel:'TED talk & transcript', evidence:'Robot demonstration',
    hook:'A step is a whole-body problem.',
    summary:'Raibert presents robotic mobility and manipulation, including a live SpotMini demonstration. Watch a machine turn a geometric possibility into coordinated motion.',
    watchFor:'Look for the relationship between balance, sensing, and manipulation. A gripper reaching a target is only one part of the task.',
    realityCheck:'A successful demonstration establishes a capability under those conditions. It does not establish unattended reliability, maintenance burden, or performance in every environment.',
    question:'If the floor changed, what would you measure before trusting the same motion?',
    actions:[
      {label:'Map a paper arm’s reach', href:'#/project/paper-linkage', kind:'Build', detail:'Use two paper links to find reachable and unreachable targets.'},
      {label:'Make vectors visible', href:'#/mission/vectors', kind:'Learn', detail:'Separate a direction into components.'}
    ]
  },
  {
    id:'huang-physical-ai', category:'robotics', motif:'compute', color:'orange',
    speaker:'Jensen Huang', role:'NVIDIA founder and CEO', year:2025,
    title:'GTC March 2025 Keynote with NVIDIA CEO Jensen Huang',
    publisher:'NVIDIA', videoId:'_waPvOwL9Z8',
    sourceUrl:'https://www.nvidia.com/en-us/on-demand/session/gtc25-s72484/',
    sourceLabel:'NVIDIA keynote page', evidence:'Company keynote & roadmap',
    hook:'Intelligence still needs a power budget.',
    summary:'Huang connects accelerated computing, AI infrastructure, simulation, and robotics. This is a company’s account of its technology and ambitions.',
    watchFor:'Follow the chain from a virtual environment to a physical machine. The official video’s chapter list identifies “Physical AI and Robotics” at 1:55:35.',
    realityCheck:'A keynote combines demonstrations, product announcements, and forecasts. Ask what was measured, under which conditions, and which claims remain a roadmap.',
    question:'What evidence would convince you that a simulated success transfers to a real machine?',
    actions:[
      {label:'Test a measurement claim', href:'#/project/measurement', kind:'Build', detail:'Compare repeatability with accuracy using a simple placement guide.'},
      {label:'Interrogate the evidence', href:'#/mission/research', kind:'Learn', detail:'Trace a claim back to a source and its limits.'}
    ]
  },
  {
    id:'hadfield-preparation', category:'mindset', motif:'orbit', color:'cream',
    speaker:'Chris Hadfield', role:'Astronaut', year:2014,
    title:'What I learned from going blind in space',
    publisher:'TED', videoId:'Zo62S0ulqhA',
    sourceUrl:'https://www.ted.com/talks/chris_hadfield_what_i_learned_from_going_blind_in_space',
    sourceLabel:'TED talk & transcript', evidence:'Firsthand account',
    hook:'Preparation gives courage something to stand on.',
    summary:'Hadfield describes fear, preparation, and losing vision during a spacewalk. His account makes the human work behind an extraordinary mission tangible.',
    watchFor:'Notice the move from a frightening possibility to preparation for a specific failure. What can practice make familiar?',
    realityCheck:'One astronaut’s experience is not a complete safety procedure. The useful learning move is to identify a failure, a warning sign, and a recovery plan.',
    question:'What could fail in your next small project, and how would you notice before proceeding?',
    actions:[
      {label:'Write a design review', href:'#/project/design-review', kind:'Build', detail:'Explain a decision, evidence, remaining uncertainty, and a next test.'},
      {label:'Reason with uncertainty', href:'#/mission/uncertainty', kind:'Learn', detail:'Make the limits of a measurement visible.'}
    ]
  },
  {
    id:'shotwell-transport', category:'space', motif:'trajectory', color:'orange',
    speaker:'Gwynne Shotwell', role:'SpaceX engineer and executive', year:2018,
    title:'SpaceX’s plan to fly you across the globe in 30 minutes',
    publisher:'TED', videoId:'Dar8P3r7GYA',
    sourceUrl:'https://www.ted.com/talks/gwynne_shotwell_spacex_s_plan_to_fly_you_across_the_globe_in_30_minutes',
    sourceLabel:'TED conversation & transcript', evidence:'Historical proposal',
    hook:'Fast flight is only one part of a journey.',
    summary:'In conversation with Chris Anderson, Shotwell discusses SpaceX’s work and its then-proposed rocket transport ambitions. Read the 2018 title as a proposal from that time.',
    watchFor:'Separate a vehicle’s proposed flight time from the system needed to serve passengers: access, preparation, turnaround, operations, and recovery.',
    realityCheck:'This historical talk is not evidence of an available passenger service. Proposed schedules, costs, and performance need later, independent verification.',
    question:'What would you include in door-to-door time that is absent from time spent in flight?',
    actions:[
      {label:'Find the factory bottleneck', href:'#/project/factory-flow', kind:'Build', detail:'Track a small process through every station, not just its fastest one.'},
      {label:'Read a rate correctly', href:'#/mission/ratios', kind:'Learn', detail:'Connect units, throughput, and time.'}
    ]
  },
  {
    id:'beck-small-rockets', category:'space', motif:'launch', color:'lime',
    speaker:'Peter Beck', role:'Rocket Lab founder', year:2019,
    title:'Small rockets are the next space revolution',
    publisher:'TED', videoId:'DhnBn_c9f8Q',
    sourceUrl:'https://www.ted.com/talks/peter_beck_small_rockets_are_the_next_space_revolution',
    sourceLabel:'TED talk & transcript', evidence:'Founder’s engineering perspective',
    hook:'A smaller machine can serve a different mission.',
    summary:'Beck explains his interest in small rockets and small spacecraft. The talk offers a way to think about choosing a vehicle around the job it must do.',
    watchFor:'Ask what a smaller payload changes about the mission, then what it leaves unchanged about launch operations and access to orbit.',
    realityCheck:'Small does not automatically mean cheaper per kilogram or easier to operate. Payload, destination, schedule, and launch constraints all affect the comparison.',
    question:'Which requirement would make a small dedicated vehicle preferable to sharing a larger one?',
    actions:[
      {label:'Work through a tradeoff', href:'#/mission/economics', kind:'Learn', detail:'Compare alternatives against the same useful outcome.'},
      {label:'Build an orbital model', href:'#/project/orbital-model', kind:'Build', detail:'State the assumptions behind a momentum calculation.'}
    ]
  },
  {
    id:'bezos-infrastructure', category:'space', motif:'habitat', color:'cream',
    speaker:'Jeff Bezos', role:'Blue Origin founder', year:2019,
    title:'Blue Origin 2019: For the Benefit of Earth',
    publisher:'Blue Origin', videoId:'GQ98hGUe6FM',
    sourceUrl:'https://www.blueorigin.com/news/going-to-space-to-benefit-earth-full-event-replay',
    sourceLabel:'Blue Origin event page', evidence:'Long-term vision & announcement',
    hook:'Every future city starts with an inventory.',
    summary:'Bezos presents Blue Origin’s vision for space and announces its Blue Moon lander design. The event invites a larger question: what infrastructure must exist before a settlement can work?',
    watchFor:'Translate the vision into dependencies: power, transport, construction, repair, and supplies. Which depends on which?',
    realityCheck:'An announced design or illustrated habitat is not a demonstrated settlement. This 2019 presentation does not establish delivery dates, self-sufficiency, or economic viability.',
    question:'If resupply stopped, which imported component would interrupt the system first?',
    actions:[
      {label:'Design for a repair', href:'#/project/service-module', kind:'Build', detail:'Make a cardboard module that can be removed and replaced.'},
      {label:'Inspect exponential growth', href:'#/mission/exponential', kind:'Learn', detail:'Identify the assumptions behind a growth curve.'}
    ]
  },
  {
    id:'musk-multiplanetary', category:'space', motif:'mars', color:'orange',
    speaker:'Elon Musk', role:'SpaceX founder', year:2017,
    title:'Making Life Multiplanetary',
    publisher:'SpaceX', videoId:'tdUX3ypDVwI',
    sourceUrl:'https://www.youtube.com/watch?v=tdUX3ypDVwI',
    sourceLabel:'SpaceX’s original IAC recording', evidence:'Historical architecture proposal',
    hook:'Landing is the beginning of the supply chain.',
    summary:'At IAC 2017, Musk presents a proposed transport architecture for a lasting human presence on Mars. Use it as a historical statement of ambition and a system to question.',
    watchFor:'Trace the steps that must work together: transport, arrival, surface operations, and continued support. One successful step does not establish the whole chain.',
    realityCheck:'The 2017 architecture and forecasts are historical proposals. This video does not prove a self-sustaining Mars settlement or validate its schedule and costs.',
    question:'After the first landing, what must keep working every day for the mission to continue?',
    actions:[
      {label:'Plan a rover mission', href:'#/project/virtual-rover', kind:'Build', detail:'Balance a route, obstacles, energy, and a useful objective.'},
      {label:'Put units on the ambition', href:'#/mission/units', kind:'Learn', detail:'Start turning a big idea into quantities you can check.'}
    ]
  }
].map(item => ({...item, preview: item.id === 'huang-physical-ai' ? {
  start:6935, end:7025, type:'chapter', label:'90-second robotics preview',
  timingNote:'The official video lists Physical AI and Robotics at 1:55:35. This preview requests the next 90 seconds, not the full chapter.',
  timestampSource:'https://www.youtube.com/watch?v=_waPvOwL9Z8'
} : {
  start:0, end:90, type:'opening', label:'90-second opening preview',
  timingNote:'The opening 90 seconds of the original recording, including any introduction. This is not a selected highlight.',
  timestampSource:null
}}));
