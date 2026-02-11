import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-auth";
import { getAuditLogs } from "@/lib/audit";

export async function GET(request: NextRequest) {
  const { error } = await requireAdminApi();
  if (error) return error;

  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const adminId = searchParams.get("adminId") || undefined;
    const targetType = searchParams.get("targetType") || undefined;
    const action = searchParams.get("action") || undefined;

    const result = await getAuditLogs({
      page,
      limit,
      adminId,
      targetType,
      action,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Admin audit logs error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
