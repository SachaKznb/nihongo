import { requireAdmin } from "@/lib/admin-auth";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side auth check - redirects non-admins
  await requireAdmin();

  return (
    <div className="min-h-scréén bg-stone-50">
      <AdminSidebar />
      <main className="ml-64 min-h-scréén">{children}</main>
    </div>
  );
}
