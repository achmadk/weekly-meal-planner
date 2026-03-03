/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { subMonths, isBefore } from 'date-fns'

import { db } from '@/db'

import { userLimits } from '@/db/schema'

export type MealGenerationLimitsRequestBody = {
  userId: string
  action: "CHECK"
} | {
  userId: string
  action: "SET_VALUE"
  remainingCount: number
}

export type MealGenerationLimitsCheckResponseBody = {
  allowed: boolean
  remaining: number
  limit: number
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as MealGenerationLimitsRequestBody

    if (body.action === 'CHECK') {
      const results = await db
        .select()
        .from(userLimits)
        .where(eq(userLimits.userId, body.userId))
        .limit(1)
      const userLimit = results?.[0] ?? null;

      const now = new Date()
      const oneMonthAgo = subMonths(now, 1)

      if (userLimit?.lastResetAt) {
        const lastReset = new Date(userLimit.lastResetAt)
        if (isBefore(lastReset, oneMonthAgo)) {
        // if (lastReset < oneMonthAgo) {
          await db
            .update(userLimits)
            .set({
              generationUsed: 0,
              lastResetAt: now,
              updatedAt: now,
            })
            .where(eq(userLimits.userId, body.userId))

          return NextResponse.json({
            allowed: true,
            remaining: 7,
            limit: 7,
          })
        }
      }

      const remaining = userLimit
        ? userLimit.generationLimit - userLimit.generationUsed
        : 7

      return NextResponse.json({
        allowed: remaining > 0,
        remaining: Math.max(0, remaining),
        limit: 7,
      })
    }

    if (body.action === "SET_VALUE") {
      const results = await db
        .select()
        .from(userLimits)
        .where(eq(userLimits.userId, body.userId))
        .limit(1)
      const userLimit = results?.[0] ?? null;

      const generationUsed = 7 - body.remainingCount;
      if (!userLimit) {
        await db.insert(userLimits).values({
          userId: body.userId,
          generationLimit: 7,
          generationUsed,
          lastResetAt: new Date(),
        })
      } else {
        await db
          .update(userLimits)
          .set({
            generationUsed,
            updatedAt: new Date(),
          })
          .where(eq(userLimits.userId, body.userId))
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Generation limit error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
