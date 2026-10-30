import {expeditions} from './expeditions-data.js';
import {allMissions} from './learning-catalog.js';
import {projects} from './project-blueprints.js';

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const missionsById = new Map(allMissions.map(item => [item.id, item]));
const projectsById = new Map(projects.map(item => [item.id, item]));
const drafts = new Map();
const blankDraft = () => ({prediction:'', observations:'', reflection:'', criteria:[]});
function cleanDraft(value, count) {
  const source = value && typeof value === 'object' ? value : {};
  return {
    prediction: typeof source.prediction === 'string' ? source.prediction : '',
    observations: typeof source.observations === 'string' ? source.observations : '',
    reflection: typeof source.reflection === 'string' ? source.reflection : '',
    criteria: Array.isArray(source.criteria) ? [...new Set(source.criteria.filter(i => Number.isInteger(i) && i >= 0 && i < count))] : []
  };
}
export function buildExpeditionRecord(expedition, value = {}) {
  const draft = cleanDraft(value, expedition.rubric.length);
  const project = projectsById.get(expedition.build.projectId);
  return [
    'THE FACTORY / EXPEDITION FIELD RECORD', expedition.title, '',
    'QUESTION', expedition.prediction.question, '', 'MY PREDICTION', draft.prediction || '(not recorded)', '',
    'LESSONS', ...expedition.lesson.missionIds.map(id => missionsById.get(id)?.title || id), '',
    'EXPERIMENT', expedition.experiment.label, expedition.experiment.task, '',
    'WHAT TO RECORD', ...expedition.experiment.record.map(item => '- ' + item), '',
    'MY OBSERVATIONS', draft.observations || '(not recorded)', '',
    'BUILD', project?.title || expedition.build.projectId, expedition.build.task, '',
    'MY REFLECTION', draft.reflection || '(not recorded)', '',
    'EVIDENCE CHECK', ...expedition.rubric.map((item, i) => '[' + (draft.criteria.includes(i) ? 'x' : ' ') + '] ' + item.criterion + '\n    ' + item.evidence), '',
    'MODEL BOUNDARY', expedition.experiment.guardrail, '',
    'NEXT CONNECTION', expedition.extension.label + ': ' + expedition.extension.reason, '',
    'Self-assessment records exploration, not a grade or a qualification.'
  ].join('\n');
}
const newTabLink = (href, label, className = 'xp-button') => '<a class="' + className + '" href="' + esc(href) + '" target="_blank" rel="noopener">' + esc(label) + ' <span aria-hidden="true">↗</span><span class="xp-sr"> (opens in a new tab)</span></a>';
const list = (items, className='') => '<ul class="' + className + '">' + items.map(item=>'<li>'+esc(item)+'</li>').join('') + '</ul>';
const stageHeader = (number, label, title) => '<div class="xp-stage-heading"><span aria-hidden="true">'+number+'</span><div><p class="xp-kicker">'+esc(label)+'</p><h2 tabindex="-1">'+esc(title)+'</h2></div></div>';
const trail = () => '<div class="xp-trail" aria-label="Expedition sequence">'+['Learn','Experiment','Build','Reflect'].map((label,i)=>'<span><b>0'+(i+1)+'</b>'+label+'</span>').join('')+'</div>';

