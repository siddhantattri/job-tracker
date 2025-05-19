// // src/lib/db/index.ts
// import Database from 'better-sqlite3';
// import { drizzle } from 'drizzle-orm/better-sqlite3';
// import { jobs } from './schema';

// // Open (or create) the SQLite file
// const connection = new Database('db.sqlite');

// // Initialize the Drizzle ORM client
// export const db = drizzle(connection, { schema: { jobs } });


// src/lib/db/index.ts

// src/lib/db/index.ts

// src/lib/db/index.ts
import Database from 'better-sqlite3'
import { drizzle as drizzleSQLite } from 'drizzle-orm/better-sqlite3'
import { jobs } from './schema'

import { RDSDataClient } from '@aws-sdk/client-rds-data'
import { drizzle as drizzleDataApi } from 'drizzle-orm/aws-data-api/pg'

export const db = process.env.NODE_ENV === 'production'
  ? (() => {
      // region comes from the Lambda runtime; no need to set it yourself
      const client = new RDSDataClient({ region: process.env.AWS_REGION })
      return drizzleDataApi(client, {
        database:    process.env.RDS_DB_NAME!,
        resourceArn: process.env.RDS_CLUSTER_ARN!,
        secretArn:   process.env.RDS_SECRET_ARN!,
        schema:      { jobs },
      })
    })()
  : (() => {
      const sqlite = new Database('db.sqlite')
      return drizzleSQLite(sqlite, { schema: { jobs } })
    })()
