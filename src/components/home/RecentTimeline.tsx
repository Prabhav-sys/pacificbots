"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Post = {
  id: string;
  title: string;
  type: "blog" | "tutorial" | "case-study";
  created_at: string;
};

export default function RecentContentTimeline() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    supabase
      .from("posts")
      .select("id, title, type, created_at")
      .eq("status", "published")
      .order("created_at", { ascending: false })
      .limit(5)
      .then(({ data }) => {
        if (data) setPosts(data);
      });
  }, []);

  return (
    <section className="timeline">
      <h2 className="section-title">Recent Updates</h2>

      <div className="timeline-track">
        {posts.map((post, index) => (
          <Link
            key={post.id}
            href={`/${post.type}/${post.id}`}
            className={`timeline-entry ${
              index % 2 === 0 ? "left" : "right"
            }`}
          >
            <span className="timeline-dot" />

            <div className="timeline-card">
              <div className="timeline-meta">
                <time>
                  {new Date(post.created_at).toLocaleDateString()}
                </time>
                <span className="timeline-type">
                  {post.type.toUpperCase()}
                </span>
              </div>

              <h3 className="timeline-title">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
