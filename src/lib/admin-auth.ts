import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { auth } from "./auth";

/**
 * Require admin access for server components/pages
 * Redirects non-admins to dashboard
 */
export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!session.user.isAdmin) {
    redirect("/dashboard");
  }

  return session;
}

/**
 * Require admin access for API routes
 * Returns error response for non-admins
 */
export async function requireAdminApi() {
  const session = await auth();

  if (!session?.user) {
    return {
      error: NextResponse.json({ error: "Non authentifie" }, { status: 401 }),
      session: null,
    };
  }

  if (!session.user.isAdmin) {
    return {
      error: NextResponse.json({ error: "Acces refuse" }, { status: 403 }),
      session: null,
    };
  }

  return { error: null, session };
}
