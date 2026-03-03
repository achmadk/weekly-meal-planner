import type { Hyperdrive } from '@cloudflare/workers-types'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import { getCloudflareContext } from '@opennextjs/cloudflare'

export type DbClient = ReturnType<typeof drizzle<typeof schema>>

export interface Env {
  HYPERDRIVE: Hyperdrive
}

export function createDbClient() {
  const pool = postgres(process.env.DATABASE_URL!, {
    prepare: false,
  })

  return drizzle(pool, { schema })
}

export const db = createDbClient();
