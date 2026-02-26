import type { Hyperdrive } from '@cloudflare/workers-types'
import { drizzle } from 'drizzle-orm/mysql2'
import { createConnection } from 'mysql2/promise'
import * as schema from './schema'

export type DbClient = ReturnType<typeof drizzle<typeof schema>>

export interface Env {
  HYPERDRIVE: Hyperdrive
}

export async function createDbClient(env: Env['HYPERDRIVE']) {
  const connection = await createConnection({
    host: env.host,
    user: env.user,
    password: env.password,
    database: env.database,
    port: env.port,
    disableEval: true,
  })

  return drizzle(connection, { schema, mode: 'default' })
}
