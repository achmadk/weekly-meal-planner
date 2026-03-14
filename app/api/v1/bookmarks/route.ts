import { NextRequest, NextResponse } from 'next/server'
import { eq, and } from 'drizzle-orm'

import { db } from '@/db'
import { userBookmarks } from '@/db/schema'

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { recipeId, isBookmarked } = body

    if (!recipeId || typeof isBookmarked !== 'boolean') {
      return NextResponse.json(
        { error: 'Missing required fields: recipeId and isBookmarked' },
        { status: 400 },
      )
    }

    const existingBookmark = await db
      .select()
      .from(userBookmarks)
      .where(
        and(
          eq(userBookmarks.userId, userId),
          eq(userBookmarks.recipeId, recipeId),
        ),
      )
      .limit(1)

    if (existingBookmark.length > 0) {
      if (isBookmarked) {
        await db
          .update(userBookmarks)
          .set({ isBookmarked: true, updatedAt: new Date() })
          .where(
            and(
              eq(userBookmarks.userId, userId),
              eq(userBookmarks.recipeId, recipeId),
            ),
          )
      } else {
        await db
          .delete(userBookmarks)
          .where(
            and(
              eq(userBookmarks.userId, userId),
              eq(userBookmarks.recipeId, recipeId),
            ),
          )
      }
    } else if (isBookmarked) {
      await db.insert(userBookmarks).values({
        userId,
        recipeId,
        isBookmarked: true,
      })
    }

    return NextResponse.json({ success: true, isBookmarked })
  } catch (error) {
    console.error('Bookmark API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const bookmarks = await db
      .select()
      .from(userBookmarks)
      .where(eq(userBookmarks.userId, userId))

    return NextResponse.json({ bookmarks })
  } catch (error) {
    console.error('Bookmark API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