function gallery() {
  return '<header class="xp-intro"><div><p class="xp-kicker">SIX EXPEDITIONS / ONE CONNECTED QUESTION AT A TIME</p><h1>Follow an idea<br>until it becomes <em>yours.</em></h1><p class="xp-lead">Learn the relationship. Test a prediction. Make something inspectable. Explain what changed.</p><p>A guided route through the lessons, experiments, and builds already here. Start with the question that catches you; there is no schedule to catch up with.</p></div><div class="xp-intro-thread" aria-hidden="true"><span>01 <b>understand.</b></span><span>02 <b>try.</b></span><span>03 <b>make.</b></span><span>04 <b>explain.</b></span></div></header>'+
    '<section class="xp-gallery" aria-label="Choose an expedition">'+expeditions.map((item,i)=>'<a class="xp-card" href="#/expeditions/'+esc(item.id)+'"><div class="xp-card-image"><img src="'+esc(item.image)+'" alt="" loading="lazy"><span>0'+(i+1)+' / '+esc(item.world)+'</span></div><div class="xp-card-copy"><p class="xp-kicker">'+esc(item.kicker)+'</p><h2>'+esc(item.title)+'</h2><p>'+esc(item.hook)+'</p><div class="xp-card-outcome"><small>LEAVE WITH</small><span>'+esc(item.outcome)+'</span></div><div class="xp-card-foot"><span>'+esc(item.level)+'</span><b aria-hidden="true">↗</b></div></div></a>').join('')+'</section>'+
    '<section class="xp-principle"><p class="xp-kicker">AN EXPEDITION IS A QUESTION WITH A TRAIL</p><h2>Finished means you can<br><em>show your reasoning.</em></h2><p>You can stop after one useful observation or follow the whole sequence. The evidence check helps you see what is supported and what deserves another attempt. A surprising result belongs in the record.</p>'+trail()+'<small>World images are original concept illustrations. The activities use bounded teaching models and low-energy or virtual projects.</small></section>';
}

