// Builds src/data/shiplog.json from real commit history across the projects on this portfolio
// (private repos included). The repos live on this PC, not on Vercel, so re-run before a deploy:
//   node scripts/shiplog.mjs
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const ROOT = 'C:/Users/cork/Documents';
// Only projects that appear on the portfolio. Never add this_lagos or arzuz.
const REPOS = { westhomes: 'Westhomes', konnectKWASU: 'KonnectKWASU', GREady: 'GREady', surge_net: 'SurgeNet', Portfolio: 'Portfolio' };
const AUTHOR = 'musbaftech@gmail.com';

const since = new Date(Date.now() - 364 * 864e5).toISOString().slice(0, 10);
const commits = [];
for (const [dir, name] of Object.entries(REPOS)) {
  let out = '';
  try { out = execFileSync('git', ['-C', `${ROOT}/${dir}`, 'log', `--since=${since}`, `--author=${AUTHOR}`, '--format=%cs\t%s'], { encoding: 'utf8' }); } catch { continue; }
  for (const line of out.trim().split('\n').filter(Boolean)) {
    const [date, ...msg] = line.split('\t');
    commits.push({ date, project: name, message: msg.join('\t').replace(/\s+/g, ' ').trim() });
  }
}
commits.sort((a, b) => b.date.localeCompare(a.date));

const counts = {};
for (const c of commits) counts[c.date] = (counts[c.date] ?? 0) + 1;
const days = [];
for (let t = new Date(since); t <= new Date(); t = new Date(t.getTime() + 864e5)) {
  const d = t.toISOString().slice(0, 10);
  days.push({ date: d, count: counts[d] ?? 0 });
}

// Keep the feed readable: skip housekeeping, and at most 3 per project so it shows range.
const HOUSEKEEPING = /^(merge|wip|bump|tidy|readme)|docs\/|\b(NEXT|PLAN|CLAUDE|README)\.md\b/i;
const perProject = {};
const recent = commits
  .filter((c) => !HOUSEKEEPING.test(c.message) && c.message.length > 12)
  .filter((c) => (perProject[c.project] = (perProject[c.project] ?? 0) + 1) <= 3)
  .slice(0, 12);

writeFileSync('src/data/shiplog.json', JSON.stringify({ updated: new Date().toISOString().slice(0, 10), total: commits.length, days, recent }, null, 1));
console.log(`${commits.length} commits, ${recent.length} in the feed`);
