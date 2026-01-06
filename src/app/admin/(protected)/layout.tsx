import "@/styles/admin.css";
import AdminShell from "@/components/admin/AdminShell";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div className="admin-body">
        <AdminShell>{children}</AdminShell>
      </div>
    </AdminAuthGuard>
  );
}
