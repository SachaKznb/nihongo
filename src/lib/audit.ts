import { Prisma } from "@prisma/client";
import { prisma } from "./db";

interface AuditLogParams {
  adminId: string;
  action: string;
  targetType: string;
  targetId: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Log an admin action for audit trail
 */
export async function logAdminAction({
  adminId,
  action,
  targetType,
  targetId,
  details,
  ipAddress,
  userAgent,
}: AuditLogParams) {
  try {
    await prisma.adminAuditLog.create({
      data: {
        adminId,
        action,
        targetType,
        targetId,
        details: details as Prisma.InputJsonValue | undefined,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    console.error("Failed to log admin action:", error);
  }
}

/**
 * Get admin audit logs with pagination
 */
export async function getAuditLogs(options?: {
  page?: number;
  limit?: number;
  adminId?: string;
  targetType?: string;
  action?: string;
}) {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 50;
  const skip = (page - 1) * limit;

  const where: {
    adminId?: string;
    targetType?: string;
    action?: { contains: string };
  } = {};

  if (options?.adminId) {
    where.adminId = options.adminId;
  }
  if (options?.targetType) {
    where.targetType = options.targetType;
  }
  if (options?.action) {
    where.action = { contains: options.action };
  }

  const [logs, total] = await Promise.all([
    prisma.adminAuditLog.findMany({
      where,
      include: {
        admin: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.adminAuditLog.count({ where }),
  ]);

  return {
    logs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
