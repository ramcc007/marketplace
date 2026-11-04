// Local demo of the marketplace features. Run with: npm run marketplace
//
// It listens on 127.0.0.1 only and keeps its data in .marketplace-data/db.json (not committed).
// Sign-in links are printed in the terminal and shown on the page instead of being emailed. Moderation
// pages need the one-time admin token printed at start-up. This is for trying the rules locally; it is
// not part of the public site and nothing here is deployed.

import http from 'node:http';
import { randomBytes } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { JsonFileStore } from '../../src/lib/marketplace/store.ts';
import { consumeLoginLink, getSessionUser, requestLoginLink } from '../../src/lib/marketplace/auth.ts';
import { decideClaim, requestClaim, saveVendorFields, type Claim } from '../../src/lib/marketplace/vendors.ts';
import {
  REASON_CODES,
  USAGE_LENGTHS,
  listPublished,
  markProofChecked,
  moderate,
  publicStats,
  submitReview,
  type ReasonCode,
  type Review,
  type ReviewInput,
} from '../../src/lib/marketplace/reviews.ts';
import { consentText, leadsForVendor, submitLead } from '../../src/lib/marketplace/leads.ts';

const ROOT = join(import.meta.dirname, '..', '..');
const PORT = Number(process.argv.find((a) => a.startsWith('--port='))?.split('=')[1] ?? 4323);
const ADMIN = randomBytes(12).toString('hex');
const store = new JsonFileStore(join(ROOT, '.marketplace-data', 'db.json'));

