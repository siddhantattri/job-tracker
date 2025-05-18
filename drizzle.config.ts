// drizzle.config.ts
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',                              // where migrations (if any) will live
  schema: './src/lib/db/schema.ts',              // your schema file
  dialect: 'sqlite',                              // use SQLite
  dbCredentials: {
    url: 'file:./db.sqlite',                     // points to your SQLite file
  },
})
