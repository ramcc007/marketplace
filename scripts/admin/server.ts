// Local admin dashboard for B2B Rated. Run with: npm run admin
//
// It listens on 127.0.0.1 only and needs the one-time token printed at start-up, so nothing about it
// is reachable from the internet and it adds no page to the public site. It reads and edits the
// files in content/, shows the quality-gate result for every page, and runs the project's own checks.
// It never runs git commit, git push or a deploy: publishing stays a deliberate step in a terminal.

import http from 'node:http';
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildOverview, parseFrontmatter, ROOT } from './data.ts';
import { checkMetaDescription, checkProse } from '../../src/lib/content-checks.ts';

const PORT = Number(process.argv.find((a) => a.startsWith('--port='))?.split('=')[1] ?? 4322);
const TOKEN = randomBytes(16).toString('hex');
const SLUG = /^[a-z0-9][a-z0-9-]*$/;
const LIVE = process.env.PUBLIC_SITE_URL ?? 'https://b2brated.com';

const json = (res: http.ServerResponse, status: number, body: unknown) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
};

const readBody = (req: http.IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    let data = '';
    req.on('data', (c) => {
      data += c;
      if (data.length > 2_000_000) reject(new Error('Body too large'));
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });

/** Writes through a temp file so a crash never leaves a half-written content file. */
function writeFileAtomic(path: string, text: string) {
  const tmp = `${path}.tmp-${process.pid}`;
  writeFileSync(tmp, text.replace(/^\uFEFF/, ''), 'utf8');
  renameSync(tmp, path);
}

function run(cmd: string, args: string[], env: Record<string, string> = {}): Promise<{ code: number; output: string }> {
  return new Promise((resolve) => {
    const gitDir = 'C:\\Program Files\\Git\\cmd';
    const PATH = `${process.env.PATH ?? ''};${gitDir}`;
    const child = spawn(cmd, args, { cwd: ROOT, shell: true, env: { ...process.env, PATH, ...env } });
    let output = '';
    const add = (d: Buffer) => {
      output += d.toString();
      if (output.length > 200_000) output = output.slice(-100_000);
    };
    child.stdout.on('data', add);
    child.stderr.on('data', add);
    const timer = setTimeout(() => child.kill(), 10 * 60_000);
    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({ code: code ?? 1, output: output.slice(-60_000) });
    });
  });
}

const REQUIRED_PRODUCT = ['name', 'status', 'primaryCategory', 'summary', 'qualifies', 'pricing', 'updatedAt'];

function validateProduct(text: string, slug: string) {
  const problems: string[] = [];
  let data: any;
  try {
    data = JSON.parse(text.replace(/^\uFEFF/, ''));
  } catch (e) {
    return { ok: false, problems: [`Not valid JSON: ${(e as Error).message}`], issues: [] };
  }
  for (const k of REQUIRED_PRODUCT) if (data[k] === undefined) problems.push(`Missing "${k}"`);
  if (!data.vendor?.name || !data.vendor?.website) problems.push('vendor needs a name and a website');
  if (!['draft', 'published'].includes(data.status)) problems.push('status must be "draft" or "published"');
  if (!Array.isArray(data.qualifies) || data.qualifies.length === 0) problems.push('qualifies needs at least one category');
  for (const q of data.qualifies ?? []) {
    if (!q.evidence?.length) problems.push(`qualifies "${q.category}" has no evidence`);
    for (const e of q.evidence ?? []) if (!/^https?:\/\//.test(e.sourceUrl ?? '')) problems.push(`evidence "${e.capability}" needs a source URL`);
  }
  const p = data.pricing ?? {};
  if (!['free', 'freemium', 'paid', 'quote_only'].includes(p.model)) problems.push('pricing.model is not one of free, freemium, paid, quote_only');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.verifiedAt ?? '')) problems.push('pricing.verifiedAt must be YYYY-MM-DD');
  if (!/^https?:\/\//.test(p.sourceUrl ?? '')) problems.push('pricing.sourceUrl must be a URL');
  if (p.model === 'quote_only' && (p.plans ?? []).some((pl: any) => pl.priceUsd)) problems.push('pricing.model is quote_only but a plan has a price');
  const facts = (data.facts ?? []).map((f: any) => f.text);
  const issues = checkProse([data.summary, data.handsOnNote, ...facts].filter(Boolean).join('\n\n'));
  if (issues.some((i) => i.severity === 'error')) problems.push('Writing rules: fix the errors listed below before this goes out');
  return { ok: problems.length === 0, problems, issues, slug };
}