interface P {
  id: string;
  name: string;
  vendor: string;
  domain: string;
}
const products: P[] = readdirSync(join(ROOT, 'content', 'products'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => {
    const d = JSON.parse(readFileSync(join(ROOT, 'content', 'products', f), 'utf8').replace(/^﻿/, ''));
    return { id: f.slice(0, -5), name: d.name as string, vendor: d.vendor.name as string, domain: new URL(d.vendor.website).hostname.replace(/^www\./, '') };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const page = (title: string, body: string) =>
  `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title>
<style>body{font:16px/1.5 system-ui;max-width:46rem;margin:2rem auto;padding:0 1rem;color:#1e293b}input,textarea,select{display:block;width:100%;margin:.25rem 0 .75rem;padding:.4rem;font:inherit}
label{font-weight:600}.note{background:#fef3c7;padding:.5rem .75rem;border-radius:6px}.card{border:1px solid #cbd5e1;border-radius:8px;padding:.75rem 1rem;margin:.75rem 0}button{padding:.4rem .9rem;font:inherit}</style>
<p class="note">Local demo. Not the public site. Nothing here is sent anywhere.</p>${body}`;

const form = (req: http.IncomingMessage) =>
  new Promise<Record<string, string>>((resolve, reject) => {
    let data = '';
    req.on('data', (c) => {
      data += c;
      if (data.length > 100_000) reject(new Error('Too large'));
    });
    req.on('end', () => resolve(Object.fromEntries(new URLSearchParams(data))));
  });

const cookie = (req: http.IncomingMessage) => /(?:^|; )s=([^;]+)/.exec(req.headers.cookie ?? '')?.[1] ?? '';
const send = (res: http.ServerResponse, html: string, headers: Record<string, string> = {}) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
  res.end(html);
};
const go = (res: http.ServerResponse, to: string, headers: Record<string, string> = {}) => {
  res.writeHead(303, { Location: to, ...headers });
  res.end();
};

http
  .createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? '/', 'http://127.0.0.1');
      const user = getSessionUser(store, cookie(req));
      const isAdmin = url.searchParams.get('admin') === ADMIN;
      const post = req.method === 'POST' ? await form(req) : {};
      const parts = url.pathname.split('/').filter(Boolean);

      if (url.pathname === '/') {
        return send(res, page('Marketplace demo', `<h1>Marketplace demo</h1><p>${user ? `Signed in as ${esc(user.email)}` : '<a href="/login">Sign in</a>'}</p>
<ul>${products.slice(0, 200).map((p) => `<li><a href="/p/${esc(p.id)}">${esc(p.name)}</a></li>`).join('')}</ul>`));
      }

      if (url.pathname === '/login') {
        if (req.method === 'POST') {
          const link = requestLoginLink(store, post.email ?? '');
          if (!link) return send(res, page('Sign in', '<p>That address is invalid or has asked for too many links this hour.</p><a href="/login">Back</a>'));
          const href = `/auth?token=${link.token}`;
          console.log(`Sign-in link for ${post.email}: http://127.0.0.1:${PORT}${href}`);
          return send(res, page('Sign in', `<p>A real site would email this link. Local demo: <a href="${href}">open the link</a> (works once, 15 minutes).</p>`));
        }
        return send(res, page('Sign in', '<h1>Sign in</h1><form method="post"><label>Email<input name="email" type="email" required></label><button>Send link</button></form>'));
      }
      if (url.pathname === '/auth') {
        const ok = consumeLoginLink(store, url.searchParams.get('token') ?? '');
        if (!ok) return send(res, page('Sign in', '<p>That link is used or expired.</p><a href="/login">Try again</a>'));
        return go(res, '/', { 'Set-Cookie': `s=${ok.session}; HttpOnly; SameSite=Strict; Path=/; Max-Age=2592000` });
      }

      if (parts[0] === 'p' && parts[1]) {
        const p = products.find((x) => x.id === parts[1]);
        if (!p) return send(res, page('Not found', '<p>No such product.</p>'));
        if (req.method === 'POST') {
          const action = parts[2];
          if (action === 'lead') {
            const r = submitLead(store, {
              requestType: post.requestType === 'demo' ? 'demo' : 'quote',
              productId: p.id,
              productName: p.name,
              vendorName: p.vendor,
              name: post.name ?? '',
              email: post.email ?? '',
              company: post.company ?? '',
              message: post.message ?? '',
              consent: post.consent === 'yes',
              website: post.website,
            });
            return send(res, page('Request', r.errors.length ? `<p>${r.errors.map(esc).join('<br>')}</p><a href="/p/${p.id}">Back</a>` : `<p>Sent to ${esc(p.vendor)} only.</p><a href="/p/${p.id}">Back</a>`));
          }
          if (!user) return go(res, '/login');
          if (action === 'review') {
            const input: ReviewInput = {
              rating: Number(post.rating),
              title: post.title ?? '',
              usedFor: post.usedFor ?? '',
              pros: post.pros ?? '',
              cons: post.cons ?? '',
              role: post.role ?? '',
              companySize: post.companySize ?? '',
              usageLength: post.usageLength as ReviewInput['usageLength'],
              ownExperience: post.ownExperience === 'yes',
              incentive:
                post.incentive === 'reward'
                  ? { kind: 'reward', description: post.reward ?? '', dependsOnRating: post.rewardDepends === 'yes' }
                  : post.incentive === 'vendor-invited'
                    ? { kind: 'vendor-invited' }
                    : { kind: 'none' },
            };
            const r = submitReview(store, user, { id: p.id, vendorDomain: p.domain }, input);
            return send(res, page('Review', r.errors.length ? `<p>${r.errors.map(esc).join('<br>')}</p><a href="/p/${p.id}">Back</a>` : `<p>Thanks. Your review is waiting for a check before it appears.</p><a href="/p/${p.id}">Back</a>`));
          }
          if (action === 'claim') {
            const r = requestClaim(store, user, { id: p.id, vendorDomain: p.domain });
            return send(res, page('Claim', `<p>${r.error ? esc(r.error) : `Claim is ${esc(r.claim?.status)}.`}</p><a href="/p/${p.id}">Back</a>`));
          }
          if (action === 'vendor') {
            const r = saveVendorFields(store, user, p.id, { vendorSummary: post.vendorSummary, pricingNote: post.pricingNote, demoUrl: post.demoUrl, supportUrl: post.supportUrl });
            return send(res, page('Saved', `<p>${r.errors.length ? r.errors.map(esc).join('<br>') : 'Saved as vendor-supplied.'}</p><a href="/p/${p.id}">Back</a>`));
          }
        }
        const stats = publicStats(store, p.id);
        const reviews = listPublished(store, p.id);
        const leads = user ? leadsForVendor(store, user.id, p.id) : [];
        const opt = (list: readonly string[]) => list.map((o) => `<option>${esc(o)}</option>`).join('');
        return send(res, page(p.name, `<p><a href="/">All</a></p><h1>${esc(p.name)}</h1><p>${esc(p.vendor)} (${esc(p.domain)})</p>
<h2>Reviews (${stats.published})</h2>${stats.averageRating === null ? '<p>No published reviews yet.</p>' : `<p>Average ${stats.averageRating} of 5, newest first.</p>`}
${reviews.map((r) => `<div class="card"><b>${esc(r.input.title)}</b> (${r.input.rating}/5, ${esc(r.verification)}${r.input.incentive.kind !== 'none' ? `, ${esc(r.input.incentive.kind)}` : ''})<p>${esc(r.input.pros)}</p><p>${esc(r.input.cons)}</p>${r.reply ? `<p><i>Vendor reply: ${esc(r.reply.text)}</i></p>` : ''}</div>`).join('')}
${user ? `<h2>Write a review</h2><form method="post" action="/p/${p.id}/review"><label>Rating (1-5)<input name="rating" type="number" min="1" max="5" required></label>
<label>Title<input name="title" required></label><label>What you used it for<textarea name="usedFor" required></textarea></label><label>What worked<textarea name="pros" required></textarea></label>
<label>What did not work<textarea name="cons" required></textarea></label><label>Your role<input name="role" required></label><label>Company size<input name="companySize" required></label>
<label>How long you have used it<select name="usageLength">${opt(USAGE_LENGTHS)}</select></label>
<label>Were you invited or rewarded?<select name="incentive"><option value="none">No</option><option value="vendor-invited">Invited by the vendor</option><option value="reward">Received a reward</option></select></label>
<label>If rewarded, what was it?<input name="reward"></label><label><input type="checkbox" name="rewardDepends" value="yes" style="display:inline;width:auto"> The reward depended on my rating</label>
<label><input type="checkbox" name="ownExperience" value="yes" style="display:inline;width:auto"> This describes my own experience.</label><button>Submit for checking</button></form>
<h2>Vendor tools</h2><form method="post" action="/p/${p.id}/claim"><button>Claim this page (needs a ${esc(p.domain)} address)</button></form>
<form method="post" action="/p/${p.id}/vendor"><label>Vendor summary<textarea name="vendorSummary"></textarea></label><label>Pricing note<input name="pricingNote"></label><label>Demo link<input name="demoUrl"></label><label>Support link<input name="supportUrl"></label><button>Save (shown as supplied by the vendor)</button></form>
<h3>Requests for this vendor (${leads.length})</h3>${leads.map((l) => `<div class="card">${esc(l.name)}, ${esc(l.company)}, ${esc(l.email)}<br>${esc(l.message)}</div>`).join('')}` : '<p><a href="/login">Sign in</a> to review or manage this page.</p>'}
<h2>Get a quote or request a demo</h2><form method="post" action="/p/${p.id}/lead"><label>Type<select name="requestType"><option value="quote">Quote</option><option value="demo">Demo</option></select></label>
<label>Name<input name="name" required></label><label>Work email<input name="email" type="email" required></label><label>Company<input name="company" required></label><label>Message<textarea name="message" required></textarea></label>
<input name="website" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px"><label><input type="checkbox" name="consent" value="yes" style="display:inline;width:auto"> ${esc(consentText(p.vendor, p.name))}</label><button>Send</button></form>`));
      }

      if (parts[0] === 'admin' && isAdmin) {
        if (req.method === 'POST') {
          const who = 'Local editor';
          if (parts[1] === 'review') {
            if (post.action === 'proof') markProofChecked(store, post.id ?? '', who);
            else if (post.action === 'publish') moderate(store, post.id ?? '', { action: 'publish' }, who);
            else moderate(store, post.id ?? '', { action: post.action === 'remove' ? 'remove' : 'reject', reason: post.reason as ReasonCode }, who);
          }
          if (parts[1] === 'claim') decideClaim(store, post.id ?? '', post.action === 'approve' ? 'approved' : 'rejected', who, post.note || 'Reviewed');
          return go(res, `/admin?admin=${ADMIN}`);
        }
        const reviews = store.list<Review>('reviews').sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        const claims = store.list<Claim>('claims', (c) => c.status === 'pending');
        const reasons = Object.entries(REASON_CODES).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join('');
        return send(res, page('Moderation', `<h1>Moderation</h1><h2>Claims waiting</h2>${claims.map((c) => `<form class="card" method="post" action="/admin/claim?admin=${ADMIN}">${esc(c.userId)} wants ${esc(c.productId)}<input type="hidden" name="id" value="${esc(c.id)}"><input name="note" placeholder="Reason"><button name="action" value="approve">Approve</button><button name="action" value="reject">Reject</button></form>`).join('') || '<p>None.</p>'}
<h2>Reviews</h2>${reviews.map((r) => `<form class="card" method="post" action="/admin/review?admin=${ADMIN}"><b>${esc(r.input.title)}</b> on ${esc(r.productId)} (${r.input.rating}/5, ${esc(r.verification)}, ${esc(r.status)})<p>${esc(r.input.pros)}</p><p>${esc(r.input.cons)}</p><input type="hidden" name="id" value="${esc(r.id)}">
<select name="reason">${reasons}</select><button name="action" value="proof">Proof checked</button><button name="action" value="publish">Publish</button><button name="action" value="reject">Reject</button><button name="action" value="remove">Remove</button></form>`).join('') || '<p>None.</p>'}`));
      }

      res.writeHead(404);
      res.end('Not found');
    } catch (err) {
      console.error(err);
      res.writeHead(500);
      res.end('Error');
    }
  })
  .listen(PORT, '127.0.0.1', () => {
    console.log(`Marketplace demo: http://127.0.0.1:${PORT}/`);
    console.log(`Moderation:       http://127.0.0.1:${PORT}/admin?admin=${ADMIN}`);
  });
