import {renderArcade} from './arcade.js';
import {renderReels} from './reels.js';
import {renderExpeditions} from './expeditions.js';
import {renderSandbox} from './sandbox.js';
import {searchFlightDeck} from './flight-deck.js';
import {renderLab} from './lab.js';
import {renderLearn,renderMission,renderJourney,renderDiscover,searchMissions} from './experience.js';
import {renderMathStudio} from './math-studio.js';
import {renderHorizonHome,renderAtlas,renderRoadmap,renderProjects,renderProject,searchHorizons} from './horizon.js';
import {renderPractice} from './practice.js';
import {mountBackup} from './backup.js';

const $ = (q,root=document)=>root.querySelector(q);
const main=$('#main'), progress=$('#reading-progress'), dialog=$('#search-dialog');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const readStore=(k,fallback)=>{try{return JSON.parse(localStorage.getItem(k))??fallback}catch{return fallback}};
const writeStore=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{/* Reading remains available without storage. */}};
const state={book:null,sources:[],route:'',chapter:null,labCleanup:null,scrollQueued:false,renderId:0,font:readStore('factory-font',18),dark:readStore('factory-dark',false),saved:readStore('factory-reading',{last:null,positions:{},completed:[]})};
if(!state.saved.positions)state.saved.positions={};
if(!Array.isArray(state.saved.completed))state.saved.completed=[];
const partNames=['The idea becomes industry','The physical grammar','Machines in a working system','Industrial power','Beyond easy reach','Your aerospace path','Choosing depth'];
const roman=['I','II','III','IV','V','VI','VII'];
const chapterLabel=c=>c.number===0?'Prologue':c.number===29?'Epilogue':c.number===30?'Glossary':`Chapter ${c.number}`;
const groups=()=>partNames.map((name,i)=>({name,chapters:state.book.chapters.filter(c=>c.partNumber===i+1)}));

const worlds=[
 {name:'Earth',title:'Begin where you can touch the work.',copy:'The first shipyard is a system of people, tools, power, material, and evidence. A fast robot matters only when the whole process can deliver accepted hardware.',physics:'Gravity + foundations',distance:'People within reach',constraint:'Flow, quality, and the smallest missing dependency',chapter:'14',link:'Inside a terrestrial shipyard'},
 {name:'Ocean',title:'A vehicle becomes a resident system.',copy:'Keeping a robot underwater changes what it needs. The dock, charging interface, seals, communications, and recovery plan become part of the machine.',physics:'Pressure + corrosion',distance:'Intermittent communication',constraint:'Reliable service without easy access',chapter:'15',link:'Enter the underwater workshop'},
 {name:'Orbit',title:'A shipyard with no floor.',copy:'The robot moves, and its spacecraft moves with it. Assembly begins with restraint, capture, momentum, inspection, and a clear reason to build something in orbit.',physics:'Free-falling, never massless',distance:'Remote support',constraint:'Managing contact without a foundation',chapter:'16',link:'Explore the orbital yard'},
 {name:'Moon',title:'The first factory must first start.',copy:'A delivered seed needs power, thermal control, deployable mechanisms, and imported spares before it can turn local material into something useful.',physics:'Vacuum + abrasive dust',distance:'Support from Earth',constraint:'Bootstrap capability, then keep it serviceable',chapter:'18',link:'Land the lunar seed'},
 {name:'Mars',title:'Distance changes the meaning of autonomy.',copy:'When help cannot arrive quickly, diagnosis, inventory, repair, and conservative decisions become industrial capabilities in their own right.',physics:'Thin atmosphere + cold',distance:'Delayed commands and supply',constraint:'Useful work between answers from Earth',chapter:'20',link:'Follow the long interval'}
];

function worldPanel(i){const w=worlds[i];return `<div><h3>${w.title}</h3><p>${w.copy}</p><a class="text-link" href="#/read/${w.chapter}">${w.link}<span>↗</span></a></div><dl class="world-facts"><div><dt>Physical setting</dt><dd>${w.physics}</dd></div><div><dt>Connection to help</dt><dd>${w.distance}</dd></div><div><dt>The engineering question</dt><dd>${w.constraint}</dd></div></dl>`}

