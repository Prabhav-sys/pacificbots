"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import AdminNav from "./AdminNav";

export default function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/admin/login");
        return;
      }

      setReady(true);
    };

    checkAuth();
  }, [router]);

  if (!ready) return null;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <AdminNav />
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