function detail(item, draft) {
  const project = projectsById.get(item.build.projectId);
  return '<header class="xp-hero"><img src="'+esc(item.image)+'" alt="Original concept illustration connected to '+esc(item.world)+'."><div class="xp-hero-shade"></div><div class="xp-hero-copy"><a class="xp-back" href="#/expeditions">← ALL EXPEDITIONS</a><p class="xp-kicker">'+esc(item.kicker)+'</p><h1>'+esc(item.title)+'</h1><p>'+esc(item.hook)+'</p><div class="xp-meta"><span>'+esc(item.level)+'</span><span>'+esc(item.pace)+'</span></div></div></header>'+
    '<div class="xp-detail-layout"><article class="xp-main"><section class="xp-orientation"><p class="xp-kicker">THE QUESTION BEHIND THE ROUTE</p><h2>What you are making possible.</h2><p class="xp-lead">'+esc(item.why)+'</p><div class="xp-outcome"><span>YOUR EVIDENCE</span><strong>'+esc(item.outcome)+'</strong></div><h3>Bring with you</h3>'+list(item.needs)+'<p class="xp-small">Keep this field record open. Lessons, experiments, and builds open in a new tab. Draft text remains in this page session; export it to keep a copy after reload.</p></section>'+
    '<section class="xp-prediction" id="xp-prediction"><p class="xp-kicker">BEFORE YOU TOUCH A CONTROL</p><h2>'+esc(item.prediction.question)+'</h2><p>'+esc(item.prediction.hint)+'</p><label for="xp-prediction-note">My prediction and the reason behind it</label><textarea id="xp-prediction-note" data-draft="prediction" rows="4" maxlength="12000" placeholder="I expect… because… The observation that would challenge this is…">'+esc(draft.prediction)+'</textarea></section>'+
    '<section class="xp-stage" id="xp-stage-learn">'+stageHeader('01','LEARN THE RELATIONSHIP','Give the symbols a physical meaning.')+'<p>'+esc(item.lesson.task)+'</p><div class="xp-mission-links">'+item.lesson.missionIds.map(id=>{const mission=missionsById.get(id);return newTabLink('#/mission/'+id,mission?.title||id,'xp-mission-link');}).join('')+'</div><div class="xp-evidence-line"><b>Keep</b><span>'+esc(item.lesson.evidence)+'</span></div></section>'+
    '<section class="xp-stage" id="xp-stage-experiment">'+stageHeader('02','TEST THE PREDICTION','Change one thing. Watch what follows.')+'<p>'+esc(item.experiment.task)+'</p>'+newTabLink(item.experiment.href,'Open '+item.experiment.label)+'<h3>Record the comparison</h3>'+list(item.experiment.record)+'<label for="xp-observation-note">Inputs, prediction, result, and any surprise</label><textarea id="xp-observation-note" data-draft="observations" rows="6" maxlength="12000" placeholder="Baseline…\nOne change…\nExpected result…\nObserved result…">'+esc(draft.observations)+'</textarea><aside class="xp-boundary"><p class="xp-kicker">WHAT THIS RESULT DOES NOT ESTABLISH</p><p>'+esc(item.experiment.guardrail)+'</p></aside></section>'+
    '<section class="xp-stage" id="xp-stage-build">'+stageHeader('03','MAKE THE IDEA INSPECTABLE',project?.title||'Build the connected project')+'<p>'+esc(item.build.task)+'</p>'+newTabLink('#/project/'+item.build.projectId,'Open the project blueprint')+'<div class="xp-stretch"><p class="xp-kicker">IF THE QUESTION PULLS YOU FURTHER</p><p>'+esc(item.build.stretch)+'</p></div></section>'+
    '<section class="xp-stage" id="xp-stage-reflect">'+stageHeader('04','MAKE THE REASONING PORTABLE','Say what you know now.')+list(item.reflection.prompts,'xp-reflection-prompts')+'<label for="xp-reflection-note">My explanation, limitation, and next question</label><textarea id="xp-reflection-note" data-draft="reflection" rows="6" maxlength="12000" placeholder="The evidence supports…\nIt does not yet establish…\nThe next useful check is…">'+esc(draft.reflection)+'</textarea><blockquote>'+esc(item.reflection.takeaway)+'</blockquote><details class="xp-debrief"><summary>Compare your explanation with the debrief <span aria-hidden="true">+</span></summary>'+list(item.debrief)+'</details></section>'+
    '<section class="xp-rubric" id="xp-evidence"><p class="xp-kicker">A REVIEW, NOT A GRADE</p><h2>Can your evidence carry the claim?</h2><p>Mark the statements your record currently supports. An unchecked item is a useful next step.</p>'+item.rubric.map((criterion,i)=>'<label class="xp-criterion"><input type="checkbox" data-criterion="'+i+'"'+(draft.criteria.includes(i)?' checked':'')+'><span><strong>'+esc(criterion.criterion)+'</strong><small>'+esc(criterion.evidence)+'</small></span></label>').join('')+'<button type="button" class="xp-button" data-export>Export my field record ↓</button><p class="xp-save-status" role="status" id="xp-export-status">A plain-text record you can keep with your sketches and results.</p></section>'+
    '<section class="xp-next"><p class="xp-kicker">THE NEXT CONNECTION</p><h2>'+esc(item.extension.label)+'</h2><p>'+esc(item.extension.reason)+'</p>'+newTabLink(item.extension.href,'Follow this question','xp-text-link')+'<a class="xp-text-link" href="#/expeditions">Choose another expedition →</a></section></article>'+
    '<aside class="xp-sidebar" aria-label="Expedition guide"><p class="xp-kicker">YOUR FIELD ROUTE</p><h2>One connected<br>piece of work.</h2><nav aria-label="Jump to a stage">'+[['prediction','Predict'],['stage-learn','Learn'],['stage-experiment','Experiment'],['stage-build','Build'],['stage-reflect','Reflect'],['evidence','Review evidence']].map(([id,label],i)=>'<button type="button" data-jump="xp-'+id+'"><span>'+String(i).padStart(2,'0')+'</span>'+label+'<b aria-hidden="true">↘</b></button>').join('')+'</nav><div class="xp-evidence-progress"><span id="xp-progress-text" role="status">'+draft.criteria.length+' of '+item.rubric.length+' evidence statements supported</span><progress id="xp-progress" max="'+item.rubric.length+'" value="'+draft.criteria.length+'">Evidence self-assessment</progress></div><p class="xp-small">Your work stays self-paced. Keep a prediction that failed; it can be the most useful part of the record.</p><button type="button" class="xp-text-link" data-export>Export field record ↓</button></aside></div>';
}

