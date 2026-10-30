import {reels, signalCategories, signalSourcesChecked} from './reels-data.js';

export {reels, signalCategories};
const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let instance = 0;

export function signalVideoUrl(videoId) {
  if (typeof videoId !== 'string' || !VIDEO_ID.test(videoId)) throw new TypeError('Invalid YouTube video ID.');
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function signalEmbedUrl(videoId, window = {}) {
  if (typeof videoId !== 'string' || !VIDEO_ID.test(videoId)) throw new TypeError('Invalid YouTube video ID.');
  if (!window || typeof window !== 'object' || Array.isArray(window)) throw new TypeError('Invalid preview window.');
  const {start,end} = window;
  const hasWindow = start !== undefined || end !== undefined;
  if (hasWindow && (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end <= start || end > 86400)) throw new RangeError('Preview times must be whole seconds with 0 ≤ start < end ≤ 86400.');
  // Constructing this string does not contact YouTube. Only loadVideo assigns it.
  // YouTube's end parameter is an absolute time, not a duration after start.
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&playsinline=1&rel=0${hasWindow?`&start=${start}&end=${end}`:''}`;
}

export function signalTime(seconds) {
  if (!Number.isInteger(seconds) || seconds < 0) throw new RangeError('Time must be nonnegative whole seconds.');
  const h=Math.floor(seconds/3600),m=Math.floor(seconds%3600/60),s=seconds%60;
  return h?`${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`:`${m}:${String(s).padStart(2,'0')}`;
}

export function filterSignals(category = 'all', items = reels) {
  return category === 'all' ? [...items] : items.filter(item => item.category === category);
}

export function signalIndex(current, delta, length) {
  if (![current, delta, length].every(Number.isInteger) || length < 1) throw new TypeError('Signal navigation requires integers and a nonempty collection.');
  return Math.max(0, Math.min(length - 1, current + delta));
}

export function validateSignals(items = reels) {
  const errors = [];
  const ids = new Set(), videos = new Set();
  const categories = new Set(signalCategories.filter(x => x.id !== 'all').map(x => x.id));
  if (!Array.isArray(items) || !items.length) return ['A collection must contain at least one signal.'];
  for (const item of items) {
    if (!item || typeof item !== 'object') { errors.push('Invalid signal record.'); continue; }
    if (typeof item.id !== 'string' || !/^[a-z0-9-]+$/.test(item.id) || ids.has(item.id)) errors.push(`Invalid or duplicate signal ID: ${item.id}`);
    ids.add(item.id);
    if (typeof item.videoId !== 'string' || !VIDEO_ID.test(item.videoId) || videos.has(item.videoId)) errors.push(`Invalid or duplicate video ID: ${item.id}`);
    videos.add(item.videoId);
    for (const key of ['speaker','role','title','publisher','sourceLabel','evidence','hook','summary','watchFor','realityCheck','question']) {
      if (typeof item[key] !== 'string' || !item[key].trim()) errors.push(`Missing ${key}: ${item.id}`);
    }
    if (!Number.isInteger(item.year) || item.year < 1950 || item.year > 2026) errors.push(`Invalid event year: ${item.id}`);
    if (!categories.has(item.category)) errors.push(`Invalid category: ${item.id}`);
    if (!['robot','compute','orbit','trajectory','launch','habitat','mars'].includes(item.motif)) errors.push(`Invalid motif: ${item.id}`);
    if (!['lime','orange','cream'].includes(item.color)) errors.push(`Invalid color: ${item.id}`);
    const preview=item.preview;
    if (!preview || !Number.isInteger(preview.start) || !Number.isInteger(preview.end) || preview.start<0 || preview.end-preview.start!==90 || !preview.label || !preview.timingNote) errors.push(`Invalid 90-second preview: ${item.id}`);
    else if (preview.type==='opening' && (preview.start!==0 || preview.timestampSource!==null)) errors.push(`Opening preview must begin at zero: ${item.id}`);
    else if (preview.type==='chapter' && (item.id!=='huang-physical-ai' || preview.start!==6935 || preview.timestampSource!==`https://www.youtube.com/watch?v=${item.videoId}`)) errors.push(`Unverified chapter offset: ${item.id}`);
    else if (!['opening','chapter'].includes(preview.type)) errors.push(`Unknown preview type: ${item.id}`);
    try {
      const url = new URL(item.sourceUrl);
      if (url.protocol !== 'https:' || !['www.ted.com','www.nvidia.com','www.blueorigin.com','www.youtube.com'].includes(url.hostname)) errors.push(`Unapproved source: ${item.id}`);
    } catch { errors.push(`Invalid source URL: ${item.id}`); }
    if (!Array.isArray(item.actions) || item.actions.length < 1) errors.push(`Missing action: ${item.id}`);
    else for (const action of item.actions) {
      if (!/^#\/(mission|project)\/[a-z0-9-]+$/.test(action.href) || !action.label || !action.kind || !action.detail) errors.push(`Invalid learning action: ${item.id}`);
    }
  }
  return errors;
}

function posterArt(motif, prefix) {
  const drawings = {
    robot:`<path d="M110 270h155l50 45M140 270l-38 90 40 16m92-106 40 90-40 16M166 263l19-51 60-22 34 23"/><circle cx="185" cy="212" r="12"/><circle cx="245" cy="190" r="12"/><path d="M279 213l34-32m-34 32 23 24"/><path class="sg-art-faint" d="M70 390h280M95 140h60m140 0h35M210 110v60"/><circle class="sg-art-faint" cx="210" cy="250" r="125"/>`,
    compute:`<rect x="115" y="163" width="190" height="190" rx="24"/><rect x="146" y="194" width="128" height="128" rx="10"/><path d="M160 163v-37m50 37v-37m50 37v-37M160 353v37m50-37v37m50-37v37M115 210H78m37 48H78m37 48H78m227-96h37m-37 48h37m-37 48h37"/><path class="sg-art-fill" d="m189 216-22 49h40l-9 38 55-63h-41l10-24z"/>`,
    orbit:`<circle cx="210" cy="258" r="98"/><ellipse cx="210" cy="258" rx="158" ry="53" transform="rotate(-32 210 258)"/><path class="sg-art-faint" d="M114 258h192M210 160c-75 46-75 150 0 196m0-196c75 46 75 150 0 196"/><circle class="sg-art-fill" cx="333" cy="193" r="11"/><path d="m292 139 17-20m-6 45 27-8"/>`,
    trajectory:`<circle cx="210" cy="310" r="109"/><path class="sg-art-faint" d="M103 310h214m-107-109c-58 55-58 163 0 218m0-218c58 55 58 163 0 218"/><path d="M109 279C90 102 304 87 318 279"/><path class="sg-art-fill" d="m307 259 13 25 12-27z"/><circle cx="110" cy="279" r="9"/><path class="sg-art-faint" d="M64 432h294"/>`,
    launch:`<path d="M179 300V190q0-47 31-77 31 30 31 77v110zM179 252l-35 44v37l35-20m62-61 35 44v37l-35-20M192 322l18 72 18-72"/><circle cx="210" cy="214" r="18"/><path class="sg-art-faint" d="M88 394h56m132 0h56M94 174h33m164-18h30M128 223v21m170 1v21"/>`,
    habitat:`<ellipse cx="210" cy="252" rx="144" ry="85"/><ellipse cx="210" cy="252" rx="111" ry="61"/><path d="M66 252v42c0 47 64 85 144 85s144-38 144-85v-42M100 307v42m52-22v43m58-33v42m58-52v43m52-63v42M210 166V103m-60 38h120"/><path class="sg-art-faint" d="M105 252h210M210 192v120m-78-101 156 82m0-82-156 82"/>`,
    mars:`<circle cx="210" cy="258" r="125"/><path class="sg-art-faint" d="M110 190q70-8 68 42t95 42M110 332q22-37 65-15t83-7M263 157q-29 39 30 51m-64 157 45-7"/><circle cx="272" cy="288" r="15"/><path d="M60 390c76-10 193-55 280-159m-2 3-20 6m20-6-4 22"/><path class="sg-art-faint" d="M65 132h30m260 230h30"/>`
  };
  return `<svg viewBox="0 0 420 500" aria-hidden="true" focusable="false"><defs><pattern id="${prefix}-grid" width="35" height="35" patternUnits="userSpaceOnUse"><path d="M35 0H0v35" fill="none" stroke="currentColor" stroke-opacity=".1" stroke-width="1"/></pattern></defs><rect width="420" height="500" fill="url(#${prefix}-grid)"/><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${drawings[motif]}</g><text x="30" y="470" fill="currentColor" font-size="10" letter-spacing="3">AN IDEA TO INVESTIGATE</text><path d="M345 460h45m-10-8 10 8-10 8" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
}

export function renderReels(root) {
  if (!root || typeof root.querySelector !== 'function') throw new TypeError('Signal needs a DOM container.');
  document.title = 'Signal — The Factory';
  const prefix = `signal-${++instance}`;
  let category = 'all', index = 0, selected = filterSignals(), destroyed = false;
  const errors = validateSignals();
  if (errors.length) throw new Error(errors.join('\n'));
  root.innerHTML = `<section class="sg-signal" aria-labelledby="${prefix}-heading">
    <header class="sg-intro"><div><p class="sg-kicker"><span aria-hidden="true">↗</span> Signal / a finite collection</p><h1 id="${prefix}-heading">Ambitious ideas.<br><em>Grounded questions.</em></h1></div><p>Short previews. Full original talks.<br>Find a spark in seven conversations about machines and the future. Question the claim. Make one useful next move.</p></header>
    <div class="sg-toolbar"><div class="sg-filters" role="group" aria-label="Filter the collection">${signalCategories.map(c=>`<button type="button" data-category="${c.id}" aria-pressed="${c.id==='all'}">${escapeHTML(c.label)}</button>`).join('')}</div><p class="sg-no-loop">No autoplay. No endless feed.</p></div>
    <div class="sg-layout"><nav class="sg-index" aria-label="Choose a signal"></nav><div class="sg-main"><div class="sg-current"></div><nav class="sg-controls" aria-label="Signal navigation"><button type="button" data-action="previous"><span aria-hidden="true">←</span> Previous</button><p class="sg-position" aria-live="polite" aria-atomic="true"></p><button type="button" data-action="next">Next <span aria-hidden="true">→</span></button></nav><div class="sg-ending" hidden><span aria-hidden="true">↗</span><div><h3>You’ve reached the end of this collection.</h3><p>Choose one question to investigate. A sketch, a calculation, or a small experiment can carry the idea further.</p><a href="#/projects">Find a project to build →</a></div></div></div></div>
    <footer class="sg-editorial"><p><strong>Watch with context.</strong> These original publisher recordings do not imply that their speakers endorse The Factory. Dates matter: a proposal, a demonstration, and a working system are different kinds of evidence. The questions and learning connections here are our editorial guidance, not quotations.</p><details><summary>Sources, playback & privacy</summary><p>Titles, speakers, and video IDs were checked against primary publisher pages on ${signalSourcesChecked}. Playback availability can change. The original video and publisher page are linked on every card.</p><p>This collection sends no requests to YouTube for posters or video players before you choose to <strong>load a preview or full talk</strong>. Loading uses YouTube’s privacy-enhanced player and contacts YouTube/Google, sharing connection information and this site’s origin. Their policies apply. The Factory does not send your notes or learning progress to the player. The player may offer additional content; our collection does not advance itself.</p><p>Each new card requires a separate click. Unload video removes the player; it cannot undo information already sent. Source links leave this site when clicked. Videos are embedded from their publishers, never downloaded or reuploaded.</p><a href="https://support.google.com/youtube/answer/171780?hl=en" target="_blank" rel="noopener noreferrer">YouTube’s embedding & privacy information ↗</a></details></footer>
  </section>`;

  const scope = root.querySelector('.sg-signal');
  const current = scope.querySelector('.sg-current');
  const rail = scope.querySelector('.sg-index');
  const position = scope.querySelector('.sg-position');
  const previous = scope.querySelector('[data-action="previous"]');
  const next = scope.querySelector('[data-action="next"]');
  const ending = scope.querySelector('.sg-ending');
  function draw(focus = false) {
    if (destroyed) return;
    const item = selected[index];
    rail.innerHTML = `<p class="sg-index-label">${selected.length} signals</p>${selected.map((r,i)=>`<button type="button" data-jump="${i}" ${i===index?'aria-current="true"':''}><span class="sg-number">${String(i+1).padStart(2,'0')}</span><span>${escapeHTML(r.speaker)}<small>${escapeHTML(r.publisher)} · ${r.year}</small></span><span aria-hidden="true">${i===index?'↗':'·'}</span></button>`).join('')}`;
    current.innerHTML = `<article class="sg-card" aria-labelledby="${prefix}-question">
      <div class="sg-visual-column"><div class="sg-poster sg-${item.color}"><div class="sg-poster-top"><span>${escapeHTML(item.category==='robotics'?'MACHINES':item.category==='space'?'BEYOND EARTH':'HUMAN FACTOR')}</span><span>${String(index+1).padStart(2,'0')} / ${String(selected.length).padStart(2,'0')}</span></div><div class="sg-media"><div class="sg-art">${posterArt(item.motif,prefix)}</div><div class="sg-load-options"><button type="button" class="sg-load" data-action="load-preview"><span class="sg-play" aria-hidden="true">▶</span><span>Load ${item.preview.type==='chapter'?'90-second robotics preview':'90-second preview'}<small>${item.preview.type==='opening'?'Opening':'Chapter'} · ${signalTime(item.preview.start)}–${signalTime(item.preview.end)}</small></span></button><button type="button" class="sg-full-talk" data-action="load-full">Load full talk <span aria-hidden="true">↗</span></button><span class="sg-connect-note">Either option connects to YouTube</span></div></div><div class="sg-poster-bottom"><p>${escapeHTML(item.speaker)}</p><span>${escapeHTML(item.role)} · ${item.year}</span></div></div>
      <p class="sg-player-status" role="status" aria-live="polite">Player off. Loading contacts YouTube/Google. Press Play after loading.</p><p class="sg-preview-note">${escapeHTML(item.preview.timingNote)}${item.preview.timestampSource?` <a href="${escapeHTML(item.preview.timestampSource)}" target="_blank" rel="noopener noreferrer">Official chapter list ↗</a>`:''}</p>
      <div class="sg-credit"><p class="sg-video-title">${escapeHTML(item.title)}</p><p>Original recording · ${escapeHTML(item.publisher)} · ${item.year}</p><div><a href="${signalVideoUrl(item.videoId)}" target="_blank" rel="noopener noreferrer">Watch original on YouTube ↗</a><a href="${escapeHTML(item.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.sourceLabel)} ↗</a></div></div></div>
      <div class="sg-thinking"><p class="sg-evidence"><span aria-hidden="true"></span>${escapeHTML(item.evidence)}</p><h3 id="${prefix}-question" tabindex="0" aria-describedby="${prefix}-keys">${escapeHTML(item.hook)}</h3><p id="${prefix}-keys" class="sg-sr">Use Left and Right Arrow keys while this heading is focused to move through this collection.</p><p class="sg-summary">${escapeHTML(item.summary)}</p><div class="sg-lens"><span class="sg-label">01 / Watch for</span><p>${escapeHTML(item.watchFor)}</p></div><div class="sg-lens sg-reality"><span class="sg-label">02 / Reality check</span><p>${escapeHTML(item.realityCheck)}</p></div><div class="sg-question"><span class="sg-label">03 / Your question</span><p>${escapeHTML(item.question)}</p></div><div class="sg-actions"><p class="sg-label">Turn the spark into a skill</p>${item.actions.map(a=>`<a class="sg-learning-link" href="${escapeHTML(a.href)}"><span class="sg-action-kind">${escapeHTML(a.kind)}</span><span><strong>${escapeHTML(a.label)}</strong><small>${escapeHTML(a.detail)}</small></span><span aria-hidden="true">↗</span></a>`).join('')}</div></div>
    </article>`;
    previous.disabled = index === 0;
    next.disabled = index === selected.length - 1;
    position.textContent = `${index+1} of ${selected.length} · ${item.speaker}`;
    ending.hidden = index !== selected.length - 1;
    if (focus) {
      const heading = current.querySelector('h3');
      heading.focus({preventScroll:true});
      // Only scroll when navigation has put the new card outside the viewport.
      const top = current.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * .6) current.scrollIntoView({behavior:'auto',block:'start'});
    }
  }
  function loadVideo(mode = 'preview') {
    const item = selected[index];
    const media = current.querySelector('.sg-media');
    const status = current.querySelector('.sg-player-status');
    const wrap = document.createElement('div');
    wrap.className = 'sg-embed-wrap';
    const frame = document.createElement('iframe');
    frame.title = `${item.title} — ${item.speaker}, ${item.publisher}`;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allow = 'encrypted-media; fullscreen; picture-in-picture';
    frame.allowFullscreen = true;
    // The only provider request in this module begins here, inside a click handler.
    frame.src = signalEmbedUrl(item.videoId,mode==='preview'?item.preview:{});
    const help = document.createElement('p');
    help.className = 'sg-embed-help';
    help.textContent = `${mode==='preview'?`Requested preview: ${signalTime(item.preview.start)}–${signalTime(item.preview.end)}. `:'Full original talk. '}Press Play in the player. If it is blocked or unavailable, use “Watch original on YouTube” below.`;
    const options = document.createElement('div'); options.className='sg-loaded-options';
    const alternative = document.createElement('button');
    alternative.type='button'; alternative.className='sg-unload'; alternative.dataset.action=mode==='preview'?'load-full':'load-preview';
    alternative.textContent=mode==='preview'?'Load full talk':'Load 90-second preview';
    const unload = document.createElement('button');
    unload.type = 'button'; unload.dataset.action = 'unload'; unload.className = 'sg-unload';
    unload.textContent = 'Unload video';
    options.append(alternative,unload);
    wrap.append(frame,help,options);
    media.replaceChildren(wrap);
    media.classList.add('sg-media-loaded');
    status.textContent = `${mode==='preview'?item.preview.label:'Full talk'} requested. YouTube controls playback; availability cannot be confirmed here.`;
    frame.addEventListener('error',()=>{if(!destroyed && frame.isConnected) status.textContent = 'The player could not load. Open the original on YouTube, or unload the video.';},{once:true});
    unload.focus({preventScroll:true});
  }
  function onClick(event) {
    const button = event.target.closest('button');
    if (!button || !scope.contains(button)) return;
    if (button.dataset.category) {
      category = button.dataset.category;
      selected = filterSignals(category); index = 0;
      scope.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===category)));
      draw(false); return;
    }
    if (button.dataset.jump !== undefined) { index = Number(button.dataset.jump); draw(true); return; }
    switch(button.dataset.action) {
      case 'previous': index = signalIndex(index,-1,selected.length); draw(true); break;
      case 'next': index = signalIndex(index,1,selected.length); draw(true); break;
      case 'load-preview': loadVideo('preview'); break;
      case 'load-full': loadVideo('full'); break;
      case 'unload': draw(false); current.querySelector('[data-action="load-preview"]').focus({preventScroll:true}); break;
    }
  }
  function onKey(event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
    if (event.target.closest('input,textarea,select,button,a,iframe,[contenteditable]')) return;
    const newIndex = signalIndex(index,event.key==='ArrowRight'?1:-1,selected.length);
    if (newIndex !== index) { event.preventDefault(); index = newIndex; draw(true); }
  }
  scope.addEventListener('click',onClick);
  scope.addEventListener('keydown',onKey);
  draw();
  return {destroy() {
    if (destroyed) return;
    destroyed = true;
    scope.removeEventListener('click',onClick);
    scope.removeEventListener('keydown',onKey);
    // Detaching the player stops playback when the route changes.
    scope.querySelectorAll('iframe').forEach(frame=>frame.remove());
  }};
}
