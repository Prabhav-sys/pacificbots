import "@/styles/blog-read.css";
import { supabase } from "@/lib/supabaseClient";
import BlockRenderer from "@/components/blocks/BlockRenderer";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogReadPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: blog } = await supabase
    .from("posts")
    .select("*")
    .eq("type", "blog")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!blog) {
    return (
      <article className="blog-article">
        <p>Post not found.</p>
      </article>
    );
  }

  return (
    <article className="blog-article">
      <header className="blog-header">
        <h1>{blog.title}</h1>
        <div className="blog-meta">
          {new Date(blog.created_at).toLocaleDateString()}
        </div>
      </header>

      <section className="blog-content">
        <BlockRenderer blocks={blog.content_blocks ?? []} />
      </section>
    </article>
  );
}
