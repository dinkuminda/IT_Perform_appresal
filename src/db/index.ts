import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Connection string can be passed via environment variables:
// - Vercel Postgres: process.env.POSTGRES_URL or process.env.DATABASE_URL
// - Desktop Local Postgres: postgresql://postgres:password@localhost:5432/appraisal_db
const connectionString = 
  process.env.POSTGRES_URL || 
  process.env.DATABASE_URL || 
  'postgresql://postgres:postgres@localhost:5432/appraisal_db';

export const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export const db = drizzle(pool, { schema });

export { schema };
