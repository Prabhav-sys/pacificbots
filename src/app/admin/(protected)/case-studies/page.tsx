"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type CaseStudy = {
  id: string;
  title: string;
  status: string;
  created_at: string;
};

export default function AdminCaseStudiesPage() {
  const router = useRouter();
  const [items, setItems] = useState<CaseStudy[]>([]);

  useEffect(() => {
    supabase
      .from("case_studies")
      .select("id, title, status, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => setItems(data || []));
  }, []);

  return (
    <div className="page max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1>Case Studies</h1>
        <button
          onClick={() => router.push("/admin/case-studies/new")}
          className="admin-btn"
        >
          + New Case Study
        </button>
      </div>

      <div className="card-grid">
        {items.map((c) => (
          <div key={c.id} className="card">
            <h3 className="card-title">{c.title}</h3>
            <p className="card-meta">
              {c.status} ·{" "}
              {new Date(c.created_at).toLocaleDateString()}
            </p>

            <div className="admin-actions">
              <button
                onClick={() => router.push(`/admin/case-studies/${c.id}`)}
                className="admin-btn secondary"
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  if (!confirm("Delete this case study?")) return;
                  await supabase
                    .from("case_studies")
                    .delete()
                    .eq("id", c.id);
                  location.reload();
                }}
                className="admin-btn danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