function contents(){return groups().map((g,i)=>`<details class="chapter-part" ${i===0?'open':''}><summary><span class="part-num">${roman[i]}</span><span class="part-title">${g.name}</span><span class="part-meta"><span>${g.chapters.length} SECTIONS</span><span class="part-toggle" aria-hidden="true">+</span></span></summary><div class="chapter-list">${g.chapters.map(c=>`<a class="chapter-item" href="#/read/${c.id}"><span>${c.number===0?'P':c.number>28?(c.number===29?'E':'G'):c.id}</span><div><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p></div><span class="duration">${c.minutes} MIN</span><span class="arrow">↗</span></a>`).join('')}</div></details>`).join('')}

function selectWorld(n){document.querySelectorAll('[data-world]').forEach((b,i)=>{b.setAttribute('aria-selected',String(i===n));b.tabIndex=i===n?0:-1});$('#world-panel').innerHTML=worldPanel(n);$('#world-panel').setAttribute('aria-labelledby',`world-tab-${n}`)}

function sidebar(current){return `<aside class="reader-sidebar" aria-label="Book chapters"><p>The complete field guide</p>${groups().map((g,i)=>`<details ${g.chapters.some(c=>c.id===current)?'open':''}><summary>${roman[i]} / ${g.name}</summary>${g.chapters.map(c=>`<a href="#/read/${c.id}" ${c.id===current?'aria-current="page"':''}><span>${c.number===0?'P':c.number>28?'·':c.id}</span>${esc(c.title)}</a>`).join('')}</details>`).join('')}<a href="book.pdf" download>↓ Download PDF</a></aside>`}
function reader(id,anchor){
 const c=state.book.chapters.find(c=>c.id===id);if(!c){notFound();return}
 const restorePos=state.saved.positions[id]||0,readerRender=state.renderId;state.restoring=true;state.chapter=c;state.saved.last=c.id;writeStore('factory-reading',state.saved);
 document.title=`${c.title} — The Factory`;
 document.body.classList.toggle('reader-dark',state.dark);
 const index=state.book.chapters.indexOf(c),prev=state.book.chapters[index-1],next=state.book.chapters[index+1];
 const done=state.saved.completed.includes(id);
 main.innerHTML=`<div class="reader-shell">${sidebar(id)}<article class="chapter-main"><label class="sr-only" for="chapter-picker">Choose a chapter</label><select class="reader-mobile-select" id="chapter-picker">${state.book.chapters.map(ch=>`<option value="${ch.id}" ${ch.id===id?'selected':''}>${chapterLabel(ch)} · ${esc(ch.title)}</option>`).join('')}</select><div class="reader-toolbar"><span>${chapterLabel(c).toUpperCase()} / ${c.minutes} MIN READ</span><div class="reader-controls"><button id="font-less" aria-label="Decrease reading text size">A−</button><button id="font-more" aria-label="Increase reading text size">A+</button><button id="theme-toggle" aria-label="Switch reading theme" aria-pressed="${state.dark}">${state.dark?'☀':'◐'} <span class="theme-label">Theme</span></button></div></div><header class="chapter-heading"><p class="eyebrow">${esc(c.part)} / ${chapterLabel(c)}</p><h1>${esc(c.title)}</h1><p class="chapter-deck">${esc(c.description)}</p></header><div class="chapter-text" id="chapter-text" style="--reading-size:${state.font}px">${c.html}</div><div class="chapter-end"><p>Understanding is something you build. Keep a question, a sketch, or an observation from this chapter.</p><button class="finish-button ${done?'done':''}" id="finish-chapter" aria-pressed="${done}">${done?'✓ Chapter finished':'Mark chapter as finished'}</button><div class="chapter-next">${prev?`<a href="#/read/${prev.id}"><small>← PREVIOUS</small>${esc(prev.title)}</a>`:'<span></span>'}${next?`<a href="#/read/${next.id}"><small>NEXT →</small>${esc(next.title)}</a>`:`<a href="#/sources"><small>NEXT →</small>Explore the research</a>`}</div></div></article><aside class="reader-outline" aria-label="On this page"><h2>Inside this chapter</h2>${c.headings.map(h=>`<a href="#/read/${id}/${h.id}">${esc(h.title)}</a>`).join('')}<div class="chapter-meter" id="chapter-meter">0% explored</div></aside></div>`;
 $('#chapter-picker').addEventListener('change',e=>{location.hash=`/read/${e.target.value}`});
 $('#font-less').addEventListener('click',()=>setFont(-1));$('#font-more').addEventListener('click',()=>setFont(1));
 $('#theme-toggle').addEventListener('click',()=>{state.dark=!state.dark;writeStore('factory-dark',state.dark);document.body.classList.toggle('reader-dark',state.dark);$('#theme-toggle').setAttribute('aria-pressed',String(state.dark));$('#theme-toggle').innerHTML=`${state.dark?'☀':'◐'} <span class="theme-label">Theme</span>`});
 $('#finish-chapter').addEventListener('click',e=>{let complete=state.saved.completed.includes(id);state.saved.completed=complete?state.saved.completed.filter(v=>v!==id):[...state.saved.completed,id];writeStore('factory-reading',state.saved);e.currentTarget.classList.toggle('done',!complete);e.currentTarget.setAttribute('aria-pressed',String(!complete));e.currentTarget.textContent=complete?'Mark chapter as finished':'✓ Chapter finished'});
 requestAnimationFrame(()=>requestAnimationFrame(()=>{
  if(readerRender!==state.renderId||state.chapter?.id!==id)return;
  if(anchor){document.getElementById(anchor)?.scrollIntoView({behavior:'instant',block:'start'})}
  else{window.scrollTo({top:restorePos*Math.max(0,document.documentElement.scrollHeight-innerHeight),behavior:'instant'})}
  state.restoring=false;updateProgress();
 }));
}
function setFont(delta){state.font=Math.min(24,Math.max(16,state.font+delta));$('#chapter-text').style.setProperty('--reading-size',state.font+'px');writeStore('factory-font',state.font);updateProgress()}
function updateProgress(){
 if(state.restoring)return;
 if(!state.chapter){progress.style.width='0';return}
 const article=$('.chapter-main');if(!article)return;
 const top=article.getBoundingClientRect().top+scrollY;
 const maximum=Math.max(1,article.offsetHeight-innerHeight+Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header')));
 const p=Math.max(0,Math.min(1,(scrollY-top)/maximum));progress.style.width=`${p*100}%`;
 const meter=$('#chapter-meter');if(meter)meter.textContent=`${Math.round(p*100)}% explored`;
 state.saved.positions[state.chapter.id]=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);writeStore('factory-reading',state.saved);
}
window.addEventListener('scroll',()=>{if(state.chapter&&!state.scrollQueued){state.scrollQueued=true;requestAnimationFrame(()=>{state.scrollQueued=false;updateProgress()})}},{passive:true});

