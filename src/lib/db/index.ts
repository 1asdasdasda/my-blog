import { neon } from '@neondatabase/serverless';
import { Pool } from 'pg';
import * as schema from './schema';

// 动态获取 db 实例
function getDb() {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  
  // Neon serverless
  if (process.env.DATABASE_URL.includes('neon')) {
    const sql = neon(process.env.DATABASE_URL);
    const { drizzle } = require('drizzle-orm/neon-http');
    return drizzle(sql, { schema });
  }
  
  // Standard PostgreSQL
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const { drizzle } = require('drizzle-orm/node-postgres');
  return drizzle(pool, { schema });
}

const db = getDb();

export { db, getDb, schema };