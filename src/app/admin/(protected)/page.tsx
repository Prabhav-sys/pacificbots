"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Activity = {
  id: string;
  title: string;
  status: string;
  created_at: string;
  type: "blog" | "tutorial" | "case-study";
};

type Stat = {
  total: number;
  published: number;
  draft: number;
};

export default function AdminDashboard() {
  const router = useRouter();

  const [stats, setStats] = useState<{
    blogs: Stat;
    tutorials: Stat;
    cases: Stat;
  }>({
    blogs: { total: 0, published: 0, draft: 0 },
    tutorials: { total: 0, published: 0, draft: 0 },
    cases: { total: 0, published: 0, draft: 0 },
  });

  const [activity, setActivity] = useState<Activity[]>([]);

  /* --------------------------------------------------
     AUTH CHECK (THIS FIXES YOUR PROBLEM)
  -------------------------------------------------- */
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  /* --------------------------------------------------
     LOAD STATS & ACTIVITY
  -------------------------------------------------- */
  useEffect(() => {
    const loadStats = async () => {
      const [
        blogsTotal,
        blogsPublished,
        blogsDraft,
        tutTotal,
        tutPublished,
        tutDraft,
        caseTotal,
        casePublished,
        caseDraft,
      ] = await Promise.all([
        supabase.from("posts").select("*", { count: "exact", head: true }).eq("type", "blog"),
        supabase.from("posts").select("*", { count: "exact", head: true }).eq("type", "blog").eq("status", "published"),
        supabase.from("posts").select("*", { count: "exact", head: true }).eq("type", "blog").eq("status", "draft"),

        supabase.from("tutorials").select("*", { count: "exact", head: true }),
        supabase.from("tutorials").select("*", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("tutorials").select("*", { count: "exact", head: true }).eq("status", "draft"),

        supabase.from("case_studies").select("*", { count: "exact", head: true }),
        supabase.from("case_studies").select("*", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("case_studies").select("*", { count: "exact", head: true }).eq("status", "draft"),
      ]);

      setStats({
        blogs: {
          total: blogsTotal.count ?? 0,
          published: blogsPublished.count ?? 0,
          draft: blogsDraft.count ?? 0,
        },
        tutorials: {
          total: tutTotal.count ?? 0,
          published: tutPublished.count ?? 0,
          draft: tutDraft.count ?? 0,
        },
        cases: {
          total: caseTotal.count ?? 0,
          published: casePublished.count ?? 0,
          draft: caseDraft.count ?? 0,
        },
      });
    };

    const loadActivity = async () => {
      const [p, t, c] = await Promise.all([
        supabase.from("posts").select("id,title,status,created_at").eq("type", "blog"),
        supabase.from("tutorials").select("id,title,status,created_at"),
        supabase.from("case_studies").select("id,title,status,created_at"),
      ]);

      const combined: Activity[] = [
        ...(p.data ?? []).map(x => ({ ...x, type: "blog" as const })),
        ...(t.data ?? []).map(x => ({ ...x, type: "tutorial" as const })),
        ...(c.data ?? []).map(x => ({ ...x, type: "case-study" as const })),
      ];

      combined.sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );

      setActivity(combined.slice(0, 6));
    };

    loadStats();
    loadActivity();
  }, []);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Dashboard</h1>
        <p>Overview of your content & activity</p>
      </header>

      <section className="admin-stats">
        <StatCard title="Blogs" stat={stats.blogs} />
        <StatCard title="Tutorials" stat={stats.tutorials} />
        <StatCard title="Case Studies" stat={stats.cases} />
      </section>

      <section className="admin-recent">
        <h2>Recent Activity</h2>
        <p className="muted">Latest updates across your platform</p>

        <div className="activity-list">
          {activity.map(a => (
            <ActivityItem
              key={`${a.type}-${a.id}`}
              title={a.title}
              status={a.status}
              type={a.type}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, stat }: { title: string; stat: Stat }) {
  return (
    <div className="stat-card">
      <span className="stat-label">{title}</span>
      <strong className="stat-value">{stat.total}</strong>

      <div className="stat-meta">
        <span className="published">● Published: {stat.published}</span>
        <span className="draft">● Draft: {stat.draft}</span>
      </div>
    </div>
  );
}

function ActivityItem({
  title,
  status,
  type,
}: {
  title: string;
  status: string;
  type: string;
}) {
  return (
    <div className="activity-item">
      <span className="activity-title">{title}</span>
      <span className={`status ${status.toLowerCase()}`}>
        {type} · {status}
      </span>
    </div>
  );
}
