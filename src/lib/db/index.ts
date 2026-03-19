import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Pool } from 'pg';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

// PostgreSQL 连接池（用于本地pg或远程pg）
let pool: Pool | null = null;
let db: ReturnType<typeof drizzlePg> | null = null;

// 使用 Neon Serverless（推荐，兼容 PostgreSQL）
if (process.env.DATABASE_URL?.includes('neon')) {
  const sql = neon(process.env.DATABASE_URL);
  db = drizzle(sql, { schema });
} 
// 使用标准 PostgreSQL 连接
else if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  db = drizzlePg(pool, { schema });
}

export { db, pool };

// 导出 schema 方便查询
export { schema };