function validateCategory(text: string) {
  const problems: string[] = [];
  const { front, body } = parseFrontmatter(text);
  if (Object.keys(front).length === 0) problems.push('Front matter (the block between --- lines) is missing');
  for (const k of ['definition', 'primaryKeyword', 'writer']) if (!front[k]) problems.push(`Front matter is missing "${k}"`);
  if ((front.definition ?? '').length > 155) problems.push('definition is longer than 155 characters');
  const issues = [...checkProse(body), ...checkProse(front.definition ?? ''), ...checkMetaDescription(front.definition ?? '')];
  if (issues.some((i) => i.severity === 'error')) problems.push('Writing rules: fix the errors listed below before this goes out');
  return { ok: problems.length === 0, problems, issues };
}

const productPath = (slug: string) => join(ROOT, 'content', 'products', `${slug}.json`);
const categoryPath = (slug: string) => join(ROOT, 'content', 'categories', `${slug}.md`);

async function handleApi(req: http.IncomingMessage, res: http.ServerResponse, url: URL) {
  const path = url.pathname;
  const method = req.method ?? 'GET';

  if (path === '/api/overview' && method === 'GET') return json(res, 200, buildOverview());

  const file = path.match(/^\/api\/(product|category)\/([^/]+)$/);
  if (file) {
    const [, kind, slug] = file;
    if (!SLUG.test(slug)) return json(res, 400, { error: 'Bad slug' });
    const target = kind === 'product' ? productPath(slug) : categoryPath(slug);
    if (method === 'GET') {
      if (!existsSync(target)) return json(res, 404, { error: 'No such file' });
      return json(res, 200, { text: readFileSync(target, 'utf8').replace(/^\uFEFF/, ''), path: target.replace(ROOT, '') });
    }
    if (method === 'PUT') {
      const { text, validateOnly } = JSON.parse(await readBody(req)) as { text: string; validateOnly?: boolean };
      const result = kind === 'product' ? validateProduct(text, slug) : validateCategory(text);
      // JSON that does not parse, or a category with no front matter, would break the build, so refuse to save it.
      const blocking = result.problems.filter((p) => /Not valid JSON|Front matter .*missing/.test(p));
      if (validateOnly || blocking.length > 0) return json(res, 200, { ...result, saved: false });
      if (!existsSync(target)) return json(res, 404, { error: 'No such file' });
      writeFileAtomic(target, kind === 'product' ? `${JSON.stringify(JSON.parse(text), null, 2)}\n` : text);
      return json(res, 200, { ...result, saved: true });
    }
  }

  // Editorial approval is a person's decision, so it only happens when someone presses the button here.
  const approve = path.match(/^\/api\/approve\/([^/]+)$/);
  if (approve && method === 'POST') {
    const slug = approve[1];
    if (!SLUG.test(slug) || !existsSync(categoryPath(slug))) return json(res, 404, { error: 'No such category file' });
    const { action, editor } = JSON.parse(await readBody(req)) as { action: 'criteria' | 'signoff' | 'revoke'; editor?: string };
    let text = readFileSync(categoryPath(slug), 'utf8').replace(/^\uFEFF/, '');
    const setLine = (key: string, value: string) => {
      const line = new RegExp(`^${key}:.*$`, 'm');
      text = line.test(text) ? text.replace(line, `${key}: ${value}`) : text.replace(/^(---\r?\n)/, `$1${key}: ${value}\n`);
    };
    const dropLine = (key: string) => {
      text = text.replace(new RegExp(`^${key}:.*\\r?\\n`, 'm'), '');
    };
    if (action === 'criteria') setLine('criteriaApproved', 'true');
    else if (action === 'signoff') {
      if (!editor || !/^[\p{L}\p{N} .'-]{2,60}$/u.test(editor)) return json(res, 400, { error: 'Enter the editor name (2 to 60 characters)' });
      setLine('editor', JSON.stringify(editor));
      setLine('signedOffAt', new Date().toISOString().slice(0, 10));
    } else if (action === 'revoke') {
      setLine('criteriaApproved', 'false');
      dropLine('editor');
      dropLine('signedOffAt');
    } else return json(res, 400, { error: 'Unknown action' });
    writeFileAtomic(categoryPath(slug), text);
    return json(res, 200, { ok: true });
  }

  const task = path.match(/^\/api\/run\/(check-content|test|build)$/);
  if (task && method === 'POST') {
    if (task[1] === 'check-content') return json(res, 200, await run('npm', ['run', 'check:content']));
    if (task[1] === 'test') return json(res, 200, await run('npm', ['test']));
    const out = mkdtempSync(join(tmpdir(), 'b2brated-admin-build-'));
    const result = await run('npx', ['astro', 'build', '--outDir', `"${out}"`], { PUBLIC_SITE_URL: LIVE });
    return json(res, 200, { ...result, outDir: out });
  }

  if (path === '/api/git' && method === 'GET') {
    const [status, last] = await Promise.all([run('git', ['status', '--short', '-b']), run('git', ['log', '-1', '--format=%h %s (%cr)'])]);
    return json(res, 200, { status: status.output.trim(), last: last.output.trim() });
  }

  if (path === '/api/live' && method === 'POST') {
    const extra = (JSON.parse((await readBody(req)) || '{}') as { paths?: string[] }).paths ?? [];
    const paths = ['/', '/categories', '/methodology', '/transparency', '/robots.txt', '/sitemap.xml', ...extra.filter((p) => /^\/[\w\-./]*$/.test(p))];
    const rows = await Promise.all(
      paths.map(async (p) => {
        try {
          const r = await fetch(new URL(p, LIVE), { redirect: 'manual', signal: AbortSignal.timeout(15_000) });
          const text = p.endsWith('.xml') || p.endsWith('.txt') ? '' : await r.text();
          return {
            path: p,
            status: r.status,
            xRobotsTag: r.headers.get('x-robots-tag'),
            robotsMeta: text.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? null,
            canonical: text.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? null,
          };
        } catch (e) {
          return { path: p, status: 0, error: (e as Error).message };
        }
      }),
    );
    return json(res, 200, { site: LIVE, rows });
  }

  return json(res, 404, { error: 'Not found' });
}

const server = http.createServer(async (req, res) => {
  try {
    const host = req.headers.host ?? '';
    // Blocks DNS-rebinding: a web page cannot make a browser talk to this server under another hostname.
    if (host !== `127.0.0.1:${PORT}` && host !== `localhost:${PORT}`) return json(res, 403, { error: 'Bad host' });
    const url = new URL(req.url ?? '/', `http://${host}`);

    if (url.pathname === '/' && req.method === 'GET') {
      if (url.searchParams.get('token') !== TOKEN) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Open the full address printed in the terminal, including ?token=...');
      }
      const html = readFileSync(new URL('./ui.html', import.meta.url), 'utf8').replace('__TOKEN__', TOKEN);
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
        'Content-Security-Policy': "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'self'; frame-ancestors 'none'",
        'Referrer-Policy': 'no-referrer',
      });
      return res.end(html);
    }

    if (url.pathname.startsWith('/api/')) {
      if (req.headers['x-admin-token'] !== TOKEN) return json(res, 403, { error: 'Missing or wrong token' });
      const origin = req.headers.origin;
      if (req.method !== 'GET' && origin && origin !== `http://${host}`) return json(res, 403, { error: 'Bad origin' });
      return await handleApi(req, res, url);
    }
    return json(res, 404, { error: 'Not found' });
  } catch (e) {
    return json(res, 500, { error: (e as Error).message });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('\nB2B Rated admin (local only)');
  console.log(`  Open: http://127.0.0.1:${PORT}/?token=${TOKEN}`);
  console.log('  Stop with Ctrl+C. The token changes every time you start it.\n');
});