function sourceCard(s,highlight){return `<article class="source-card ${s.id===highlight?'highlight':''}" id="source-${esc(s.id)}"><div class="source-meta"><span>[${esc(s.id)}] / RESEARCH ENTRY</span><span>${esc(s.status||'See access note')}</span></div><h2>${esc(s.title)}</h2><p class="source-org">${esc(s.organization)} · ${esc(s.date)}</p><p>${esc(s.supports)}</p><p class="limitation"><strong>Evidence boundary.</strong> ${esc(s.limitation||'See the source and associated chapter for scope.')}</p><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">Read the original source ↗</a></article>`}
function sources(id){
 document.title='Research library — The Factory';
 main.innerHTML=`<header class="page-heading"><p class="eyebrow">The research library</p><h1>Follow the evidence.</h1><p>97 research entries. 94 distinct source URLs. Every entry keeps the claim beside its limits. A reported milestone, a forecast, and a functioning industrial system are different kinds of evidence.</p><div class="page-actions"><a class="text-link" href="research.csv" download>Download the research ledger <span>↓</span></a><a class="text-link" href="#/read/13">How to read an ambitious claim <span>↗</span></a></div></header><div class="source-tools"><label class="sr-only" for="source-search">Search research</label><input type="search" id="source-search" placeholder="Search a source, organization, or engineering question…"><label class="sr-only" for="source-filter">Filter source collection</label><select id="source-filter"><option value="">All collections</option><option value="F">Physical foundations</option><option value="I">Industry & power</option><option value="S">Space & remote industry</option><option value="C">College & careers</option></select></div><div class="source-count" id="source-count" aria-live="polite"></div><div class="source-grid" id="source-grid"></div>`;
 const draw=()=>{const q=$('#source-search').value.toLocaleLowerCase().trim(),prefix=$('#source-filter').value;const rows=state.sources.filter(s=>(!prefix||s.id.startsWith(prefix))&&`${s.id} ${s.title} ${s.organization} ${s.supports}`.toLocaleLowerCase().includes(q));$('#source-count').textContent=`${rows.length} ${rows.length===1?'entry':'entries'} · Access baseline: 29 October 2026`;$('#source-grid').innerHTML=rows.length?rows.map(s=>sourceCard(s,id)).join(''):'<p class="empty-state">No sources match those filters. Try a broader term or another collection.</p>'};
 $('#source-search').addEventListener('input',draw);$('#source-filter').addEventListener('change',draw);draw();
 if(id&&state.sources.some(s=>s.id===id))requestAnimationFrame(()=>document.getElementById('source-'+id)?.scrollIntoView({behavior:'instant',block:'start'}));
}