export function renderExpeditions(root, id) {
  const item = id ? expeditions.find(expedition => expedition.id === id) : null;
  const controller = new AbortController();
  const downloadURLs = new Set();
  const timers = new Set();
  let destroyed = false;
  if (!id) {
    document.title = 'Guided expeditions — The Factory';
    root.innerHTML = '<div class="xp-root">'+gallery()+'</div>';
  } else if (!item) {
    document.title = 'Choose an expedition — The Factory';
    root.innerHTML = '<section class="xp-root xp-not-found"><p class="xp-kicker">A DIFFERENT TRAIL</p><h1>Choose a question to follow.</h1><p>This expedition is not in the collection.</p><a class="xp-button" href="#/expeditions">Explore the six expeditions →</a></section>';
  } else {
    document.title = item.title + ' — The Factory';
    const draft = cleanDraft(drafts.get(item.id) || blankDraft(), item.rubric.length);
    drafts.set(item.id, draft);
    root.innerHTML = '<div class="xp-root">'+detail(item, draft)+'</div>';
  }
  const host = root.firstElementChild;
  function currentDraft() { return cleanDraft(drafts.get(item.id), item.rubric.length); }
  if (item) {
    host.addEventListener('input', event => {
      const field = event.target?.dataset?.draft;
      if (!['prediction','observations','reflection'].includes(field)) return;
      const draft = currentDraft(); draft[field] = event.target.value; drafts.set(item.id, draft);
    }, {signal:controller.signal});
    host.addEventListener('change', event => {
      if (!event.target?.matches?.('input[data-criterion]')) return;
      const index = Number(event.target.dataset.criterion);
      if (!Number.isInteger(index) || index < 0 || index >= item.rubric.length) return;
      const draft = currentDraft();
      draft.criteria = event.target.checked ? [...new Set([...draft.criteria,index])] : draft.criteria.filter(i=>i!==index);
      drafts.set(item.id,draft);
      host.querySelector('#xp-progress').value = draft.criteria.length;
      host.querySelector('#xp-progress-text').textContent = draft.criteria.length+' of '+item.rubric.length+' evidence statements supported';
    }, {signal:controller.signal});
    host.addEventListener('click', event => {
      const jump = event.target?.closest?.('[data-jump]');
      if (jump) {
        const section = host.querySelector('#'+jump.dataset.jump);
        const heading = section?.querySelector('h2');
        if (heading) {
          heading.setAttribute('tabindex','-1');
          heading.focus({preventScroll:true});
          section.scrollIntoView({behavior:'auto',block:'start'});
        }
      }
      if (!event.target?.closest?.('[data-export]')) return;
      try {
        const blob = new Blob([buildExpeditionRecord(item,currentDraft())],{type:'text/plain;charset=utf-8'});
        const url = URL.createObjectURL(blob); downloadURLs.add(url);
        const anchor = document.createElement('a'); anchor.href=url; anchor.download='factory-expedition-'+item.id+'.txt';
        host.append(anchor); anchor.click(); anchor.remove();
        const timer = setTimeout(()=>{URL.revokeObjectURL(url);downloadURLs.delete(url);timers.delete(timer);},1000);timers.add(timer);
        host.querySelector('#xp-export-status').textContent='Field-record download requested. Keep it with your other project evidence.';
      } catch {
        host.querySelector('#xp-export-status').textContent='The download could not start. Your draft remains on this page; copy the text before reloading.';
      }
    }, {signal:controller.signal});
  }
  return {destroy() {
    if (destroyed) return;
    destroyed=true; controller.abort();
    timers.forEach(timer=>clearTimeout(timer)); timers.clear();
    downloadURLs.forEach(url=>URL.revokeObjectURL(url)); downloadURLs.clear();
    host?.remove();
  }};
}
