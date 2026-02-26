import { auth, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

async function getCloudflareContext() {
  const deploymentMode = process.env.DEPLOYMENT_MODE ?? 'local'
  if (deploymentMode !== 'cloudflare') {
    return null
  }
  const cloudflare = await import('@opennextjs/cloudflare')
  return cloudflare.getCloudflareContext()
}

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent,
) {
  if (isProtectedRoute(req)) {
    return clerkMiddleware(async (auth) => {
      await auth.protect()
    })(req, event)
  }

  const requestHeaders = new Headers(req.headers)
  const cloudflareContext = await getCloudflareContext()

  if (cloudflareContext) {
    requestHeaders.set(
      'opennext-cloudflare-context',
      `typeof \`cloudflareContext.env\` = ${typeof cloudflareContext.env}`,
    )
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
