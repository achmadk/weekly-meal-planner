import type { Hyperdrive } from '@cloudflare/workers-types'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

export type DbClient = ReturnType<typeof drizzle<typeof schema>>

export interface Env {
  HYPERDRIVE: Hyperdrive
}

export function createDbClient() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  return drizzle(pool, { schema })
}
