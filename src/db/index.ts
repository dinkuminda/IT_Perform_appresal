import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Connection string can be passed via environment variables:
// - Vercel Postgres: process.env.POSTGRES_URL or process.env.DATABASE_URL
// - Desktop Local Postgres: postgresql://postgres:password@localhost:5432/appraisal_db
const connectionString = 
  process.env.POSTGRES_URL || 
  process.env.DATABASE_URL;

let pool: Pool | undefined;
let db: any;

try {
  if (!connectionString) {
    throw new Error('No database connection string provided');
  }
  pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
  db = drizzle(pool, { schema });
} catch {
  console.warn('[AI Studio] Database not connected — using mock');
  const noOp = {
    findMany: async () => [],
    findFirst: async () => null,
    findUnique: async () => null,
    create: async (d: any) => d?.data ?? {},
    update: async (d: any) => d?.data ?? {},
    delete: async () => ({})
  };
  db = new Proxy({}, {
    get: (_, prop) => prop === 'query'
      ? new Proxy({}, { get: () => noOp }) : async () => []
  });
}

export { pool, db, schema };
