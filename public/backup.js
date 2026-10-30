import {mergePracticeProgress} from './practice.js';
const keys=['factory-journey-v2','factory-reading','factory-projects-v1','factory-practice-v1'];
const obj=x=>x&&typeof x==='object'&&!Array.isArray(x)?x:{};
const strings=x=>Array.isArray(x)?[...new Set(x.filter(v=>typeof v==='string'))]:[];
const numbers=x=>Array.isArray(x)?[...new Set(x.filter(v=>Number.isInteger(v)&&v>=0))]:[];
const stringMap=x=>Object.fromEntries(Object.entries(obj(x)).filter(([k,v])=>!['__proto__','constructor','prototype'].includes(k)&&typeof v==='string'));
const entries=x=>Array.isArray(x)?x.filter(e=>e&&typeof e.text==='string'&&typeof e.at==='string').map(e=>({text:e.text,at:e.at})):[];
function uniqueEntries(list){const seen=new Set();return list.filter(e=>{const k=e.at+'\n'+e.text;if(seen.has(k))return false;seen.add(k);return true}).sort((a,b)=>String(b.at).localeCompare(String(a.at)))}
export function mergeJourney(current,incoming){
 const a=obj(current),b=obj(incoming),notes=stringMap(a.notes),bn=stringMap(b.notes),extra=[],stamp=new Date().toISOString();
 for(const [id,note] of Object.entries(bn)){if(!notes[id]?.trim())notes[id]=note;else if(note.trim()&&notes[id]!==note)extra.push({at:stamp,text:`Imported alternate note for ${id}:\n${note}`})}
 const northStar=typeof a.northStar==='string'&&a.northStar.trim()?a.northStar:typeof b.northStar==='string'?b.northStar:'';
 if(typeof a.northStar==='string'&&typeof b.northStar==='string'&&a.northStar.trim()&&b.northStar.trim()&&a.northStar!==b.northStar)extra.push({at:stamp,text:'Imported alternate north star:\n'+b.northStar});
 const priorEntries=[...entries(a.entries),...entries(b.entries)],priorText=new Set(priorEntries.map(e=>e.text));
 return {completed:[...new Set([...strings(a.completed),...strings(b.completed)])],notes,northStar,entries:uniqueEntries([...priorEntries,...extra.filter(e=>!priorText.has(e.text))]),bookmarks:[...new Set([...strings(a.bookmarks),...strings(b.bookmarks)])]};
}
export function mergeProjectProgress(current,incoming){
 const a=obj(obj(current).projects),b=obj(obj(incoming).projects),out={};
 for(const id of new Set([...Object.keys(a),...Object.keys(b)])){if(['__proto__','constructor','prototype'].includes(id))continue;const x=obj(a[id]),y=obj(b[id]);let notes=typeof x.notes==='string'?x.notes:'';const imported=typeof y.notes==='string'?y.notes:'';if(!notes.trim())notes=imported;else if(imported.trim()&&notes!==imported&&!notes.includes('\n'+imported))notes+='\n\n— Imported alternate record —\n'+imported;out[id]={steps:[...new Set([...numbers(x.steps),...numbers(y.steps)])],evidence:[...new Set([...numbers(x.evidence),...numbers(y.evidence)])],notes,updatedAt:[x.updatedAt,y.updatedAt].filter(v=>typeof v==='string').sort().pop()||''}}
 return {projects:out};
}
function mergeReading(a,b){a=obj(a);b=obj(b);return {last:typeof a.last==='string'?a.last:typeof b.last==='string'?b.last:null,positions:{...obj(b.positions),...obj(a.positions)},completed:[...new Set([...strings(a.completed),...strings(b.completed)])]}}
export function parseBackup(text){
 const d=JSON.parse(text);if(d?.format==='factory-backup-v3'&&d.records&&typeof d.records==='object')return Object.fromEntries(keys.filter(k=>Object.hasOwn(d.records,k)).map(k=>[k,d.records[k]]));
 if(d?.edition==='Factory learning notebook v2'&&d.journey&&d.reading)return {'factory-journey-v2':d.journey,'factory-reading':d.reading};
 throw new Error('Choose a Factory learning backup or the earlier v2 notebook export.');
}
export function mergeBackupRecords(current,incoming){
 const out={...current};for(const k of keys){if(!Object.hasOwn(incoming,k))continue;if(k==='factory-journey-v2')out[k]=mergeJourney(current[k],incoming[k]);else if(k==='factory-reading')out[k]=mergeReading(current[k],incoming[k]);else if(k==='factory-projects-v1')out[k]=mergeProjectProgress(current[k],incoming[k]);else out[k]=mergePracticeProgress(current[k],incoming[k]);}return out;
}
export function readBackupRecords(){const records={};for(const k of keys){try{const raw=localStorage.getItem(k);if(raw!==null)records[k]=JSON.parse(raw)}catch{/* An unavailable record is absent from the backup. */}}return records}
export function downloadBackup(){const a=document.createElement('a'),blob=new Blob([JSON.stringify({format:'factory-backup-v3',exportedAt:new Date().toISOString(),records:readBackupRecords()},null,2)],{type:'application/json'});a.href=URL.createObjectURL(blob);a.download='factory-learning-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
export function mountBackup(container){
 const old=document.querySelector('#export-journey');if(old){old.textContent='Export all learning progress ↓';old.onclick=downloadBackup}
 const box=document.createElement('div');box.className='backup-panel';box.innerHTML='<h3>Bring your learning with you.</h3><p>Back up lessons, notes, practice, and project records. Restore a copy on another browser. Files are read locally.</p><label class="backup-file-label">Choose a backup to restore<input type="file" accept="application/json,.json" id="factory-backup-file"></label><div class="backup-preview" role="status"></div><button type="button" class="exp-button dark" hidden>Merge this backup</button>';
 container.append(box);const input=box.querySelector('input'),preview=box.querySelector('.backup-preview'),button=box.querySelector('button');let pending=null,selection=0;
 input.onchange=async()=>{const selected=++selection;pending=null;button.hidden=true;const file=input.files?.[0];if(!file)return;try{if(file.size>8*1024*1024)throw new Error('This file is over the 8 MB restore limit. Keep the original backup and use a smaller Factory export.');const text=await file.text();if(selected!==selection)return;pending=parseBackup(text);if(!Object.keys(pending).length)throw new Error('This backup has no learning records to restore.');const j=obj(pending['factory-journey-v2']),p=obj(pending['factory-projects-v1']);preview.textContent=`Ready to merge ${strings(j.completed).length} lesson markers, ${Object.keys(obj(j.notes)).length} mission-note records, ${entries(j.entries).length} field notes, and ${Object.keys(obj(p.projects)).length} project records${pending['factory-practice-v1']?', plus practice progress':''}. Existing work is kept; conflicting notes are preserved as alternate records.`;button.hidden=false}catch(e){if(selected===selection)preview.textContent=e.message}};
 button.onclick=()=>{if(!pending)return;const before={};try{for(const k of keys)before[k]=localStorage.getItem(k);const merged=mergeBackupRecords(readBackupRecords(),pending);for(const k of keys)if(Object.hasOwn(merged,k))localStorage.setItem(k,JSON.stringify(merged[k]));preview.textContent='Backup merged. Reload to see all restored progress.';button.hidden=true;const reload=document.createElement('button');reload.className='exp-link';reload.textContent='Reload with restored progress →';reload.onclick=()=>location.reload();box.append(reload);pending=null}catch{let rolledBack=true;for(const k of Object.keys(before)){try{before[k]===null?localStorage.removeItem(k):localStorage.setItem(k,before[k])}catch{rolledBack=false}}preview.textContent=rolledBack?'Restore could not be saved. Your original records were kept; retain your backup file.':'Restore encountered a storage problem. Some records may have merged; keep your backup file and export the current records before making further changes.'}};
}
