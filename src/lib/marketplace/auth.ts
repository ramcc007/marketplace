// Sign-in by emailed link. Only a hash of each token is stored, links work once and expire,
// and the number of links per address is limited. Sending the email is the caller's job.

import { createHash, randomBytes } from 'node:crypto';
import type { Doc, Store } from './store';

export interface User extends Doc {
  email: string;
  createdAt: string;
}
interface LoginLink extends Doc {
  email: string;
  expiresAt: string;
  used: boolean;
  createdAt: string;
}
interface Session extends Doc {
  userId: string;
  expiresAt: string;
}

const LINK_MINUTES = 15;
const SESSION_DAYS = 30;
const LINKS_PER_HOUR = 5;

const FREE_MAIL = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'live.com', 'icloud.com',
  'me.com', 'aol.com', 'proton.me', 'protonmail.com', 'gmx.com', 'gmx.net', 'mail.com', 'yandex.com',
  'zoho.com', 'msn.com',
]);

export const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');
export const newToken = () => randomBytes(32).toString('base64url');
const addMs = (from: Date, ms: number) => new Date(from.getTime() + ms).toISOString();

export function normalizeEmail(email: string): string | null {
  const value = email.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 254 ? value : null;
}

export const emailDomain = (email: string) => email.slice(email.lastIndexOf('@') + 1);

/** A work address is one on a domain that is not a free mailbox provider. */
export function isWorkEmail(email: string): boolean {
  return !FREE_MAIL.has(emailDomain(email));
}

/** Makes a one-time link token for the address. Returns null when the address is invalid or over the limit. */
export function requestLoginLink(store: Store, rawEmail: string, now = new Date()): { token: string } | null {
  const email = normalizeEmail(rawEmail);
  if (!email) return null;
  const hourAgo = now.getTime() - 3_600_000;
  const recent = store.list<LoginLink>('loginLinks', (l) => l.email === email && Date.parse(l.createdAt) > hourAgo);
  if (recent.length >= LINKS_PER_HOUR) return null;
  const token = newToken();
  store.put<LoginLink>('loginLinks', {
    id: sha256(token),
    email,
    used: false,
    createdAt: now.toISOString(),
    expiresAt: addMs(now, LINK_MINUTES * 60_000),
  });
  return { token };
}

/** Spends a link token. Returns a session token, or null if the link is unknown, used or expired. */
export function consumeLoginLink(store: Store, token: string, now = new Date()): { session: string; user: User } | null {
  const link = store.get<LoginLink>('loginLinks', sha256(token));
  if (!link || link.used || Date.parse(link.expiresAt) < now.getTime()) return null;
  store.put<LoginLink>('loginLinks', { ...link, used: true });
  const user =
    store.get<User>('users', link.email) ?? store.put<User>('users', { id: link.email, email: link.email, createdAt: now.toISOString() });
  const session = newToken();
  store.put<Session>('sessions', { id: sha256(session), userId: user.id, expiresAt: addMs(now, SESSION_DAYS * 86_400_000) });
  return { session, user };
}

export function getSessionUser(store: Store, session: string, now = new Date()): User | null {
  const row = store.get<Session>('sessions', sha256(session));
  if (!row || Date.parse(row.expiresAt) < now.getTime()) return null;
  return store.get<User>('users', row.userId) ?? null;
}

export function endSession(store: Store, session: string): void {
  store.remove('sessions', sha256(session));
}
