/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { userLimits } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { subMonths } from 'date-fns'
import { createDbClient } from '@/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, action } = body

    const db = createDbClient()

    if (action === 'check') {
      if (!userId) {
        return NextResponse.json({
          allowed: true,
          remaining: 1,
          limit: 1,
          isPublic: true,
        })
      }

      const results = await (db as any)
        .select()
        .from(userLimits)
        .where(eq(userLimits.userId, userId))
      const userLimit = results[0]

      const now = new Date()
      const oneMonthAgo = subMonths(now, 1)

      if (userLimit && userLimit.lastResetAt) {
        const lastReset = new Date(userLimit.lastResetAt)
        if (lastReset < oneMonthAgo) {
          await (db as any)
            .update(userLimits)
            .set({
              generationUsed: 0,
              lastResetAt: now,
              updatedAt: now,
            })
            .where(eq(userLimits.userId, userId))

          return NextResponse.json({
            allowed: true,
            remaining: 5,
            limit: 5,
            isPublic: false,
          })
        }
      }

      const remaining = userLimit
        ? userLimit.generationLimit - userLimit.generationUsed
        : 5

      return NextResponse.json({
        allowed: remaining > 0,
        remaining: Math.max(0, remaining),
        limit: 5,
        isPublic: false,
      })
    }

    if (action === 'decrement') {
      if (!userId) {
        return NextResponse.json({ success: true })
      }

      const results = await (db as any)
        .select()
        .from(userLimits)
        .where(eq(userLimits.userId, userId))
      const userLimit = results[0]

      if (!userLimit) {
        await (db as any).insert(userLimits).values({
          userId,
          generationLimit: 5,
          generationUsed: 1,
          lastResetAt: new Date(),
        })
      } else {
        await (db as any)
          .update(userLimits)
          .set({
            generationUsed: userLimit.generationUsed + 1,
            updatedAt: new Date(),
          })
          .where(eq(userLimits.userId, userId))
      }

      return NextResponse.json({ success: true })
    }

    if (action === 'add') {
      if (!userId) {
        return NextResponse.json({ success: false })
      }

      const results = await (db as any)
        .select()
        .from(userLimits)
        .where(eq(userLimits.userId, userId))
      const userLimit = results[0]

      if (!userLimit) {
        await (db as any).insert(userLimits).values({
          userId,
          generationLimit: 7,
          generationUsed: 0,
          lastResetAt: new Date(),
        })
      } else {
        await (db as any)
          .update(userLimits)
          .set({
            generationLimit: (userLimit.generationLimit ?? 5) + 2,
            updatedAt: new Date(),
          })
          .where(eq(userLimits.userId, userId))
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Generation limit error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