function pathPage(){
 document.title='Your aerospace path — The Factory';
 const projects=state.book.chapters.find(c=>c.id==='24').headings.filter(h=>/^\d+\./.test(h.title));
 main.innerHTML=`<header class="page-heading"><p class="eyebrow">From curiosity to contribution</p><h1>Build a path<br>that makes things possible.</h1><p>Follow your aerospace direction without losing the hands-on work that drew you here. Connect the mathematics, the degree, the projects, and the kind of problems you want to own.</p></header><div class="path-grid"><div><section class="path-intro"><h2>Let each stage give<br>the next one a foundation.</h2><div class="route-steps"><div><small>01 / MATHEMATICAL LANGUAGE</small><h3>Make the quantities mean something.</h3><p>Placement, algebra, trigonometry, calculus, and physical reasoning.</p><a class="text-link" href="#/read/22">Mathematics becomes a physical language ↗</a></div><div><small>02 / LOWER-DIVISION PREPARATION</small><h3>Connect equations to hardware.</h3><p>Physics, chemistry, programming, measurement, and engineering foundations.</p><a class="text-link" href="#/read/23">Explore the aerospace degree ↗</a></div><div><small>03 / TRANSFER & UPPER DIVISION</small><h3>Choose a coherent route.</h3><p>Verify major preparation and articulation, then connect structures, fluids, thermal science, controls, and design.</p></div><div><small>04 / PRACTICE & SPECIALIZATION</small><h3>Build evidence of what you can do.</h3><p>Laboratories, projects, internships, engineering roles, and deeper research questions.</p><a class="text-link" href="#/read/25">Meet the people who make capability repeatable ↗</a></div></div><p class="path-note">A planning checklist, not an enrollment audit. Confirm the sending college, receiving program, academic year, major preparation, general education, and course sequence with current official agreements and an academic adviser.</p></section><section class="graduate-links"><p class="eyebrow">Choose purposeful depth</p><h2>The question comes<br>before the degree.</h2><p>Explore 28 pages on graduate study, research methods, and choosing a specialization connected to useful work.</p>${['26','27','28'].map(id=>{let c=state.book.chapters.find(c=>c.id===id);return `<a href="#/read/${id}"><span>${id} / </span>${esc(c.title)} ↗</a>`}).join('')}</section></div><section class="path-intro"><p class="eyebrow">A ladder of twelve projects</p><h2>Earn the complexity.</h2><p>Start with a question you can test. Each project develops a different kind of engineering evidence; the full chapter explains the artifact, the limits, and the next step.</p><div class="project-grid">${projects.map((p,i)=>`<a class="project-link" href="#/read/24/${p.id}"><span>PROJECT ${String(i+1).padStart(2,'0')}</span><h3>${esc(p.title.replace(/^\d+\.\s*/,''))}</h3></a>`).join('')}</div></section></div>`;
}

function labPage(){document.title='Engineering lab — The Factory';main.innerHTML=`<header class="page-heading"><p class="eyebrow">An engineering notebook you can change</p><h1>Think with the model.</h1><p>Change one assumption. Watch the consequence. These teaching models expose a few useful relationships; they do not predict a factory, qualify hardware, or replace a complete design.</p></header><div id="engineering-lab" class="lab-shell"></div>`;const result=renderLab($('#engineering-lab'));if(typeof result==='function')state.labCleanup=result;else if(result?.destroy)state.labCleanup=()=>result.destroy()}

