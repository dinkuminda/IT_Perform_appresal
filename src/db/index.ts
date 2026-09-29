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
  console.warn('[AI Studio] Database connection not available — using resilient in-memory mock for all tables');
  
  const inMemoryStorage: Record<string, any[]> = {
    departments: [],
    official_staff_positions: [],
    job_descriptions: [],
    employees: [],
    appraisal_records: [],
    monthly_reports: [],
    audit_logs: []
  };

  const getTableName = (table: any): string => {
    if (!table) return 'unknown';
    if (typeof table === 'string') return table;
    if (table._ && table._.name) return table._.name;
    if (table[Symbol.for('drizzle:Name')]) return table[Symbol.for('drizzle:Name')];
    return 'unknown';
  };

  const createInsertBuilder = (tableName: string) => {
    return {
      values(vals: any | any[]) {
        const records = Array.isArray(vals) ? vals : [vals];
        const inserted = records.map((r, i) => ({
          ...r,
          id: r?.id ?? `${tableName}-${Date.now()}-${i}`,
          createdAt: r?.createdAt ?? new Date().toISOString(),
          updatedAt: r?.updatedAt ?? new Date().toISOString()
        }));

        if (!inMemoryStorage[tableName]) {
          inMemoryStorage[tableName] = [];
        }
        inMemoryStorage[tableName].push(...inserted);

        const chainable = {
          onConflictDoNothing: () => chainable,
          onConflictDoUpdate: () => chainable,
          returning: async () => inserted,
          then: (onfulfilled?: any, onrejected?: any) => 
            Promise.resolve(inserted).then(onfulfilled, onrejected)
        };
        return chainable;
      }
    };
  };

  const createSelectBuilder = () => {
    let currentRows: any[] = [];
    const chainable = {
      from(table: any) {
        const tName = getTableName(table);
        currentRows = inMemoryStorage[tName] || [];
        return chainable;
      },
      where() {
        return chainable;
      },
      limit(n: number) {
        currentRows = currentRows.slice(0, n);
        return chainable;
      },
      offset(n: number) {
        currentRows = currentRows.slice(n);
        return chainable;
      },
      orderBy() {
        return chainable;
      },
      then: (onfulfilled?: any, onrejected?: any) =>
        Promise.resolve(currentRows).then(onfulfilled, onrejected)
    };
    return chainable;
  };

  const createUpdateBuilder = (table: any) => {
    const tName = getTableName(table);
    let updatedVals: any = {};
    const chainable = {
      set(vals: any) {
        updatedVals = vals;
        return chainable;
      },
      where() {
        return chainable;
      },
      returning: async () => [updatedVals],
      then: (onfulfilled?: any, onrejected?: any) =>
        Promise.resolve([updatedVals]).then(onfulfilled, onrejected)
    };
    return chainable;
  };

  const createDeleteBuilder = (table: any) => {
    const chainable = {
      where() {
        return chainable;
      },
      returning: async () => [],
      then: (onfulfilled?: any, onrejected?: any) =>
        Promise.resolve([]).then(onfulfilled, onrejected)
    };
    return chainable;
  };

  const queryProxy = new Proxy({}, {
    get: (_, tableProp: string) => ({
      findMany: async () => inMemoryStorage[tableProp] || [],
      findFirst: async () => (inMemoryStorage[tableProp] && inMemoryStorage[tableProp][0]) || null,
      findUnique: async () => (inMemoryStorage[tableProp] && inMemoryStorage[tableProp][0]) || null
    })
  });

  db = {
    insert: (table: any) => createInsertBuilder(getTableName(table)),
    select: () => createSelectBuilder(),
    update: (table: any) => createUpdateBuilder(table),
    delete: (table: any) => createDeleteBuilder(table),
    query: queryProxy,
    execute: async () => ({ rows: [] })
  };
}

export { pool, db, schema };
