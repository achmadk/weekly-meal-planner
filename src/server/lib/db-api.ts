/* eslint-disable @typescript-eslint/no-explicit-any */
import { drizzle } from 'drizzle-orm/mysql2'
import { createConnection } from 'mysql2/promise'
import * as schema from '@/db/schema'

export async function getDb() {
  const connection = await createConnection({
    uri: process.env.DATABASE_URL!,
    disableEval: true,
  })

  return drizzle(connection, { schema, mode: 'default' }) as any
}
