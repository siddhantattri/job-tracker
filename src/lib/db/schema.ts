// src\lib\db\schema.ts

import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const jobs = sqliteTable('jobs', {
  id: integer('id').primaryKey(),                                  // INTEGER PRIMARY KEY AUTOINCREMENT
  company: text('company').notNull(),
  position: text('position').notNull(),
  status: text('status').notNull(),
  dateApplied: text('date_applied').notNull(),                     // store ISO strings
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});



// secret arn : arn:aws:secretsmanager:ap-northeast-1:693789331812:secret:rds!cluster-9f020a8a-e410-4fb9-9d21-eae68fa77b9b-uebBrU

// cluster arn arn:aws:rds:ap-northeast-1:693789331812:cluster:job-tracker-prod