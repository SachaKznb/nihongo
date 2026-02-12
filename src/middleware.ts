import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// In-memory rate limiting store
// Note: In production with multiple serverless instances, use Redis or similar
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Clean up old entries periodically
function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security Headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // HSTS - only in production
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  // Content-Security-Policy
  // Allow 'unsafe-inline' for Next.js styles and 'unsafe-eval' for development
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
  ];
  response.headers.set("Content-Security-Policy", cspDirectives.join("; "));

  // Rate limiting for authentication and account endpoints
  if (
    request.nextUrl.pathname.startsWith("/api/auth/register") ||
    request.nextUrl.pathname.startsWith("/api/auth/forgot-password") ||
    request.nextUrl.pathname.startsWith("/api/auth/resend-verification") ||
    request.nextUrl.pathname.startsWith("/api/account/")
  ) {
    // Clean up old entries
    cleanupRateLimitStore();

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 10; // 10 requests per window for auth endpoints

    const key = `${ip}-${request.nextUrl.pathname}`;
    const record = rateLimitStore.get(key);

    if (!record || now > record.resetTime) {
      // New window
      rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    } else if (record.count >= maxRequests) {
      // Rate limit exceeded
      return new NextResponse(
        JSON.stringify({
          error: "Trop de requetes. Veuillez réessayer dans quelques minutes.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(Math.ceil((record.resetTime - now) / 1000)),
          },
        }
      );
    } else {
      // Increment counter
      record.count++;
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
