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
// src/lib/db/index.ts

import Database from 'better-sqlite3'
import { drizzle as drizzleSQLite } from 'drizzle-orm/better-sqlite3'
import { jobs } from './schema'

import { RDSDataClient } from '@aws-sdk/client-rds-data'
import { drizzle as drizzleDataApi } from 'drizzle-orm/aws-data-api/pg'

// 1) Compute the local SQLite driver type
type LocalDb = ReturnType<typeof drizzleSQLite>



// 2) Export `db` as that single type
export const db: LocalDb = process.env.NODE_ENV === 'production'
  ? (() => {
      const client = new RDSDataClient({ region: 'ap-northeast-1' })
      // const dataApiDb = drizzleDataApi(client, {
      //   database:    process.env.RDS_DB_NAME!,
      //   resourceArn: process.env.RDS_CLUSTER_ARN!,
      //   secretArn:   process.env.RDS_SECRET_ARN!,
      //   schema:      { jobs },
      // })

      const dataApiDb = drizzleDataApi(client, {
        database:    'job-tracker-prod',
        resourceArn: 'arn:aws:rds:ap-northeast-1:123456789012:cluster:job-tracker-prod',
        secretArn:  'arn:aws:secretsmanager:ap-northeast-1:123456789012:secret:rds!cluster-9f020a8a-e410-4fb9-9d21-eae68fa77b9b-uebBrU',
        schema:      { jobs },
      })
      // 3) Cast the Data API instance to our LocalDb type
      return dataApiDb as unknown as LocalDb
    })()
  : drizzleSQLite(
      new Database('db.sqlite'),
      { schema: { jobs } }
    )
