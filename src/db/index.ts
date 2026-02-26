import type { Hyperdrive } from '@cloudflare/workers-types'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

export type DbClient = ReturnType<typeof drizzle<typeof schema>>

export interface Env {
  HYPERDRIVE: Hyperdrive
}

export async function createDbClient(env: Env['HYPERDRIVE']) {
  const pool = new Pool({
    host: env.host,
    user: env.user,
    password: env.password,
    database: env.database,
    port: env.port,
  })

  return drizzle(pool, { schema })
}
