// A small document store behind one interface. The local build uses a JSON file; the live site will
// use Postgres (Neon) with the same calls, so the rules in the other files do not change.

import { existsSync, readFileSync, renameSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

export interface Doc {
  id: string;
}

export interface Store {
  get<T extends Doc>(collection: string, id: string): T | undefined;
  put<T extends Doc>(collection: string, doc: T): T;
  list<T extends Doc>(collection: string, where?: (doc: T) => boolean): T[];
  remove(collection: string, id: string): void;
}

type Data = Record<string, Record<string, unknown>>;

export class MemoryStore implements Store {
  protected data: Data = {};

  get<T extends Doc>(collection: string, id: string): T | undefined {
    const doc = this.data[collection]?.[id];
    return doc === undefined ? undefined : (structuredClone(doc) as T);
  }

  put<T extends Doc>(collection: string, doc: T): T {
    (this.data[collection] ??= {})[doc.id] = structuredClone(doc);
    this.changed();
    return doc;
  }

  list<T extends Doc>(collection: string, where?: (doc: T) => boolean): T[] {
    const all = Object.values(this.data[collection] ?? {}).map((d) => structuredClone(d) as T);
    return where ? all.filter(where) : all;
  }

  remove(collection: string, id: string): void {
    if (this.data[collection]) delete this.data[collection][id];
    this.changed();
  }

  protected changed(): void {}
}

/** Keeps the same data in a JSON file. Writes go through a temp file so a crash cannot leave half a file. */
export class JsonFileStore extends MemoryStore {
  constructor(private readonly path: string) {
    super();
    if (existsSync(path)) this.data = JSON.parse(readFileSync(path, 'utf8')) as Data;
  }

  protected override changed(): void {
    mkdirSync(dirname(this.path), { recursive: true });
    const tmp = `${this.path}.tmp-${process.pid}`;
    writeFileSync(tmp, JSON.stringify(this.data, null, 2), 'utf8');
    renameSync(tmp, this.path);
  }
}
