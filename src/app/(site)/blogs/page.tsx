import "@/styles/blog-read.css";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const { data: blogs } = await supabase
    .from("posts")
    .select("id, title, slug, created_at")
    .eq("type", "blog")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  return (
    <div className="page-wrapper">
      {/* HERO */}
      <header className="page-header-wide blogs-hero">
        <span className="section-label">BLOGS</span>
        <h1 className="page-title">Research notes & writings</h1>
        <p className="page-subtitle">
          Calm thoughts on robotics, AI, automation, and engineering.
        </p>
      </header>

      {/* GRID */}
      <section className="blogs-grid">
        {blogs?.map((blog) => (
          <article key={blog.id} className="blog-card">
            <span className="blog-date">
              {new Date(blog.created_at).toLocaleDateString()}
            </span>

            <h3>{blog.title}</h3>

            <Link href={`/blogs/${blog.slug}`} className="read-link">
              Read →
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
