"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Tutorial = {
  id: string;
  title: string;
  status: string;
  created_at: string;
};

export default function AdminTutorialsPage() {
  const [items, setItems] = useState<Tutorial[]>([]);

  useEffect(() => {
    supabase
      .from("tutorials")
      .select("id, title, status, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => setItems(data || []));
  }, []);

  return (
    <div className="page">
      <div className="admin-page-header">
        <h1>Tutorials</h1>

        <Link href="/admin/tutorials/new" className="admin-btn">
          + New Tutorial
        </Link>
      </div>


      {/* ✅ GRID — SAME AS BLOGS */}
      <div className="card-grid">
        {items.map((t) => (
          <div className="admin-blog-card">
            <h3>{t.title}</h3>

            <div className="meta">
              <span className={`status ${t.status}`}>{t.status}</span>
              <span>{new Date(t.created_at).toLocaleDateString()}</span>
            </div>

            <div className="admin-blog-actions">
              <Link
                href={`/admin/tutorials/${t.id}`}
                className="admin-btn"
              >
                Edit
              </Link>

              <button
                className="admin-btn danger"
                onClick={async () => {
                  if (!confirm("Delete this tutorial?")) return;
                  await supabase.from("tutorials").delete().eq("id", t.id);
                  location.reload();
                }}
              >
                Delete
              </button>
            </div>
          </div>

        ))}
      </div>
    </div >
  );
}
