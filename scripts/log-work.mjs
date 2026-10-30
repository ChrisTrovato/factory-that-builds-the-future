import {appendFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const summary=process.argv.slice(2).join(' ').trim();
if(!summary){console.error('Usage: npm run log -- "What changed, why it matters, and how you checked it"');process.exit(1);}
const d=new Date();
const date=[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
const clean=summary.replace(/[\r\n]+/g,' ');
appendFileSync(fileURLToPath(new URL('../docs/work-log.md',import.meta.url)),`\n## ${date}\n\n${clean}\n\nEvidence: <!-- add file, test result, screenshot, issue, or commit link -->\n`);
console.log('Added a dated work-log entry. Review it, add evidence, and commit the actual changes.');
