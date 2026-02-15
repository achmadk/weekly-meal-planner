import { auth, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)"
])

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  if (isProtectedRoute(req)) {
	return clerkMiddleware(async (auth) => {
		await auth.protect();
	})(req, event);
  }

  const requestHeaders = new Headers(req.headers);
  const cloudflareContext = getCloudflareContext();


  requestHeaders.set(
	"opennext-cloudflare-context",
	`typeof \`cloudflareContext.env\` = ${typeof cloudflareContext.env}`
  );

  return NextResponse.next({
	request: {
    	headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