function home(){renderHorizonHome(main)}
function practicePage(){document.title='The practice deck — The Factory';main.innerHTML=`<header class="exp-page-heading practice-page-heading"><p class="exp-kicker">THE PRACTICE DECK / 36 QUESTIONS THAT CONNECT</p><h1>A little practice.<br>A clearer <em>connection.</em></h1><p>Choose a short session. Commit to a prediction, see why the answer works, and revisit the ideas that need another pass.</p><div class="exp-actions"><a class="exp-link" href="#/studio">Try the idea in a visual experiment ↗</a><a class="exp-link" href="#/learn">Work through a lesson first →</a></div></header><div class="practice-page-host" id="practice-deck"></div>`;const result=renderPractice($('#practice-deck'));const intro=$('#practice-deck .pr-heading');intro.className='sr-only';intro.innerHTML='<h2>Your practice sessions</h2>';if(typeof result==='function')state.labCleanup=result;else if(result?.destroy)state.labCleanup=()=>result.destroy()}
function libraryPage(){document.title='The complete field guide — The Factory';main.innerHTML=`<header class="exp-section library-intro"><div><p class="exp-kicker">THE FACTORY THAT BUILDS THE FUTURE</p><h1>The whole story.<br>At your own pace.</h1><p>Robotic shipyards, industrial power, and the aerospace engineer’s path beyond Earth. A continuous field guide in seven parts, with 28 chapters and 39 original illustrations.</p><div class="exp-actions"><a class="exp-button" href="#/read/${state.saved.last||'00'}">${state.saved.last?'Continue reading':'Start at the beginning'} ↗</a><a class="exp-button outline" href="book.pdf" download>Download all 287 pages ↓</a></div></div><div class="book-spine">THE FACTORY<br><span>THAT BUILDS<br>THE FUTURE</span><small>ROBOTIC SHIPYARDS / INDUSTRIAL POWER</small></div></header><section class="section" id="contents"><p class="eyebrow">THE FULL FIELD GUIDE / SEVEN PARTS</p>${contents()}</section><section class="research-strip"><div><h3>Keep the evidence close.</h3><p>97 annotated research entries, with each claim beside its limits.</p></div><a class="text-link" href="#/sources">Explore the research ↗</a></section>`}
function studioPage(){document.title='Math becomes machinery — The Factory';main.innerHTML=`<header class="exp-page-heading studio-page-head"><p class="exp-kicker">THE MATH STUDIO / FOUR VISUAL EXPERIMENTS</p><h1>Make the symbols<br><em>do something.</em></h1><p>Predict. Change one thing. Watch what moves. These simplified models connect the math on the page to the behavior of a machine.</p></header><h2 class="sr-only">Explore four math experiments</h2><div class="studio-host" id="math-studio"></div>`;const result=renderMathStudio($('#math-studio'));if(typeof result==='function')state.labCleanup=result;else if(result?.destroy)state.labCleanup=()=>result.destroy()}

function notFound(){document.title='Find your way — The Factory';main.innerHTML='<section class="error-page"><p class="eyebrow">A path we have not built</p><h1>Let’s find your way back.</h1><p>That chapter or page does not exist in this edition.</p><a class="button" href="#/">Explore the field guide ↗</a></section>'}

