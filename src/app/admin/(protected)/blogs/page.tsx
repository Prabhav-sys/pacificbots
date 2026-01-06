"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Blog = {
  id: string;
  title: string;
  status: string;
  created_at: string;
};

export default function AdminBlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const loadBlogs = async () => {
    const { data } = await supabase
      .from("posts")
      .select("id, title, status, created_at")
      .eq("type", "blog")
      .order("created_at", { ascending: false });

    setBlogs(data || []);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    await supabase.from("posts").delete().eq("id", id);
    loadBlogs();
  };

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="admin-page-title">Blogs</h1>

        <button
          onClick={() => router.push("/admin/blogs/new")}
          className="admin-btn"
        >
          + New Blog
        </button>
      </div>

      {/* Grid */}
      <div className="card-grid">
        {blogs.map((b) => (
          <div key={b.id} className="admin-blog-card">
            {/* Existing blog item JSX (wrapped only) */}

            <h3 className="admin-card-title">{b.title}</h3>

            <p className="card-meta">
              {b.status} ·{" "}
              {new Date(b.created_at).toLocaleDateString()}
            </p>

            <div className="admin-card-actions">
              <button
                className="admin-btn secondary"
                onClick={() => router.push(`/admin/blogs/${b.id}`)}
              >
                Edit
              </button>

              <button
                className="admin-btn danger"
                onClick={() => remove(b.id)}
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
