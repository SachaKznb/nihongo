import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-auth";
import { logAdminAction } from "@/lib/audit";

/**
 * GET /api/admin/emails
 * List all email templates (custom overrides)
 */
export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;

  try {
    const templates = await prisma.emailTemplate.findMany({
      orderBy: { type: "asc" },
    });

    return NextResponse.json({ templates });
  } catch (err) {
    console.error("Error fetching email templates:", err);
    return NextResponse.json(
      { error: "Erreur lors de la recuperation des templates" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/emails
 * Update or create an email template
 */
export async function PUT(request: Request) {
  const { error, session } = await requireAdminApi();
  if (error) return error;

  const adminId = session?.user?.id;
  if (!adminId) {
    return NextResponse.json({ error: "Session invalide" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, subject, headline, bodyText, buttonText, footerText, isActive } = body;

    if (!type) {
      return NextResponse.json(
        { error: "Le type de template est requis" },
        { status: 400 }
      );
    }

    // Build update data - only include fields that were provided
    const updateData: Record<string, unknown> = {
      updatedBy: adminId,
    };

    if (subject !== undefined) updateData.subject = subject;
    if (headline !== undefined) updateData.headline = headline;
    if (bodyText !== undefined) updateData.bodyText = bodyText;
    if (buttonText !== undefined) updateData.buttonText = buttonText;
    if (footerText !== undefined) updateData.footerText = footerText;
    if (isActive !== undefined) updateData.isActive = isActive;

    // Upsert the template
    const template = await prisma.emailTemplate.upsert({
      where: { type },
      update: updateData,
      create: {
        type,
        subject: subject || "",
        headline: headline || "",
        bodyText: bodyText || "",
        buttonText: buttonText || "",
        footerText,
        isActive: isActive ?? true,
        updatedBy: adminId,
      },
    });

    // Log the action
    await logAdminAction({
      adminId,
      action: "email.update",
      targetType: "email_template",
      targetId: type,
      details: updateData,
      ipAddress: request.headers.get("x-forwarded-for") || undefined,
      userAgent: request.headers.get("user-agent") || undefined,
    });

    return NextResponse.json({ template });
  } catch (err) {
    console.error("Error updating email template:", err);
    return NextResponse.json(
      { error: "Erreur lors de la mise a jour du template" },
      { status: 500 }
    );
  }
}