async function route(){
 const thisRender=++state.renderId;await ready;if(thisRender!==state.renderId)return;
 state.labCleanup?.();state.labCleanup=null;state.chapter=null;state.restoring=false;progress.style.width='0';document.body.classList.remove('reader-dark');
 let bits;try{bits=decodeURIComponent(location.hash.replace(/^#\/?/,'')).split('/')}catch{bits=[]}
 const mode=bits[0]||'home';state.route=mode;
 $('#main-nav').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');dialog.close();
 document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===mode||((mode==='mission'||mode==='roadmap')&&a.dataset.nav==='learn')||((mode==='project'||mode==='projects')&&a.dataset.nav==='projects')||(mode==='read'&&a.dataset.nav==='library')||((mode==='lab'||mode==='studio'||mode==='sandbox')&&a.dataset.nav==='arcade'))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 window.scrollTo({top:0,behavior:'instant'});
 document.title='The Factory That Builds the Future — Build what comes next';
 if(mode==='home')home();else if(mode==='read')reader(bits[1]||'00',bits[2]);else if(mode==='lab')labPage();else if(mode==='path')pathPage();else if(mode==='sources')sources(bits[1]);else if(mode==='learn')renderLearn(main);else if(mode==='mission')renderMission(main,bits[1]);else if(mode==='journey'){renderJourney(main,state.saved);mountBackup($('.journey-summary'))}else if(mode==='discover')renderDiscover(main);else if(mode==='library')libraryPage();else if(mode==='studio')studioPage();else if(mode==='atlas')renderAtlas(main,bits[1]);else if(mode==='roadmap')renderRoadmap(main);else if(mode==='projects')renderProjects(main);else if(mode==='project')renderProject(main,bits[1]);else if(mode==='practice')practicePage();else if(['arcade','reels','expeditions','sandbox'].includes(mode)){const fn={arcade:renderArcade,reels:renderReels,expeditions:renderExpeditions,sandbox:renderSandbox}[mode];const result=fn(main,bits[1]);if(typeof result==='function')state.labCleanup=result;else if(result?.destroy)state.labCleanup=()=>result.destroy()}else notFound();
}

function showSearch(){if(!state.book)return;if(!dialog.open)dialog.showModal();$('#search-input').focus()}
function rankChapter(c,q){
 const title=c.title.toLocaleLowerCase(),text=c.text.toLocaleLowerCase(),pos=text.indexOf(q);
 let occurrences=0;for(let at=pos;at>=0;at=text.indexOf(q,at+q.length))occurrences++;
 const headingMatches=c.headings.filter(h=>h.title.toLocaleLowerCase().includes(q)).length;
 const score=(title===q?5000:title.includes(q)?2500:0)+(c.description.toLocaleLowerCase().includes(q)?600:0)+Math.min(headingMatches,5)*200+Math.min(occurrences,100)*20;
 return {c,pos,score};
}
function search(){
 const q=$('#search-input').value.trim().toLocaleLowerCase();const result=$('#search-results');if(q.length<2){result.innerHTML='<p>Search missions, the full book, and its research library. Enter at least two characters.</p>';return}
 const chapters=state.book.chapters.map(c=>rankChapter(c,q)).filter(r=>r.score>0).sort((a,b)=>b.score-a.score||a.c.number-b.c.number).slice(0,9);
 const refs=state.sources.filter(s=>`${s.id} ${s.title} ${s.organization}`.toLocaleLowerCase().includes(q)).slice(0,4);
 const missionResults=searchFlightDeck(q)+searchMissions(q)+searchHorizons(q);
 result.innerHTML=missionResults+chapters.map(({c,pos})=>{const start=Math.max(0,pos-65);let excerpt=c.text.slice(start,start+210).replace(/\s+/g,' ');return `<a class="search-result" href="#/read/${c.id}"><small>${chapterLabel(c).toUpperCase()} · ${c.minutes} MIN</small><h3>${esc(c.title)}</h3><p>${start?'…':''}${esc(excerpt)}…</p></a>`}).join('')+refs.map(s=>`<a class="search-result" href="#/sources/${s.id}"><small>RESEARCH / ${s.id}</small><h3>${esc(s.title)}</h3><p>${esc(s.organization)}</p></a>`).join('');
 if(!chapters.length&&!refs.length&&!missionResults)result.innerHTML=`<p>No results for “${esc($('#search-input').value)}”. Try a broader term, such as repair, orbit, or controls.</p>`;
}
$('.skip-link').addEventListener('click',e=>{e.preventDefault();main.focus({preventScroll:true});main.scrollIntoView({behavior:'instant',block:'start'})});
$('#search-trigger').addEventListener('click',showSearch);$('#search-close').addEventListener('click',()=>dialog.close());$('#search-input').addEventListener('input',search);
$('#search-results').addEventListener('click',e=>{if(e.target.closest('a'))dialog.close()});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
$('#menu-toggle').addEventListener('click',()=>{let open=$('#main-nav').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(open))});
document.addEventListener('keydown',e=>{const typing=/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName)||document.activeElement?.isContentEditable;if((e.key==='/'&&!typing)||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k')){e.preventDefault();showSearch()}});
window.addEventListener('hashchange',route);
const ready=Promise.all([fetch('book.json').then(r=>{if(!r.ok)throw new Error('Book unavailable');return r.json()}),fetch('research.json').then(r=>{if(!r.ok)throw new Error('Research unavailable');return r.json()})]).then(([book,sources])=>{state.book=book;state.sources=sources}).catch(err=>{main.innerHTML='<section class="error-page"><h1>The field guide could not load.</h1><p>Check your connection and reload. The complete PDF is also available below.</p><a class="button" href="book.pdf">Read the PDF ↗</a></section>';console.error(err);throw err});
ready.then(route).catch(()=>{});
