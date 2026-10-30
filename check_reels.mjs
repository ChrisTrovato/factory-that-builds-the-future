import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {reels,signalCategories,validateSignals,filterSignals,signalIndex,signalEmbedUrl,signalVideoUrl,signalTime} from './public/reels.js';
import {allMissions} from './public/learning-catalog.js';
import {projects} from './public/project-blueprints.js';

assert.deepEqual(validateSignals(),[]);
assert.equal(reels.length,7);
assert.equal(new Set(reels.map(r=>r.videoId)).size,7);
assert.equal(new Set(reels.map(r=>r.speaker)).size,7);
const missionIds = new Set(allMissions.map(m=>m.id));
const projectIds = new Set(projects.map(p=>p.id));
for (const r of reels) {
  assert.ok(r.watchFor.length > 50 && r.realityCheck.length > 65 && r.question.endsWith('?'),`${r.id} needs substantive context`);
  assert.equal(r.actions.length,2);
  for(const action of r.actions){
    const [,kind,id]=action.href.split('/');
    assert.ok((kind==='mission'?missionIds:projectIds).has(id),`${r.id} links to missing ${kind} ${id}`);
  }
  const embed = new URL(signalEmbedUrl(r.videoId));
  assert.equal(embed.hostname,'www.youtube-nocookie.com');
  assert.equal(embed.pathname,`/embed/${r.videoId}`);
  assert.equal(embed.searchParams.get('autoplay'),'0');
  assert.equal(embed.searchParams.get('playsinline'),'1');
  assert.equal(embed.searchParams.has('list'),false,'No playlist should start an endless feed');
  assert.equal(embed.searchParams.has('start'),false,'Full-talk link starts normally');
  assert.equal(embed.searchParams.has('end'),false,'Full-talk link has no preview stop');
  const preview=new URL(signalEmbedUrl(r.videoId,r.preview));
  assert.equal(Number(preview.searchParams.get('start')),r.preview.start);
  assert.equal(Number(preview.searchParams.get('end')),r.preview.end);
  assert.equal(r.preview.end-r.preview.start,90);
  assert.equal(new URL(signalVideoUrl(r.videoId)).searchParams.get('v'),r.videoId);
  assert.equal('duration' in r,false,'Do not present unverified durations');
}

for (const malformed of ['',null,12345678901,'https://evil.example','x" onload="','../../thing','valid-id-toolong']) {
  assert.throws(()=>signalEmbedUrl(malformed),TypeError);
  assert.throws(()=>signalVideoUrl(malformed),TypeError);
}
assert.ok(validateSignals([...reels,reels[0]]).some(e=>e.includes('duplicate')));
assert.ok(validateSignals([{...reels[0],videoId:'bad',sourceUrl:'javascript:alert(1)',actions:[]}]).length>=3);
assert.ok(validateSignals([{...reels[0],sourceUrl:'https://www.ted.com.evil.example/video'}]).some(e=>e.includes('source')));
assert.ok(validateSignals([null]).length);
assert.ok(validateSignals([]).length);
const nvidia=reels.find(r=>r.id==='huang-physical-ai');
assert.equal(nvidia.preview.start,1*3600+55*60+35);
assert.equal(nvidia.preview.end,1*3600+57*60+5,'YouTube end must be absolute, not 90');
assert.equal(reels.filter(r=>r.preview.type==='opening'&&r.preview.start===0&&r.preview.end===90).length,6);
assert.ok(validateSignals([{...nvidia,preview:{...nvidia.preview,start:123,end:213}}]).some(e=>e.includes('Unverified')));
assert.ok(validateSignals([{...reels[0],preview:{...reels[0].preview,start:1,end:91}}]).some(e=>e.includes('zero')));
assert.equal(signalTime(0),'0:00');assert.equal(signalTime(90),'1:30');assert.equal(signalTime(6935),'1:55:35');assert.equal(signalTime(7025),'1:57:05');
for(const seconds of [-1,.5,NaN,'90']) assert.throws(()=>signalTime(seconds),RangeError);
for(const window of [{start:0},{end:90},{start:-1,end:89},{start:90,end:90},{start:100,end:90},{start:.5,end:90},{start:0,end:86401}]) assert.throws(()=>signalEmbedUrl(reels[0].videoId,window),RangeError);
assert.throws(()=>signalEmbedUrl(reels[0].videoId,null),TypeError);

const snapshot=JSON.stringify(reels);
const filtered=signalCategories.filter(c=>c.id!=='all').flatMap(c=>filterSignals(c.id));
assert.equal(filtered.length,reels.length);
assert.equal(new Set(filtered.map(r=>r.id)).size,reels.length);
const all=filterSignals();all.pop();assert.equal(reels.length,7);
assert.deepEqual(filterSignals('unknown'),[]);
assert.equal(JSON.stringify(reels),snapshot);
assert.equal(signalIndex(0,-1,7),0);
assert.equal(signalIndex(6,1,7),6);
assert.equal(signalIndex(2,1,7),3);
assert.equal(signalIndex(2,-1,7),1);
assert.equal(signalIndex(0,999,7),6);
assert.equal(signalIndex(0,1,1),0);
for(const args of [[0,1,0],[0,1,-1],[0,.5,7],[NaN,1,7]]) assert.throws(()=>signalIndex(...args),TypeError);

// Guard the deliberately small privacy surface. These do not replace browser QA.
const code=readFileSync(new URL('./public/reels.js',import.meta.url),'utf8');
const css=readFileSync(new URL('./public/reels.css',import.meta.url),'utf8');
const data=readFileSync(new URL('./public/reels-data.js',import.meta.url),'utf8');
assert.equal((code.match(/<h1\b/g)||[]).length,1,'The standalone Signal route needs one h1');
assert.match(code,/document\.title = 'Signal — The Factory'/);
assert.match(code,/Short previews\. Full original talks\./,'Distinguish previews from original talks');
assert.doesNotMatch(code,/\b(fetch|XMLHttpRequest|WebSocket|sendBeacon)\b/);
assert.doesNotMatch(code,/<(?:iframe|img|script)\b/i,'No remote element in initial markup');
assert.doesNotMatch(code+css+data,/i\.ytimg\.com|img\.youtube\.com|youtube\.com\/iframe_api|@import/);
assert.doesNotMatch(css,/url\s*\(/i,'CSS posters must not retrieve an external asset');
assert.doesNotMatch(code,/localStorage|sessionStorage/,'Signal must not inspect saved notes/progress');
assert.equal((code.match(/frame\.src\s*=/g)||[]).length,1,'Only the click-to-load handler should set an iframe source');
const loadFunction=code.slice(code.indexOf('function loadVideo('),code.indexOf('function onClick(event)'));
assert.match(loadFunction,/frame\.src = signalEmbedUrl\(item\.videoId,mode==='preview'\?item\.preview:\{\}\)/);
assert.match(loadFunction,/strict-origin-when-cross-origin/);
assert.match(code,/case 'load-preview': loadVideo\('preview'\)/);
assert.match(code,/case 'load-full': loadVideo\('full'\)/);
assert.match(code,/scope\.querySelectorAll\('iframe'\)\.forEach\(frame=>frame\.remove\(\)\)/,'Destroy must stop the player');
assert.match(css,/prefers-reduced-motion/);
console.log('PASS: 7 attributed signals, seven 90-second preview windows, absolute end-time arithmetic, 14 valid learning actions, bounded navigation, autoplay-off embeds, and consent/privacy source guards. Live playback still requires browser QA.');
