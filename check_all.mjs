import {spawnSync} from 'node:child_process';
import {readdirSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const publicRoot = join(root, 'public');
const isQaHarness = path => path.split(/[\\/]/).some(part =>
  /^(?:qa|__tests__|tests?)(?:$|[-_.])/i.test(part) ||
  /(?:^|[-_.])(?:harness|preview)(?:[-_.]|$)/i.test(part)
);
function modulesIn(directory) {
  return readdirSync(directory, {withFileTypes: true})
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap(entry => {
      const full = join(directory, entry.name);
      const rel = relative(publicRoot, full);
      if (isQaHarness(rel) || entry.name === 'node_modules') return [];
      return entry.isDirectory() ? modulesIn(full) : entry.isFile() && /\.(?:js|mjs)$/.test(entry.name) && !entry.name.endsWith('.test.mjs') ? [full] : [];
    });
}
const modules = modulesIn(publicRoot);
if (!modules.length) throw new Error('No public JavaScript modules were found.');
const suites = ['check_models.mjs', 'check_studio.mjs', 'check_curriculum.mjs', 'check_practice.mjs', 'check_backup.mjs', 'check_control.mjs', 'check_arcade.mjs', 'check_reels.mjs', 'check_expansion.mjs'];
const aerospaceSuites = ['engine.test.mjs', 'academic-integration.test.mjs', 'state-integration.test.mjs', 'labs.test.mjs', 'journey.test.mjs', 'journey-content.test.mjs']
  .map(file => join('public', 'official_aero_plan', file));
const jobs = [...modules.map(file => ['--check', file]), ...suites.map(file => [file]), ['--test', ...aerospaceSuites]];
for (const args of jobs) {
  const result = spawnSync(process.execPath, args, {cwd: root, stdio: 'inherit'});
  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error('Failed:', args.join(' '));
    process.exit(result.status || 1);
  }
}
console.log(`PASS: ${modules.length} public JavaScript modules, all nine v4 validation suites, and ${aerospaceSuites.length} aerospace suites; QA harnesses excluded.`);
