// src/lib/db/index.ts
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { jobs } from './schema';

// Open (or create) the SQLite file
const connection = new Database('db.sqlite');

// Initialize the Drizzle ORM client
export const db = drizzle(connection, { schema: { jobs } });
