"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="admin-nav">
      <h2 className="admin-title">Admin Panel</h2>

      <nav className="admin-links">
        <Link className={pathname.startsWith("/admin/blogs") ? "active" : ""} href="/admin/blogs">
          Blogs
        </Link>
        <Link className={pathname.startsWith("/admin/tutorials") ? "active" : ""} href="/admin/tutorials">
          Tutorials
        </Link>
        <Link className={pathname.startsWith("/admin/case-studies") ? "active" : ""} href="/admin/case-studies">
          Case Studies
        </Link>
      </nav>
    </div>
  );
}
